<?php

namespace App\Entity;

use App\Repository\EmployeeRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: EmployeeRepository::class)]
class Employee
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $fullName = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    private ?\DateTimeInterface $SocietyEntryDate = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE, nullable: true)]
    private ?\DateTimeInterface $societyReleaseDate = null;

    #[ORM\Column(nullable: true)]
    private ?int $registrationNumber = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $function = null;

    #[ORM\OneToMany(targetEntity: Vacations::class, mappedBy: 'employee')]
    private Collection $vacations;

    #[ORM\ManyToMany(targetEntity: Project::class, inversedBy: 'employees')]
    private Collection $projects;

    #[ORM\Column(nullable: true)]
    private ?bool $isCafIncluded = null;

    public function __construct()
    {
        $this->vacations = new ArrayCollection();
        $this->projects = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getFullName(): ?string
    {
        return $this->fullName;
    }

    public function setFullName(string $fullName): static
    {
        $this->fullName = $fullName;

        return $this;
    }

    public function getSocietyEntryDate(): ?\DateTimeInterface
    {
        return $this->SocietyEntryDate;
    }

    public function setSocietyEntryDate(\DateTimeInterface $SocietyEntryDate): static
    {
        $this->SocietyEntryDate = $SocietyEntryDate;

        return $this;
    }

    public function getSocietyReleaseDate(): ?\DateTimeInterface
    {
        return $this->societyReleaseDate;
    }

    public function setSocietyReleaseDate(?\DateTimeInterface $societyReleaseDate): static
    {
        $this->societyReleaseDate = $societyReleaseDate;

        return $this;
    }

    public function getRegistrationNumber(): ?int
    {
        return $this->registrationNumber;
    }

    public function setRegistrationNumber(?int $registrationNumber): static
    {
        $this->registrationNumber = $registrationNumber;

        return $this;
    }

    public function getFunction(): ?string
    {
        return $this->function;
    }

    public function setFunction(?string $function): static
    {
        $this->function = $function;

        return $this;
    }

    /**
     * @return Collection<int, Vacations>
     */
    public function getVacations(): Collection
    {
        return $this->vacations;
    }

    public function addVacation(Vacations $vacation): static
    {
        if (!$this->vacations->contains($vacation)) {
            $this->vacations->add($vacation);
            $vacation->setEmployee($this);
        }

        return $this;
    }

    public function removeVacation(Vacations $vacation): static
    {
        if ($this->vacations->removeElement($vacation)) {
            // set the owning side to null (unless already changed)
            if ($vacation->getEmployee() === $this) {
                $vacation->setEmployee(null);
            }
        }

        return $this;
    }

    public function __toString()
    {
        return $this->fullName;
    }

    /**
     * @return Collection<int, Project>
     */
    public function getProjects(): Collection
    {
        return $this->projects;
    }

    public function addProject(Project $project): static
    {
        if (!$this->projects->contains($project)) {
            $this->projects->add($project);
        }

        return $this;
    }

    public function removeProject(Project $project): static
    {
        $this->projects->removeElement($project);

        return $this;
    }

    public function isIsCafIncluded(): ?bool
    {
        return $this->isCafIncluded;
    }

    public function setIsCafIncluded(?bool $isCafIncluded): static
    {
        $this->isCafIncluded = $isCafIncluded;

        return $this;
    }


}
