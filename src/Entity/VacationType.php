<?php

namespace App\Entity;

use App\Repository\VacationTypeRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: VacationTypeRepository::class)]
class VacationType
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $name = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $color = null;

    #[ORM\OneToMany(targetEntity: Vacations::class, mappedBy: 'vacationType')]
    private Collection $vacations;

    public function __construct()
    {
        $this->vacations = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): static
    {
        $this->name = $name;

        return $this;
    }

    public function getColor(): ?string
    {
        return $this->color;
    }

    public function setColor(?string $color): static
    {
        $this->color = $color;

        return $this;
    }

    public function __toString()
    {
        return $this->name;
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
            $vacation->setVacationType($this);
        }

        return $this;
    }

    public function removeVacation(Vacations $vacation): static
    {
        if ($this->vacations->removeElement($vacation)) {
            // set the owning side to null (unless already changed)
            if ($vacation->getVacationType() === $this) {
                $vacation->setVacationType(null);
            }
        }

        return $this;
    }
}
