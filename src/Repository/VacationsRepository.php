<?php

namespace App\Repository;

use App\Entity\Vacations;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Vacations>
 *
 * @method Vacations|null find($id, $lockMode = null, $lockVersion = null)
 * @method Vacations|null findOneBy(array $criteria, array $orderBy = null)
 * @method Vacations[]    findAll()
 * @method Vacations[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class VacationsRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Vacations::class);
    }

   /**
    * @return Vacations[] Returns an array of Vacations objects
    */
   public function findPreviousVacations($employeeId, $dayStart, $vacationId = null): array
   {
       $qb = $this->createQueryBuilder('v')
           ->Where('v.employee = :val')
           ->andWhere('v.vacationReleaseDate < :startDate');

           if($vacationId != null) {
            $qb->andWhere('v.vacationId != :vacationId')
                ->setParameter('vacationId', $vacationId);
           }
           
           $qb->setParameter('val', $employeeId)
           ->setParameter('startDate', $dayStart)
           ->orderBy('v.vacationReleaseDate', 'DESC');
           return $qb->getQuery()->getResult();
           
   }

   /**
    * @return Vacations[] Returns an array of Vacations objects
    */
   public function findNextVacations($employeeId, $dayStart, $vacationId = null): array
   {
    $qb = $this->createQueryBuilder('v')
           ->Where('v.employee = :val')
           ->andWhere('v.vacationStartDate > :startDate');

           if($vacationId != null) {
            $qb->andWhere('v.vacationId != :vacationId')
                ->setParameter('vacationId', $vacationId);
           }

           $qb->setParameter('val', $employeeId)
           ->setParameter('startDate', $dayStart)
           ->orderBy('v.vacationReleaseDate', 'ASC');
           return $qb->getQuery()->getResult();
   }
}
