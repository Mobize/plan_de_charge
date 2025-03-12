<?php

namespace App\Controller\Admin;

use App\Entity\Vacations;
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

class VacationsCrudController extends AbstractCrudController
{
    public static function getEntityFqcn(): string
    {
        return Vacations::class;
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
            DateField::new('vacationStartDate', 'Début des congés')->setFormat("dd.MM.yyyy" )->setTimezone('Europe/Paris'),
            DateField::new('vacationReleaseDate', 'Fin des congés')->setFormat("dd.MM.yyyy" )->setTimezone('Europe/Paris'),
            AssociationField::new('employee', 'Employé'),
            AssociationField::new('vacationType', 'Type de congé'),
            DateField::new('createdAt', 'Date soumission congés')->setFormat("dd.MM.yyyy" )->setTimezone('Europe/Paris')->hideOnForm(),
        ];
    }

    public function configureCrud(Crud $crud): Crud
    {
        return $crud
            ->setEntityLabelInSingular('congés')
            ->setEntityLabelInPlural('Congés'); // Titre affiché en haut de la page
    }
    
}
