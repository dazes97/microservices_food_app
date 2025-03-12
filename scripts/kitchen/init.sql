CREATE TABLE `recipes` (
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

CREATE TABLE `recipe_ingredient` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`recipe_id` INT NOT NULL,
	`ingredient_id` INT NOT NULL DEFAULT '0',
	`quantity` INT NOT NULL,
	`created_at` DATETIME NOT NULL DEFAULT (now()),
	`updated_at` DATETIME NULL DEFAULT NULL,
	`deleted_at` DATETIME NULL DEFAULT NULL,
	PRIMARY KEY (`id`) USING BTREE,
	UNIQUE INDEX `Index 2` (`recipe_id`, `ingredient_id`) USING BTREE,
	CONSTRAINT `FK__recipes` FOREIGN KEY (`recipe_id`) REFERENCES `recipes` (`id`) ON UPDATE NO ACTION ON DELETE NO ACTION
)
COLLATE='utf8mb4_0900_ai_ci'
ENGINE=InnoDB
;


INSERT INTO `recipes` (`id`, `name`, `created_at`, `updated_at`, `deleted_at`) VALUES (1, 'Bandeja Paisa', '2025-03-08 23:51:45', NULL, NULL);
INSERT INTO `recipes` (`id`, `name`, `created_at`, `updated_at`, `deleted_at`) VALUES (2, 'Ajiaco Santafereño', '2025-03-08 23:52:03', NULL, NULL);
INSERT INTO `recipes` (`id`, `name`, `created_at`, `updated_at`, `deleted_at`) VALUES (3, 'Arroz con Pollo Colombiano', '2025-03-08 23:52:14', NULL, NULL);
INSERT INTO `recipes` (`id`, `name`, `created_at`, `updated_at`, `deleted_at`) VALUES (4, 'Arepa Rellena de Carne y Queso', '2025-03-08 23:52:29', NULL, NULL);
INSERT INTO `recipes` (`id`, `name`, `created_at`, `updated_at`, `deleted_at`) VALUES (5, 'Papas Criollas con Queso y Ketchup', '2025-03-08 23:52:45', NULL, NULL);
INSERT INTO `recipes` (`id`, `name`, `created_at`, `updated_at`, `deleted_at`) VALUES (6, 'Ensalada Fresca con Pollo y Queso', '2025-03-08 23:52:57', NULL, NULL);




