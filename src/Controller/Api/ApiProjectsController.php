<?php

namespace App\Controller\Api;

use App\Repository\ProjectRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class ApiProjectsController extends AbstractController
{
    #[Route('/api/projects/{id}', name: 'api_projects', methods: ['GET'])]
    public function index($id, ProjectRepository $projectsRepo): Response
    {
        $selectedProject = $projectsRepo->findOneBy(['id' => $id]);
        $employees = $selectedProject->getEmployees();
        $result = [];

        foreach($employees as $employee) {
            $result[] = $employee->getFullName();
        }

        if(!$employees) {
            return $this->json([
                'isSuccess' => false,
                'message' => 'Aucun employé trouvé'
            ]);
        }

        return $this->json([
            'isSucces' => true,
            'data' => $result
        ]);
    }
}
