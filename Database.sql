-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: localhost    Database: utefood
-- ------------------------------------------------------
-- Server version	8.0.34

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `carts`
--

DROP TABLE IF EXISTS `carts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `carts` (
  `id` varchar(36) NOT NULL,
  `userID` varchar(36) DEFAULT NULL,
  `productID` varchar(36) DEFAULT NULL,
  `quantity` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `userID` (`userID`),
  KEY `productID` (`productID`),
  CONSTRAINT `carts_ibfk_1` FOREIGN KEY (`userID`) REFERENCES `users` (`id`),
  CONSTRAINT `carts_ibfk_2` FOREIGN KEY (`productID`) REFERENCES `products` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `carts`
--

LOCK TABLES `carts` WRITE;
/*!40000 ALTER TABLE `carts` DISABLE KEYS */;
INSERT INTO `carts` VALUES ('d3802c45-5214-4b61-a650-5852f51029c6','27119c94-0a05-4552-89ab-6418bb3adbeb','0bd204f5-118a-4aee-80fb-6b537087fbff',1);
/*!40000 ALTER TABLE `carts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `id` varchar(36) NOT NULL,
  `category_name` varchar(50) DEFAULT NULL,
  `image` text,
  `isDelete` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES ('1fce0c4c-d7e6-4721-a72d-b13e5ee6474d','Ăn vặt','https://storage.googleapis.com/ute-food.appspot.com/snack.png?GoogleAccessId=firebase-adminsdk-r9j7x%40ute-food.iam.gserviceaccount.com&Expires=16446992400&Signature=qTAYykW5CfM%2BurRbzhT8gXRkWplfgHFYwgSkFd0iZFQNllbTRtj7tK3yHbwCl85jGRoWFrfDz4TV6f8ITtC2ZKMhBw6BxrKI%2F4kxYdj4UKEySk85pgfPrgOO10zz9yXNDDPc%2BQ5HX1ZpnMxsnixvLfOOdAnpUy2y%2FH8YeVH85nv%2Fi2tS8q1PnsTH%2BlLCNDZCUY1nOYlQYeLwv%2FIOvX7LBHc1D5gedaqIPt6veWH6lhdEJMbRZoi5Qvv9mXql14aMccwKdCpFM5xWCPBPKf%2B5LF9RpY18pQDqJUpl7vHb8JW0W624KHN4qRCOksQtRFSBknzsEFOUxMSh6jCIgrKivw%3D%3D',0),('311b85ff-3683-4b6f-adfb-04893ee4d059','Nước','https://storage.googleapis.com/ute-food.appspot.com/drink.png?GoogleAccessId=firebase-adminsdk-r9j7x%40ute-food.iam.gserviceaccount.com&Expires=16446992400&Signature=OWiRBkdMKJT2ZJTRvP8jJCjKCu7P4DPeIyS7yRmnJGIeuH1i2p2x9Cqjp9l7wboU8aA8E%2BERPhhmoODnIev1OhAjSeIqfKG6%2FSl72HBBUC9YHW9oD8SRwFtSvZjEJMCSUYy1xvjAJq%2BbMvFQwHRGLv%2B0m8QFj%2BzE%2FRab2dM5tjF%2F66KfXoN2wgCsl6tOM0bSCeEmAHdYh9nMIwhYZNC3KHCRF7uVUbDCaTUxTMho%2Fb4xiS6m4O396QqSRmcYx3EWHdHcpGvWr0AJu%2FY22Sh5lqU4t%2FrLSXVR%2BQIYPwwJ7nqiLan7n5UScCqpb0buUAhZrPMlCUHI1ing6gZxc4voyQ%3D%3D',0),('4ef33e0f-764d-4b74-aa1c-5a18a4255716','Pizza','https://storage.googleapis.com/ute-food.appspot.com/pizza.png?GoogleAccessId=firebase-adminsdk-r9j7x%40ute-food.iam.gserviceaccount.com&Expires=16446992400&Signature=V2kKitatf1s2rnoi2rGYYvUF498TMHD42ieiTPavK27CoIAh1PelQspFgz8pn7wlRAvwMpiJafc3sNyXIEk7ocVd8KoJWl1hs2v0rlgBGDnTJORaYlv%2FxTgrwwwCtJMTCSDRkG603CoVVl%2FnUFPbWjllnvlTcUyDeir0LTExy7EOhMSv8ZTulzmhm%2FevaVy96qYrPulFKxR32kEzkhn7EOClba3s6SQF9Rp%2FhamL5CqcBOnUkbR6XVGxEENoz6ut9xXMzLAjtZYQIo4tixrbi2nD7UIZWS2qwcd7kTFCRcZ6gs8ne8citICPaB7Acv4B7NKVF6F%2BxpuQU1VnCAVDhw%3D%3D',0),('9b343738-410b-4593-8beb-1ba18587206e','Phở','https://storage.googleapis.com/ute-food.appspot.com/pho.png?GoogleAccessId=firebase-adminsdk-r9j7x%40ute-food.iam.gserviceaccount.com&Expires=16446992400&Signature=l7EUsnveN%2BfJemMd3R1GZ9wLn%2BUewDyP43o6QZUv1%2BOTeATBI4X8NNqDH%2FaA2mfkprFkARabm7ItB5VQZVOQnb%2BEfUqGBLQL2GaTLu7Er7M6aAvKLTWktgNNlUcnQCbtUgH23wDY5KhGWT1DdFGloDfUSnZS4iqLZI7zHgLItUIGOAJj1AKtk0UK2ADVDi4CdEWJOljXHLGIWnd9UENvGrHBOXLrYTrF108LZTsag%2BCBPK3WXhVHbG7aU3s1UJBLIYDpkL2f%2BOXxoK3rlOCTj90Jyg%2Bhfa9okDs0ci8qQjOZpB8K5JZ4T7NzHjjBuEHNDaaVOsM1eX3WLYwMG%2FTu%2Fw%3D%3D',0),('d266d12a-00b0-432b-acf5-70f1237cec38','Combo','https://storage.googleapis.com/ute-food.appspot.com/combo.png?GoogleAccessId=firebase-adminsdk-r9j7x%40ute-food.iam.gserviceaccount.com&Expires=16446992400&Signature=CB00fjCLF22QwsSDrojD6vJ3yl%2BkwbJ6vskUvhDy%2F639UdgOsR9oN4uiUvd93S%2Fwbqtr3lc9r%2FzHYjFtdxX%2Bk8xMyOZycH2g8DSgAvAXsIWB5W4Anc5PPrcRQni758jVnLafTQ0WrS6MYuzY%2BPRyQOj3baLy3wblu0VjEZHnxtyw7dA5rU3sQdX62xlvp%2FU%2FudFB4j3RDBgwbZl4FAoO2U3MZA5WD7qyyvOh4mEpRgkrePK10%2BFyA86rjCC2Sy%2FzMq8lW0KMINq%2FnjizT%2FfPa%2BJE7YUfBl5V%2FjrAvwLnpEdEUF%2BK8qIgfS0N9DjE4utPG%2FMnJZkzlF7K3EZdI5yo%2BQ%3D%3D',0),('ea877bfc-da58-4d30-8b86-89e75510a1a9','Cháo','https://storage.googleapis.com/ute-food.appspot.com/porridge.png?GoogleAccessId=firebase-adminsdk-r9j7x%40ute-food.iam.gserviceaccount.com&Expires=16446992400&Signature=GRUoIvZbr9nArlt0rNCvl6%2FIBB3pQoYlwTYCzloF0E1EPiVlKyEvm0A8dHeGhodVHR3sri5EvYnvq6n6m1T%2BoSco58YGHSY4ka9wwSTooJ3tdHZ%2FjC4U3z3gA9umW9aFrOVIVRy7BI0bRR1JUgYl%2BAgwu4XxnJhv3Lx8hQeM27BGZZ2uMAvs%2FnPyx3yjufwyD9hRyd%2F7KNO9J%2Fcdoz0gBoaiCNh6jpytfWRqA7a3YmBgCY6D%2FjH3W0%2BvwjFtB%2FWbQhwVMcv51dobpKzi2ga38sRsaZMgKZC7a9pe3lZjze6TRtTZlyaNEm0dTnCvHd6QDhjbGNNLPXWgPBii1RU3UQ%3D%3D',0);
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_details`
--

DROP TABLE IF EXISTS `order_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_details` (
  `id` varchar(36) NOT NULL,
  `orderID` varchar(36) DEFAULT NULL,
  `productID` varchar(36) DEFAULT NULL,
  `quantity` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `orderID` (`orderID`),
  KEY `productID` (`productID`),
  CONSTRAINT `order_details_ibfk_1` FOREIGN KEY (`orderID`) REFERENCES `orders` (`id`),
  CONSTRAINT `order_details_ibfk_2` FOREIGN KEY (`productID`) REFERENCES `products` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_details`
