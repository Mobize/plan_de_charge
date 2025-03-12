<?php

namespace App\Controller\Admin;

use App\Entity\VacationType;
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
use EasyCorp\Bundle\EasyAdminBundle\Field\ColorField;


class VacationTypeCrudController extends AbstractCrudController
{
    public static function getEntityFqcn(): string
    {
        return VacationType::class;
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
            TextField::new('name', 'Nom'),
            ColorField::new('color', 'Couleur')
            // TextEditorField::new('description'),
        ];
    }

    public function configureCrud(Crud $crud): Crud
    {
        return $crud
            ->setEntityLabelInSingular('type d\'absence')
            ->setEntityLabelInPlural('Type d\'absence'); // Titre affiché en haut de la page
    }
    
}
