-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 01, 2025 at 12:22 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `blog-app`
--

-- --------------------------------------------------------

--
-- Table structure for table `posts`
--

CREATE TABLE `posts` (
  `id` int(11) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `content` text DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `authorId` int(11) DEFAULT NULL,
  `categories` varchar(255) DEFAULT NULL,
  `tags` varchar(255) DEFAULT NULL,
  `isDeleted` tinyint(1) DEFAULT 0,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `posts`
--

INSERT INTO `posts` (`id`, `title`, `content`, `image`, `authorId`, `categories`, `tags`, `isDeleted`, `createdAt`, `updatedAt`) VALUES
(2, 'maggi v3', '<h1>maggi recipe</h1><p>2 minutes, <strong>abc</strong></p>', '/uploads/6192b876f369c435d4be3fd51155e5a4', 1, 'food', 'maggi, instantfood', 1, '2025-12-01 08:31:46', '2025-12-01 10:11:14'),
(3, 'abc', '<p>hi xx</p>', '/uploads/83d73212c42eed4939cf283a1c0d7309', 1, '', '', 1, '2025-12-01 10:16:46', '2025-12-01 10:17:12'),
(6, 'abc', '<h1>hlo xx</h1>', '', 2, '', '', 0, '2025-12-01 10:28:13', '2025-12-01 10:28:13'),
(7, 'hello', '<p>uuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu</p>', '', 2, '', '', 0, '2025-12-01 10:35:14', '2025-12-01 10:35:14'),
(8, 'abcde', '<p>uuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu</p>', '', 2, '', '', 0, '2025-12-01 11:01:42', '2025-12-01 11:01:42'),
(9, 'abcde', '<h1>hello xxxxxxxxxxxxxxxxxxxxxxxxxxxxx</h1>', '', 2, '', '', 0, '2025-12-01 11:02:15', '2025-12-01 11:02:15'),
(10, 'acdwbfb', '<p>fjknfjkgnengkngnfngngng</p>', '', 2, '', '', 0, '2025-12-01 11:02:58', '2025-12-01 11:02:58');

-- --------------------------------------------------------

--
-- Table structure for table `postversions`
--

CREATE TABLE `postversions` (
  `id` int(11) NOT NULL,
  `postId` int(11) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `content` text DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `categories` varchar(255) DEFAULT NULL,
  `tags` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `postversions`
--

INSERT INTO `postversions` (`id`, `postId`, `title`, `content`, `image`, `categories`, `tags`, `createdAt`, `updatedAt`) VALUES
(1, 1, 'post 1', '<p>hi , <strong>how are you ? </strong><u>kem choo</u> <a href=\"google.com\" rel=\"noopener noreferrer\" target=\"_blank\">google.com</a></p>', '', 'tech', 'node,react', '2025-12-01 07:59:32', '2025-12-01 08:27:13'),
(2, 2, 'maggi', '<h1>maggi recipe</h1><p>2 minutes, <strong>abc</strong></p>', '/uploads/6192b876f369c435d4be3fd51155e5a4', 'food', 'maggi, instantfood', '2025-12-01 08:31:46', '2025-12-01 08:39:53'),
(3, 2, 'maggi v2', '<h1>maggi recipe</h1><p>2 minutes, <strong>abc</strong></p>', '/uploads/6192b876f369c435d4be3fd51155e5a4', 'food', 'maggi, instantfood', '2025-12-01 09:09:00', '2025-12-01 09:09:00');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `createdAt`, `updatedAt`) VALUES
(2, 'dev', 'dev@gmail.com', '$2b$12$dAz1GtVroR17QnEVS4xoVOpq7to8/cwEZVsd/zbHfn/eH52geeBaO', '2025-12-01 10:23:17', '2025-12-01 10:23:17'),
(3, 'Alice', 'alice@example.com', '$2b$12$RB9Lyk7kDh4u87omCR259uHUcpTShdiTkxJICEzUSgcoSR1KNL.pS', '2025-12-01 10:37:28', '2025-12-01 10:37:28'),
(4, 'himanshu', 'hngohel07@gmail.com', '$2b$12$qwwCU74SiBnXU2x.mTB5p.KM/InMHe.DgEqSPdqC8DogHYOxQE2NK', '2025-12-01 11:07:55', '2025-12-01 11:07:55');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `postversions`
--
ALTER TABLE `postversions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `posts`
--
ALTER TABLE `posts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `postversions`
--
ALTER TABLE `postversions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
