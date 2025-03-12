<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240418093742 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE vacations DROP INDEX UNIQ_3B829067D4EE03F0, ADD INDEX IDX_3B829067D4EE03F0 (vacation_type_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE vacations DROP INDEX IDX_3B829067D4EE03F0, ADD UNIQUE INDEX UNIQ_3B829067D4EE03F0 (vacation_type_id)');
    }
}
