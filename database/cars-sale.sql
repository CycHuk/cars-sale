-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1:3306
-- Время создания: Май 17 2024 г., 09:48
-- Версия сервера: 10.6.9-MariaDB
-- Версия PHP: 7.2.34

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `cars-sale`
--

-- --------------------------------------------------------

--
-- Структура таблицы `Brand`
--

CREATE TABLE `Brand` (
  `id` int(11) NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `Brand`
--

INSERT INTO `Brand` (`id`, `name`) VALUES
(2, 'BMW'),
(4, 'Ford'),
(5, 'Honda'),
(3, 'Mercedes-Benz'),
(1, 'Toyota'),
(6, 'Другие');

-- --------------------------------------------------------

--
-- Структура таблицы `Car`
--

CREATE TABLE `Car` (
  `id` int(11) NOT NULL,
  `brandId` int(11) NOT NULL,
  `year` int(11) NOT NULL,
  `price` double NOT NULL,
  `description` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `userId` int(11) NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `Photo`
--

CREATE TABLE `Photo` (
  `id` int(11) NOT NULL,
  `carId` int(11) NOT NULL,
  `url` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `User`
--

CREATE TABLE `User` (
  `id` int(11) NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phoneNumber` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `_prisma_migrations`
--

CREATE TABLE `_prisma_migrations` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `checksum` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `logs` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `applied_steps_count` int(10) UNSIGNED NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `_prisma_migrations`
--

INSERT INTO `_prisma_migrations` (`id`, `checksum`, `finished_at`, `migration_name`, `logs`, `rolled_back_at`, `started_at`, `applied_steps_count`) VALUES
('2250895d-733a-4056-9bd3-a1acf805fef2', 'cc2d8ce360046808d3f228cb074a38f5c0ff6ef56a62c2e39603a54a0d43e1bb', '2024-05-16 08:02:36.845', '20240516080236_init', NULL, NULL, '2024-05-16 08:02:36.730', 1),
('5957b2a1-3023-4e11-b1a2-2921edf2374a', 'f26da2a2444ff1933c53618e940f80e10548554f1cbc5a9f5a5c664359de8c3b', '2024-05-16 10:03:53.654', '20240516100353_init', NULL, NULL, '2024-05-16 10:03:53.644', 1),
('653654c1-9cec-46bb-9f5c-7aa58fe45533', '5b327b9a3ae4ac76876cfde443f9fc68b09a6cee75f5e33427dc3688d0088c19', '2024-05-16 08:12:26.463', '20240516081226_init', NULL, NULL, '2024-05-16 08:12:26.425', 1),
('7378f51d-33ad-4ff4-b4dc-ac62546d64e7', 'f733a2ea70724df81b2846ec76097f08d967bb3a893ae29ef2eb41e17c536b59', '2024-05-16 07:53:08.104', '20240516075308_init', NULL, NULL, '2024-05-16 07:53:08.093', 1),
('7d170a0a-4e77-4ca8-bf11-b391e4a745b9', 'a8327977a307e052c6ed5298c94acac7243aca22cdfcdabd92a29c7cbca44da4', '2024-05-16 10:05:12.102', '20240516100512_init', NULL, NULL, '2024-05-16 10:05:12.085', 1),
('b1c89118-76ea-4fd9-9df5-9408e83f93c0', 'f635bb4a2a9f74c2daaeeecaf053a3f93f299e418db98d953476ce58f0a2722b', '2024-05-16 08:09:53.136', '20240516080953_init', NULL, NULL, '2024-05-16 08:09:53.059', 1),
('d72d50af-450b-4c36-9a9a-2bbee5008657', 'c1d1eef94ee92d8df621986797c5c4f933b08905d097e8e10e81774dc6cf47be', '2024-05-16 08:27:16.446', '20240516082716_init', NULL, NULL, '2024-05-16 08:27:16.421', 1);

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `Brand`
--
ALTER TABLE `Brand`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Brand_name_key` (`name`);

--
-- Индексы таблицы `Car`
--
ALTER TABLE `Car`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Car_brandId_fkey` (`brandId`),
  ADD KEY `Car_userId_fkey` (`userId`);

--
-- Индексы таблицы `Photo`
--
ALTER TABLE `Photo`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Photo_carId_fkey` (`carId`);

--
-- Индексы таблицы `User`
--
ALTER TABLE `User`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `User_phoneNumber_key` (`phoneNumber`);

--
-- Индексы таблицы `_prisma_migrations`
--
ALTER TABLE `_prisma_migrations`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `Brand`
--
ALTER TABLE `Brand`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT для таблицы `Car`
--
ALTER TABLE `Car`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=53;

--
-- AUTO_INCREMENT для таблицы `Photo`
--
ALTER TABLE `Photo`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;

--
-- AUTO_INCREMENT для таблицы `User`
--
ALTER TABLE `User`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы `Car`
--
ALTER TABLE `Car`
  ADD CONSTRAINT `Car_brandId_fkey` FOREIGN KEY (`brandId`) REFERENCES `Brand` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `Car_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User` (`id`) ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `Photo`
--
ALTER TABLE `Photo`
  ADD CONSTRAINT `Photo_carId_fkey` FOREIGN KEY (`carId`) REFERENCES `Car` (`id`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