--

LOCK TABLES `order_details` WRITE;
/*!40000 ALTER TABLE `order_details` DISABLE KEYS */;
INSERT INTO `order_details` VALUES ('2042bcc4-1475-4ff3-bd9d-3b73d144e13f','e52f1dcc-e288-4b0d-a52b-9b3dc045110c','300f718a-f884-4b02-b74d-4da46cebe29a',50),('2b16b7ca-fd4e-4dc2-b034-fa1261010f56','f1e9a644-a155-4d00-aeca-2df2cb002f0e','300f718a-f884-4b02-b74d-4da46cebe29a',2),('2c81820d-94fc-46c6-890e-cdcac2b7518a','f1e9a644-a155-4d00-aeca-2df2cb002f0e','0bd204f5-118a-4aee-80fb-6b537087fbff',1),('36434970-0cb8-43f9-ad38-0323e411275d','864d18ab-970a-44e3-96ff-02151aa1292b','0bd204f5-118a-4aee-80fb-6b537087fbff',1),('7a70b222-a7e2-4190-8696-e6d5dea9a85a','f1e9a644-a155-4d00-aeca-2df2cb002f0e','6d4aae95-9266-4cc5-aea1-17d50293d4a6',1),('c525ad5a-a9a4-48f4-84cb-323c56be3452','e07f7870-c7ec-415e-b273-926802f1933a','300f718a-f884-4b02-b74d-4da46cebe29a',1);
/*!40000 ALTER TABLE `order_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `id` varchar(36) NOT NULL,
  `userID` varchar(36) DEFAULT NULL,
  `full_name` varchar(100) DEFAULT NULL,
  `address` text,
  `phone_number` varchar(100) DEFAULT NULL,
  `delivery_date` date DEFAULT NULL,
  `createdAt` date DEFAULT NULL,
  `updatedAt` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `userID` (`userID`),
  CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`userID`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES ('864d18ab-970a-44e3-96ff-02151aa1292b','27119c94-0a05-4552-89ab-6418bb3adbeb','Trinh Hoang Phuc','An Giang','0987654321',NULL,'2023-08-23','2023-08-23'),('e07f7870-c7ec-415e-b273-926802f1933a','27119c94-0a05-4552-89ab-6418bb3adbeb','Trinh Hoang Phuc','An Giang','0987654321',NULL,'2023-08-23','2023-08-23'),('e52f1dcc-e288-4b0d-a52b-9b3dc045110c','f369ac93-6aef-43ef-801e-083df59bf73c','Trinh Hoang Phuc','An Giang','0987654321',NULL,'2023-08-15','2023-08-15'),('f1e9a644-a155-4d00-aeca-2df2cb002f0e','27119c94-0a05-4552-89ab-6418bb3adbeb','Trinh Hoang Phuc','An Giang','0987654321',NULL,'2023-08-21','2023-08-21');
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_images`
--

DROP TABLE IF EXISTS `product_images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_images` (
  `id` varchar(36) NOT NULL,
  `productID` varchar(36) DEFAULT NULL,
  `image` text,
  PRIMARY KEY (`id`),
  KEY `productID` (`productID`),
  CONSTRAINT `product_images_ibfk_1` FOREIGN KEY (`productID`) REFERENCES `products` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_images`
--

LOCK TABLES `product_images` WRITE;
/*!40000 ALTER TABLE `product_images` DISABLE KEYS */;
INSERT INTO `product_images` VALUES ('23ce56aa-c76f-4105-b26f-dc206c8e2575','0bd204f5-118a-4aee-80fb-6b537087fbff','https://storage.googleapis.com/ute-food.appspot.com/cach-lam-pizza-chay-0.jpg?GoogleAccessId=firebase-adminsdk-r9j7x%40ute-food.iam.gserviceaccount.com&Expires=16446992400&Signature=mInNWFQlmLiag8xE3c20O3KSpFTDrrzmODKFp0g%2FyWwg0Au0GcsTEI%2FSHihdq6RRfkXPkqn652UrdguSKYXA09zD5zIZH0pbBp8jKXXq%2F%2FACz6eMHm8MqCDWLJPqtBKcHHLkT%2BL0vdsQz4rZ3kEVzBgczYS82EM3tDcywDdln8MOuhf%2FoinaWPX6YUopYJZwnsOcoJyZzR203mO5PufkjeERBs8mtETyuwtT3EFa71dsjgncqXqMMxtSTXjs1dJHTYU0pJNr6fFQ3tf2onhIefFAqqDtPndVMa1aw%2F7KwEzCT9FvKm3qqo4Z4PQ79vibTFgzQjwweyTKNV6SmjxDRw%3D%3D'),('46e548b3-4ace-43a3-bad6-30c8f9ed411d','b7972793-3bc2-4394-aa5d-4cda939746ff','https://storage.googleapis.com/ute-food.appspot.com/15591371279654.webp?GoogleAccessId=firebase-adminsdk-r9j7x%40ute-food.iam.gserviceaccount.com&Expires=16446992400&Signature=mXxQt9w2vIJ8TcJi%2BgpKdtyAW3B3Lg6Jyz0mvdAwaH8lYmsgoTP6L4lT29l2CU%2BThosN204t%2BKCy9OjDxgPI7RcaOFgi6JZQBFoznbsmYzG%2BSCI8e6Mr%2FzIM8Ti%2B4s1NrJ%2FRFgDw83h7eJ%2B7CKUUjwoDYE91ERXZlsB%2F%2FB7MS2g9R7vtIHcpyZOykZY0qiymDzsn%2F17%2FL31%2FUqf6xKM81l4m%2FaWXUzbAYy7bzzQMa953Mz6yeANHywG%2F8rnp1NEoP%2BNGUqpIDK0hw7Dgc1LPFPtCqizHFzYOtcz2gpMxUVGMtPUzGKgAjvcy9plE4ibWspwy2YFa52Hmlmytk5lWVQ%3D%3D'),('53f9dbf9-b4f7-444a-a3c9-8a3e61c35edd','b157e082-3a83-433e-a6d0-042921aba868','https://storage.googleapis.com/ute-food.appspot.com/Boba20tea_1561322926828.JPG_93628967_ver1.0.webp?GoogleAccessId=firebase-adminsdk-r9j7x%40ute-food.iam.gserviceaccount.com&Expires=16446992400&Signature=GWLkCrJDuealg8xH5kQyy%2FIYu%2BkyvXCAj4GB8ZPCZRujYT7ChKZ5C%2FNJND2hTdyAj%2BHGrca8ZTJD5o7u9EbXiauDdaRLCxsnMbZK6aMDX%2BwRMxA%2BKKBLpLt0h6FWhBLEJP0jcWM8bdzq48pZOtn3mVh8TxdPmhw3utnjjeMddj1vdLJX3%2BplS%2BirhtaMNphO6otOV9PWD%2FwEHywXcvJgGr6JB0N6PiX6rpRExLha4%2BCt4pJrpcQwkuPmOQZflKxw88jZFF9KXumyUUaZ2k5TD1iOyCV9oYHWyIFA2ka1LQR1FVpG5alUVot%2B972YB93IMu6F9BR1B4Ayz3P6%2FNJCcg%3D%3D'),('8ee16f0e-e1a9-487f-87a7-1a8d4852761a','6d4aae95-9266-4cc5-aea1-17d50293d4a6','https://storage.googleapis.com/ute-food.appspot.com/chao-ech-singapore.jpg?GoogleAccessId=firebase-adminsdk-r9j7x%40ute-food.iam.gserviceaccount.com&Expires=16446992400&Signature=Ua0POYoIGvCyDhHgEuWwfBZ7wL%2BRz%2FrGEVRItPNtCa11m5f2BLwqmY9PsonwqAcme8gOyBT2cVRxPpZp6KGo7CV2GrznnrIbYa89lNBbhmHj1M9EI%2BsXLMJSc6nb6YSDUA03DUgaEh4hPEOETM1ze8e8MKVUdmce2pQaBr1z1EBG3hm6iI8130tEF2cLaBt%2F5r%2BxC%2B%2FKvFTmpHAx9o11m%2Fj%2BrP3h0%2B3E4RcrYMolFCCghS8UwYezLwCy1nnRcQDD6U7TnS8iqqZ9%2B2jEuFXcZnlDyDal4VWSCIIn7SfihtONhTm%2B8h3IsFoLwu7RB2kQCeHyc3G6ovQGB3miwxQ4PQ%3D%3D'),('f4b5db2f-08c8-4c56-82da-9b03a6fe1e71','0bd204f5-118a-4aee-80fb-6b537087fbff','https://storage.googleapis.com/ute-food.appspot.com/pizzaaaaaa.jpg?GoogleAccessId=firebase-adminsdk-r9j7x%40ute-food.iam.gserviceaccount.com&Expires=16446992400&Signature=BIPJHDpHE%2FjAna5WYnLtVTnt0xM9UhYcxflmWH9uM4T0k0t%2FuF38BKG0LfxZSnXM%2BvIMslC9YWMRN2Uufk0hdt6asr7DHQinuEFWs8ovgxvjWqcmjpHWMUo46Gq2MdIfFz6TlWEkac%2F2BCxizMSRshI2GhaArvLo2aY7wVjoMEq47AX%2FgcuYSZyTLXUIbpAVokkP3Q7hbLiSAQN%2BQBgzHXGdkGy%2BL9cv85nLjhk3pZrdIUR9EDyniJGjtAyNpsqZvVmUClKahD%2FpE%2B4RRut3BnPyHCih87%2B6SSrV40KWTadZgoefqrI9TXraCFNZQmntrs5Bv7wc9WvIW%2FY3hsZdvA%3D%3D'),('fe50bfe7-f2b4-45c1-82cc-ea3cf721709c','300f718a-f884-4b02-b74d-4da46cebe29a','https://storage.googleapis.com/ute-food.appspot.com/wp3063142.jpg?GoogleAccessId=firebase-adminsdk-r9j7x%40ute-food.iam.gserviceaccount.com&Expires=16446992400&Signature=Y56pZNPQ8sQQNLukNypNGtnPbLtUcCPdp08hnC6VPtVEBrPd6V36hhjbTxg5YXY%2FXba%2BkzOoSarKO%2B38KEAaC9AVYTXubV7wcntV1QwTHWphin8Con9v3XNe2bBMEJWAntKRIJlaCeZmP7iA03On1%2BdkewVLfmqbBpHRyf58onrIsH%2FFUS%2F5VHQRLJHg73YwaYPRQGGGd8K6pGwckM8kPEMkjVvCZmsqpjxv8Tm9%2BYujyvlzjlIJOVT4DkFNl6qxkYxPW4Xmsl1o9f7npxDAYKN0beIHMnidLzrQq%2B%2BpTb5uWKEO9mmIfQ4RgGT6AadC1QueGfCfx4fDbRBLOb5RYA%3D%3D');
/*!40000 ALTER TABLE `product_images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_reviews`
--

DROP TABLE IF EXISTS `product_reviews`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_reviews` (
  `id` varchar(36) NOT NULL,
  `productID` varchar(36) DEFAULT NULL,
  `userID` varchar(36) DEFAULT NULL,
  `starRating` int DEFAULT NULL,
  `content` text,
  `createdAt` date DEFAULT NULL,
  `updatedAt` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `productID` (`productID`),
  KEY `userID` (`userID`),
  CONSTRAINT `product_reviews_ibfk_1` FOREIGN KEY (`productID`) REFERENCES `products` (`id`),
  CONSTRAINT `product_reviews_ibfk_2` FOREIGN KEY (`userID`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_reviews`
--

LOCK TABLES `product_reviews` WRITE;
/*!40000 ALTER TABLE `product_reviews` DISABLE KEYS */;
INSERT INTO `product_reviews` VALUES ('3fe51af5-ea46-497b-aef1-06f0271d5da5','0bd204f5-118a-4aee-80fb-6b537087fbff','f369ac93-6aef-43ef-801e-083df59bf73c',5,'nên ăn thử nha mọi người','2023-08-11','2023-08-11'),('4b23cde6-d3a5-4b44-a6f4-7f0011fd4cfa','0bd204f5-118a-4aee-80fb-6b537087fbff','a00b5deb-7353-48f5-ab6a-fcdefd24edb9',3,'ngon quá','2023-08-11','2023-08-11'),('dd232bf2-4c63-44af-a02b-078a259dac1c','0bd204f5-118a-4aee-80fb-6b537087fbff','a00b5deb-7353-48f5-ab6a-fcdefd24edb9',5,'ngon cực','2023-08-11','2023-08-11');
/*!40000 ALTER TABLE `product_reviews` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id` varchar(36) NOT NULL,
  `categoryID` varchar(36) DEFAULT NULL,
  `product_name` varchar(100) DEFAULT NULL,
  `description` text,
  `price` int DEFAULT NULL,
  `quantity` int DEFAULT NULL,
  `publication_date` date DEFAULT NULL,
  `createdAt` date DEFAULT NULL,
  `updatedAt` date DEFAULT NULL,
  `isDelete` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `categoryID` (`categoryID`),
  CONSTRAINT `products_ibfk_1` FOREIGN KEY (`categoryID`) REFERENCES `categories` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES ('0bd204f5-118a-4aee-80fb-6b537087fbff','4ef33e0f-764d-4b74-aa1c-5a18a4255716','Pizza nhà trồng','dferf',240000,20,'2023-08-11','2023-08-11','2023-08-23',0),('300f718a-f884-4b02-b74d-4da46cebe29a','9b343738-410b-4593-8beb-1ba18587206e','Phở gà','bla bla bla ngon bo re',100000,47,'2023-08-10','2023-08-09','2023-08-31',0),('6d4aae95-9266-4cc5-aea1-17d50293d4a6','ea877bfc-da58-4d30-8b86-89e75510a1a9','Cháo ếch Singapore','bla bla bla',100000,99,'2023-08-10','2023-08-09','2023-08-31',0),('b157e082-3a83-433e-a6d0-042921aba868','311b85ff-3683-4b6f-adfb-04893ee4d059','Trà sửa trân châu đường đen','bla bla bla ngon bo re',100000,100,'2023-08-10','2023-08-09','2023-08-31',0),('b7972793-3bc2-4394-aa5d-4cda939746ff','d266d12a-00b0-432b-acf5-70f1237cec38','Combo Burger King','bla bla bla ngon bo re',100000,100,'2023-08-10','2023-08-09','2023-08-31',0);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` varchar(36) NOT NULL,
  `full_name` varchar(50) DEFAULT NULL,
  `phone_number` varchar(10) DEFAULT NULL,
  `address` varchar(100) DEFAULT NULL,
  `date_of_birth` date DEFAULT NULL,
  `avatar` text,
  `email` varchar(50) DEFAULT NULL,
  `password` varchar(20) DEFAULT NULL,
  `user_role` varchar(10) DEFAULT NULL,
  `createdAt` date DEFAULT NULL,
  `updatedAt` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('269295ad-8975-4b76-94bc-a558e3bea266','Trinh Hoang D','0987654321','An Giang','2002-02-01','','d@gmail.com','phuc02012002','user','2023-08-05','2023-08-05'),('27119c94-0a05-4552-89ab-6418bb3adbeb','Trinh Hoang Phuc','0987654321','An Giang','2002-01-02','','phuc@gmail.com','phuc02012002','admin','2023-08-05','2023-08-23'),('a00b5deb-7353-48f5-ab6a-fcdefd24edb9','Trinh Hoang C','0987654321','An Giang','2002-02-01','','c@gmail.com','phuc02012002','user','2023-08-05','2023-08-05'),('f369ac93-6aef-43ef-801e-083df59bf73c','Trinh Hoang B','0987654321','An Giang','2002-02-01','','b@gmail.com','phuc02012002','user','2023-08-05','2023-08-05');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wishlist`
--

DROP TABLE IF EXISTS `wishlist`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `wishlist` (
  `id` varchar(36) NOT NULL,
  `userID` varchar(36) DEFAULT NULL,
  `productID` varchar(36) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `userID` (`userID`),
  KEY `productID` (`productID`),
  CONSTRAINT `wishlist_ibfk_1` FOREIGN KEY (`userID`) REFERENCES `users` (`id`),
  CONSTRAINT `wishlist_ibfk_2` FOREIGN KEY (`productID`) REFERENCES `products` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wishlist`
--

LOCK TABLES `wishlist` WRITE;
/*!40000 ALTER TABLE `wishlist` DISABLE KEYS */;
/*!40000 ALTER TABLE `wishlist` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-09-01 22:48:44
