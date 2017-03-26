-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- 主機: 127.0.0.1
-- 產生時間： 2017-03-26 17:46:39
-- 伺服器版本: 10.1.10-MariaDB-log
-- PHP 版本： 5.6.19

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 資料庫： `elife`
--

-- --------------------------------------------------------

--
-- 資料表結構 `buylist`
--

CREATE TABLE `buylist` (
  `id` int(11) NOT NULL,
  `member_id` int(11) NOT NULL,
  `supplier_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `price` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `total` int(11) NOT NULL,
  `paid` tinyint(1) NOT NULL DEFAULT '0',
  `status` tinyint(1) NOT NULL DEFAULT '0',
  `date` varchar(10) DEFAULT NULL,
  `time` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 資料表的匯出資料 `buylist`
--

INSERT INTO `buylist` (`id`, `member_id`, `supplier_id`, `product_id`, `price`, `quantity`, `total`, `paid`, `status`, `date`, `time`) VALUES
(1, 1, 1, 13, 520000, 1, 520000, 1, 0, '2017-03-26', '19:10:38'),
(2, 1, 1, 12, 1000, 2, 2000, 1, 0, '2017-03-26', '19:10:38'),
(3, 1, 1, 11, 1314520, 3, 3943560, 1, 0, '2017-03-26', '19:10:38');

-- --------------------------------------------------------

--
-- 資料表結構 `follow`
--

CREATE TABLE `follow` (
  `id` int(11) NOT NULL,
  `member_id` int(11) NOT NULL,
  `supplier_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 資料表的匯出資料 `follow`
--

INSERT INTO `follow` (`id`, `member_id`, `supplier_id`) VALUES
(2, 1, 3),
(4, 1, 1),
(5, 2, 2);

-- --------------------------------------------------------

--
-- 資料表結構 `member`
--

CREATE TABLE `member` (
  `id` int(11) NOT NULL,
  `name` varchar(20) NOT NULL,
  `phonenum` varchar(12) NOT NULL,
  `address` varchar(50) NOT NULL,
  `account` varchar(20) NOT NULL,
  `password` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 資料表的匯出資料 `member`
--

INSERT INTO `member` (`id`, `name`, `phonenum`, `address`, `account`, `password`) VALUES
(1, '謝宜庭', '0911222333', '台中市霧峰區', '1227', '1227'),
(2, '洪翊慈', '12345', '嘉義市', 'bluesky', '123');

-- --------------------------------------------------------

--
-- 資料表結構 `product`
--

CREATE TABLE `product` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `price` varchar(20) NOT NULL,
  `description` varchar(500) NOT NULL,
  `photo` varchar(100) NOT NULL,
  `supplier_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 資料表的匯出資料 `product`
--

INSERT INTO `product` (`id`, `name`, `price`, `description`, `photo`, `supplier_id`) VALUES
(3, 'alice', '2500', '好吃好玩好健康', 'http://i.imgur.com/N2HvPR4.jpg', 1),
(4, 'nick', '1500', '我的帥哥', 'http://i.imgur.com/VEZzESn.jpg', 1),
(6, '貓咪拉花咖啡', '400', '超好喝~大推!!!', 'http://imgur.com/POsbHD6.jpg', 2),
(8, '草地上的男孩', '3000', '陽光帥氣', 'http://imgur.com/ugyXC9S.jpg', 2),
(9, '白玫瑰', '555', '很白', 'http://i.imgur.com/H4wbgHq.jpg', 1),
(10, '紅玫瑰', '555', '很紅', 'http://imgur.com/5gtluX3.jpg', 1),
(11, '星光熠熠', '1314520', '我好帥!', 'http://imgur.com/JaGliiN.jpg', 1),
(12, '張益菕', '1000', 'shinning like a star', 'http://imgur.com/EsILJjG.jpg', 1),
(13, 'annie', '520000', '最Q室友', 'http://imgur.com/VsNeems.jpg', 1);

-- --------------------------------------------------------

--
-- 資料表結構 `supplierm`
--

CREATE TABLE `supplierm` (
  `id` int(11) NOT NULL,
  `storeName` varchar(20) NOT NULL,
  `name` varchar(10) NOT NULL,
  `phonenum` varchar(12) NOT NULL,
  `address` varchar(50) NOT NULL,
  `account` varchar(20) NOT NULL,
  `password` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 資料表的匯出資料 `supplierm`
--

INSERT INTO `supplierm` (`id`, `storeName`, `name`, `phonenum`, `address`, `account`, `password`) VALUES
(1, '581生活雜貨', '謝宜庭', '12345', 'Taipei', 'alice', 'alice'),
(2, '屈臣氏', '何姵欣', '99999999', '台中市', 'betty', 'betty'),
(3, '康是美', '張益菕', '11111', '台中市', 'nick', 'nick');

--
-- 已匯出資料表的索引
--

--
-- 資料表索引 `buylist`
--
ALTER TABLE `buylist`
  ADD PRIMARY KEY (`id`),
  ADD KEY `member_id` (`member_id`),
  ADD KEY `product_id` (`product_id`),
  ADD KEY `supplier_id` (`supplier_id`);

--
-- 資料表索引 `follow`
--
ALTER TABLE `follow`
  ADD PRIMARY KEY (`id`),
  ADD KEY `member_id` (`member_id`),
  ADD KEY `supplier_id` (`supplier_id`);

--
-- 資料表索引 `member`
--
ALTER TABLE `member`
  ADD PRIMARY KEY (`id`);

--
-- 資料表索引 `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`id`),
  ADD KEY `supplier_id` (`supplier_id`),
  ADD KEY `supplier_id_2` (`supplier_id`),
  ADD KEY `supplier_id_3` (`supplier_id`);

--
-- 資料表索引 `supplierm`
--
ALTER TABLE `supplierm`
  ADD PRIMARY KEY (`id`);

--
-- 在匯出的資料表使用 AUTO_INCREMENT
--

--
-- 使用資料表 AUTO_INCREMENT `buylist`
--
ALTER TABLE `buylist`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- 使用資料表 AUTO_INCREMENT `follow`
--
ALTER TABLE `follow`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- 使用資料表 AUTO_INCREMENT `member`
--
ALTER TABLE `member`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- 使用資料表 AUTO_INCREMENT `product`
--
ALTER TABLE `product`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;
--
-- 使用資料表 AUTO_INCREMENT `supplierm`
--
ALTER TABLE `supplierm`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- 已匯出資料表的限制(Constraint)
--

--
-- 資料表的 Constraints `buylist`
--
ALTER TABLE `buylist`
  ADD CONSTRAINT `buylist_ibfk_1` FOREIGN KEY (`member_id`) REFERENCES `member` (`id`),
  ADD CONSTRAINT `buylist_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`),
  ADD CONSTRAINT `buylist_ibfk_3` FOREIGN KEY (`supplier_id`) REFERENCES `supplierm` (`id`);

--
-- 資料表的 Constraints `follow`
--
ALTER TABLE `follow`
  ADD CONSTRAINT `follow_ibfk_1` FOREIGN KEY (`member_id`) REFERENCES `member` (`id`),
  ADD CONSTRAINT `follow_ibfk_2` FOREIGN KEY (`supplier_id`) REFERENCES `supplierm` (`id`);

--
-- 資料表的 Constraints `product`
--
ALTER TABLE `product`
  ADD CONSTRAINT `product_ibfk_1` FOREIGN KEY (`supplier_id`) REFERENCES `supplierm` (`id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
