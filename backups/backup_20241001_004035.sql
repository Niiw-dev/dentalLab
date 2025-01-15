-- MySQL dump 10.13  Distrib 9.0.1, for Win64 (x86_64)
--
-- Host: localhost    Database: dental3
-- ------------------------------------------------------
-- Server version	9.0.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `auth_group`
--

DROP TABLE IF EXISTS `auth_group`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_group` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(150) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_group`
--

LOCK TABLES `auth_group` WRITE;
/*!40000 ALTER TABLE `auth_group` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_group` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_group_permissions`
--

DROP TABLE IF EXISTS `auth_group_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_group_permissions` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `group_id` int NOT NULL,
  `permission_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_group_permissions_group_id_permission_id_0cd325b0_uniq` (`group_id`,`permission_id`),
  KEY `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` (`permission_id`),
  CONSTRAINT `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  CONSTRAINT `auth_group_permissions_group_id_b120cbf9_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_group_permissions`
--

LOCK TABLES `auth_group_permissions` WRITE;
/*!40000 ALTER TABLE `auth_group_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_group_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_permission`
--

DROP TABLE IF EXISTS `auth_permission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_permission` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `content_type_id` int NOT NULL,
  `codename` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_permission_content_type_id_codename_01ab375a_uniq` (`content_type_id`,`codename`),
  CONSTRAINT `auth_permission_content_type_id_2f476e4b_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_permission`
--

LOCK TABLES `auth_permission` WRITE;
/*!40000 ALTER TABLE `auth_permission` DISABLE KEYS */;
INSERT INTO `auth_permission` VALUES (1,'Can add log entry',1,'add_logentry'),(2,'Can change log entry',1,'change_logentry'),(3,'Can delete log entry',1,'delete_logentry'),(4,'Can view log entry',1,'view_logentry'),(5,'Can add permission',2,'add_permission'),(6,'Can change permission',2,'change_permission'),(7,'Can delete permission',2,'delete_permission'),(8,'Can view permission',2,'view_permission'),(9,'Can add group',3,'add_group'),(10,'Can change group',3,'change_group'),(11,'Can delete group',3,'delete_group'),(12,'Can view group',3,'view_group'),(13,'Can add content type',4,'add_contenttype'),(14,'Can change content type',4,'change_contenttype'),(15,'Can delete content type',4,'delete_contenttype'),(16,'Can view content type',4,'view_contenttype'),(17,'Can add session',5,'add_session'),(18,'Can change session',5,'change_session'),(19,'Can delete session',5,'delete_session'),(20,'Can view session',5,'view_session'),(21,'Can add inventario',6,'add_inventario'),(22,'Can change inventario',6,'change_inventario'),(23,'Can delete inventario',6,'delete_inventario'),(24,'Can view inventario',6,'view_inventario'),(25,'Can add user profile',7,'add_userprofile'),(26,'Can change user profile',7,'change_userprofile'),(27,'Can delete user profile',7,'delete_userprofile'),(28,'Can view user profile',7,'view_userprofile'),(29,'Can add fecha',8,'add_fecha'),(30,'Can change fecha',8,'change_fecha'),(31,'Can delete fecha',8,'delete_fecha'),(32,'Can view fecha',8,'view_fecha'),(33,'Can add cita',9,'add_cita'),(34,'Can change cita',9,'change_cita'),(35,'Can delete cita',9,'delete_cita'),(36,'Can view cita',9,'view_cita'),(37,'Can add valoracion',10,'add_valoracion'),(38,'Can change valoracion',10,'change_valoracion'),(39,'Can delete valoracion',10,'delete_valoracion'),(40,'Can view valoracion',10,'view_valoracion');
/*!40000 ALTER TABLE `auth_permission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_admin_log`
--

DROP TABLE IF EXISTS `django_admin_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_admin_log` (
  `id` int NOT NULL AUTO_INCREMENT,
  `action_time` datetime(6) NOT NULL,
  `object_id` longtext,
  `object_repr` varchar(200) NOT NULL,
  `action_flag` smallint unsigned NOT NULL,
  `change_message` longtext NOT NULL,
  `content_type_id` int DEFAULT NULL,
  `user_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `django_admin_log_content_type_id_c4bce8eb_fk_django_co` (`content_type_id`),
  KEY `django_admin_log_user_id_c564eba6_fk_inicio_userprofile_id` (`user_id`),
  CONSTRAINT `django_admin_log_content_type_id_c4bce8eb_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`),
  CONSTRAINT `django_admin_log_user_id_c564eba6_fk_inicio_userprofile_id` FOREIGN KEY (`user_id`) REFERENCES `inicio_userprofile` (`id`),
  CONSTRAINT `django_admin_log_chk_1` CHECK ((`action_flag` >= 0))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_admin_log`
--

LOCK TABLES `django_admin_log` WRITE;
/*!40000 ALTER TABLE `django_admin_log` DISABLE KEYS */;
/*!40000 ALTER TABLE `django_admin_log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_content_type`
--

DROP TABLE IF EXISTS `django_content_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_content_type` (
  `id` int NOT NULL AUTO_INCREMENT,
  `app_label` varchar(100) NOT NULL,
  `model` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `django_content_type_app_label_model_76bd3d3b_uniq` (`app_label`,`model`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_content_type`
--

LOCK TABLES `django_content_type` WRITE;
/*!40000 ALTER TABLE `django_content_type` DISABLE KEYS */;
INSERT INTO `django_content_type` VALUES (1,'admin','logentry'),(3,'auth','group'),(2,'auth','permission'),(4,'contenttypes','contenttype'),(9,'inicio','cita'),(8,'inicio','fecha'),(6,'inicio','inventario'),(7,'inicio','userprofile'),(10,'inicio','valoracion'),(5,'sessions','session');
/*!40000 ALTER TABLE `django_content_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_migrations`
--

DROP TABLE IF EXISTS `django_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_migrations` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `app` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `applied` datetime(6) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_migrations`
--

LOCK TABLES `django_migrations` WRITE;
/*!40000 ALTER TABLE `django_migrations` DISABLE KEYS */;
INSERT INTO `django_migrations` VALUES (1,'contenttypes','0001_initial','2024-10-01 02:45:29.308680'),(2,'contenttypes','0002_remove_content_type_name','2024-10-01 02:45:29.368042'),(3,'auth','0001_initial','2024-10-01 02:45:29.619570'),(4,'auth','0002_alter_permission_name_max_length','2024-10-01 02:45:29.675525'),(5,'auth','0003_alter_user_email_max_length','2024-10-01 02:45:29.681416'),(6,'auth','0004_alter_user_username_opts','2024-10-01 02:45:29.686409'),(7,'auth','0005_alter_user_last_login_null','2024-10-01 02:45:29.692477'),(8,'auth','0006_require_contenttypes_0002','2024-10-01 02:45:29.696233'),(9,'auth','0007_alter_validators_add_error_messages','2024-10-01 02:45:29.702347'),(10,'auth','0008_alter_user_username_max_length','2024-10-01 02:45:29.706872'),(11,'auth','0009_alter_user_last_name_max_length','2024-10-01 02:45:29.712128'),(12,'auth','0010_alter_group_name_max_length','2024-10-01 02:45:29.726182'),(13,'auth','0011_update_proxy_permissions','2024-10-01 02:45:29.732593'),(14,'auth','0012_alter_user_first_name_max_length','2024-10-01 02:45:29.738565'),(15,'inicio','0001_initial','2024-10-01 02:45:30.684542'),(16,'admin','0001_initial','2024-10-01 02:45:30.841302'),(17,'admin','0002_logentry_remove_auto_add','2024-10-01 02:45:30.852824'),(18,'admin','0003_logentry_add_action_flag_choices','2024-10-01 02:45:30.861461'),(19,'inicio','0002_cita_google_event_id','2024-10-01 02:45:30.898118'),(20,'inicio','0003_alter_cita_estado','2024-10-01 02:45:30.918994'),(21,'inicio','0004_alter_userprofile_email','2024-10-01 02:45:31.033851'),(22,'inicio','0005_alter_inventario_estado','2024-10-01 02:45:31.038031'),(23,'inicio','0006_alter_inventario_cantidad','2024-10-01 02:45:31.042043'),(24,'inicio','0007_rename_is_active_userprofile_estado_and_more','2024-10-01 02:45:31.107064'),(25,'inicio','0008_rename_estado_userprofile_is_active','2024-10-01 02:45:31.140826'),(26,'inicio','0009_userprofile_estado','2024-10-01 02:45:31.234447'),(27,'inicio','0010_alter_userprofile_estado','2024-10-01 02:45:31.244412'),(28,'inicio','0011_rename_email_userprofile_correo_and_more','2024-10-01 02:45:31.337252'),(29,'inicio','0012_remove_userprofile_estado','2024-10-01 02:45:31.375014'),(30,'inicio','0013_rename_numero_userprofile_documento_and_more','2024-10-01 02:45:31.436125'),(31,'inicio','0014_alter_userprofile_documento','2024-10-01 02:45:31.508310'),(32,'inicio','0015_alter_userprofile_documento','2024-10-01 02:45:31.517827'),(33,'inicio','0016_alter_userprofile_documento','2024-10-01 02:45:31.528285'),(34,'inicio','0017_alter_cita_motivo','2024-10-01 02:45:31.538183'),(35,'inicio','0018_fecha_final_fecha_inicio','2024-10-01 02:45:31.596078'),(36,'inicio','0019_alter_fecha_unique_together','2024-10-01 02:45:31.642081'),(37,'inicio','0020_alter_fecha_final_alter_fecha_inicio','2024-10-01 02:45:31.981923'),(38,'inicio','0021_fecha_fecha_hora_alter_fecha_final_and_more','2024-10-01 02:45:32.111092'),(39,'inicio','0022_alter_fecha_fecha_hora','2024-10-01 02:45:32.116408'),(40,'inicio','0023_alter_fecha_unique_together_remove_fecha_final_and_more','2024-10-01 02:45:32.195441'),(41,'inicio','0024_alter_cita_estado','2024-10-01 02:45:32.206753'),(42,'inicio','0025_alter_cita_estado','2024-10-01 02:45:32.213823'),(43,'inicio','0026_alter_cita_estado','2024-10-01 02:45:32.221400'),(44,'inicio','0027_userprofile_is_staff','2024-10-01 02:45:32.274198'),(45,'inicio','0028_alter_inventario_cantidad','2024-10-01 02:45:32.278739'),(46,'sessions','0001_initial','2024-10-01 02:45:32.319799');
/*!40000 ALTER TABLE `django_migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_session`
--

DROP TABLE IF EXISTS `django_session`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_session` (
  `session_key` varchar(40) NOT NULL,
  `session_data` longtext NOT NULL,
  `expire_date` datetime(6) NOT NULL,
  PRIMARY KEY (`session_key`),
  KEY `django_session_expire_date_a5c62663` (`expire_date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_session`
--

LOCK TABLES `django_session` WRITE;
/*!40000 ALTER TABLE `django_session` DISABLE KEYS */;
INSERT INTO `django_session` VALUES ('3nc9islmlin1gudrfinj61m3rlevcidq','.eJyNklmTojAUhf-LzwOGBBD6Le6KOOJuT01ZgYRNJEikUbr6v0-c7lmf-jW55zv31D2vrSOprvGxEqw8JrT11NJaX_5-80lwYvnjg6Ykj7ga8PxaJr76GFE_foXqcsqy7sfsP4CYiFiqSdjpaDYNqQEsaEC9Y0MjQKYJfeBbNoG6ZRtaQAJgAqr5JGQAaJrU2EQPiImYhAYloyy_JiQTrafX1pVLM0m-E2irBODANTV4L50u392-Dv2VNR108CjeibnVPc9dzUXEgUEDwGwzh8Gs7jf70wSho7WC1b4fdweoEaDZTfJe13fSxXS0IPFyToO1whx9yG82dat0XM0RxZDGST9eOjWbeb1ofbkUUQXKTVXks-fJYWB6W4Sz9eLgNTmcYWdwT5i475XJabcNSS86OHhprfDSXQ298WgP3aRojreTNaarRKkvF7ze3Rfcw0DrGDJ3ycKSifj4K7DWbgPDnDaxI4N5fC2BE7zEeIQ3q3k9VGb2pIzy08JxPRvazTRGtq94DB80BzL_cIDPJ-GXdTQqtw1ZrLs37oF0y_LZ_lb4Z9aLgsO5p2-k80_HY1Um0jW-Xgvx1G7zx2mhGnEeZYwUiZCNOLffd5M3yhJ5ovcmmcDUTdtEBrKgQo0qsBk66an5krIkFsROX0oUp75epgKEKikK8UF99OZRM0l6wP9gBZMduEr06Gtvtdgr9ZJNUHc4ReEYhA3pgaXSuaT-cx9rQqpEwAsmu_Lt9_J1Xf-_-SNOOzqTJFNLRijPs7uUfk5w5jQJPz-eEZ_J7n5_e_sBQMspxQ:1svTIB:b_PNAGNfZ5IlAeVR_K_huXZZWstpQQm7MchSEDSdvhE','2024-10-15 03:11:15.890420'),('4k6xi9hwrzfuk4x6xreb7juqkob6pi96','.eJxVjDsOwyAQBe9CHSEW802Z3mdACwvBSYQlY1dR7h5bcpG0b2bemwXc1hq2npcwEbsyYJffLWJ65nYAemC7zzzNbV2myA-Fn7Tzcab8up3u30HFXvcai7XgqZAWTmqprJc6DcbIKKLzKJXzGhImYQRBxJKFANgbjyqhGTL7fAHIvDdo:1svSvx:qBqj3kdthxQ1liiC5TMdjL3g8ubCQXVSKV-uHHFVvw4','2024-10-15 02:48:17.788780'),('5p1ggedttv621cj6lnzum9m5hfxnpo1z','.eJyNkltzokAQhf-LzwsOlxkkb4iKJuIajRHd2qJmhuEmMoQBCUnlv--4yV6f8trd5zvd1ed1EOK2ScNWsDrMosHNQBt8-btGMD2x8tqIclwmXKW8bOqMqNcR9aMrVJ9HrBh_zP4DSLFIpRrHlqXZURxBMNKhblq2DqmBkE4AGdlYN0c21CimAIFIIzhmAGia1NjYpBgZTEJpzSJWNhkuxODmddBwaSbJPdZtFQOH-kjTe_oST3s4w6hfH1YlIVt3PXO46xyZvnUrcO6eijZ2IHIOd7y0dd8mDwRtWCkmF2RaVJmm476PzAoFaRg8uy2c3lrtFIb2ugeVcrnMJ_OgEYF9zCaiHD86xoI-Hcj6ACaZldvuy3hPT2WwCItQbCd5u0JWt_FObqGteE11Pt9hNzncOdF062z87ex-7gW6n53v45MHBIa66FkT-NAY17sEaBaUd9csrplIw18Ha8MhgM9K5zv80atoIYELZ-M4nrPbrrqZsrQXtX_KH5t9RQ-WqYRPx5072-zvLNGPlmA0ug1InUwu4-QerufLo-nvk2UWeOFlx8nXhqXFg1e1C-n80zFs60y6pk1TiZvhkF9fq6sJ50nBcJUJmYjz8H03-aMiky96TxICyEQ2MqAx0pUIttRmxsnM0SVnWSqwnV9qI82JWecCxCquKvFBvebmGjNJusL_YAWTGWgk2vvqbteB0m3YwhjPbo14DuIX7IKNYj3l5DhxNCFVgvKKyax8-71813X_b349Z5iccVaoNcMRL4teSj8nOPMoiz8_XmDCZHa_v739ALFWKaw:1svTnh:Hz7VJlmVnyS2GbRT7EuHxr0G6E5ooHrv3Sa1F6H6NDU','2024-10-15 03:43:49.349364');
/*!40000 ALTER TABLE `django_session` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `inicio_cita`
--

DROP TABLE IF EXISTS `inicio_cita`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `inicio_cita` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `motivo` varchar(20) NOT NULL,
  `estado` varchar(20) NOT NULL,
  `asistio` tinyint(1) NOT NULL,
  `paciente_id` bigint NOT NULL,
  `fecha_hora_id` bigint NOT NULL,
  `google_event_id` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `inicio_cita_paciente_id_693744bf_fk_inicio_userprofile_id` (`paciente_id`),
  KEY `inicio_cita_fecha_hora_id_4e1836cc_fk_inicio_fecha_id` (`fecha_hora_id`),
  CONSTRAINT `inicio_cita_fecha_hora_id_4e1836cc_fk_inicio_fecha_id` FOREIGN KEY (`fecha_hora_id`) REFERENCES `inicio_fecha` (`id`),
  CONSTRAINT `inicio_cita_paciente_id_693744bf_fk_inicio_userprofile_id` FOREIGN KEY (`paciente_id`) REFERENCES `inicio_userprofile` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `inicio_cita`
--

LOCK TABLES `inicio_cita` WRITE;
/*!40000 ALTER TABLE `inicio_cita` DISABLE KEYS */;
/*!40000 ALTER TABLE `inicio_cita` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `inicio_fecha`
--

DROP TABLE IF EXISTS `inicio_fecha`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `inicio_fecha` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `fecha` date NOT NULL,
  `hora` time(6) NOT NULL,
  `disponible` tinyint(1) NOT NULL,
  `fecha_hora` datetime(6) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `inicio_fecha_fecha_hora_488fb0b5_uniq` (`fecha`,`hora`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `inicio_fecha`
--

LOCK TABLES `inicio_fecha` WRITE;
/*!40000 ALTER TABLE `inicio_fecha` DISABLE KEYS */;
/*!40000 ALTER TABLE `inicio_fecha` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `inicio_inventario`
--

DROP TABLE IF EXISTS `inicio_inventario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `inicio_inventario` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `producto` varchar(150) NOT NULL,
  `cantidad` double NOT NULL,
  `estado` smallint unsigned NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `inicio_inventario_chk_1` CHECK ((`estado` >= 0))
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `inicio_inventario`
--

LOCK TABLES `inicio_inventario` WRITE;
/*!40000 ALTER TABLE `inicio_inventario` DISABLE KEYS */;
INSERT INTO `inicio_inventario` VALUES (1,'12',0,2);
/*!40000 ALTER TABLE `inicio_inventario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `inicio_userprofile`
--

DROP TABLE IF EXISTS `inicio_userprofile`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `inicio_userprofile` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `password` varchar(128) NOT NULL,
  `last_login` datetime(6) DEFAULT NULL,
  `tipo` smallint unsigned NOT NULL,
  `documento` int NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `imagen` varchar(100) DEFAULT NULL,
  `direccion` varchar(100) DEFAULT NULL,
  `correo` varchar(100) DEFAULT NULL,
  `ocupacion` varchar(50) DEFAULT NULL,
  `celular` varchar(15) DEFAULT NULL,
  `acudiente` varchar(50) DEFAULT NULL,
  `edad` smallint unsigned DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT NULL,
  `is_admin` tinyint(1) DEFAULT NULL,
  `is_superuser` tinyint(1) DEFAULT NULL,
  `is_staff` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `numero` (`documento`),
  CONSTRAINT `inicio_userprofile_chk_1` CHECK ((`tipo` >= 0)),
  CONSTRAINT `inicio_userprofile_chk_2` CHECK ((`edad` >= 0))
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `inicio_userprofile`
--

LOCK TABLES `inicio_userprofile` WRITE;
/*!40000 ALTER TABLE `inicio_userprofile` DISABLE KEYS */;
INSERT INTO `inicio_userprofile` VALUES (1,'pbkdf2_sha256$870000$fL2H94WGWNWgH51LgzdS5T$iwPtzmxoU8RmkQYVksANdx2GrCfvhIqCthNnoGLd3AI=','2024-10-01 03:43:20.106916',2,1052837477,'sebastian','',NULL,'usebas51@gmail.com',NULL,NULL,NULL,NULL,1,1,1,1);
/*!40000 ALTER TABLE `inicio_userprofile` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `inicio_userprofile_groups`
--

DROP TABLE IF EXISTS `inicio_userprofile_groups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `inicio_userprofile_groups` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `userprofile_id` bigint NOT NULL,
  `group_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `inicio_userprofile_groups_userprofile_id_group_id_2bc8ae9d_uniq` (`userprofile_id`,`group_id`),
  KEY `inicio_userprofile_groups_group_id_def10b5d_fk_auth_group_id` (`group_id`),
  CONSTRAINT `inicio_userprofile_g_userprofile_id_c8df1890_fk_inicio_us` FOREIGN KEY (`userprofile_id`) REFERENCES `inicio_userprofile` (`id`),
  CONSTRAINT `inicio_userprofile_groups_group_id_def10b5d_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `inicio_userprofile_groups`
--

LOCK TABLES `inicio_userprofile_groups` WRITE;
/*!40000 ALTER TABLE `inicio_userprofile_groups` DISABLE KEYS */;
/*!40000 ALTER TABLE `inicio_userprofile_groups` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `inicio_userprofile_user_permissions`
--

DROP TABLE IF EXISTS `inicio_userprofile_user_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `inicio_userprofile_user_permissions` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `userprofile_id` bigint NOT NULL,
  `permission_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `inicio_userprofile_user__userprofile_id_permissio_07f9f84e_uniq` (`userprofile_id`,`permission_id`),
  KEY `inicio_userprofile_u_permission_id_d9e4d0ad_fk_auth_perm` (`permission_id`),
  CONSTRAINT `inicio_userprofile_u_permission_id_d9e4d0ad_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  CONSTRAINT `inicio_userprofile_u_userprofile_id_d93f5b0d_fk_inicio_us` FOREIGN KEY (`userprofile_id`) REFERENCES `inicio_userprofile` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `inicio_userprofile_user_permissions`
--

LOCK TABLES `inicio_userprofile_user_permissions` WRITE;
/*!40000 ALTER TABLE `inicio_userprofile_user_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `inicio_userprofile_user_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `inicio_valoracion`
--

DROP TABLE IF EXISTS `inicio_valoracion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `inicio_valoracion` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `nombre` varchar(150) NOT NULL,
  `documento` varchar(50) NOT NULL,
  `fecha_historia` date DEFAULT NULL,
  `tratamiento_medicacion` smallint unsigned NOT NULL,
  `reacciones_alergicas` smallint unsigned NOT NULL,
  `transtorno_tension_arterial` smallint unsigned NOT NULL,
  `diabetes` smallint unsigned NOT NULL,
  `transtornos_emocionales` smallint unsigned NOT NULL,
  `enfermedad_respiratoria` smallint unsigned NOT NULL,
  `otros` varchar(100) NOT NULL,
  `protesis_dental` varchar(100) NOT NULL,
  `total` varchar(100) NOT NULL,
  `acrilico` varchar(100) NOT NULL,
  `flexible` varchar(100) NOT NULL,
  `parcial` varchar(100) NOT NULL,
  `retenedores` varchar(100) NOT NULL,
  `panoramica` varchar(100) NOT NULL,
  `periapical` varchar(100) NOT NULL,
  `cepillado_dental` smallint unsigned NOT NULL,
  `seda_dental` smallint unsigned NOT NULL,
  `enjuague_bucal` smallint unsigned NOT NULL,
  `user_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `inicio_valoracion_user_id_b1ebd889_fk_inicio_userprofile_id` (`user_id`),
  CONSTRAINT `inicio_valoracion_user_id_b1ebd889_fk_inicio_userprofile_id` FOREIGN KEY (`user_id`) REFERENCES `inicio_userprofile` (`id`),
  CONSTRAINT `inicio_valoracion_chk_1` CHECK ((`tratamiento_medicacion` >= 0)),
  CONSTRAINT `inicio_valoracion_chk_2` CHECK ((`reacciones_alergicas` >= 0)),
  CONSTRAINT `inicio_valoracion_chk_3` CHECK ((`transtorno_tension_arterial` >= 0)),
  CONSTRAINT `inicio_valoracion_chk_4` CHECK ((`diabetes` >= 0)),
  CONSTRAINT `inicio_valoracion_chk_5` CHECK ((`transtornos_emocionales` >= 0)),
  CONSTRAINT `inicio_valoracion_chk_6` CHECK ((`enfermedad_respiratoria` >= 0)),
  CONSTRAINT `inicio_valoracion_chk_7` CHECK ((`cepillado_dental` >= 0)),
  CONSTRAINT `inicio_valoracion_chk_8` CHECK ((`seda_dental` >= 0)),
  CONSTRAINT `inicio_valoracion_chk_9` CHECK ((`enjuague_bucal` >= 0))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `inicio_valoracion`
--

LOCK TABLES `inicio_valoracion` WRITE;
/*!40000 ALTER TABLE `inicio_valoracion` DISABLE KEYS */;
/*!40000 ALTER TABLE `inicio_valoracion` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-10-01  0:40:35
