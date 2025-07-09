-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 08, 2025 at 01:47 PM
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
-- Database: `maharth`
--

-- --------------------------------------------------------

--
-- Table structure for table `tbl_follow_up_date_time`
--

CREATE TABLE `tbl_follow_up_date_time` (
  `id` int(11) NOT NULL,
  `lead_id` int(11) DEFAULT NULL,
  `follow_up_date` date DEFAULT NULL,
  `follow_up_time` varchar(100) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_follow_up_date_time`
--

INSERT INTO `tbl_follow_up_date_time` (`id`, `lead_id`, `follow_up_date`, `follow_up_time`, `created_at`) VALUES
(8, 132, NULL, '', '2025-07-08 16:29:39'),
(9, 133, NULL, '', '2025-07-08 16:29:39'),
(10, 134, NULL, '', '2025-07-08 16:29:39'),
(11, 135, NULL, '', '2025-07-08 16:31:49'),
(12, 136, NULL, '', '2025-07-08 16:31:49'),
(13, 137, NULL, '', '2025-07-08 16:31:49'),
(14, 137, '2025-07-09', '16:00-17:00', '2025-07-08 16:33:02'),
(15, 136, '2025-07-09', '12:00-13:00', '2025-07-08 16:33:38'),
(16, 135, '2025-07-08', '12:00-13:00', '2025-07-08 16:34:47'),
(17, 135, '2025-07-08', '16:00-17:00', '2025-07-08 16:35:16'),
(18, 135, '2025-07-08', '09:00-10:00', '2025-07-08 16:35:53'),
(19, 134, '2025-07-08', '18:00-19:00', '2025-07-08 16:37:01'),
(20, 134, '2025-07-08', '18:00-19:00', '2025-07-08 16:37:34'),
(21, 135, '2025-07-08', '09:00-10:00', '2025-07-08 16:38:09'),
(22, 135, '2025-07-08', '13:00-14:00', '2025-07-08 16:38:29'),
(23, 135, '2025-07-08', '15:00-16:00', '2025-07-08 16:39:02'),
(24, 135, '2025-07-08', '15:00-16:00', '2025-07-08 16:39:29'),
(25, 133, '2025-07-07', '14:00-15:00', '2025-07-08 16:45:56'),
(26, 132, '2025-07-08', '19:00-20:00', '2025-07-08 16:46:32'),
(27, 54, '2025-07-09', '19:00-20:00', '2025-07-08 16:53:08'),
(28, 2, '2025-07-08', '18:00-19:00', '2025-07-08 16:53:38'),
(29, 2, '2025-07-08', '10:00-11:00', '2025-07-08 16:54:14'),
(30, 2, '2025-07-09', '18:00-19:00', '2025-07-08 16:55:09');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_lead`
--

CREATE TABLE `tbl_lead` (
  `id` int(11) NOT NULL,
  `telecaller_id` int(11) DEFAULT NULL,
  `calling_date_time` datetime DEFAULT NULL,
  `fname` varchar(255) DEFAULT NULL,
  `lname` varchar(255) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `mobile` varchar(20) DEFAULT NULL,
  `customer_type` varchar(100) DEFAULT NULL,
  `customer_status` int(11) DEFAULT NULL COMMENT '1=Interested,2= Not Interested,3=DND,4=Escalate',
  `loan_type` varchar(255) DEFAULT NULL,
  `remarks` text DEFAULT NULL,
  `business_name` varchar(255) DEFAULT NULL,
  `designation` varchar(255) DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `pincode` int(11) DEFAULT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_lead`
--

INSERT INTO `tbl_lead` (`id`, `telecaller_id`, `calling_date_time`, `fname`, `lname`, `email`, `mobile`, `customer_type`, `customer_status`, `loan_type`, `remarks`, `business_name`, `designation`, `location`, `pincode`, `updated_by`, `created_at`, `updated_at`) VALUES
(2, 3, '2025-07-08 11:25:09', 'Aarush', 'Rau', 'aaryahigokhale@yahoo.com', '1375191758', 'Self Employed', 1, 'Business', 'Sit deserunt maxime nesciunt.', 'Ravi LLC', 'Consultant', 'Kharagpur', 721301, 1, '2025-07-03 15:46:18', '2025-07-08 16:55:09'),
(54, 2, '2025-07-08 11:23:08', 'Aarush', 'Rau', 'aaryahigokhale@yahoo.com', '1375191758', 'Self Employed', 1, 'Business', NULL, 'Ravi LLC', 'Consultant', 'Kharagpur', 721301, 1, '2025-07-03 18:42:54', '2025-07-08 16:53:08'),
(132, 3, '2025-07-08 11:16:31', 'Surajit', 'Bera', 'surajit@gmail.com', '9933954434', 'Salaried', 4, '', NULL, '', 'Supervisor', 'Mumbai', 713103, 1, '2025-07-08 16:29:39', '2025-07-08 16:46:31'),
(133, 3, '2025-07-08 11:15:55', 'Sanjay', 'sen', 'sanjay@gmail.com', '9933954454', 'Business', 4, 'Personal', NULL, 'self', 'Supervisor', 'Mumbai', 700091, 1, '2025-07-08 16:29:39', '2025-07-08 16:45:55'),
(134, 3, '2025-07-08 11:07:34', 'Amit', 'Pal', 'amitpal@gmail.com', '7001095250', 'Self Employed', 4, 'Personal', NULL, '', 'Supervisor', 'Kharagpur', 700091, 1, '2025-07-08 16:29:39', '2025-07-08 16:37:34'),
(135, 3, '2025-07-08 11:09:29', 'Surajit', 'Bera', 'surajit@gmail.com', '9933954434', 'Business', 4, 'Personal', NULL, 'self', 'Supervisor', 'Mumbai', 713103, 1, '2025-07-08 16:31:49', '2025-07-08 16:39:29'),
(136, 3, '2025-07-08 11:03:38', 'Sanjay', 'sen', 'sanjay@gmail.com', '9933954454', 'Salaried', 4, 'Personal', NULL, '', 'IT', 'Mumbai', 700091, 1, '2025-07-08 16:31:49', '2025-07-08 16:33:38'),
(137, 3, '2025-07-08 11:03:02', 'Amit', 'Pal', 'amitpal@gmail.com', '7001095250', 'Self Employed', 4, 'Personal', NULL, '', 'Supervisor', 'Mumbai', 700091, 1, '2025-07-08 16:31:49', '2025-07-08 16:33:02');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_lead_remarks`
--

CREATE TABLE `tbl_lead_remarks` (
  `id` int(11) NOT NULL,
  `lead_id` int(11) DEFAULT NULL,
  `remarks` text DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_lead_remarks`
--

INSERT INTO `tbl_lead_remarks` (`id`, `lead_id`, `remarks`, `created_at`) VALUES
(1, 132, NULL, '2025-07-08 16:29:39'),
(2, 133, NULL, '2025-07-08 16:29:39'),
(3, 134, NULL, '2025-07-08 16:29:39'),
(4, 135, NULL, '2025-07-08 16:31:49'),
(5, 136, NULL, '2025-07-08 16:31:49'),
(6, 137, NULL, '2025-07-08 16:31:49'),
(7, 137, 'hello dear hi', '2025-07-08 16:33:02'),
(8, 136, 'hey hello are you fine??', '2025-07-08 16:33:38'),
(9, 135, 'hey do you all have the business plan', '2025-07-08 16:34:47'),
(10, 135, 'Are you fine??', '2025-07-08 16:35:16'),
(11, 135, 'set as database', '2025-07-08 16:35:53'),
(12, 134, 'Hey are you working fine??', '2025-07-08 16:37:01'),
(13, 134, 'myself amint', '2025-07-08 16:37:34'),
(14, 135, 'yes all the best', '2025-07-08 16:38:09'),
(15, 135, 'myself amit das', '2025-07-08 16:38:29'),
(16, 135, 'Ajay Dasgupta', '2025-07-08 16:39:02'),
(17, 135, 'Are you working fine or not??', '2025-07-08 16:39:29'),
(18, 133, 'hey hello myself amit ojha', '2025-07-08 16:45:56'),
(19, 132, 'hey dear', '2025-07-08 16:46:32'),
(20, 54, 'hey hello are you working fine with me', '2025-07-08 16:53:08'),
(21, 2, 'Hey are you there, and myself is very fine', '2025-07-08 16:53:38'),
(22, 2, 'hey are you fine for me and for all like', '2025-07-08 16:54:14'),
(23, 2, 'hey fine from my side or not', '2025-07-08 16:55:09');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_recording`
--

CREATE TABLE `tbl_recording` (
  `id` int(11) NOT NULL,
  `lead_id` int(11) DEFAULT NULL,
  `recording_file` varchar(255) DEFAULT NULL,
  `duration` varchar(100) DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_recording`
--

INSERT INTO `tbl_recording` (`id`, `lead_id`, `recording_file`, `duration`, `created_at`) VALUES
(1, 137, '1751972582112.mp3', NULL, '2025-07-08 16:33:02'),
(2, 136, '1751972618374.xlsx', NULL, '2025-07-08 16:33:38'),
(3, 135, '1751972687662.mp3', NULL, '2025-07-08 16:34:47'),
(4, 135, '1751972716495.mp3', NULL, '2025-07-08 16:35:16'),
(5, 135, '1751972752863.mp3', NULL, '2025-07-08 16:35:52'),
(6, 134, '1751972821109.mp3', NULL, '2025-07-08 16:37:01'),
(7, 134, '1751972854623.mp3', NULL, '2025-07-08 16:37:34'),
(8, 135, '1751972889285.mp3', NULL, '2025-07-08 16:38:09'),
(9, 135, '1751972909773.mp3', NULL, '2025-07-08 16:38:29'),
(10, 135, '1751972942157.mp3', NULL, '2025-07-08 16:39:02'),
(11, 135, '1751972969080.mp3', NULL, '2025-07-08 16:39:29'),
(12, 133, '1751973355961.mp3', NULL, '2025-07-08 16:45:56'),
(13, 133, NULL, '00:00:41', '2025-07-08 16:45:56'),
(14, 132, '1751973391958.mp3', NULL, '2025-07-08 16:46:32'),
(15, 132, NULL, '00:00:19', '2025-07-08 16:46:32'),
(16, 54, '1751973788727.mp3', NULL, '2025-07-08 16:53:08'),
(17, 54, NULL, '00:00:23', '2025-07-08 16:53:08'),
(18, 2, '1751973817791.mp3', NULL, '2025-07-08 16:53:37'),
(19, 2, NULL, '00:00:25', '2025-07-08 16:53:37'),
(20, 2, '1751973854511.mp3', NULL, '2025-07-08 16:54:14'),
(21, 2, NULL, '00:00:33', '2025-07-08 16:54:14'),
(22, 2, '1751973909541.mp3', NULL, '2025-07-08 16:55:09'),
(23, 2, NULL, '00:00:37', '2025-07-08 16:55:09');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_telecaller`
--

CREATE TABLE `tbl_telecaller` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `username` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(50) NOT NULL,
  `role` varchar(50) DEFAULT NULL,
  `status` int(11) NOT NULL DEFAULT 1 COMMENT '0=Inactive, 1=active',
  `created_on` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_telecaller`
--

INSERT INTO `tbl_telecaller` (`id`, `name`, `username`, `password`, `email`, `role`, `status`, `created_on`) VALUES
(1, 'Super Admin', 'admin', '$2b$10$zSqw830c0KWcifJid0azvO.FTQ/T2izdI218BKuzkoxQzfhqRYary', 'tdutta@gmail.com', 'Admin', 1, '2025-07-03 11:31:33'),
(2, 'Sourav Karmakar', 'sk2020', '$2b$10$rVx0FdQYrO07kEj4IUFXmujG49PUi0A7Lu9gg6aCWyQSmrWKhureS', 'sk2020@gmail.com', 'Telecaller', 1, '2025-06-28 12:56:32'),
(3, 'Sourav Das', 'sdas', '$2b$10$D9RzldJI54Qws2AAO23Fo.bXuVQHREQ94E8DMAXCvQMn6kee5OAOm', 'sk2020@gmail.com', 'Telecaller', 1, '2025-06-28 16:28:40');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tbl_follow_up_date_time`
--
ALTER TABLE `tbl_follow_up_date_time`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_lead`
--
ALTER TABLE `tbl_lead`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_lead_remarks`
--
ALTER TABLE `tbl_lead_remarks`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_recording`
--
ALTER TABLE `tbl_recording`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_telecaller`
--
ALTER TABLE `tbl_telecaller`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tbl_follow_up_date_time`
--
ALTER TABLE `tbl_follow_up_date_time`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `tbl_lead`
--
ALTER TABLE `tbl_lead`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=138;

--
-- AUTO_INCREMENT for table `tbl_lead_remarks`
--
ALTER TABLE `tbl_lead_remarks`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `tbl_recording`
--
ALTER TABLE `tbl_recording`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `tbl_telecaller`
--
ALTER TABLE `tbl_telecaller`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
