<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20250205142230 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE employee (id INT AUTO_INCREMENT NOT NULL, full_name VARCHAR(255) NOT NULL, society_entry_date DATETIME NOT NULL, society_release_date DATETIME DEFAULT NULL, registration_number INT DEFAULT NULL, function VARCHAR(255) DEFAULT NULL, is_caf_included TINYINT(1) DEFAULT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE employee_project (employee_id INT NOT NULL, project_id INT NOT NULL, INDEX IDX_AFFF86E18C03F15C (employee_id), INDEX IDX_AFFF86E1166D1F9C (project_id), PRIMARY KEY(employee_id, project_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE project (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(255) NOT NULL, company VARCHAR(255) DEFAULT NULL, cgi_project_id VARCHAR(255) DEFAULT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE vacation_type (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(255) NOT NULL, color VARCHAR(255) DEFAULT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE vacations (id INT AUTO_INCREMENT NOT NULL, employee_id INT DEFAULT NULL, vacation_type_id INT DEFAULT NULL, vacation_start_date DATETIME DEFAULT NULL, vacation_release_date DATETIME DEFAULT NULL, created_at DATETIME DEFAULT NULL COMMENT \'(DC2Type:datetime_immutable)\', vacation_id VARCHAR(255) DEFAULT NULL, is_half_day TINYINT(1) DEFAULT NULL, morning TINYINT(1) DEFAULT NULL, afternoon TINYINT(1) DEFAULT NULL, INDEX IDX_3B8290678C03F15C (employee_id), INDEX IDX_3B829067D4EE03F0 (vacation_type_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE messenger_messages (id BIGINT AUTO_INCREMENT NOT NULL, body LONGTEXT NOT NULL, headers LONGTEXT NOT NULL, queue_name VARCHAR(190) NOT NULL, created_at DATETIME NOT NULL, available_at DATETIME NOT NULL, delivered_at DATETIME DEFAULT NULL, INDEX IDX_75EA56E0FB7336F0 (queue_name), INDEX IDX_75EA56E0E3BD61CE (available_at), INDEX IDX_75EA56E016BA31DB (delivered_at), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE employee_project ADD CONSTRAINT FK_AFFF86E18C03F15C FOREIGN KEY (employee_id) REFERENCES employee (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE employee_project ADD CONSTRAINT FK_AFFF86E1166D1F9C FOREIGN KEY (project_id) REFERENCES project (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE vacations ADD CONSTRAINT FK_3B8290678C03F15C FOREIGN KEY (employee_id) REFERENCES employee (id)');
        $this->addSql('ALTER TABLE vacations ADD CONSTRAINT FK_3B829067D4EE03F0 FOREIGN KEY (vacation_type_id) REFERENCES vacation_type (id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE employee_project DROP FOREIGN KEY FK_AFFF86E18C03F15C');
        $this->addSql('ALTER TABLE employee_project DROP FOREIGN KEY FK_AFFF86E1166D1F9C');
        $this->addSql('ALTER TABLE vacations DROP FOREIGN KEY FK_3B8290678C03F15C');
        $this->addSql('ALTER TABLE vacations DROP FOREIGN KEY FK_3B829067D4EE03F0');
        $this->addSql('DROP TABLE employee');
        $this->addSql('DROP TABLE employee_project');
        $this->addSql('DROP TABLE project');
        $this->addSql('DROP TABLE vacation_type');
        $this->addSql('DROP TABLE vacations');
        $this->addSql('DROP TABLE messenger_messages');
    }
}
