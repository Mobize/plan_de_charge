<?php

namespace App\Entity;

use App\Repository\VacationsRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: VacationsRepository::class)]
class Vacations
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE, nullable: true)]
    private ?\DateTimeInterface $vacationStartDate = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE, nullable: true)]
    private ?\DateTimeInterface $vacationReleaseDate = null;

    #[ORM\ManyToOne(inversedBy: 'vacations')]
    private ?Employee $employee = null;

    #[ORM\Column(nullable: true)]
    private ?\DateTimeImmutable $createdAt = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $vacationId = null;

    #[ORM\ManyToOne(inversedBy: 'vacations')]
    private ?VacationType $vacationType = null;

    #[ORM\Column(nullable: true)]
    private ?bool $isHalfDay = null;

    #[ORM\Column(nullable: true)]
    private ?bool $morning = null;

    #[ORM\Column(nullable: true)]
    private ?bool $afternoon = null;

    public function __construct()
    {
        $this->setCreatedAt(new \DateTimeImmutable());
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getVacationStartDate(): ?\DateTimeInterface
    {
        return $this->vacationStartDate;
    }

    public function setVacationStartDate(?\DateTimeInterface $vacationStartDate): static
    {
        $this->vacationStartDate = $vacationStartDate;

        return $this;
    }

    public function getVacationReleaseDate(): ?\DateTimeInterface
    {
        return $this->vacationReleaseDate;
    }

    public function setVacationReleaseDate(?\DateTimeInterface $vacationReleaseDate): static
    {
        $this->vacationReleaseDate = $vacationReleaseDate;

        return $this;
    }

    public function getEmployee(): ?Employee
    {
        return $this->employee;
    }

    public function setEmployee(?Employee $employee): static
    {
        $this->employee = $employee;

        return $this;
    }

    public function getCreatedAt(): ?\DateTimeImmutable
    {
        return $this->createdAt;
    }

    public function setCreatedAt(?\DateTimeImmutable $createdAt): static
    {
        $this->createdAt = $createdAt;

        return $this;
    }

    public function getVacationId(): ?string
    {
        return $this->vacationId;
    }

    public function setVacationId(?string $vacationId): static
    {
        $this->vacationId = $vacationId;

        return $this;
    }

    public function getVacationType(): ?VacationType
    {
        return $this->vacationType;
    }

    public function setVacationType(?VacationType $vacationType): static
    {
        $this->vacationType = $vacationType;

        return $this;
    }

    public function isIsHalfDay(): ?bool
    {
        return $this->isHalfDay;
    }

    public function setIsHalfDay(?bool $isHalfDay): static
    {
        $this->isHalfDay = $isHalfDay;

        return $this;
    }

    public function isMorning(): ?bool
    {
        return $this->morning;
    }

    public function setMorning(?bool $morning): static
    {
        $this->morning = $morning;

        return $this;
    }

    public function isAfternoon(): ?bool
    {
        return $this->afternoon;
    }

    public function setAfternoon(?bool $afternoon): static
    {
        $this->afternoon = $afternoon;

        return $this;
    }
}
