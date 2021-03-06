-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Feb 21, 2021 at 05:58 AM
-- Server version: 10.5.8-MariaDB
-- PHP Version: 8.0.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `obroline`
--

-- --------------------------------------------------------

--
-- Table structure for table `chat`
--

CREATE TABLE `chat` (
  `id` int(10) NOT NULL,
  `senderId` int(10) NOT NULL,
  `targetId` int(10) NOT NULL,
  `message` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT NULL,
  `isActive` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `chat`
--

INSERT INTO `chat` (`id`, `senderId`, `targetId`, `message`, `created_at`, `updated_at`, `isActive`) VALUES
(1, 0, 8, 'Pagi aang', '2021-02-21 08:41:35', NULL, 1),
(2, 8, 0, 'yo wasap', '2021-02-21 08:42:12', NULL, 1),
(3, 0, 9, 'uy katarah', '2021-02-21 08:44:20', NULL, 1),
(4, 0, 10, 'test', '2021-02-21 08:56:06', NULL, 1),
(5, 0, 9, 'katarahu', '2021-02-21 09:25:13', NULL, 1),
(6, 11, 0, 'ping', '2021-02-21 09:26:05', NULL, 1),
(7, 0, 1, 'Pesan nasgor bang', '2021-02-21 11:15:25', NULL, 1),
(8, 0, 1, 'ping', '2021-02-21 11:17:14', NULL, 1),
(9, 0, 1, 'ping', '2021-02-21 11:52:08', NULL, 1),
(10, 0, 1, 'ping lagi siang-siang', '2021-02-21 11:53:42', NULL, 1),
(11, 0, 1, 'p', '2021-02-21 12:06:29', NULL, 1),
(12, 1, 0, 'Ndak bisa basa inggres', '2021-02-21 12:20:08', NULL, 1),
(13, 0, 4, 'ping ping ping ping', '2021-02-21 12:41:03', NULL, 1),
(14, 1, 0, 'cek notif 20', '2021-02-21 12:41:56', NULL, 1),
(15, 0, 1, 'masuk gan', '2021-02-21 12:42:10', NULL, 1);

-- --------------------------------------------------------

--
-- Table structure for table `friendship`
--

CREATE TABLE `friendship` (
  `id` int(10) NOT NULL,
  `userId` int(10) NOT NULL,
  `targetId` int(10) NOT NULL,
  `status` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `friendship`
--

INSERT INTO `friendship` (`id`, `userId`, `targetId`, `status`, `created_at`, `updated_at`) VALUES
(57, 0, 8, 'friends', '2021-02-21 01:56:42', NULL),
(58, 8, 0, 'friends', '2021-02-21 01:56:42', NULL),
(59, 0, 9, 'friends', '2021-02-21 01:56:50', NULL),
(60, 9, 0, 'friends', '2021-02-21 01:56:50', NULL),
(61, 0, 10, 'friends', '2021-02-21 01:57:15', NULL),
(62, 10, 0, 'friends', '2021-02-21 01:57:15', NULL),
(63, 0, 11, 'friends', '2021-02-21 01:59:36', NULL),
(64, 11, 0, 'friends', '2021-02-21 01:59:36', NULL),
(67, 0, 1, 'friends', '2021-02-21 11:15:19', NULL),
(68, 1, 0, 'friends', '2021-02-21 11:15:19', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(10) NOT NULL,
  `roomId` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `username` varchar(25) COLLATE utf8mb4_unicode_ci NOT NULL,
  `handphone` varchar(25) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '+62-',
  `email` varchar(25) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '-',
  `image` varchar(25) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'default.png',
  `bio` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `location` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT '0,0',
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT NULL,
  `isActive` tinyint(1) NOT NULL DEFAULT 1,
  `socketId` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `isOnline` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `roomId`, `name`, `username`, `handphone`, `email`, `image`, `bio`, `location`, `password`, `created_at`, `updated_at`, `isActive`, `socketId`, `isOnline`) VALUES
(0, 'OL-Alif26', 'Alif Maulana A', 'alifma', '+62895610787856', 'alifmaulana26@gmail.com', '1613606677142.png', 'Yang Develop Web Ini', '-6.311671480339227, 106.1094810620102', '$2b$10$JM2vYOa82NxpAyGhGniqvOFAUhyXfRb4n3DQGmJJTE/lBHJrb2cnO', '2021-02-16 17:50:45', NULL, 1, NULL, 1),
(1, 'TELLME-0001', 'Na Siyang D\'Goreng', 'NasiGoreng', '+628956', 'nasigoreng@gmail.com', '1613631927958.png', '#86SiapGanti', '-7.518966716611346, 110.78680855642405', '$2b$10$JM2vYOa82NxpAyGhGniqvOFAUhyXfRb4n3DQGmJJTE/lBHJrb2cnO', '2021-02-16 17:50:45', NULL, 1, 'yEjqWVZmQXh52Wo0AAAB', 1),
(2, 'TELLME-0002', 'Sample User 2', 'sample002', '+62-', 'sample002@gmail.com', 'default.png', '-', '0,0', '$2b$10$JM2vYOa82NxpAyGhGniqvOFAUhyXfRb4n3DQGmJJTE/lBHJrb2cnO', '2021-02-16 17:50:45', NULL, 1, NULL, 1),
(4, 'OL-Alif 43', 'Alif MaDev', 'alifma@alifmadev.com', '+62-', 'alifma@alifmadev.com', 'default.png', '-', '0,0', '$2b$10$CBGzF39UHPuaYuLHFe8pyO7WS5tCQ.ucQlfC4GvtvUsv9/VImov7i', '2021-02-16 20:03:10', NULL, 1, NULL, 1),
(5, 'OL-Alif 18', 'Alifm (Clone 1)', 'admin@alifma.com', '+62-', 'admin@alifma.com', 'default.png', '-', '0,0', '$2b$10$JM2vYOa82NxpAyGhGniqvOFAUhyXfRb4n3DQGmJJTE/lBHJrb2cnO', '2021-02-17 06:24:36', NULL, 1, NULL, 1),
(6, 'OL-Alif 54', 'Alifma (Clone 2)', 'user1@alifma.com', '+62-', 'user1@alifma.com', 'default.png', '-', '0,0', '$2b$10$Ls9kPQ3uk2gaxACLchZz/uCjIPa3FwATmuSUCT2kB7U2ecmmjjdwy', '2021-02-17 06:51:00', NULL, 1, NULL, 1),
(7, 'OL-User 19', 'User Baru', 'userbaru01@gmail.com', '+62-', 'userbaru01@gmail.com', 'default.png', '-', '0,0', '$2b$10$TPuoHnVdQDsO2H0uoWWQLOdVWzRx0OvKAxIMoM2rXQedDxRsOAmF6', '2021-02-19 06:52:55', NULL, 1, NULL, 1),
(8, 'OL-Avata32', 'Avatar Aang', 'TheLastAirBender', '+62-', 'aang@gmail.com', '1613847295207.png', '-', '0,0', '$2b$10$dchqqPCbzYCre2VV.oRIoud8v3Ktx8ICRtmTJ3xrlr0YyZUcp7tRq', '2021-02-21 01:49:09', NULL, 1, NULL, 1),
(9, 'OL-Katar76', 'Katara', 'Katara12', '+62-', 'katara@gmail.com', '1613847127107.jpg', 'Your Water Healer', '0,0', '$2b$10$HTLud.BiCQ/Rq.mKxkNg6edHBv9fLXKBu7axqcarOgd.sDcPVcbxe', '2021-02-21 01:51:39', NULL, 1, NULL, 1),
(10, 'OL-Toph 13', 'Toph Beifong', 'TophBeifong', '+62-', 'toph@gmail.com', '1613847204301.jpg', '-', '0,0', '$2b$10$gm/4kHTEJDYlX4x8WnB7meu0Q8LlKkXoj3YR1U/a9uW0OsgEt.rlC', '2021-02-21 01:52:51', NULL, 1, NULL, 1),
(11, 'OL-Sokka68', 'Sokka', 'SokkaTheBoomerang', '+62-', 'sokka@gmail.com', '1613847538170.jpeg', '-', '0,0', '$2b$10$5zeqeZT274upcXe9MCZbguPV2purKYR.WQjNhnBEVcnyf/GD36jJi', '2021-02-21 01:58:14', NULL, 1, NULL, 1),
(12, 'OL-alifm66', 'alifma', 'alifmaulana28@gmail.com', '+62-', 'alifmaulana28@gmail.com', 'default.png', '-', '0,0', '$2b$10$mGrVbMVTykaXp7PDGAFMouCJnviDy4ivoOW2VCeharrC1FZyOBr4O', '2021-02-21 12:26:56', NULL, 1, NULL, 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `chat`
--
ALTER TABLE `chat`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `friendship`
--
ALTER TABLE `friendship`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `chat`
--
ALTER TABLE `chat`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `friendship`
--
ALTER TABLE `friendship`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=71;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
