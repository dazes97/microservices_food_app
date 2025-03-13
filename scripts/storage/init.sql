CREATE TABLE `ingredients` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`name` VARCHAR(255) NOT NULL COLLATE 'utf8mb4_0900_ai_ci',
	`created_at` DATETIME NOT NULL DEFAULT (now()),
	`updated_at` DATETIME NULL DEFAULT NULL,
	`deleted_at` DATETIME NULL DEFAULT NULL,
	PRIMARY KEY (`id`) USING BTREE
)
COLLATE='utf8mb4_0900_ai_ci'
ENGINE=InnoDB
;

CREATE TABLE `stock` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`ingredient_id` INT NOT NULL,
	`quantity` INT NOT NULL,
	`created_at` DATETIME NOT NULL DEFAULT (now()),
	`updated_at` DATETIME NULL DEFAULT NULL,
	`deleted_at` DATETIME NULL DEFAULT NULL,
	PRIMARY KEY (`id`) USING BTREE,
	INDEX `FK_stock_ingredients` (`ingredient_id`) USING BTREE,
	CONSTRAINT `FK_stock_ingredients` FOREIGN KEY (`ingredient_id`) REFERENCES `ingredients` (`id`) ON UPDATE NO ACTION ON DELETE NO ACTION
)
COLLATE='utf8mb4_0900_ai_ci'
ENGINE=InnoDB
;

CREATE TABLE `plaza` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`order_id` INT NOT NULL,
	`quantity` INT NOT NULL,
	`ingredient_id` INT NOT NULL,
	`created_at` DATETIME NOT NULL DEFAULT (now()),
	`updated_at` DATETIME NULL DEFAULT NULL,
	`deleted_at` DATETIME NULL DEFAULT NULL,
	PRIMARY KEY (`id`) USING BTREE,
	INDEX `FK_plaza_ingredients` (`ingredient_id`) USING BTREE,
	CONSTRAINT `FK_plaza_ingredients` FOREIGN KEY (`ingredient_id`) REFERENCES `ingredients` (`id`) ON UPDATE NO ACTION ON DELETE NO ACTION
)
COLLATE='utf8mb4_0900_ai_ci'
ENGINE=InnoDB
;


INSERT INTO `ingredients` (`id`, `name`, `created_at`, `updated_at`, `deleted_at`) VALUES (1, 'lemon', '2025-03-12 13:00:07', NULL, NULL);
INSERT INTO `ingredients` (`id`, `name`, `created_at`, `updated_at`, `deleted_at`) VALUES (2, 'potato', '2025-03-12 13:00:12', NULL, NULL);
INSERT INTO `ingredients` (`id`, `name`, `created_at`, `updated_at`, `deleted_at`) VALUES (3, 'rice', '2025-03-12 13:00:17', NULL, NULL);
INSERT INTO `ingredients` (`id`, `name`, `created_at`, `updated_at`, `deleted_at`) VALUES (4, 'ketchup', '2025-03-12 13:00:24', NULL, NULL);
INSERT INTO `ingredients` (`id`, `name`, `created_at`, `updated_at`, `deleted_at`) VALUES (5, 'lettuce', '2025-03-12 13:00:32', NULL, NULL);
INSERT INTO `ingredients` (`id`, `name`, `created_at`, `updated_at`, `deleted_at`) VALUES (6, 'onion', '2025-03-12 13:00:42', NULL, NULL);
INSERT INTO `ingredients` (`id`, `name`, `created_at`, `updated_at`, `deleted_at`) VALUES (7, 'cheese', '2025-03-12 13:00:47', NULL, NULL);
INSERT INTO `ingredients` (`id`, `name`, `created_at`, `updated_at`, `deleted_at`) VALUES (8, 'meat', '2025-03-12 13:00:53', NULL, NULL);
INSERT INTO `ingredients` (`id`, `name`, `created_at`, `updated_at`, `deleted_at`) VALUES (9, 'chicken', '2025-03-12 13:01:01', NULL, NULL);
INSERT INTO `ingredients` (`id`, `name`, `created_at`, `updated_at`, `deleted_at`) VALUES (10, 'tomato', '2025-03-12 13:01:19', NULL, NULL);



INSERT INTO `stock` (`id`, `ingredient_id`, `quantity`, `created_at`, `updated_at`, `deleted_at`) VALUES (1, 1, 5, '2025-03-12 13:01:32', NULL, NULL);
INSERT INTO `stock` (`id`, `ingredient_id`, `quantity`, `created_at`, `updated_at`, `deleted_at`) VALUES (2, 2, 5, '2025-03-12 13:01:40', NULL, NULL);
INSERT INTO `stock` (`id`, `ingredient_id`, `quantity`, `created_at`, `updated_at`, `deleted_at`) VALUES (3, 3, 5, '2025-03-12 13:01:40', NULL, NULL);
INSERT INTO `stock` (`id`, `ingredient_id`, `quantity`, `created_at`, `updated_at`, `deleted_at`) VALUES (4, 4, 5, '2025-03-12 13:01:40', NULL, NULL);
INSERT INTO `stock` (`id`, `ingredient_id`, `quantity`, `created_at`, `updated_at`, `deleted_at`) VALUES (5, 5, 5, '2025-03-12 13:01:40', NULL, NULL);
INSERT INTO `stock` (`id`, `ingredient_id`, `quantity`, `created_at`, `updated_at`, `deleted_at`) VALUES (6, 6, 5, '2025-03-12 13:01:40', NULL, NULL);
INSERT INTO `stock` (`id`, `ingredient_id`, `quantity`, `created_at`, `updated_at`, `deleted_at`) VALUES (7, 7, 5, '2025-03-12 13:01:40', NULL, NULL);
INSERT INTO `stock` (`id`, `ingredient_id`, `quantity`, `created_at`, `updated_at`, `deleted_at`) VALUES (8, 8, 5, '2025-03-12 13:02:28', NULL, NULL);
INSERT INTO `stock` (`id`, `ingredient_id`, `quantity`, `created_at`, `updated_at`, `deleted_at`) VALUES (9, 9, 5, '2025-03-12 13:02:36', NULL, NULL);
INSERT INTO `stock` (`id`, `ingredient_id`, `quantity`, `created_at`, `updated_at`, `deleted_at`) VALUES (10, 10, 5, '2025-03-12 13:02:42', NULL, NULL);





