-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 19, 2022 at 05:13 AM
-- Server version: 10.4.22-MariaDB
-- PHP Version: 8.0.5

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `cinehub_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin_table`
--

CREATE TABLE `admin_table` (
  `id` int(11) NOT NULL,
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
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `releasedDate` date NOT NULL,
  `img` varchar(255) NOT NULL,
  `trailer` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `comming_soon`
--

INSERT INTO `comming_soon` (`id`, `name`, `releasedDate`, `img`, `trailer`) VALUES
(1, 'Doctor Strange in the Multiverse of Madness', '2022-05-06', 'abc', ''),
(2, 'Black Panther: Wakanda Forever', '2022-11-11', 'C:\\fakepath\\burgure.jpg', 'https://www.youtube.com/embed/xjDjIWPwcPU'),
(3, 'fdsf', '2022-03-23', 'myFile-1646929718873.png', ''),
(4, '123455', '0231-02-22', 'myFile-1646931588120.png', 'https://www.youtube.com/embed/s163jQEvanw'),
(5, 'fsdfml', '2022-03-16', 'myFile-1646932560412.png', 'https://www.youtube.com/embed/s163jQEvanw');

-- --------------------------------------------------------

--
-- Table structure for table `food_item_table`
--

CREATE TABLE `food_item_table` (
  `id` int(11) NOT NULL,
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
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `trailer` varchar(255) NOT NULL,
  `releaseDate` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `movie_table`
--

INSERT INTO `movie_table` (`id`, `name`, `description`, `trailer`, `releaseDate`) VALUES
(1, 'Spider-Man: No Way Home', 'With Spider-Man\'s identity now revealed, Peter asks Doctor Strange for help. When a spell goes wrong, dangerous foes from other worlds start to appear, forcing Peter to discover what it truly means to be Spider-Man.', 'https://www.youtube.com/embed/rt-2cxAiPJk', '2021-11-17'),
(2, 'Avengers: Endgame', 'After the devastating events of Avengers: Infinity War, the universe is in ruins. With the help of remaining allies, the Avengers assemble once more in order to reverse Thanos\' actions and restore balance to the universe.', 'https://www.youtube.com/embed/TcMBFSGVi1c', '2019-04-24'),
(3, 'Doctor Strange', 'Doctor Strange is a 2016 American superhero film based on the Marvel Comics character of the same name. Produced by Marvel Studios and distributed by Walt Disney Studios Motion Pictures, it is the 14th film in the Marvel Cinematic Universe (MCU). The film was directed by Scott Derrickson from a screenplay he wrote with Jon Spaihts and C. Robert Cargill, and stars Benedict Cumberbatch as neurosurgeon Stephen Strange along with Chiwetel Ejiofor, Rachel McAdams, Benedict Wong, Michael Stuhlbarg, Benjamin Bratt, Scott Adkins, Mads Mikkelsen, and Tilda Swinton. In the film, Strange learns the mystic arts after a career-ending car crash. ', 'https://www.youtube.com/embed/aWzlQ2N6qqg', '2016-10-13');

-- --------------------------------------------------------

--
-- Table structure for table `order_list`
--

CREATE TABLE `order_list` (
  `id` int(11) NOT NULL,
  `orderId` int(11) NOT NULL,
  `orderdItem` int(11) NOT NULL,
  `orderedQty` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `order_list`
--

INSERT INTO `order_list` (`id`, `orderId`, `orderdItem`, `orderedQty`) VALUES
(1, 1, 1, 2),
(2, 1, 3, 5),
(3, 3, 1, 20),
(4, 4, 1, 2),
(5, 5, 1, 2),
(6, 6, 1, 2),
(7, 7, 1, 2),
(8, 8, 2, 1),
(9, 9, 3, 25),
(10, 10, 1, 3);

-- --------------------------------------------------------

--
-- Table structure for table `order_table`
--

CREATE TABLE `order_table` (
  `id` int(11) NOT NULL,
  `orderBY` int(11) NOT NULL,
  `orderedDate` datetime NOT NULL DEFAULT current_timestamp(),
  `orderStatus` tinyint(4) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `order_table`
--

INSERT INTO `order_table` (`id`, `orderBY`, `orderedDate`, `orderStatus`) VALUES
(1, 1, '2022-02-17 00:00:01', 0),
(2, 2, '2022-03-05 21:13:49', 0),
(3, 2, '2022-03-05 21:14:25', 0),
(4, 3, '2022-03-05 21:26:35', 0),
(5, 3, '2022-03-05 21:26:43', 0),
(6, 3, '2022-03-05 22:44:28', 0),
(7, 3, '2022-03-05 22:44:28', 0),
(8, 2, '2022-03-06 00:44:22', 0),
(9, 2, '2022-03-06 20:15:35', 0),
(10, 2, '2022-03-08 22:16:35', 0);

-- --------------------------------------------------------

--
-- Table structure for table `payment_table`
--

CREATE TABLE `payment_table` (
  `id` int(11) NOT NULL,
  `paidBy` int(11) NOT NULL,
  `receivedBy` int(11) NOT NULL,
  `paidFor` varchar(255) NOT NULL,
  `orderId` int(11) NOT NULL,
  `paymentMethod` varchar(255) NOT NULL,
  `paymentTime` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `seat_booking_table`
--

CREATE TABLE `seat_booking_table` (
  `id` int(11) NOT NULL,
  `bookedBy` int(11) NOT NULL,
  `seatId` int(11) NOT NULL,
  `bookedDate` datetime NOT NULL DEFAULT current_timestamp(),
  `movieId` int(11) NOT NULL,
  `ShowId` int(11) NOT NULL,
  `price` int(11) NOT NULL,
  `bookingStatus` int(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `seat_booking_table`
--

INSERT INTO `seat_booking_table` (`id`, `bookedBy`, `seatId`, `bookedDate`, `movieId`, `ShowId`, `price`, `bookingStatus`) VALUES
(1, 1, 2, '2022-03-06 00:50:28', 2, 2, 350, 0),
(2, 2, 1, '2022-03-06 05:09:31', 2, 2, 300, 0),
(3, 1, 0, '2022-03-06 13:31:41', 0, 1, 300, 0),
(4, 1, 8, '2022-03-06 14:03:26', 0, 1, 300, 0),
(5, 1, 16, '2022-03-06 14:03:26', 0, 1, 300, 0),
(6, 1, 24, '2022-03-06 14:03:26', 0, 1, 300, 0),
(7, 1, 32, '2022-03-06 14:03:26', 0, 1, 300, 0),
(8, 1, 40, '2022-03-06 14:03:26', 0, 1, 300, 0),
(9, 1, 48, '2022-03-06 14:03:26', 0, 1, 300, 0),
(10, 1, 56, '2022-03-06 14:11:35', 0, 1, 300, 0),
(11, 1, 6, '2022-03-06 14:11:44', 0, 1, 300, 0),
(12, 1, 7, '2022-03-06 14:11:44', 0, 1, 300, 0),
(13, 1, 14, '2022-03-06 14:11:44', 0, 1, 300, 0),
(14, 1, 15, '2022-03-06 14:11:44', 0, 1, 300, 0),
(15, 1, 43, '2022-03-06 14:19:46', 0, 1, 300, -1),
(16, 1, 35, '2022-03-06 14:19:46', 0, 1, 300, 0),
(17, 1, 44, '2022-03-06 14:19:46', 0, 1, 300, 0),
(18, 1, 36, '2022-03-06 14:19:46', 0, 1, 300, 0),
(19, 1, 27, '2022-03-06 14:33:18', 0, 2, 300, 0),
(20, 2, 27, '2022-03-07 07:42:33', 0, 4, 300, 0),
(21, 2, 28, '2022-03-07 07:42:33', 0, 4, 300, 0),
(22, 2, 35, '2022-03-07 07:42:33', 0, 4, 300, 0),
(23, 2, 33, '2022-03-08 22:36:55', 0, 1, 300, 0),
(24, 2, 41, '2022-03-08 22:36:55', 0, 1, 300, 0),
(25, 2, 42, '2022-03-08 22:36:55', 0, 1, 300, 0);

-- --------------------------------------------------------

--
-- Table structure for table `show_time_table`
--

CREATE TABLE `show_time_table` (
  `id` int(11) NOT NULL,
  `movie_id` int(11) NOT NULL,
  `showingDate` date NOT NULL,
  `showingTime` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `show_time_table`
--

INSERT INTO `show_time_table` (`id`, `movie_id`, `showingDate`, `showingTime`) VALUES
(1, 1, '2022-03-09', '07:00:00'),
(2, 1, '2022-03-09', '10:00:00'),
(3, 1, '2022-03-09', '01:00:00'),
(4, 1, '2022-03-09', '04:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `user_table`
--

CREATE TABLE `user_table` (
  `id` int(11) NOT NULL,
  `fname` varchar(255) NOT NULL,
  `lname` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `registerDate` datetime NOT NULL DEFAULT current_timestamp(),
  `activeStatus` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

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
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `payment_table`
--
ALTER TABLE `payment_table`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `seat_booking_table`
--
ALTER TABLE `seat_booking_table`
  ADD PRIMARY KEY (`id`);

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `comming_soon`
--
ALTER TABLE `comming_soon`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `food_item_table`
--
ALTER TABLE `food_item_table`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `movie_table`
--
ALTER TABLE `movie_table`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `order_list`
--
ALTER TABLE `order_list`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `order_table`
--
ALTER TABLE `order_table`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `payment_table`
--
ALTER TABLE `payment_table`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `seat_booking_table`
--
ALTER TABLE `seat_booking_table`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `show_time_table`
--
ALTER TABLE `show_time_table`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `user_table`
--
ALTER TABLE `user_table`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
