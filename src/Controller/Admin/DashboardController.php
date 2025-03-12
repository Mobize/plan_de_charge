<?php

namespace App\Controller\Admin;

use App\Entity\Project;
use App\Entity\Employee;
use App\Entity\Vacations;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use App\Controller\Admin\EmployeeCrudController;
use App\Entity\VacationType;
use EasyCorp\Bundle\EasyAdminBundle\Config\MenuItem;
use EasyCorp\Bundle\EasyAdminBundle\Config\Dashboard;
use EasyCorp\Bundle\EasyAdminBundle\Router\AdminUrlGenerator;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractDashboardController;

class DashboardController extends AbstractDashboardController
{
    #[Route('/admin', name: 'admin')]
    public function index(): Response
    {
        // return parent::index();

        // Option 1. You can make your dashboard redirect to some common page of your backend
        //
        $adminUrlGenerator = $this->container->get(AdminUrlGenerator::class);
        return $this->redirect($adminUrlGenerator->setController(EmployeeCrudController::class)->generateUrl());

        // Option 2. You can make your dashboard redirect to different pages depending on the user
        //
        // if ('jane' === $this->getUser()->getUsername()) {
        //     return $this->redirect('...');
        // }

        // Option 3. You can render some custom template to display a proper dashboard with widgets, etc.
        // (tip: it's easier if your template extends from @EasyAdmin/page/content.html.twig)
        //
        // return $this->render('some/path/my-dashboard.html.twig');
    }

    public function configureDashboard(): Dashboard
    {
        return Dashboard::new()
            ->setTitle('Plan de charge');
    }

    public function configureMenuItems(): iterable
    {
        // yield MenuItem::linkToDashboard('Accueil', 'fa fa-home');
        yield MenuItem::linkToCrud('Employés', 'fas fa-list', Employee::class);
        yield MenuItem::linkToCrud('Congés', 'fas fa-list', Vacations::class);
        yield MenuItem::linkToCrud('Projets', 'fas fa-list', Project::class);
        yield MenuItem::linkToCrud('Type de congés', 'fas fa-list', VacationType::class);
    }
}
