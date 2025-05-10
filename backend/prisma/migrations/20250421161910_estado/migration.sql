-- AlterTable
ALTER TABLE `mascotas` ADD COLUMN `estado` ENUM('Adoptado', 'Disponible') NOT NULL DEFAULT 'Disponible';
