-- MySQL dump 10.13  Distrib 9.0.1, for Win64 (x86_64)
--
-- Host: localhost    Database: presentacion_final
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
INSERT INTO `django_migrations` VALUES (1,'contenttypes','0001_initial','2024-10-10 05:43:08.340636'),(2,'contenttypes','0002_remove_content_type_name','2024-10-10 05:43:08.419128'),(3,'auth','0001_initial','2024-10-10 05:43:08.759604'),(4,'auth','0002_alter_permission_name_max_length','2024-10-10 05:43:08.851004'),(5,'auth','0003_alter_user_email_max_length','2024-10-10 05:43:08.863225'),(6,'auth','0004_alter_user_username_opts','2024-10-10 05:43:08.873825'),(7,'auth','0005_alter_user_last_login_null','2024-10-10 05:43:08.882939'),(8,'auth','0006_require_contenttypes_0002','2024-10-10 05:43:08.887550'),(9,'auth','0007_alter_validators_add_error_messages','2024-10-10 05:43:08.895824'),(10,'auth','0008_alter_user_username_max_length','2024-10-10 05:43:08.904407'),(11,'auth','0009_alter_user_last_name_max_length','2024-10-10 05:43:08.910311'),(12,'auth','0010_alter_group_name_max_length','2024-10-10 05:43:08.931750'),(13,'auth','0011_update_proxy_permissions','2024-10-10 05:43:08.942517'),(14,'auth','0012_alter_user_first_name_max_length','2024-10-10 05:43:08.950835'),(15,'inicio','0001_initial','2024-10-10 05:43:09.704219'),(16,'admin','0001_initial','2024-10-10 05:43:09.895493'),(17,'admin','0002_logentry_remove_auto_add','2024-10-10 05:43:09.906549'),(18,'admin','0003_logentry_add_action_flag_choices','2024-10-10 05:43:09.921555'),(19,'inicio','0002_cita_google_event_id','2024-10-10 05:43:09.955232'),(20,'inicio','0003_alter_cita_estado','2024-10-10 05:43:09.968099'),(21,'inicio','0004_alter_userprofile_email','2024-10-10 05:43:10.044488'),(22,'inicio','0005_alter_inventario_estado','2024-10-10 05:43:10.090704'),(23,'inicio','0006_alter_inventario_cantidad','2024-10-10 05:43:10.097816'),(24,'inicio','0007_rename_is_active_userprofile_estado_and_more','2024-10-10 05:43:10.192127'),(25,'inicio','0008_rename_estado_userprofile_is_active','2024-10-10 05:43:10.241048'),(26,'inicio','0009_userprofile_estado','2024-10-10 05:43:10.365909'),(27,'inicio','0010_alter_userprofile_estado','2024-10-10 05:43:10.378408'),(28,'inicio','0011_rename_email_userprofile_correo_and_more','2024-10-10 05:43:10.504993'),(29,'inicio','0012_remove_userprofile_estado','2024-10-10 05:43:10.552533'),(30,'inicio','0013_rename_numero_userprofile_documento_and_more','2024-10-10 05:43:10.629117'),(31,'inicio','0014_alter_userprofile_documento','2024-10-10 05:43:10.722332'),(32,'inicio','0015_alter_userprofile_documento','2024-10-10 05:43:10.736278'),(33,'inicio','0016_alter_userprofile_documento','2024-10-10 05:43:10.747048'),(34,'inicio','0017_alter_cita_motivo','2024-10-10 05:43:10.762206'),(35,'inicio','0018_fecha_final_fecha_inicio','2024-10-10 05:43:10.838690'),(36,'inicio','0019_alter_fecha_unique_together','2024-10-10 05:43:10.896064'),(37,'inicio','0020_alter_fecha_final_alter_fecha_inicio','2024-10-10 05:43:11.034274'),(38,'inicio','0021_fecha_fecha_hora_alter_fecha_final_and_more','2024-10-10 05:43:11.232766'),(39,'inicio','0022_alter_fecha_fecha_hora','2024-10-10 05:43:11.239964'),(40,'inicio','0023_alter_fecha_unique_together_remove_fecha_final_and_more','2024-10-10 05:43:11.349633'),(41,'inicio','0024_alter_cita_estado','2024-10-10 05:43:11.360217'),(42,'inicio','0025_alter_cita_estado','2024-10-10 05:43:11.375669'),(43,'inicio','0026_alter_cita_estado','2024-10-10 05:43:11.386279'),(44,'inicio','0027_userprofile_is_staff','2024-10-10 05:43:11.459329'),(45,'inicio','0028_alter_inventario_cantidad','2024-10-10 05:43:11.464343'),(46,'sessions','0001_initial','2024-10-10 05:43:11.506624');
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
INSERT INTO `django_session` VALUES ('8ebmnkwhbd5d6llyahaadnmqrpwivmhi','.eJxVjL0OgjAYRd-lsyEt9tcNEifDpMyk9GstoNRAiRHjuwsJg673nHveqNJT9NU02qFqAB0QQbvfrdams_0KoNX9NSQm9HFo6mRVko2OSRHA3vLN_Qt4PfrlXbMahJbKUWU5VtwKIxnDQLGj1BBJUoUFUSkHwR0mTlIF4AhgI_duj9kSHaOOdkk1wzl7lPMpvIw7XoqnY9nceZ8LKe5tiT5fwyNE5Q:1syvPv:9ORWvadNgz1emPIvK8c8IUZXnk6BaGFYfnXLkJPr3Ho','2024-10-24 15:49:31.903063'),('ajdkvuiq84so8nk3rxc1t42knb54w8we','.eJyNkklzozAQRv-Lz2MssZMbOAYv8YYdAp6aogQSmwnYEgSTVP77iElmPc1V6n79tfTeRiFqmyxsGaFhjkd3Izj68udZhOIzqYYLXKAqrYW4rhqaR8JQInzeMmFdY1Jan7V_ATLEMt4dKRHWkG4kskFUYKhEi3VFAVgGiSzHUIeiATRoiCrW1ATARJcNjBOIQaxLiQQUDmUNaghHWQ5Zok4pzb6V_Fs5M1b6ZiWmycHqTc3nhTElmFRNjko2unsbNTVPxft6JBoCAma8VqF4sz3an8RxuBufwdZdobJ9JiRcrRUCj7i47CR5Siny8fyRbV-LvSvOFHuON9BGsnfySdLAbdOstlgtonMzZXE5U87z8ko3fe3544CUt4PLnCe8IDC39t3Dzj57WZhYm_v7paU7tfzqvMzjKtzO955SRV2oRTcUWJujTre97okETdNgZQb7g-nODvZ-7vjiOq8N7wikor2Eh8AtHQ2Yfhp0AGrDA1GSUMKy8OfCcDIBytKuIq2llQdbDlyYrmk65uNh09njB2NB497eP-XhXl4UnZJKolIFx-TcL1Q4dQFbJfH12mJP5MGWSttX113dzgqQMZ_KeBfIHTmlfPKPiWFLcz41a5oLu5tM6sEBUUjrOi0JuuSMq_M8-cjG_6jM-Rd9KKcCVVYNVVIkXRxjpY0NIp3lQn0pSJ4xZBQvVMqKSKYFA4mALhf2SR0EG3zkpAH-G8sId6DhaGc7Pez8ceeShWTZSymZg-QVTYE71q5FdLo3IRvMiusL4a58_RW-67p_kw_rTGJUcsMR5U3_WypQgnBdlf3o2_v7dxzXJcY:1sytqa:j6vpluYy2HgBrvlppS87M5EL0Kgo3BBiY24-kyik328','2024-10-24 14:08:56.731657'),('gspnbs4ad4tha6ob0vihbjx3ty0ssre1','.eJyNkltzokAQhf-LzysOd8gbYEQUNBGN6NYWNTADDCIgAxJN5b_vsMlen_a1u893uqvP2yiEXZuFHcVNSNDoYcSPvvxZi2B8wuXQQDks04qLq7JtSMQNI9xnl3JehXBhfs7-BcggzZg6kiOkQk1PJB0rQFewGmuyDJAEEkmKeY0XdKDyuqAgVUkAn2iSjlDCIxBrYiICmUHjBiNctgQWdPTwNmorZsbINyjoHARG7Cm80NsNv9yZsnTzCusinZbdbQm7uiuPZjJLzgc4u0DdActiavivl6OgVE86jZX1ynFm_f74YjZ6InvKZefbj8L9WlakPM4uzbKuiBt41WrxvKinwCStvJLFfeWGpuE3857ephEvPFl0l4qvMeDXeYDClGw7e3fLcnR51A_Tg3sla3cPrfSwNHzNNzaeP3ue24HgkfnmMaOnznO27sXtgnuwb4-SAXh1uLvBSYNpFv48mJ9MgNzZ1PHbyElAwICOsTEM29j5q342dnWnkYVVHarUsHr0ElnrOxBOJ9cMAtteBuaadGBxLLaCmmc7SWhla5Fp8HkNT1lANdyI23Kbpsz5h2PYNYS5Zm1b04fJpBpeK3BpVaUFhjWhLBHnycdu7EcFYS_6SJICFEnRFVEWNWGM5C7WsXiScuWaY5JRqOfXRszySGpyChIO1jX9pA65GWLGSAP8N5ZiloGWoe215T8F436DHdGcLcRkDpI7tMBmrF7y6Dg1eMpUNK5qzLLy9dfyfd__u_lwziQ9Q1JwDYaoKosbk_6f4Fwhkvz_eAEjzLL77f39Ow8uKZ4:1syttG:hatPSEuTBprkasDt4xC_aFJ7od61-z1hmIqQJisv1kY','2024-10-24 14:11:42.016926'),('jqt7ob81b1wrjuzw0w7ghofldrwm2luc','.eJxVjDsOwjAQBe_iGlm7ib-U9JzBsr1eHECOFCcV4u4QKQW0b2beS4S4rTVsvSxhInEWKE6_W4r5UdoO6B7bbZZ5busyJbkr8qBdXmcqz8vh_h3U2Ou3TjqRjc6z8sWAN8VmpzWQAlYqo8PBg0U_GLKGAdkpT8RIkN3II2jx_gDRtjcq:1sywUv:ng3U7gdh5dD2dA46I5R3jWYP6tdHDkoYEtz7uMK6b8o','2024-10-24 16:58:45.144078'),('xaqx1n534o8ukn5avdou521a1fiifxp8','.eJxVjDsOwjAQBe_iGlm7ib-U9JzBsr1eHECOFCcV4u4QKQW0b2beS4S4rTVsvSxhInEWKE6_W4r5UdoO6B7bbZZ5busyJbkr8qBdXmcqz8vh_h3U2Ou3TjqRjc6z8sWAN8VmpzWQAlYqo8PBg0U_GLKGAdkpT8RIkN3II2jx_gDRtjcq:1sytrh:H4M2m1TwNtTKfLhma1sIlZEAlBJplopOtQwKl57GiaE','2024-10-24 14:10:05.903474');
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
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `inicio_cita`
--

