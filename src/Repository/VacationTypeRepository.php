<?php

namespace App\Repository;

use App\Entity\VacationType;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<VacationType>
 *
 * @method VacationType|null find($id, $lockMode = null, $lockVersion = null)
 * @method VacationType|null findOneBy(array $criteria, array $orderBy = null)
 * @method VacationType[]    findAll()
 * @method VacationType[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class VacationTypeRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, VacationType::class);
    }

//    /**
//     * @return VacationType[] Returns an array of VacationType objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('v')
//            ->andWhere('v.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('v.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

//    public function findOneBySomeField($value): ?VacationType
//    {
//        return $this->createQueryBuilder('v')
//            ->andWhere('v.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
