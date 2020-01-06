-- MySQL dump 10.13  Distrib 5.7.28-ndb-7.6.12, for Linux (x86_64)
--
-- Host: localhost    Database: ragerp
-- ------------------------------------------------------
-- Server version	5.7.28-ndb-7.6.12

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `barbershop`
--

DROP TABLE IF EXISTS `barbershop`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `barbershop` (
  `id` int(255) NOT NULL AUTO_INCREMENT,
  `camData` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `barbershop`
--

LOCK TABLES `barbershop` WRITE;
/*!40000 ALTER TABLE `barbershop` DISABLE KEYS */;
INSERT INTO `barbershop` VALUES (2,'{\"x\":-31.4,\"y\":-151.47,\"z\":57.78,\"rz\":341.45,\"viewangle\":20}');
/*!40000 ALTER TABLE `barbershop` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `business`
--

DROP TABLE IF EXISTS `business`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `business` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `coord` text NOT NULL,
  `price` int(11) NOT NULL,
  `ownerId` int(255) DEFAULT '0',
  `margin` int(11) DEFAULT '0',
  `balance` int(11) NOT NULL DEFAULT '0',
  `buyerMenuCoord` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `business`
--

LOCK TABLES `business` WRITE;
/*!40000 ALTER TABLE `business` DISABLE KEYS */;
INSERT INTO `business` VALUES (2,'Barber Shop','{\"x\":-33.02046585083008,\"y\":-154.21823120117188,\"z\":57.07650375366211,\"rot\":343.98638916015625,\"dim\":0}',150,1,200,52000,'{\"x\":-30.82243537902832,\"y\":-149.76673889160156,\"z\":57.076534271240234,\"rot\":152.5059814453125,\"dim\":0}'),(3,'Cheap Car Dealership','{\"x\":-29.143062591552734,\"y\":-1103.78564453125,\"z\":26.422351837158203,\"rot\":249.00473022460938,\"dim\":0}',1,1,300,420000,'{\"x\":-44.65711212158203,\"y\":-1111.3798828125,\"z\":26.435815811157227,\"rot\":74.28343200683594,\"dim\":0}'),(4,'Clothing Shop','{\"x\":429.3043212890625,\"y\":-808.377197265625,\"z\":29.49114227294922,\"rot\":187.30130004882812,\"dim\":0}',100,0,100,4500,'{\"x\":426.7113037109375,\"y\":-800.599609375,\"z\":29.491138458251953,\"rot\":250.68577575683594,\"dim\":0}');
/*!40000 ALTER TABLE `business` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cheapcardealership`
--

DROP TABLE IF EXISTS `cheapcardealership`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cheapcardealership` (
  `id` int(255) NOT NULL AUTO_INCREMENT,
  `newCarCoord` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cheapcardealership`
--

LOCK TABLES `cheapcardealership` WRITE;
/*!40000 ALTER TABLE `cheapcardealership` DISABLE KEYS */;
INSERT INTO `cheapcardealership` VALUES (3,'{\"x\":-57.44873809814453,\"y\":-1109.51220703125,\"z\":25.90624237060547,\"rot\":69.04241943359375,\"dim\":0}');
/*!40000 ALTER TABLE `cheapcardealership` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `clothingshop`
--

DROP TABLE IF EXISTS `clothingshop`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `clothingshop` (
  `id` int(255) NOT NULL AUTO_INCREMENT,
  `camData` text,
  `buyerStandCoord` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clothingshop`
--

LOCK TABLES `clothingshop` WRITE;
/*!40000 ALTER TABLE `clothingshop` DISABLE KEYS */;
INSERT INTO `clothingshop` VALUES (4,'{\"x\":430.19,\"y\":-800.56,\"z\":29.49,\"rz\":88.75,\"viewangle\":35}','{\"x\":426.7113037109375,\"y\":-800.599609375,\"z\":29.491138458251953,\"rot\":250.68577575683594,\"dim\":0}');
/*!40000 ALTER TABLE `clothingshop` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `commercialcardealership`
--

DROP TABLE IF EXISTS `commercialcardealership`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `commercialcardealership` (
  `id` int(255) NOT NULL AUTO_INCREMENT,
  `newCarCoord` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `commercialcardealership`
--

LOCK TABLES `commercialcardealership` WRITE;
/*!40000 ALTER TABLE `commercialcardealership` DISABLE KEYS */;
/*!40000 ALTER TABLE `commercialcardealership` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `factions`
--

DROP TABLE IF EXISTS `factions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `factions` (
  `id` int(11) NOT NULL,
  `name` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `factions`
--

LOCK TABLES `factions` WRITE;
/*!40000 ALTER TABLE `factions` DISABLE KEYS */;
INSERT INTO `factions` VALUES (1,'Police'),(2,'Hospital');
/*!40000 ALTER TABLE `factions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `garageinformation`
--

DROP TABLE IF EXISTS `garageinformation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `garageinformation` (
  `id` int(11) NOT NULL,
  `name` text NOT NULL,
  `savecoord` text NOT NULL,
  `pickcoord` text NOT NULL,
  `price` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `garageinformation`
--

LOCK TABLES `garageinformation` WRITE;
/*!40000 ALTER TABLE `garageinformation` DISABLE KEYS */;
INSERT INTO `garageinformation` VALUES (1,'Garage Central','{\"x\":225.039,\"y\":-754.751,\"z\":31.828,\"rot\":263.99,\"dim\":0}','{\"x\":233.315,\"y\":-791.503,\"z\":31.587,\"rot\":156.59,\"dim\":0}',200),(2,'Garage No Se donde estoy','{\"x\":-144.641,\"y\":-578.112,\"z\":33.424,\"rot\":338.65,\"dim\":0}','{\"x\":-155.384,\"y\":-594.013,\"z\":33.424,\"rot\":149.98,\"dim\":0}',200),(3,'Garage Casino','{\"x\":934.182,\"y\":-2.272,\"z\":79.764,\"rot\":324.39,\"dim\":0}','{\"x\":921.212,\"y\":48.234,\"z\":81.898,\"rot\":325.24,\"dim\":0}',200),(4,'Garage Oculto','{\"x\":-894.259,\"y\":-350.581,\"z\":35.534,\"rot\":19.68,\"dim\":0}','{\"x\":-882.688,\"y\":-349.877,\"z\":35.725,\"rot\":203.68,\"dim\":0}',200);
/*!40000 ALTER TABLE `garageinformation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `gasstation`
--

DROP TABLE IF EXISTS `gasstation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gasstation` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fillingCoord` text,
  `camData` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gasstation`
--

LOCK TABLES `gasstation` WRITE;
/*!40000 ALTER TABLE `gasstation` DISABLE KEYS */;
/*!40000 ALTER TABLE `gasstation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `inventory`
--

DROP TABLE IF EXISTS `inventory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `inventory` (
  `user_id` int(255) NOT NULL,
  `item_id` int(255) NOT NULL,
  `quantity` int(255) NOT NULL,
  PRIMARY KEY (`user_id`,`item_id`),
  KEY `item_id` (`item_id`),
  CONSTRAINT `inventory_ibfk_1` FOREIGN KEY (`item_id`) REFERENCES `items` (`item_id`),
  CONSTRAINT `inventory_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `inventory`
--

LOCK TABLES `inventory` WRITE;
/*!40000 ALTER TABLE `inventory` DISABLE KEYS */;
/*!40000 ALTER TABLE `inventory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `items`
--

DROP TABLE IF EXISTS `items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `items` (
  `item_id` int(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  PRIMARY KEY (`item_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `items`
--

LOCK TABLES `items` WRITE;
/*!40000 ALTER TABLE `items` DISABLE KEYS */;
INSERT INTO `items` VALUES (1,'Maria','Ilegal - Planta utilizada para fabricar Droga'),(2,'Maria Refinada','Maria refinada casi lista para vender'),(3,'Piedra','Piedra recogida de la cantera'),(4,'Bronce','Metal poco valioso'),(5,'Plata','Metal precioso con algo de valor'),(6,'Oro','Metal precioso con mucho valor'),(7,'Diamante','Piedra preciosa que tiene muchísimo valor');
/*!40000 ALTER TABLE `items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(255) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `ip` varchar(255) NOT NULL,
  `regdate` varchar(255) NOT NULL,
  `logdate` varchar(255) DEFAULT NULL,
  `position` text,
  `lang` varchar(10) NOT NULL DEFAULT 'eng',
  `health` int(3) NOT NULL DEFAULT '100',
  `adminlvl` int(2) NOT NULL DEFAULT '0',
  `loyality` int(255) NOT NULL DEFAULT '0',
  `socialclub` varchar(255) NOT NULL,
  `dni` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'njpa382@gmail.com','larguirucho','black','beb03b90bb50b3e7190ab9915a9ce95e','37.223.178.224','12/25/2019, 1:21:49 PM','1/4/2020, 7:48:48 PM','{\"x\":408.1,\"y\":-979,\"z\":29,\"rot\":200.8,\"dim\":0}','eng',100,1,12,'Larguirucho382','1D8FB1-B'),(2,'19arg09@gmail.com','Doggenn','Philips','075f3ad79e25b3cb46c909859ba9c2ad','85.58.217.172','12/26/2019, 6:02:58 PM','1/3/2020, 7:19:24 PM','{\"x\":-127.1,\"y\":-650.9,\"z\":41.7,\"rot\":339.6,\"dim\":0}','eng',99,1,27,'DOGGENN_ES','1D8FB2-Q'),(3,'gugunono88@gmail.com','gugun','Red','6dca1a4de610d4ea7e567cbe1b0a3b55','81.36.158.61','12/27/2019, 12:23:09 PM','1/3/2020, 3:19:00 PM','{\"x\":426.4,\"y\":-1020.7,\"z\":29.1,\"rot\":177.3,\"dim\":0}','eng',100,1,10,'valdamis',NULL),(4,'escobar.novoa.ariel@gmail.com','Bazra','White','072dc26f9d275a5a2fb65b25f94b422b','190.46.0.79','12/27/2019, 12:43:43 PM','1/4/2020, 6:56:13 PM','{\"x\":109.8,\"y\":-815.6,\"z\":30.7,\"rot\":65.8,\"dim\":0}','eng',100,1,2,'Bazra96','1D8FB4-E'),(5,'cesarmanuelrodriguezgonzalez@gmail.com','Chester','Field','0b5efdf8c136f7217ea6f9462975a3ed','90.171.147.157','12/27/2019, 5:34:38 PM','1/3/2020, 6:24:25 PM','{\"x\":404.7,\"y\":-981.1,\"z\":29.4,\"rot\":294.9,\"dim\":0}','eng',100,1,0,'Tiodeincognito','1D8FB5-R'),(6,'miguelrl.92@gmail.com','LeuGiiM','GolD','b00c566efea4f2f9ff4e97e68f947e05','37.11.5.22','12/27/2019, 8:15:43 PM','12/29/2019, 3:47:22 PM','{\"x\":224.3,\"y\":-760.6,\"z\":30.9,\"rot\":25.9,\"dim\":0}','eng',100,1,0,'LeuGiiM92',NULL),(7,'enekod.7@gmail.com','Diego','Lopez','b40225e73906899fe6f88e9cfadbfba3','85.86.86.103','12/31/2019, 6:26:46 AM','12/31/2019, 6:59:28 AM','{\"x\":2213.4,\"y\":5577.2,\"z\":53.9,\"rot\":169.7,\"dim\":0}','eng',50,0,7,'Gren73',NULL),(8,'davizonybea@hotmail.com','SVEN','DE PRADO','4c8f3114d1d0472a975a3a2f3979447a','94.73.56.184','1/2/2020, 5:52:18 PM','1/2/2020, 8:57:07 PM','{\"x\":-557.8,\"y\":-319.1,\"z\":35.2,\"rot\":39.8,\"dim\":0}','eng',100,1,0,'sven71roll',NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usersBody`
--

DROP TABLE IF EXISTS `usersBody`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `usersBody` (
  `id` int(255) NOT NULL AUTO_INCREMENT,
  `gender` varchar(1) DEFAULT NULL,
  `skindata` text,
  `facedata` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usersBody`
--

LOCK TABLES `usersBody` WRITE;
/*!40000 ALTER TABLE `usersBody` DISABLE KEYS */;
INSERT INTO `usersBody` VALUES (1,'m','[11,22,2,0.75]','[0,0,0,0,0,0,0,0,0,0,0,0.03,-0.52,0,0,0,0,0,0,0.03]'),(2,'m','[17,21,0,0.05]','[0.49,0.85,0.73,0.78,0.75,-0.95,-0.49,0.27,0.93,-1,0.03,0.62,-0.25,-1,-0.95,0,0,0,0]'),(3,'m','[0,21,12,0.5]','[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]'),(4,'m','[4,31,6,0.5]','[0,0,0,0,0,0,0.11,0,0,-0.01,0,0.05,0.29,0,0,-0.21,0,0,-0.51]'),(5,'m','[19,37,8,0.1]','[0,0,0,0,0,0,0,0,0,0,0,0,0.01,0,0,0,0,0,0]'),(6,'m','[8,37,0,0.4]','[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]'),(7,'m','[0,22,4,0.55]','[-0.39,0.74,-0.65,-0.53,-0.65,0,0,-0.89,0.71,0,0.96,-1,0,0,-0.92,0.88,-0.76,0.78,0,-0.88]'),(8,'m','[20,26,5,0.55]','[0.82,0,0,0,0,0,0,0.05,0.04,0,0,0.69,0.52,-0.4,0.05,0,0,0,0]');
/*!40000 ALTER TABLE `usersBody` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usersClothes`
--

DROP TABLE IF EXISTS `usersClothes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `usersClothes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `hats` text,
  `glasses` text,
  `tops` text,
  `legs` text,
  `feet` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usersClothes`
--

LOCK TABLES `usersClothes` WRITE;
/*!40000 ALTER TABLE `usersClothes` DISABLE KEYS */;
INSERT INTO `usersClothes` VALUES (1,'{\"number\":0,\"color\":0}','{\"number\":1,\"color\":1}','{\"number\":4,\"color\":2,\"underColor\":0}','{\"number\":0,\"color\":0}','{\"number\":1,\"color\":0}'),(2,'{\"number\":0,\"color\":0}','{\"number\":0,\"color\":0}','{\"number\":4,\"color\":0,\"underColor\":0}','{\"number\":3,\"color\":0}','{\"number\":2,\"color\":1}'),(3,'{\"number\":0,\"color\":0}','{\"number\":0,\"color\":0}','{\"number\":3,\"color\":13,\"underColor\":0}','{\"number\":1,\"color\":0}','{\"number\":2,\"color\":1}'),(4,'{\"number\":0,\"color\":0}','{\"number\":0,\"color\":0}','{\"number\":4,\"color\":2,\"underColor\":0}','{\"number\":3,\"color\":2}','{\"number\":0,\"color\":0}'),(5,'{\"number\":0,\"color\":0}','{\"number\":0,\"color\":0}','{\"number\":0,\"color\":0,\"underColor\":0}','{\"number\":0,\"color\":0}','{\"number\":0,\"color\":0}'),(6,'{\"number\":0,\"color\":0}','{\"number\":0,\"color\":0}','{\"number\":0,\"color\":0,\"underColor\":0}','{\"number\":0,\"color\":0}','{\"number\":0,\"color\":0}'),(7,'{\"number\":0,\"color\":0}','{\"number\":0,\"color\":0}','{\"number\":0,\"color\":0,\"underColor\":0}','{\"number\":0,\"color\":0}','{\"number\":0,\"color\":0}'),(8,'{\"number\":0,\"color\":0}','{\"number\":2,\"color\":4}','{\"number\":2,\"color\":2,\"underColor\":0}','{\"number\":1,\"color\":0}','{\"number\":0,\"color\":2}');
/*!40000 ALTER TABLE `usersClothes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usersGarages`
--

DROP TABLE IF EXISTS `usersGarages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `usersGarages` (
  `user_id` int(11) NOT NULL,
  `garage_id` int(11) NOT NULL,
  PRIMARY KEY (`user_id`,`garage_id`),
  KEY `garage_id` (`garage_id`),
  CONSTRAINT `usersGarages_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `usersGarages_ibfk_2` FOREIGN KEY (`garage_id`) REFERENCES `garageinformation` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usersGarages`
--

LOCK TABLES `usersGarages` WRITE;
/*!40000 ALTER TABLE `usersGarages` DISABLE KEYS */;
INSERT INTO `usersGarages` VALUES (1,1),(2,1),(3,1),(4,1),(5,1),(2,2),(1,3),(3,3);
/*!40000 ALTER TABLE `usersGarages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usersHeadOverlay`
--

DROP TABLE IF EXISTS `usersHeadOverlay`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `usersHeadOverlay` (
  `id` int(255) NOT NULL AUTO_INCREMENT,
  `hair` tinyint(2) NOT NULL,
  `hairColor` text NOT NULL,
  `brow` text NOT NULL,
  `beard` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usersHeadOverlay`
--

LOCK TABLES `usersHeadOverlay` WRITE;
/*!40000 ALTER TABLE `usersHeadOverlay` DISABLE KEYS */;
INSERT INTO `usersHeadOverlay` VALUES (1,8,'{\"c1\":1,\"c2\":1}','{\"s\":1,\"o\":9}','{\"s\":20,\"o\":10}'),(2,2,'{\"c1\":0,\"c2\":59}','{\"s\":30,\"o\":0}','{\"s\":10,\"o\":8}'),(3,10,'{\"c1\":1,\"c2\":62}','{\"s\":4,\"o\":2}','{\"s\":10,\"o\":7}'),(4,2,'{\"c1\":1,\"c2\":4}','{\"s\":1,\"o\":10}','{\"s\":10,\"o\":10}'),(5,15,'{\"c1\":56,\"c2\":14}','{\"s\":30,\"o\":0}','{\"s\":13,\"o\":0}'),(6,15,'{\"c1\":41,\"c2\":12}','{\"s\":22,\"o\":0}','{\"s\":12,\"o\":0}'),(7,15,'{\"c1\":7,\"c2\":39}','{\"s\":26,\"o\":0}','{\"s\":26,\"o\":0}'),(8,15,'{\"c1\":57,\"c2\":19}','{\"s\":25,\"o\":0}','{\"s\":18,\"o\":0}');
/*!40000 ALTER TABLE `usersHeadOverlay` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usersJail`
--

DROP TABLE IF EXISTS `usersJail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `usersJail` (
  `id` int(255) NOT NULL AUTO_INCREMENT,
  `inside` tinyint(1) NOT NULL DEFAULT '0',
  `time` int(255) NOT NULL DEFAULT '0',
  `violations` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usersJail`
--

LOCK TABLES `usersJail` WRITE;
/*!40000 ALTER TABLE `usersJail` DISABLE KEYS */;
INSERT INTO `usersJail` VALUES (1,0,0,'[{\"time\":5,\"comment\":\"You killed a civilian\"},{\"time\":5,\"comment\":\"You killed a civilian\"},{\"time\":5,\"comment\":\"You killed a civilian\"},{\"time\":5,\"comment\":\"You killed a civilian\"},{\"time\":5,\"comment\":\"You killed a civilian\"}]'),(2,0,0,'[]'),(3,0,0,'[{\"time\":5,\"comment\":\"You killed a civilian\"},{\"time\":5,\"comment\":\"You killed a civilian\"},{\"time\":5,\"comment\":\"You killed a civilian\"},{\"time\":5,\"comment\":\"You killed a civilian\"},{\"time\":5,\"comment\":\"You killed a civilian\"},{\"time\":5,\"comment\":\"You killed a civilian\"}]'),(4,0,0,'[{\"time\":5,\"comment\":\"You killed a civilian\"},{\"time\":5,\"comment\":\"You killed a civilian\"},{\"time\":5,\"comment\":\"You killed a civilian\"},{\"time\":5,\"comment\":\"You killed a civilian\"},{\"time\":5,\"comment\":\"You killed a civilian\"},{\"time\":5,\"comment\":\"You killed a civilian\"},{\"time\":5,\"comment\":\"You killed a civilian\"},{\"time\":5,\"comment\":\"You killed a civilian\"},{\"time\":5,\"comment\":\"You killed a civilian\"},{\"time\":5,\"comment\":\"You killed a civilian\"},{\"time\":5,\"comment\":\"You killed a civilian\"},{\"time\":5,\"comment\":\"You killed a civilian\"},{\"time\":5,\"comment\":\"You killed a civilian\"},{\"time\":5,\"comment\":\"You killed a civilian\"},{\"time\":5,\"comment\":\"You killed a civilian\"},{\"time\":5,\"comment\":\"You killed a civilian\"}]'),(5,0,0,'[{\"time\":5,\"comment\":\"You killed a civilian\"},{\"time\":5,\"comment\":\"You killed a civilian\"},{\"time\":5,\"comment\":\"You killed a civilian\"},{\"time\":5,\"comment\":\"You killed a civilian\"},{\"time\":5,\"comment\":\"You killed a civilian\"}]'),(6,0,0,'[]'),(7,0,0,'[]'),(8,0,0,'[]');
/*!40000 ALTER TABLE `usersJail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usersMoney`
--

DROP TABLE IF EXISTS `usersMoney`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `usersMoney` (
  `id` int(255) NOT NULL AUTO_INCREMENT,
  `cash` bigint(255) NOT NULL DEFAULT '1500',
  `bank` bigint(255) NOT NULL DEFAULT '0',
  `tax` bigint(255) NOT NULL DEFAULT '0',
  `fines` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usersMoney`
--

LOCK TABLES `usersMoney` WRITE;
/*!40000 ALTER TABLE `usersMoney` DISABLE KEYS */;
INSERT INTO `usersMoney` VALUES (1,318050,1,30000,'[{\"date\":\"12/29/2019, 7:59:57 PM\",\"val\":40,\"txt\":\"Transfer to Hospital\"},{\"date\":\"12/29/2019, 8:04:08 PM\",\"val\":43,\"txt\":\"Transfer to Hospital\"},{\"date\":\"12/29/2019, 8:04:31 PM\",\"val\":42,\"txt\":\"Transfer to Hospital\"},{\"date\":\"12/29/2019, 8:05:58 PM\",\"val\":43,\"txt\":\"Transfer to Hospital\"},{\"date\":\"12/29/2019, 8:08:22 PM\",\"val\":43,\"txt\":\"Transfer to Hospital\"},{\"date\":\"12/29/2019, 8:08:39 PM\",\"val\":64,\"txt\":\"Transfer to Hospital\"},{\"date\":\"12/29/2019, 8:08:57 PM\",\"val\":64,\"txt\":\"Transfer to Hospital\"},{\"date\":\"12/29/2019, 8:10:42 PM\",\"val\":43,\"txt\":\"Transfer to Hospital\"},{\"date\":\"12/29/2019, 8:13:23 PM\",\"val\":40,\"txt\":\"Transfer to Hospital\"},{\"date\":\"12/29/2019, 8:15:48 PM\",\"val\":48,\"txt\":\"Transfer to Hospital\"},{\"date\":\"12/29/2019, 8:18:18 PM\",\"val\":57,\"txt\":\"Transfer to Hospital\"},{\"date\":\"12/29/2019, 8:24:38 PM\",\"val\":43,\"txt\":\"Transfer to Hospital\"},{\"date\":\"12/29/2019, 8:25:08 PM\",\"val\":42,\"txt\":\"Transfer to Hospital\"},{\"date\":\"12/29/2019, 8:25:42 PM\",\"val\":42,\"txt\":\"Transfer to Hospital\"},{\"date\":\"12/29/2019, 8:25:55 PM\",\"val\":42,\"txt\":\"Transfer to Hospital\"},{\"date\":\"12/29/2019, 8:26:24 PM\",\"val\":43,\"txt\":\"Transfer to Hospital\"},{\"date\":\"12/29/2019, 8:27:14 PM\",\"val\":42,\"txt\":\"Transfer to Hospital\"},{\"date\":\"12/29/2019, 8:27:49 PM\",\"val\":42,\"txt\":\"Transfer to Hospital\"},{\"date\":\"12/29/2019, 8:28:05 PM\",\"val\":42,\"txt\":\"Transfer to Hospital\"},{\"date\":\"12/29/2019, 8:28:44 PM\",\"val\":43,\"txt\":\"Transfer to Hospital\"},{\"date\":\"12/29/2019, 8:29:43 PM\",\"val\":45,\"txt\":\"Transfer to Hospital\"},{\"date\":\"12/29/2019, 8:29:54 PM\",\"val\":64,\"txt\":\"Transfer to Hospital\"},{\"date\":\"12/29/2019, 8:30:05 PM\",\"val\":64,\"txt\":\"Transfer to Hospital\"},{\"date\":\"12/29/2019, 8:30:24 PM\",\"val\":42,\"txt\":\"Transfer to Hospital\"},{\"date\":\"12/29/2019, 8:34:09 PM\",\"val\":40,\"txt\":\"Transfer to Hospital\"},{\"date\":\"12/29/2019, 8:35:12 PM\",\"val\":44,\"txt\":\"Transfer to Hospital\"},{\"date\":\"12/29/2019, 8:35:34 PM\",\"val\":43,\"txt\":\"Transfer to Hospital\"},{\"date\":\"12/29/2019, 8:37:10 PM\",\"val\":42,\"txt\":\"Transfer to Hospital\"},{\"date\":\"12/30/2019, 4:41:39 PM\",\"val\":70,\"txt\":\"Transfer to Hospital\"},{\"date\":\"1/3/2020, 2:29:34 PM\",\"val\":47,\"txt\":\"Transfer to Hospital\"},{\"date\":\"1/3/2020, 4:49:30 PM\",\"val\":57,\"txt\":\"Transfer to Hospital\"}]'),(2,472800,0,0,'[{\"date\":\"12/27/2019, 8:02:14 PM\",\"val\":45,\"txt\":\"Transfer to Hospital\"},{\"date\":\"12/27/2019, 8:09:43 PM\",\"val\":3,\"txt\":\"Transfer to Hospital\"},{\"date\":\"12/28/2019, 7:20:22 PM\",\"val\":43,\"txt\":\"Transfer to Hospital\"},{\"date\":\"1/2/2020, 6:39:17 PM\",\"val\":41,\"txt\":\"Transfer to Hospital\"}]'),(3,12230,570650,0,'[{\"date\":\"12/27/2019, 3:17:36 PM\",\"val\":57,\"txt\":\"Transfer to Hospital\"},{\"date\":\"12/29/2019, 5:01:41 PM\",\"val\":28,\"txt\":\"Transfer to Hospital\"},{\"date\":\"12/29/2019, 7:57:35 PM\",\"val\":42,\"txt\":\"Transfer to Hospital\"},{\"date\":\"12/29/2019, 8:00:44 PM\",\"val\":43,\"txt\":\"Transfer to Hospital\"},{\"date\":\"12/29/2019, 8:02:00 PM\",\"val\":41,\"txt\":\"Transfer to Hospital\"},{\"date\":\"12/29/2019, 8:03:03 PM\",\"val\":43,\"txt\":\"Transfer to Hospital\"},{\"date\":\"12/29/2019, 8:07:11 PM\",\"val\":42,\"txt\":\"Transfer to Hospital\"},{\"date\":\"12/29/2019, 8:08:39 PM\",\"val\":64,\"txt\":\"Transfer to Hospital\"},{\"date\":\"12/29/2019, 8:08:57 PM\",\"val\":64,\"txt\":\"Transfer to Hospital\"},{\"date\":\"12/29/2019, 8:09:14 PM\",\"val\":64,\"txt\":\"Transfer to Hospital\"},{\"date\":\"12/29/2019, 8:11:27 PM\",\"val\":42,\"txt\":\"Transfer to Hospital\"},{\"date\":\"12/29/2019, 8:13:13 PM\",\"val\":43,\"txt\":\"Transfer to Hospital\"},{\"date\":\"12/29/2019, 8:15:48 PM\",\"val\":48,\"txt\":\"Transfer to Hospital\"},{\"date\":\"12/29/2019, 8:18:34 PM\",\"val\":55,\"txt\":\"Transfer to Hospital\"},{\"date\":\"12/29/2019, 8:23:38 PM\",\"val\":41,\"txt\":\"Transfer to Hospital\"},{\"date\":\"12/29/2019, 8:23:54 PM\",\"val\":64,\"txt\":\"Transfer to Hospital\"},{\"date\":\"12/29/2019, 8:24:05 PM\",\"val\":64,\"txt\":\"Transfer to Hospital\"},{\"date\":\"12/29/2019, 8:24:16 PM\",\"val\":64,\"txt\":\"Transfer to Hospital\"},{\"date\":\"12/29/2019, 8:25:22 PM\",\"val\":42,\"txt\":\"Transfer to Hospital\"},{\"date\":\"12/29/2019, 8:26:30 PM\",\"val\":44,\"txt\":\"Transfer to Hospital\"},{\"date\":\"12/29/2019, 8:30:44 PM\",\"val\":44,\"txt\":\"Transfer to Hospital\"},{\"date\":\"12/29/2019, 8:30:55 PM\",\"val\":64,\"txt\":\"Transfer to Hospital\"},{\"date\":\"12/29/2019, 8:32:19 PM\",\"val\":43,\"txt\":\"Transfer to Hospital\"},{\"date\":\"12/29/2019, 8:32:31 PM\",\"val\":64,\"txt\":\"Transfer to Hospital\"},{\"date\":\"12/29/2019, 8:35:45 PM\",\"val\":43,\"txt\":\"Transfer to Hospital\"},{\"date\":\"12/29/2019, 8:41:01 PM\",\"val\":43,\"txt\":\"Transfer to Hospital\"},{\"date\":\"12/30/2019, 11:06:37 AM\",\"val\":41,\"txt\":\"Transfer to Hospital\"},{\"date\":\"12/30/2019, 12:03:29 PM\",\"val\":229,\"txt\":\"Transfer to Hospital\"},{\"date\":\"12/30/2019, 12:27:35 PM\",\"val\":43,\"txt\":\"Transfer to Hospital\"},{\"date\":\"12/30/2019, 12:39:22 PM\",\"val\":45,\"txt\":\"Transfer to Hospital\"},{\"date\":\"12/30/2019, 12:41:36 PM\",\"val\":41,\"txt\":\"Transfer to Hospital\"},{\"date\":\"12/30/2019, 12:45:47 PM\",\"val\":40,\"txt\":\"Transfer to Hospital\"},{\"date\":\"12/30/2019, 12:50:48 PM\",\"val\":40,\"txt\":\"Transfer to Hospital\"},{\"date\":\"12/30/2019, 12:56:41 PM\",\"val\":45,\"txt\":\"Transfer to Hospital\"},{\"date\":\"12/30/2019, 12:59:48 PM\",\"val\":44,\"txt\":\"Transfer to Hospital\"},{\"date\":\"12/30/2019, 1:00:05 PM\",\"val\":64,\"txt\":\"Transfer to Hospital\"},{\"date\":\"12/30/2019, 1:00:16 PM\",\"val\":64,\"txt\":\"Transfer to Hospital\"},{\"date\":\"12/30/2019, 1:00:28 PM\",\"val\":64,\"txt\":\"Transfer to Hospital\"},{\"date\":\"12/30/2019, 1:00:53 PM\",\"val\":64,\"txt\":\"Transfer to Hospital\"},{\"date\":\"12/30/2019, 1:01:29 PM\",\"val\":64,\"txt\":\"Transfer to Hospital\"},{\"date\":\"12/30/2019, 1:01:51 PM\",\"val\":64,\"txt\":\"Transfer to Hospital\"},{\"date\":\"12/30/2019, 1:05:18 PM\",\"val\":2,\"txt\":\"Transfer to Hospital\"},{\"date\":\"12/30/2019, 1:07:10 PM\",\"val\":1,\"txt\":\"Transfer to Hospital\"},{\"date\":\"12/30/2019, 1:12:58 PM\",\"val\":4,\"txt\":\"Transfer to Hospital\"},{\"date\":\"12/30/2019, 1:15:51 PM\",\"val\":8,\"txt\":\"Transfer to Hospital\"},{\"date\":\"12/30/2019, 1:18:01 PM\",\"val\":43,\"txt\":\"Transfer to Hospital\"},{\"date\":\"12/30/2019, 2:16:35 PM\",\"val\":42,\"txt\":\"Transfer to Hospital\"},{\"date\":\"12/30/2019, 3:12:29 PM\",\"val\":43,\"txt\":\"Transfer to Hospital\"},{\"date\":\"12/31/2019, 10:04:31 AM\",\"val\":42,\"txt\":\"Transfer to Hospital\"},{\"date\":\"12/31/2019, 10:29:22 AM\",\"val\":368,\"txt\":\"Transfer to Hospital\"},{\"date\":\"12/31/2019, 1:54:17 PM\",\"val\":43,\"txt\":\"Transfer to Hospital\"},{\"date\":\"12/31/2019, 6:38:10 PM\",\"val\":24,\"txt\":\"Transfer to Hospital\"},{\"date\":\"12/31/2019, 6:46:34 PM\",\"val\":208,\"txt\":\"Transfer to Hospital\"},{\"date\":\"1/2/2020, 7:01:01 PM\",\"val\":56,\"txt\":\"Transfer to Hospital\"},{\"date\":\"1/2/2020, 8:53:25 PM\",\"val\":43,\"txt\":\"Transfer to Hospital\"},{\"date\":\"1/3/2020, 12:47:02 PM\",\"val\":26,\"txt\":\"Transfer to Hospital\"},{\"date\":\"1/3/2020, 1:03:12 PM\",\"val\":26,\"txt\":\"Transfer to Hospital\"},{\"date\":\"1/3/2020, 2:29:59 PM\",\"val\":47,\"txt\":\"Transfer to Hospital\"}]'),(4,0,546695,0,'[{\"date\":\"12/28/2019, 7:27:41 PM\",\"val\":43,\"txt\":\"Transfer to Hospital\"},{\"date\":\"12/29/2019, 8:02:58 PM\",\"val\":44,\"txt\":\"Transfer to Hospital\"},{\"date\":\"12/29/2019, 8:03:18 PM\",\"val\":64,\"txt\":\"Transfer to Hospital\"},{\"date\":\"12/29/2019, 8:20:47 PM\",\"val\":42,\"txt\":\"Transfer to Hospital\"},{\"date\":\"12/29/2019, 8:23:16 PM\",\"val\":40,\"txt\":\"Transfer to Hospital\"},{\"date\":\"12/29/2019, 8:26:11 PM\",\"val\":44,\"txt\":\"Transfer to Hospital\"},{\"date\":\"12/29/2019, 8:27:15 PM\",\"val\":42,\"txt\":\"Transfer to Hospital\"},{\"date\":\"12/29/2019, 8:29:25 PM\",\"val\":46,\"txt\":\"Transfer to Hospital\"},{\"date\":\"12/29/2019, 8:31:04 PM\",\"val\":43,\"txt\":\"Transfer to Hospital\"},{\"date\":\"12/29/2019, 8:32:00 PM\",\"val\":42,\"txt\":\"Transfer to Hospital\"},{\"date\":\"12/29/2019, 8:34:46 PM\",\"val\":42,\"txt\":\"Transfer to Hospital\"},{\"date\":\"12/30/2019, 12:37:58 PM\",\"val\":42,\"txt\":\"Transfer to Hospital\"},{\"date\":\"12/30/2019, 12:43:56 PM\",\"val\":42,\"txt\":\"Transfer to Hospital\"},{\"date\":\"12/31/2019, 9:46:32 AM\",\"val\":36,\"txt\":\"Transfer to Hospital\"},{\"date\":\"12/31/2019, 9:56:35 AM\",\"val\":44,\"txt\":\"Transfer to Hospital\"},{\"date\":\"12/31/2019, 10:06:07 AM\",\"val\":64,\"txt\":\"Transfer to Hospital\"},{\"date\":\"1/3/2020, 12:50:47 PM\",\"val\":26,\"txt\":\"Transfer to Hospital\"},{\"date\":\"1/3/2020, 12:52:03 PM\",\"val\":35,\"txt\":\"Transfer to Hospital\"},{\"date\":\"1/3/2020, 12:54:25 PM\",\"val\":91,\"txt\":\"Transfer to Hospital\"},{\"date\":\"1/3/2020, 1:03:09 PM\",\"val\":28,\"txt\":\"Transfer to Hospital\"},{\"date\":\"1/3/2020, 1:05:55 PM\",\"val\":56,\"txt\":\"Transfer to Hospital\"},{\"date\":\"1/3/2020, 1:16:06 PM\",\"val\":38,\"txt\":\"Transfer to Hospital\"},{\"date\":\"1/3/2020, 2:34:35 PM\",\"val\":57,\"txt\":\"Transfer to Hospital\"},{\"date\":\"1/3/2020, 4:52:55 PM\",\"val\":56,\"txt\":\"Transfer to Hospital\"}]'),(5,500000,11500,0,'[{\"date\":\"1/3/2020, 2:30:25 PM\",\"val\":47,\"txt\":\"Transfer to Hospital\"}]'),(6,500000,1,0,'[{\"date\":\"12/29/2019, 2:16:25 PM\",\"val\":19,\"txt\":\"Transfer to Hospital\"},{\"date\":\"12/29/2019, 2:19:03 PM\",\"val\":64,\"txt\":\"Transfer to Hospital\"},{\"date\":\"12/29/2019, 2:19:18 PM\",\"val\":64,\"txt\":\"Transfer to Hospital\"},{\"date\":\"12/29/2019, 2:19:44 PM\",\"val\":64,\"txt\":\"Transfer to Hospital\"},{\"date\":\"12/29/2019, 2:20:04 PM\",\"val\":64,\"txt\":\"Transfer to Hospital\"},{\"date\":\"12/29/2019, 2:20:17 PM\",\"val\":64,\"txt\":\"Transfer to Hospital\"},{\"date\":\"12/29/2019, 2:21:09 PM\",\"val\":41,\"txt\":\"Transfer to Hospital\"}]'),(7,500000,11900,0,'[]'),(8,445960,0,0,'[{\"date\":\"1/2/2020, 7:46:09 PM\",\"val\":57,\"txt\":\"Transfer to Hospital\"}]');
/*!40000 ALTER TABLE `usersMoney` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usersfaction`
--

DROP TABLE IF EXISTS `usersfaction`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `usersfaction` (
  `user_id` int(11) NOT NULL,
  `faction_id` int(11) NOT NULL,
  `rank` int(11) NOT NULL,
  KEY `faction_id` (`faction_id`),
  CONSTRAINT `usersfaction_ibfk_1` FOREIGN KEY (`faction_id`) REFERENCES `factions` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usersfaction`
--

LOCK TABLES `usersfaction` WRITE;
/*!40000 ALTER TABLE `usersfaction` DISABLE KEYS */;
INSERT INTO `usersfaction` VALUES (1,1,10),(3,1,10),(4,1,10),(5,1,10),(8,1,10),(2,1,10);
/*!40000 ALTER TABLE `usersfaction` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vehicles`
--

DROP TABLE IF EXISTS `vehicles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `vehicles` (
  `id` int(255) NOT NULL AUTO_INCREMENT,
  `model` varchar(255) NOT NULL,
  `title` varchar(255) NOT NULL,
  `fuel` float NOT NULL,
  `fuelTank` int(255) NOT NULL,
  `fuelRate` int(255) NOT NULL,
  `price` int(255) NOT NULL,
  `ownerId` int(255) NOT NULL,
  `whoCanOpen` text NOT NULL,
  `factionName` varchar(255) DEFAULT NULL,
  `primaryColor` text NOT NULL,
  `secondaryColor` text NOT NULL,
  `numberPlate` varchar(10) NOT NULL,
  `coord` text NOT NULL,
  `ingarage` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vehicles`
--

LOCK TABLES `vehicles` WRITE;
/*!40000 ALTER TABLE `vehicles` DISABLE KEYS */;
INSERT INTO `vehicles` VALUES (1,'peyote','Vapid Peyote',43.991,45,11,20000,5,'[5]',NULL,'[236,141,108]','[236,141,108]','QZIS5N5A','{\"x\":-160.1,\"y\":-646.6,\"z\":31.7,\"rot\":28.5,\"dim\":0}',0),(2,'peyote','Vapid Peyote',44.03,45,11,20000,1,'[1]',NULL,'[121,139,247]','[121,139,247]','M7391VY5','{\"x\":225,\"y\":-754.1,\"z\":30.2,\"rot\":344.1,\"dim\":0}',1),(3,'dilettante','Karin Dilettante',34.845,40,2,25000,6,'[6]',NULL,'[20,117,202]','[20,117,202]','WTPWS20M','{\"x\":228.3,\"y\":-762.8,\"z\":30.3,\"rot\":101.7,\"dim\":0}',0),(5,'dloader','Bravado Duneloader',77.884,80,25,20000,1,'[1]',NULL,'[111,104,130]','[111,104,130]','0VOF1VL','{\"x\":226.1,\"y\":-755.3,\"z\":30.5,\"rot\":16.2,\"dim\":0}',1),(8,'blista','Dinka Blista',42.494,45,6,45000,2,'[2]',NULL,'[149,229,215]','[149,229,215]','68KRA9Y4','{\"x\":-821.6,\"y\":-329.7,\"z\":36.9,\"rot\":149.3,\"dim\":0}',0),(12,'radi','Vapid Radius',43.169,50,13,145000,3,'[3]',NULL,'[152,92,205]','[152,92,205]','6P9CSV3N','{\"x\":452.4,\"y\":-997.3,\"z\":25.3,\"rot\":358.4,\"dim\":0}',1),(14,'issi2','Weeny Issi',45.666,50,7,40000,3,'[3]',NULL,'[124,121,151]','[124,121,151]','3GK393K2','{\"x\":224.8,\"y\":-755.8,\"z\":30.5,\"rot\":337.8,\"dim\":0}',1),(15,'buccaneer','Albany Buccaneer',69.824,75,35,130000,2,'[2]',NULL,'[63,182,140]','[63,182,140]','2KHG18','{\"x\":225.6,\"y\":-755.5,\"z\":30.2,\"rot\":9.2,\"dim\":0}',1),(16,'rhapsody','DeClasse Rhapsody',49.203,50,7,55000,5,'[5]',NULL,'[126,140,211]','[126,140,211]','K796LXDM','{\"x\":407.3,\"y\":-989,\"z\":29,\"rot\":236.5,\"dim\":0}',0),(17,'moonbeam','Declasse Moonbeam',69.504,70,25,40000,8,'[8]',NULL,'[227,34,66]','[227,34,66]','LYPNHGWS','{\"x\":-5.7,\"y\":-950.1,\"z\":29,\"rot\":300.3,\"dim\":0}',NULL),(19,'fbi','Willard Faction',67.741,70,25,140000,1,'[1]',NULL,'[0,0,0]','[0,0,0]','S4351HS0','{\"x\":408.1,\"y\":-979,\"z\":28.9,\"rot\":226.5,\"dim\":0}',0),(21,'buccaneer','Albany Buccaneer',75,75,35,130000,4,'[4]',NULL,'[86,209,68]','[86,209,68]','DEN954DT','{\"x\":225.1,\"y\":-755.3,\"z\":30.2,\"rot\":347.6,\"dim\":0}',1);
/*!40000 ALTER TABLE `vehicles` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-01-04 19:48:52
