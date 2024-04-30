<?php
/*$db_hostname = "localhost";
$db_username = "quintaf";
$db_password = "Qu!nta";
$db_database = "pren_diminich";*/

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

$db_hostname = "localhost";
$db_username = "root";
$db_password = "";
$db_database = "biblioteca_diminich";

$db = mysqli_connect($db_hostname, $db_username, $db_password, $db_database);