LOCK TABLES `inicio_cita` WRITE;
/*!40000 ALTER TABLE `inicio_cita` DISABLE KEYS */;
INSERT INTO `inicio_cita` VALUES (1,'ortodoncia','Programada',0,2,16,NULL),(2,'ortodoncia','Programada',0,4,8,NULL),(3,'protesis','Programada',0,8,31,NULL),(4,'protesis','Programada',0,7,5,NULL),(5,'protesis','Programada',0,12,6,NULL),(6,'protesis','Cancelada',0,13,7,NULL),(7,'protesis','Programada',0,13,28,NULL),(8,'protesis','Programada',0,14,27,NULL);
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
) ENGINE=InnoDB AUTO_INCREMENT=70 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `inicio_fecha`
--

LOCK TABLES `inicio_fecha` WRITE;
/*!40000 ALTER TABLE `inicio_fecha` DISABLE KEYS */;
INSERT INTO `inicio_fecha` VALUES (1,'2024-10-11','07:00:00.000000',1,'2024-10-11 12:00:00.000000'),(2,'2024-10-11','07:20:00.000000',1,'2024-10-11 12:20:00.000000'),(3,'2024-10-11','07:40:00.000000',1,'2024-10-11 12:40:00.000000'),(4,'2024-10-11','08:00:00.000000',1,'2024-10-11 13:00:00.000000'),(5,'2024-10-11','08:20:00.000000',0,'2024-10-11 13:20:00.000000'),(6,'2024-10-11','08:40:00.000000',0,'2024-10-11 13:40:00.000000'),(7,'2024-10-11','09:00:00.000000',1,'2024-10-11 14:00:00.000000'),(8,'2024-10-11','09:20:00.000000',0,'2024-10-11 14:20:00.000000'),(9,'2024-10-11','09:40:00.000000',1,'2024-10-11 14:40:00.000000'),(10,'2024-10-11','10:00:00.000000',1,'2024-10-11 15:00:00.000000'),(11,'2024-10-11','10:20:00.000000',1,'2024-10-11 15:20:00.000000'),(12,'2024-10-11','10:40:00.000000',1,'2024-10-11 15:40:00.000000'),(13,'2024-10-11','11:00:00.000000',1,'2024-10-11 16:00:00.000000'),(14,'2024-10-11','11:20:00.000000',1,'2024-10-11 16:20:00.000000'),(15,'2024-10-11','11:40:00.000000',1,'2024-10-11 16:40:00.000000'),(16,'2024-10-11','12:00:00.000000',0,'2024-10-11 17:00:00.000000'),(17,'2024-10-11','14:00:00.000000',1,'2024-10-11 19:00:00.000000'),(18,'2024-10-11','14:20:00.000000',1,'2024-10-11 19:20:00.000000'),(19,'2024-10-11','14:40:00.000000',1,'2024-10-11 19:40:00.000000'),(20,'2024-10-11','15:00:00.000000',1,'2024-10-11 20:00:00.000000'),(21,'2024-10-11','15:20:00.000000',1,'2024-10-11 20:20:00.000000'),(22,'2024-10-11','15:40:00.000000',1,'2024-10-11 20:40:00.000000'),(23,'2024-10-11','16:00:00.000000',1,'2024-10-11 21:00:00.000000'),(24,'2024-10-11','16:20:00.000000',1,'2024-10-11 21:20:00.000000'),(25,'2024-10-11','16:40:00.000000',1,'2024-10-11 21:40:00.000000'),(26,'2024-10-11','17:00:00.000000',1,'2024-10-11 22:00:00.000000'),(27,'2024-10-17','10:55:00.000000',1,'2024-10-17 15:55:00.000000'),(28,'2024-10-17','11:15:00.000000',0,'2024-10-17 16:15:00.000000'),(29,'2024-10-17','11:35:00.000000',0,'2024-10-17 16:35:00.000000'),(30,'2024-10-17','11:55:00.000000',1,'2024-10-17 16:55:00.000000'),(31,'2024-10-17','14:15:00.000000',0,'2024-10-17 19:15:00.000000'),(32,'2024-10-17','14:35:00.000000',0,'2024-10-17 19:35:00.000000'),(33,'2024-10-17','14:55:00.000000',1,'2024-10-17 19:55:00.000000'),(34,'2024-10-15','09:00:00.000000',1,'2024-10-15 14:00:00.000000'),(35,'2024-10-15','09:20:00.000000',1,'2024-10-15 14:20:00.000000'),(36,'2024-10-15','09:40:00.000000',1,'2024-10-15 14:40:00.000000'),(37,'2024-10-15','10:00:00.000000',1,'2024-10-15 15:00:00.000000'),(38,'2024-10-15','10:20:00.000000',1,'2024-10-15 15:20:00.000000'),(39,'2024-10-15','10:40:00.000000',1,'2024-10-15 15:40:00.000000'),(40,'2024-10-15','11:00:00.000000',1,'2024-10-15 16:00:00.000000'),(41,'2024-10-15','11:20:00.000000',1,'2024-10-15 16:20:00.000000'),(42,'2024-10-15','11:40:00.000000',1,'2024-10-15 16:40:00.000000'),(43,'2024-10-15','12:00:00.000000',1,'2024-10-15 17:00:00.000000'),(44,'2024-10-15','14:00:00.000000',1,'2024-10-15 19:00:00.000000'),(45,'2024-10-15','14:20:00.000000',1,'2024-10-15 19:20:00.000000'),(46,'2024-10-15','14:40:00.000000',1,'2024-10-15 19:40:00.000000'),(47,'2024-10-15','15:00:00.000000',1,'2024-10-15 20:00:00.000000'),(48,'2024-10-26','07:01:00.000000',1,'2024-10-26 12:01:00.000000'),(49,'2024-10-26','07:21:00.000000',1,'2024-10-26 12:21:00.000000'),(50,'2024-10-26','07:41:00.000000',1,'2024-10-26 12:41:00.000000'),(51,'2024-10-26','08:01:00.000000',1,'2024-10-26 13:01:00.000000'),(52,'2024-10-26','08:21:00.000000',1,'2024-10-26 13:21:00.000000'),(53,'2024-10-26','08:41:00.000000',1,'2024-10-26 13:41:00.000000'),(54,'2024-10-26','09:01:00.000000',1,'2024-10-26 14:01:00.000000'),(55,'2024-10-26','09:21:00.000000',1,'2024-10-26 14:21:00.000000'),(56,'2024-10-26','09:41:00.000000',1,'2024-10-26 14:41:00.000000'),(57,'2024-10-26','10:01:00.000000',1,'2024-10-26 15:01:00.000000'),(58,'2024-10-26','10:21:00.000000',1,'2024-10-26 15:21:00.000000'),(59,'2024-10-26','10:41:00.000000',1,'2024-10-26 15:41:00.000000'),(60,'2024-10-26','11:01:00.000000',1,'2024-10-26 16:01:00.000000'),(61,'2024-10-26','11:21:00.000000',1,'2024-10-26 16:21:00.000000'),(62,'2024-10-26','11:41:00.000000',1,'2024-10-26 16:41:00.000000'),(63,'2024-10-26','14:01:00.000000',1,'2024-10-26 19:01:00.000000'),(64,'2024-10-26','14:21:00.000000',1,'2024-10-26 19:21:00.000000'),(65,'2024-10-26','14:41:00.000000',1,'2024-10-26 19:41:00.000000'),(66,'2024-10-26','15:01:00.000000',1,'2024-10-26 20:01:00.000000'),(67,'2024-10-26','15:21:00.000000',1,'2024-10-26 20:21:00.000000'),(68,'2024-10-26','15:41:00.000000',1,'2024-10-26 20:41:00.000000'),(69,'2024-10-26','16:01:00.000000',1,'2024-10-26 21:01:00.000000');
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
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `inicio_inventario`
--

