<?php

namespace App\Controller\Admin;

use App\Entity\Project;
use EasyCorp\Bundle\EasyAdminBundle\Config\Crud;
use EasyCorp\Bundle\EasyAdminBundle\Config\Action;
use EasyCorp\Bundle\EasyAdminBundle\Field\IdField;
use EasyCorp\Bundle\EasyAdminBundle\Config\Actions;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextEditorField;
use EasyCorp\Bundle\EasyAdminBundle\Field\AssociationField;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;

class ProjectCrudController extends AbstractCrudController
{
    public static function getEntityFqcn(): string
    {
        return Project::class;
    }

    public function configureActions(Actions $actions): Actions {
        return $actions
        ->add(Crud::PAGE_EDIT, Action::INDEX)
        ->add(Crud::PAGE_INDEX, Action::DETAIL)
        ->add(Crud::PAGE_EDIT, Action::DETAIL);
    }
    
    public function configureFields(string $pageName): iterable
    {
        return [
            // IdField::new('id'),
            TextField::new('name', "Nom du projet"),
            TextField::new('company', "Nom de la société"),
            // TextField::new('CgiProjectId'),
            AssociationField::new('employees', 'Choix des employés')->formatValue(function ($value, $entity) {
                return implode("<br> ",$entity->getEmployees()->toArray());
            }),
        ];
    }

    public function configureCrud(Crud $crud): Crud
    {
        return $crud
            ->setEntityLabelInSingular('projet')
            ->setEntityLabelInPlural('Projets'); // Titre affiché en haut de la page
    }
    
}