INSERT INTO `recipe_ingredient` (`id`, `recipe_id`, `ingredient_id`, `quantity`, `created_at`, `updated_at`, `deleted_at`) VALUES (1, 1, 1, 2, '2025-03-09 00:02:52', NULL, NULL);
INSERT INTO `recipe_ingredient` (`id`, `recipe_id`, `ingredient_id`, `quantity`, `created_at`, `updated_at`, `deleted_at`) VALUES (2, 1, 2, 1, '2025-03-09 00:03:06', NULL, NULL);
INSERT INTO `recipe_ingredient` (`id`, `recipe_id`, `ingredient_id`, `quantity`, `created_at`, `updated_at`, `deleted_at`) VALUES (3, 1, 3, 1, '2025-03-09 00:03:24', NULL, NULL);
INSERT INTO `recipe_ingredient` (`id`, `recipe_id`, `ingredient_id`, `quantity`, `created_at`, `updated_at`, `deleted_at`) VALUES (4, 1, 4, 1, '2025-03-09 00:03:41', NULL, NULL);
INSERT INTO `recipe_ingredient` (`id`, `recipe_id`, `ingredient_id`, `quantity`, `created_at`, `updated_at`, `deleted_at`) VALUES (5, 1, 5, 1, '2025-03-09 00:03:55', NULL, NULL);
INSERT INTO `recipe_ingredient` (`id`, `recipe_id`, `ingredient_id`, `quantity`, `created_at`, `updated_at`, `deleted_at`) VALUES (6, 1, 6, 1, '2025-03-09 00:04:13', NULL, NULL);
INSERT INTO `recipe_ingredient` (`id`, `recipe_id`, `ingredient_id`, `quantity`, `created_at`, `updated_at`, `deleted_at`) VALUES (7, 1, 7, 1, '2025-03-09 00:04:56', NULL, NULL);
INSERT INTO `recipe_ingredient` (`id`, `recipe_id`, `ingredient_id`, `quantity`, `created_at`, `updated_at`, `deleted_at`) VALUES (8, 1, 8, 1, '2025-03-09 00:05:12', NULL, NULL);
INSERT INTO `recipe_ingredient` (`id`, `recipe_id`, `ingredient_id`, `quantity`, `created_at`, `updated_at`, `deleted_at`) VALUES (9, 1, 9, 1, '2025-03-09 00:05:51', NULL, NULL);
INSERT INTO `recipe_ingredient` (`id`, `recipe_id`, `ingredient_id`, `quantity`, `created_at`, `updated_at`, `deleted_at`) VALUES (10, 1, 10, 1, '2025-03-09 00:06:06', NULL, NULL);
INSERT INTO `recipe_ingredient` (`id`, `recipe_id`, `ingredient_id`, `quantity`, `created_at`, `updated_at`, `deleted_at`) VALUES (11, 2, 2, 3, '2025-03-09 00:06:41', NULL, NULL);
INSERT INTO `recipe_ingredient` (`id`, `recipe_id`, `ingredient_id`, `quantity`, `created_at`, `updated_at`, `deleted_at`) VALUES (12, 2, 9, 1, '2025-03-09 00:06:54', NULL, NULL);
INSERT INTO `recipe_ingredient` (`id`, `recipe_id`, `ingredient_id`, `quantity`, `created_at`, `updated_at`, `deleted_at`) VALUES (13, 2, 6, 1, '2025-03-09 00:07:05', NULL, NULL);
INSERT INTO `recipe_ingredient` (`id`, `recipe_id`, `ingredient_id`, `quantity`, `created_at`, `updated_at`, `deleted_at`) VALUES (14, 2, 7, 1, '2025-03-09 00:07:31', NULL, NULL);
INSERT INTO `recipe_ingredient` (`id`, `recipe_id`, `ingredient_id`, `quantity`, `created_at`, `updated_at`, `deleted_at`) VALUES (15, 2, 10, 1, '2025-03-09 00:07:39', NULL, NULL);
INSERT INTO `recipe_ingredient` (`id`, `recipe_id`, `ingredient_id`, `quantity`, `created_at`, `updated_at`, `deleted_at`) VALUES (16, 3, 3, 1, '2025-03-09 00:08:17', NULL, NULL);
INSERT INTO `recipe_ingredient` (`id`, `recipe_id`, `ingredient_id`, `quantity`, `created_at`, `updated_at`, `deleted_at`) VALUES (17, 3, 9, 1, '2025-03-09 00:08:33', NULL, NULL);
INSERT INTO `recipe_ingredient` (`id`, `recipe_id`, `ingredient_id`, `quantity`, `created_at`, `updated_at`, `deleted_at`) VALUES (18, 3, 6, 1, '2025-03-09 00:09:09', NULL, NULL);
INSERT INTO `recipe_ingredient` (`id`, `recipe_id`, `ingredient_id`, `quantity`, `created_at`, `updated_at`, `deleted_at`) VALUES (19, 3, 10, 2, '2025-03-09 00:09:19', NULL, NULL);
INSERT INTO `recipe_ingredient` (`id`, `recipe_id`, `ingredient_id`, `quantity`, `created_at`, `updated_at`, `deleted_at`) VALUES (20, 3, 1, 1, '2025-03-09 00:09:48', NULL, NULL);
INSERT INTO `recipe_ingredient` (`id`, `recipe_id`, `ingredient_id`, `quantity`, `created_at`, `updated_at`, `deleted_at`) VALUES (21, 4, 7, 1, '2025-03-09 00:10:27', NULL, NULL);
INSERT INTO `recipe_ingredient` (`id`, `recipe_id`, `ingredient_id`, `quantity`, `created_at`, `updated_at`, `deleted_at`) VALUES (22, 4, 8, 1, '2025-03-09 00:11:35', NULL, NULL);
INSERT INTO `recipe_ingredient` (`id`, `recipe_id`, `ingredient_id`, `quantity`, `created_at`, `updated_at`, `deleted_at`) VALUES (23, 4, 6, 1, '2025-03-09 00:11:47', NULL, NULL);
INSERT INTO `recipe_ingredient` (`id`, `recipe_id`, `ingredient_id`, `quantity`, `created_at`, `updated_at`, `deleted_at`) VALUES (24, 4, 4, 1, '2025-03-09 00:12:00', NULL, NULL);
INSERT INTO `recipe_ingredient` (`id`, `recipe_id`, `ingredient_id`, `quantity`, `created_at`, `updated_at`, `deleted_at`) VALUES (25, 5, 2, 2, '2025-03-09 00:12:50', NULL, NULL);
INSERT INTO `recipe_ingredient` (`id`, `recipe_id`, `ingredient_id`, `quantity`, `created_at`, `updated_at`, `deleted_at`) VALUES (26, 5, 7, 1, '2025-03-09 00:13:09', NULL, NULL);
INSERT INTO `recipe_ingredient` (`id`, `recipe_id`, `ingredient_id`, `quantity`, `created_at`, `updated_at`, `deleted_at`) VALUES (27, 5, 4, 1, '2025-03-09 00:14:32', NULL, NULL);
INSERT INTO `recipe_ingredient` (`id`, `recipe_id`, `ingredient_id`, `quantity`, `created_at`, `updated_at`, `deleted_at`) VALUES (28, 5, 6, 1, '2025-03-09 00:14:53', NULL, NULL);
INSERT INTO `recipe_ingredient` (`id`, `recipe_id`, `ingredient_id`, `quantity`, `created_at`, `updated_at`, `deleted_at`) VALUES (29, 6, 5, 1, '2025-03-09 00:15:16', NULL, NULL);
INSERT INTO `recipe_ingredient` (`id`, `recipe_id`, `ingredient_id`, `quantity`, `created_at`, `updated_at`, `deleted_at`) VALUES (30, 6, 9, 1, '2025-03-09 00:15:28', NULL, NULL);
INSERT INTO `recipe_ingredient` (`id`, `recipe_id`, `ingredient_id`, `quantity`, `created_at`, `updated_at`, `deleted_at`) VALUES (31, 6, 7, 1, '2025-03-09 00:15:39', NULL, NULL);
INSERT INTO `recipe_ingredient` (`id`, `recipe_id`, `ingredient_id`, `quantity`, `created_at`, `updated_at`, `deleted_at`) VALUES (32, 6, 1, 1, '2025-03-09 00:15:59', NULL, NULL);
INSERT INTO `recipe_ingredient` (`id`, `recipe_id`, `ingredient_id`, `quantity`, `created_at`, `updated_at`, `deleted_at`) VALUES (33, 6, 10, 1, '2025-03-09 00:16:10', NULL, NULL);