LOCK TABLES `inicio_inventario` WRITE;
/*!40000 ALTER TABLE `inicio_inventario` DISABLE KEYS */;
INSERT INTO `inicio_inventario` VALUES (1,'12',0,2),(2,'Resina',0,2),(3,'52',20,1);
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
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `inicio_userprofile`
--

LOCK TABLES `inicio_userprofile` WRITE;
/*!40000 ALTER TABLE `inicio_userprofile` DISABLE KEYS */;
INSERT INTO `inicio_userprofile` VALUES (1,'pbkdf2_sha256$870000$IfkjzhDjheklaM51q6IVlu$o0gZpy0J+6LbHPfwaPeOzrFiQ2odC3leCHnVsI016Lk=','2024-10-10 16:58:45.134943',2,1052837477,'Sandra Gaviria','',NULL,'facturacionldsg@gmail.com',NULL,NULL,NULL,NULL,1,1,1,1),(2,'pbkdf2_sha256$870000$B5ObYYxQwRxw95hqKu0yLK$TdVGbgaErAzjbNN4sgPCIYFI3oGmxyIpVNOa3P0Dv5s=','2024-10-10 06:34:06.170285',2,1052836714,'Maria Fernanda','',NULL,'mariafeer.iz@gmail.com',NULL,NULL,NULL,NULL,1,0,0,0),(3,'',NULL,1,1011125347,'PEPITO PEREZ','','sogamoso','pepitoperez@gmail.com','ESTUDIANTE','3102835131','N/A',21,1,0,0,0),(4,'',NULL,1,1051472222,'Ximena Barrera','','sogamoso','ximenabarreraleon@gmail.com','ESTUDIANTE','3102835131','N/A',20,1,0,0,0),(5,'',NULL,3,42251675,'Deivy E','imagenes/1345672.jpeg','SOGAMOSO','deivye@gmail.com','N/A','3208759452','N/A',18,1,0,0,0),(6,'',NULL,4,145289752,'DONNA','','SOGAMOS','donnut@gmail.com','AMA DE CASA','3102584659','Yo',14,1,0,0,0),(7,'',NULL,1,250623030,'GOOFY','','sogamoso','goofyleuterio@gmail.com','ama de casa','3102835134','Yo tambien',15,1,0,0,0),(8,'',NULL,2,1193100283,'Edwin Correa','','SOGAMOSO','Edwincorrea@gmail.com','Programador','32214532758','N/A',23,1,0,0,0),(9,'',NULL,1,42538677,'Buñuelo','','duitama','bunuelin@gmail.com','N/A','3215238754','Mafer',12,1,0,0,0),(10,'',NULL,1,14526385,'Sopa','','Duitama','sopita@gmail.com','Independiente','3129627548','Mafer',22,1,0,0,0),(11,'',NULL,2,1052836715,'Iza Izaquita','','sogamoso','IzaIzaquita2207@gmail.com','ESTUDIANTE','3102835131','Vivi',20,1,0,0,0),(12,'',NULL,1,1052836718,'Umañita','imagenes/1326803.png','Duitama','umanita150@gmail.com','Mini programador','3138769495','No tiene',19,1,0,0,0),(13,'pbkdf2_sha256$870000$ITSMaJQnlY9yWg53OrG1sC$GW9XJCKAdDs3V0V5Po8BvqSEYhuWgJa4wWmTCBmkCdU=','2024-10-10 16:48:28.404033',2,46385216,'maria fer','',NULL,'mariafeer.iz04@gmail.com',NULL,NULL,NULL,NULL,1,0,0,0),(14,'pbkdf2_sha256$870000$M8pUYa00N8lv0ET9J9iKqK$GJsvLQKspwYSYdhl7u3jPAk7jjhktpa9S87gYw4LGMU=','2024-10-10 16:55:21.546512',2,1057978646,'Julieta','',NULL,'mariafeer.iz04@gmail.com',NULL,NULL,NULL,NULL,1,0,0,0);
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

-- Dump completed on 2024-10-10 12:07:02
