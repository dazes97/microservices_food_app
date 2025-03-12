CREATE TABLE `orders` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`recipe_name` VARCHAR(255) NULL DEFAULT NULL COLLATE 'utf8mb4_0900_ai_ci',
	`recipe_id` INT NULL DEFAULT NULL,
	`created_at` DATETIME NOT NULL DEFAULT (now()),
	`updated_at` DATETIME NULL DEFAULT NULL,
	`deleted_at` DATETIME NULL DEFAULT NULL,
	PRIMARY KEY (`id`) USING BTREE
)
COLLATE='utf8mb4_0900_ai_ci'
ENGINE=InnoDB
;

CREATE TABLE `order_history_status` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`status` ENUM('En preparacíon','En la cocina','Finalizado') NOT NULL COLLATE 'utf8mb4_0900_ai_ci',
	`order_id` INT NOT NULL,
	`created_at` DATETIME NOT NULL DEFAULT (now()),
	`updated_at` DATETIME NULL DEFAULT NULL,
	`deleted_at` DATETIME NULL DEFAULT NULL,
	PRIMARY KEY (`id`) USING BTREE
)
COLLATE='utf8mb4_0900_ai_ci'
ENGINE=InnoDB
;
