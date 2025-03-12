<?php

namespace App\Controller\Admin;

use App\Entity\Employee;
use EasyCorp\Bundle\EasyAdminBundle\Config\Crud;
use EasyCorp\Bundle\EasyAdminBundle\Config\Action;
use EasyCorp\Bundle\EasyAdminBundle\Field\IdField;
use EasyCorp\Bundle\EasyAdminBundle\Config\Actions;
use EasyCorp\Bundle\EasyAdminBundle\Field\DateField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextField;
use EasyCorp\Bundle\EasyAdminBundle\Field\IntegerField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextEditorField;
use EasyCorp\Bundle\EasyAdminBundle\Field\AssociationField;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;
use EasyCorp\Bundle\EasyAdminBundle\Field\BooleanField;

class EmployeeCrudController extends AbstractCrudController
{
    public static function getEntityFqcn(): string
    {
        return Employee::class;
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
            TextField::new('fullName', 'Nom prénom'),
            TextField::new('function', 'Fonction'),
            IntegerField::new('registrationNumber', 'Matricule'),
            DateField::new('SocietyEntryDate', 'Date entrée projet')->setFormat("dd.MM.yyyy 'à' HH:mm:ss" )->setTimezone('Europe/Paris'),
            DateField::new('societyReleaseDate', 'Date sortie projet')->setFormat("dd.MM.yyyy 'à' HH:mm:ss" )->setTimezone('Europe/Paris'),
            AssociationField::new('projects', 'Projets')->formatValue(function ($value, $entity) {
                return implode("<br> ",$entity->getProjects()->toArray());
            }),
            BooleanField::new('isCafIncluded', 'Inclus dans la CAF'),
            // AssociationField::new('vacations', 'Vacations')->formatValue(function ($value, $entity) {
            //     return implode("<br> ",$entity->getVacations()->toArray());
            // }),
        ];
    }

    public function configureCrud(Crud $crud): Crud
    {
        return $crud
            ->setEntityLabelInSingular('employé')
            ->setEntityLabelInPlural('Employés'); // Titre affiché en haut de la page
    }
        
}
