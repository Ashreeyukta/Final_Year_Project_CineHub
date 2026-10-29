-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Apr 18, 2022 at 06:34 PM
-- Server version: 8.0.28
-- PHP Version: 8.1.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `cinehub`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin_table`
--

CREATE TABLE `admin_table` (
  `id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `uname` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `admin_table`
--

INSERT INTO `admin_table` (`id`, `name`, `uname`, `password`) VALUES
(1, 'admin', 'admin@admin', 'admin');

-- --------------------------------------------------------

--
-- Table structure for table `comming_soon`
--

CREATE TABLE `comming_soon` (
  `id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `releasedDate` date NOT NULL,
  `img` varchar(255) NOT NULL,
  `trailer` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `food_item_table`
--

CREATE TABLE `food_item_table` (
  `id` int NOT NULL,
  `itemName` varchar(255) NOT NULL,
  `price` varchar(255) NOT NULL,
  `type` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `food_item_table`
--

INSERT INTO `food_item_table` (`id`, `itemName`, `price`, `type`) VALUES
(1, 'Burger', '350', ''),
(2, 'Pepsi', '200', ''),
(3, 'Popcorn', '250', ''),
(4, 'Nachos', '300', ''),
(5, 'Water Bottle', '80', '');

-- --------------------------------------------------------

--
-- Table structure for table `movie_table`
--

CREATE TABLE `movie_table` (
  `id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `trailer` varchar(255) NOT NULL,
  `releaseDate` date NOT NULL,
  `status` enum('upcoming','showing') NOT NULL DEFAULT 'upcoming',
  `image` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `movie_table`
--

INSERT INTO `movie_table` (`id`, `name`, `description`, `trailer`, `releaseDate`, `status`, `image`) VALUES
(2, 'RRR', 'RRR', 'https://youtube.com/embed/f_vbAtFSEc0', '2022-03-26', 'showing', 'movie-1650131938799.jpeg'),
(3, 'KGF 2', 'undefined', 'https://youtube.com/embed/_7b1647tH74', '2022-04-14', 'showing', 'movie-1650132037488.jpeg'),
(4, 'Morbius', 'undefined', 'https://youtube.com/embed/oZ6iiRrz1SY', '2022-04-15', 'showing', 'movie-1650132083468.jpeg'),
(5, 'Heropanti 2', 'undefined', 'https://youtube.com/embed/Faz9PrY6xF8', '2022-04-29', 'upcoming', 'movie-1650132905453.jpeg');

-- --------------------------------------------------------

--
-- Table structure for table `order_list`
--

CREATE TABLE `order_list` (
  `id` int NOT NULL,
  `orderId` int NOT NULL,
  `orderdItem` int NOT NULL,
  `orderedQty` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `order_list`
--

INSERT INTO `order_list` (`id`, `orderId`, `orderdItem`, `orderedQty`) VALUES
(1, 1, 3, 1);

-- --------------------------------------------------------

--
-- Table structure for table `order_table`
--

CREATE TABLE `order_table` (
  `id` int NOT NULL,
  `orderBY` int NOT NULL,
  `slot_id` int DEFAULT NULL,
  `orderedDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `orderStatus` tinyint NOT NULL DEFAULT '0',
  `total` float DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `order_table`
--

INSERT INTO `order_table` (`id`, `orderBY`, `slot_id`, `orderedDate`, `orderStatus`, `total`) VALUES
(1, 2, 49, '2022-04-19 00:14:34', 1, 1150);

-- --------------------------------------------------------

--
-- Table structure for table `payment_table`
--

CREATE TABLE `payment_table` (
  `id` int NOT NULL,
  `paidBy` int NOT NULL,
  `orderId` int NOT NULL,
  `paymentMethod` varchar(255) NOT NULL,
  `paymentTime` datetime NOT NULL,
  `transaction_code` varchar(50) NOT NULL,
  `payment_token` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `payment_table`
--

INSERT INTO `payment_table` (`id`, `paidBy`, `orderId`, `paymentMethod`, `paymentTime`, `transaction_code`, `payment_token`) VALUES
(1, 2, 1, 'Khalti', '2022-04-19 00:15:07', 'DbAUCVXEPLZaBWxhxsPJr6', '9iJ9Mg2NAS8oDeGA3Q9oXB');

-- --------------------------------------------------------

--
-- Table structure for table `seat_booking_table`
--

CREATE TABLE `seat_booking_table` (
  `id` int NOT NULL,
  `bookedBy` int NOT NULL,
  `seatId` int NOT NULL,
  `show_time_id` int NOT NULL,
  `bookedDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `ShowId` int NOT NULL,
  `price` int NOT NULL,
  `bookingStatus` int NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `seat_booking_table`
--

INSERT INTO `seat_booking_table` (`id`, `bookedBy`, `seatId`, `show_time_id`, `bookedDate`, `ShowId`, `price`, `bookingStatus`) VALUES
(1, 2, 34, 49, '2022-04-19 00:14:34', 3, 300, 1),
(2, 2, 35, 49, '2022-04-19 00:14:34', 3, 300, 1),
(3, 2, 36, 49, '2022-04-19 00:14:34', 3, 300, 1);

-- --------------------------------------------------------

--
-- Table structure for table `show_time_table`
--

CREATE TABLE `show_time_table` (
  `id` int NOT NULL,
  `movie_id` int NOT NULL,
  `showingDate` date NOT NULL,
  `showingTime` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `show_time_table`
--

INSERT INTO `show_time_table` (`id`, `movie_id`, `showingDate`, `showingTime`) VALUES
(1, 2, '2022-03-26', '08:00:00'),
(2, 2, '2022-03-26', '11:30:00'),
(3, 2, '2022-03-26', '15:00:00'),
(4, 2, '2022-03-26', '18:30:00'),
(5, 2, '2022-03-27', '08:00:00'),
(6, 2, '2022-03-27', '11:30:00'),
(7, 2, '2022-03-27', '15:00:00'),
(8, 2, '2022-03-27', '18:30:00'),
(9, 2, '2022-03-28', '08:00:00'),
(10, 2, '2022-03-28', '11:30:00'),
(11, 2, '2022-03-28', '15:00:00'),
(12, 2, '2022-03-28', '18:30:00'),
(13, 2, '2022-03-29', '08:00:00'),
(14, 2, '2022-03-29', '11:30:00'),
(15, 2, '2022-03-29', '15:00:00'),
(16, 2, '2022-03-29', '18:30:00'),
(17, 2, '2022-03-30', '08:00:00'),
(18, 2, '2022-03-30', '11:30:00'),
(19, 2, '2022-03-30', '15:00:00'),
(20, 2, '2022-03-30', '18:30:00'),
(21, 2, '2022-03-31', '08:00:00'),
(22, 2, '2022-03-31', '11:30:00'),
(23, 2, '2022-03-31', '15:00:00'),
(24, 2, '2022-03-31', '18:30:00'),
(25, 2, '2022-04-01', '08:00:00'),
(26, 2, '2022-04-01', '11:30:00'),
(27, 2, '2022-04-01', '15:00:00'),
(28, 2, '2022-04-01', '18:30:00'),
(29, 2, '2022-04-02', '08:00:00'),
(30, 2, '2022-04-02', '11:30:00'),
(31, 2, '2022-04-02', '15:00:00'),
(32, 2, '2022-04-02', '18:30:00'),
(33, 3, '2022-04-14', '08:00:00'),
(34, 3, '2022-04-14', '11:30:00'),
(35, 3, '2022-04-14', '15:00:00'),
(36, 3, '2022-04-14', '18:30:00'),
(37, 3, '2022-04-15', '08:00:00'),
(38, 3, '2022-04-15', '11:30:00'),
(39, 3, '2022-04-15', '15:00:00'),
(40, 3, '2022-04-15', '18:30:00'),
(41, 3, '2022-04-16', '08:00:00'),
(42, 3, '2022-04-16', '11:30:00'),
(43, 3, '2022-04-16', '15:00:00'),
(44, 3, '2022-04-16', '18:30:00'),
(45, 3, '2022-04-17', '08:00:00'),
(46, 3, '2022-04-17', '11:30:00'),
(47, 3, '2022-04-17', '15:00:00'),
(48, 3, '2022-04-17', '18:30:00'),
(49, 3, '2022-04-18', '08:00:00'),
(50, 3, '2022-04-18', '11:30:00'),
(51, 3, '2022-04-18', '15:00:00'),
(52, 3, '2022-04-18', '18:30:00'),
(53, 3, '2022-04-19', '08:00:00'),
(54, 3, '2022-04-19', '11:30:00'),
(55, 3, '2022-04-19', '15:00:00'),
(56, 3, '2022-04-19', '18:30:00'),
(57, 3, '2022-04-20', '08:00:00'),
(58, 3, '2022-04-20', '11:30:00'),
(59, 3, '2022-04-20', '15:00:00'),
(60, 3, '2022-04-20', '18:30:00'),
(61, 3, '2022-04-21', '08:00:00'),
(62, 3, '2022-04-21', '11:30:00'),
(63, 3, '2022-04-21', '15:00:00'),
(64, 3, '2022-04-21', '18:30:00'),
(65, 4, '2022-04-15', '08:00:00'),
(66, 4, '2022-04-15', '11:30:00'),
(67, 4, '2022-04-15', '15:00:00'),
(68, 4, '2022-04-15', '18:30:00'),
(69, 4, '2022-04-16', '08:00:00'),
(70, 4, '2022-04-16', '11:30:00'),
(71, 4, '2022-04-16', '15:00:00'),
(72, 4, '2022-04-16', '18:30:00'),
(73, 4, '2022-04-17', '08:00:00'),
(74, 4, '2022-04-17', '11:30:00'),
(75, 4, '2022-04-17', '15:00:00'),
(76, 4, '2022-04-17', '18:30:00'),
(77, 4, '2022-04-18', '08:00:00'),
(78, 4, '2022-04-18', '11:30:00'),
(79, 4, '2022-04-18', '15:00:00'),
(80, 4, '2022-04-18', '18:30:00'),
(81, 4, '2022-04-19', '08:00:00'),
(82, 4, '2022-04-19', '11:30:00'),
(83, 4, '2022-04-19', '15:00:00'),
(84, 4, '2022-04-19', '18:30:00'),
(85, 4, '2022-04-20', '08:00:00'),
(86, 4, '2022-04-20', '11:30:00'),
(87, 4, '2022-04-20', '15:00:00'),
(88, 4, '2022-04-20', '18:30:00'),
(89, 4, '2022-04-21', '08:00:00'),
(90, 4, '2022-04-21', '11:30:00'),
(91, 4, '2022-04-21', '15:00:00'),
(92, 4, '2022-04-21', '18:30:00'),
(93, 4, '2022-04-22', '08:00:00'),
(94, 4, '2022-04-22', '11:30:00'),
(95, 4, '2022-04-22', '15:00:00'),
(96, 4, '2022-04-22', '18:30:00');

-- --------------------------------------------------------

--
-- Table structure for table `user_table`
--

CREATE TABLE `user_table` (
  `id` int NOT NULL,
  `fname` varchar(255) NOT NULL,
  `lname` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `registerDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `activeStatus` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user_table`
--

INSERT INTO `user_table` (`id`, `fname`, `lname`, `email`, `password`, `registerDate`, `activeStatus`) VALUES
(1, 'Zephr Mays', 'Quinn Grant', 'vawy@mailinator.com', 'Pa$$w0rd!', '2022-04-14 14:25:42', 0),
(2, 'Kaitlin', 'Decla', 'vonakan@mailinator.com', 'Pa$$w0rd!', '2022-04-17 11:27:24', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin_table`
--
ALTER TABLE `admin_table`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `comming_soon`
--
ALTER TABLE `comming_soon`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `food_item_table`
--
ALTER TABLE `food_item_table`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `movie_table`
--
ALTER TABLE `movie_table`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `order_list`
--
ALTER TABLE `order_list`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `order_table`
--
ALTER TABLE `order_table`
  ADD PRIMARY KEY (`id`),
  ADD KEY `slot_id` (`slot_id`);

--
-- Indexes for table `payment_table`
--
ALTER TABLE `payment_table`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `seat_booking_table`
--
ALTER TABLE `seat_booking_table`
  ADD PRIMARY KEY (`id`),
  ADD KEY `show_time_id` (`show_time_id`);

--
-- Indexes for table `show_time_table`
--
ALTER TABLE `show_time_table`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_table`
--
ALTER TABLE `user_table`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin_table`
--
ALTER TABLE `admin_table`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `comming_soon`
--
ALTER TABLE `comming_soon`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `food_item_table`
--
ALTER TABLE `food_item_table`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `movie_table`
--
ALTER TABLE `movie_table`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `order_list`
--
ALTER TABLE `order_list`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `order_table`
--
ALTER TABLE `order_table`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `payment_table`
--
ALTER TABLE `payment_table`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `seat_booking_table`
--
ALTER TABLE `seat_booking_table`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `show_time_table`
--
ALTER TABLE `show_time_table`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=97;

--
-- AUTO_INCREMENT for table `user_table`
--
ALTER TABLE `user_table`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `seat_booking_table`
--
ALTER TABLE `seat_booking_table`
  ADD CONSTRAINT `seat_booking_table_ibfk_1` FOREIGN KEY (`show_time_id`) REFERENCES `show_time_table` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
