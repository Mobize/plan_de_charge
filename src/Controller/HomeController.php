<?php

namespace App\Controller;

use App\Entity\Project;
use App\Entity\Vacations;
use App\Repository\EmployeeRepository;
use App\Repository\ProjectRepository;
use App\Repository\VacationsRepository;
use App\Repository\VacationTypeRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\RequestStack;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class HomeController extends AbstractController
{

    private $session;
    private $projectRepository;
    private $vacationsRepository;
    // private $vacationTypeRepo;
    private $employeeRepository;

    public function __construct(private RequestStack $requestStack, 
                                private ProjectRepository $projectRepo,
                                private VacationsRepository $vacationRepo,
                                private VacationTypeRepository $vacationTypeRepo,
                                private EmployeeRepository $employeeRepo)
    {
        $this->session = $requestStack->getSession();
        $this->projectRepository = $projectRepo;
        $this->vacationsRepository = $vacationRepo;
        $this->vacationTypeRepo = $vacationTypeRepo;
        $this->employeeRepository = $employeeRepo;
    }

    #[Route('/', name: 'app_home')]
    public function index(): Response
    {
        $projects = $this->projectRepository->findAll();
        $vacationType = $this->vacationTypeRepo->findAll();

        foreach($projects as $key=>$project) {
            $projects[$key] = [
                "id" => $project->getId(),
                "name" => $project->getName(),
                "company" => $project->getCompany(),
                "cgiprojectid" => $project->getCgiProjectId(),
            ];
        }

        if(!$this->session->get('project')) {
            $project = $projects[0];
            $this->session->set('project', $project);
        }

        $project = $this->session->get('project');
        $projects_json = json_encode($projects);
        
        return $this->render('home/index.html.twig', [
            'controller_name' => 'HomeController',
            'projects' => $projects,
            'projects_json' => $projects_json,
            'selectedProject' => $project,
            'vacationType' => $vacationType,
            // 'employees' => $employees
        ]);
    }

    #[Route('/update/project/{id}/{year}/{month}', name: 'app_update_project', methods: ["GET"])]
    public function updateEmployeesList($id, $year, $month )
    {
        $project = $this->projectRepository->findOneById($id);
        $this->session->set('project', $project);
        $employees = $this->displayEmployeesByProject($project->getId(), $year, $month);

        return $this->Json([
            "isSuccess" => true,
            'data' => $employees
        ]);
    }

    #[Route('/get/vacations/employee/{employeeId}', name: 'app_get_vacations_by_employee', methods: ["POST"])]
    public function getVacationsByEmployee($employeeId, Request $request)
    {
        $previousVacation = "";
        $nextVacation = "";
        $vacationsStart = "";
        $vacationsEnd = "";
        $idVacationType = "";
        $isHalfDay = "";
        $isMorning = "";
        $isAfternoon = "";
        $vacationDateSubmission = "";

        $data = json_decode($request->getContent(), true);
        $dayStart = $data['data']['dayStart'];
        $vacationId = $data['data']['vacationId'];

        $vacationsStartArray = $this->vacationRepo->findBy(['id' => $vacationId], ['id' => 'ASC'],1,0); 
        $vacationsEndArray = $this->vacationRepo->findBy(['id' => $vacationId], ['id' => 'DESC'],1,0);

        if(!empty($vacationsStartArray)) {
            $vacationsStart = $vacationsStartArray[0]->getVacationStartDate();
            $vacationDateSubmission = $vacationsStartArray[0]->getCreatedAt();
            $isHalfDay = $vacationsStartArray[0]->isIsHalfDay();
            if($isHalfDay === true) {
                $isMorning = $vacationsStartArray[0]->isMorning();
                $isAfternoon = $vacationsStartArray[0]->isAfternoon();
            }
            
        }

        if(!empty($vacationsEndArray)) {
            $vacationsEnd = $vacationsEndArray[0]->getVacationReleaseDate();
            $idVacationType = $vacationsEndArray[0]->getVacationType()->getId();
        }

        $previousVacations = $this->vacationsRepository->findPreviousVacations($employeeId, $dayStart, $vacationId);
        $nextVacations = $this->vacationsRepository->findNextVacations($employeeId, $dayStart, $vacationId);

        // Controle si congés présents avant ou après la date sélectionnée
        if(!empty($previousVacations)) {
            $previousVacation = $previousVacations[0]->getVacationReleaseDate();
        }

        if(!empty($nextVacations)) {
            $nextVacation = $nextVacations[0]->getVacationStartDate();
        }
        
        return $this->Json([
            "vacationDateSubmission" => $vacationDateSubmission,
            "previousVacation" => $previousVacation,
            'nextVacation' => $nextVacation,
            "vacationsStart" => $vacationsStart,
            'vacationsEnd' => $vacationsEnd,
            'idVacationType' => $idVacationType,
            'isHalfDay' => $isHalfDay,
            'isMorning' => $isMorning,
            'isAfternoon' => $isAfternoon,
        ]);
    }

    #[Route('/add/vacations', name: 'app_add_vacations', methods: ["POST"])]
    public function addVacations(Request $request, EntityManagerInterface $manager )
    {
        $data = json_decode($request->getContent(), true);
        $employeeId = $data['data']['employeeId'];
        $employee = $this->employeeRepository->findOneById($employeeId);
        $vacationId = uniqid();
            
        // Récupère le type de congés
        $vacationType = $this->vacationTypeRepo->findOneById($data['data']['vacations']['idVacationType']);
        $vacation = new Vacations();
        $vacation->setEmployee($employee);
        $startVacation = new \DateTime($data['data']['vacations']['startVacation']);
        $endVacation = new \DateTime($data['data']['vacations']['endVacation']);
        $vacation->setVacationStartDate($startVacation)
                 ->setVacationReleaseDate($endVacation)
                 ->setVacationId($vacationId)
                 ->setVacationType($vacationType);

        if(isset($data['data']['vacations']['isHalfDay'])) {
            $vacation->setIsHalfDay($data['data']['vacations']['isHalfDay'])
                        ->setMorning($data['data']['vacations']['halfMorning'])
                        ->setAfternoon($data['data']['vacations']['halfAfternoon']);
        }

        $manager->persist($vacation);
        $manager->flush($vacation);

        return $this->Json([
            "isSuccess" => true,
            // 'data' => $vacation // PB de serialisation (il faut détailler tous les champs voulu)
        ]);
    }

    #[Route('/update/vacations', name: 'app_update_vacations', methods: ["POST"])]
    public function updateVacations(Request $request, EntityManagerInterface $manager )
    {
        $data = json_decode($request->getContent(), true);

        if(isset($data['data']['vacations']['vacationId'])) {
            $vacationsEntry = $this->vacationsRepository->findOneById($data['data']['vacations']['vacationId']);
            $vacationType = $this->vacationTypeRepo->findOneById($data['data']['vacations']['idVacationType']);
            $startVacation = new \DateTime($data['data']['vacations']['startVacation']);
            $endVacation = new \DateTime($data['data']['vacations']['endVacation']);

            $vacationsEntry
            ->setVacationStartDate($startVacation)
            ->setVacationReleaseDate($endVacation)
            ->setVacationType($vacationType);

            if(isset($data['data']['vacations']['isHalfDay'])) {
                $vacationsEntry->setIsHalfDay($data['data']['vacations']['isHalfDay'])
                        ->setMorning($data['data']['vacations']['halfMorning'])
                        ->setAfternoon($data['data']['vacations']['halfAfternoon']);
            }
            $manager->persist($vacationsEntry);
            $manager->flush($vacationsEntry);

        }

        return $this->Json([
            "isSuccess" => true,
            // 'data' => $vacation // PB de serialisation (il faut détailler tous les champs voulus)
        ]);
    }

    #[Route('/delete/vacations/{vacationId}', name: 'app_delete_vacations', methods: ["POST"])]
    public function deleteVacations($vacationId, EntityManagerInterface $manager )
    {
        $vacationEntry = $this->vacationsRepository->findOneById($vacationId);
        $manager->remove($vacationEntry);
        $manager->flush($vacationEntry);

        return $this->Json([
            "isSuccess" => true,
            // 'data' => $vacation // PB de serialisation (il faut détailler tous les champs voulus)
        ]);
    }

    public function displayEmployeesByProject($projectId, $year, $month) 
    {
        $project = $this->projectRepository->findOneById($projectId);
        $employees = $project->getEmployees();

        $result = [];

        foreach($employees as $key => $employee) {
            $result[$key]['fullname'] = $employee->getFullName();
            $result[$key]['job'] = $employee->getFunction();
            $result[$key]['id'] = $employee->getId();
            $result[$key]['cafIncluded'] = $employee->isIsCafIncluded();

            $index = 0;

            foreach($employee->getVacations() as $key2 => $vacation) {
                $result[$key]['vacations'][$index]['startVacationDate'] = $vacation->getVacationStartDate();
                $result[$key]['vacations'][$index]['endVacationDate'] = $vacation->getVacationReleaseDate();
                $result[$key]['vacations'][$index]['vacationId'] = $vacation->getId();
                $result[$key]['vacations'][$index]['vacationType'] = $vacation->getVacationType()->getName();
                $result[$key]['vacations'][$index]['vacationTypeId'] = $vacation->getVacationType()->getId();
                $result[$key]['vacations'][$index]['vacationColor'] = $vacation->getVacationType()->getColor();
                $result[$key]['vacations'][$index]['isHalfDay'] = $vacation->isIsHalfDay();
                $result[$key]['vacations'][$index]['halfMorning'] = $vacation->isMorning();
                $result[$key]['vacations'][$index]['halfAfternoon'] = $vacation->isAfternoon();
                $index ++;
            }
        }

        return $result;
    }
}
