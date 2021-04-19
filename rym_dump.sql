CREATE DATABASE  IF NOT EXISTS `rate_your_music` /*!40100 DEFAULT CHARACTER SET utf8 */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `rate_your_music`;
-- MySQL dump 10.13  Distrib 8.0.22, for macos10.15 (x86_64)
--
-- Host: localhost    Database: rate_your_music
-- ------------------------------------------------------
-- Server version	8.0.23

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
-- Table structure for table `releases`
--

DROP TABLE IF EXISTS `releases`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `releases` (
  `release_id` int unsigned NOT NULL,
  `rating` decimal(10,0) unsigned NOT NULL DEFAULT '0' COMMENT 'Average aggregated rating',
  `artist` varchar(45) NOT NULL,
  `title` varchar(45) NOT NULL,
  `genre` varchar(45) NOT NULL,
  `release_date` date NOT NULL,
  `type` enum('album','ep','mixtape') NOT NULL,
  `duration` time NOT NULL,
  PRIMARY KEY (`release_id`),
  UNIQUE KEY `album_ud_UNIQUE` (`release_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `releases`
--

LOCK TABLES `releases` WRITE;
/*!40000 ALTER TABLE `releases` DISABLE KEYS */;
INSERT INTO `releases` VALUES (1,0,'Kanye West','My Beautiful Dark Twisted Fantasy','Hip Hop','2010-11-22','album','01:08:36'),(2,0,'Lil Ugly Mane','Uneven Compromise','Hip Hip','2012-10-28','ep','00:11:23'),(3,0,'Kate Bush','Hounds of Love','Art Pop','1985-09-16','album','00:47:03'),(4,0,'Alice Coltrane','Journey in Satchidananda','Jazz','1971-02-01','album','00:38:08'),(5,0,'Wire','Pink Flag','Punk','1977-12-11','album','00:35:19');
/*!40000 ALTER TABLE `releases` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reviews`
--

DROP TABLE IF EXISTS `reviews`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reviews` (
  `reviews_id` int NOT NULL,
  `user` varchar(45) NOT NULL,
  `release` int unsigned NOT NULL,
  `rating` tinyint unsigned NOT NULL DEFAULT '0',
  `comments` tinytext,
  PRIMARY KEY (`reviews_id`),
  KEY `fk_ratings_users1_idx` (`user`),
  KEY `fk_ratings_releases1_idx` (`release`),
  CONSTRAINT `fk_ratings_releases1` FOREIGN KEY (`release`) REFERENCES `releases` (`release_id`),
  CONSTRAINT `fk_ratings_users1` FOREIGN KEY (`user`) REFERENCES `users` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reviews`
--

LOCK TABLES `reviews` WRITE;
/*!40000 ALTER TABLE `reviews` DISABLE KEYS */;
INSERT INTO `reviews` VALUES (1,'beckert.b',1,7,'overrated'),(2,'pechie.n',1,10,'i\'m overrating this album'),(3,'DaRock',4,8,'the sound pleases me'),(4,'my_big_pony',2,4,NULL),(5,'snooki_babe',5,10,'me like the good punk');
/*!40000 ALTER TABLE `reviews` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `songs`
--

DROP TABLE IF EXISTS `songs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `songs` (
  `song_id` int NOT NULL,
  `title` varchar(45) NOT NULL,
  `release` int unsigned NOT NULL,
  `duration` time NOT NULL,
  PRIMARY KEY (`song_id`),
  KEY `fk_songs_releases_idx` (`release`),
  CONSTRAINT `fk_songs_releases` FOREIGN KEY (`release`) REFERENCES `releases` (`release_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `songs`
--

LOCK TABLES `songs` WRITE;
/*!40000 ALTER TABLE `songs` DISABLE KEYS */;
INSERT INTO `songs` VALUES (1,'Dark Fantasy',1,'00:04:40'),(2,'Gorgeous',1,'00:05:57'),(3,'Power',1,'00:04:52'),(4,'Uneven Compromise',2,'00:11:23'),(5,'Running Up That Hill',3,'00:04:56'),(6,'Hounds of Love',3,'00:03:02'),(7,'The Big Sky',3,'00:04:41'),(8,'Journey in Satchidananda',4,'00:06:33'),(9,'Shiva-Loka',4,'00:06:33'),(10,'Stopover Bombay',4,'00:02:50'),(11,'Reuters',5,'00:03:03'),(12,'Field Day for the Sundays',5,'00:00:28'),(13,'Three Girl Rhumba',5,'00:01:23');
/*!40000 ALTER TABLE `songs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `username` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `bio` tinytext,
  PRIMARY KEY (`username`,`email`),
  UNIQUE KEY `username_UNIQUE` (`username`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('bean.k','bean.k@forever.net','Killer Bean Forever'),('beckert.b','beckert.b@northeastern.edu','Just a simple man, rolling thru life one day at a time. Gaslight. Gatekeep. Girlboss'),('chubnub.c','chubnubbub@myspace.org',NULL),('DaRock','kiwi@gmail.com','Do you smell what i\'m cookin\'?'),('hootenanny','gimme_More@gmail.com',NULL),('HUMMUS','hummus@hummus.hummus','H.U.M.M.U.S.'),('jimmyjamborie','yeehaw@gmail.com',NULL),('montana.h','montana.h@hotmail.com','I have a secret, but i\'m not gonna tell'),('my_big_pony','ponyboy@gmail.com','Stay Gold.'),('pechie.n','pechie.n@northeastern.edu','I\'m a dummy that thinks Runaway is actually a good song.'),('silverMMonkey','silverman@gmail.com',NULL),('snooki_babe','I_am_snooki@jersey.shore','What\'s the situation'),('TheHowieMandel','howie@howwedoit.gov','End Germs 2021'),('ummaThurmy','ummagumma@gmail.com',NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-04-18 23:08:23
