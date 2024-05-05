<?php
session_start();
require_once("database.php");
$result = array();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    $result = array(
        'success' => false,
        'message' => 'Invalid request'
    );
    echo json_encode($result);
    exit();
}

if (!$db) {
    $result = array(
        'success' => false,
        'message' => 'Failed to connect to database'
    );
    echo json_encode($result);
    exit();
}

$json = file_get_contents('php://input');
$data = json_decode($json, true);

if (!isset($data['mail']) || empty($data['mail']) || !isset($data['password']) || empty($data['password']) || !isset($data['nome']) || empty($data['nome']) || !isset($data['cognome']) || empty($data['cognome']) || !isset($data['codiceFiscale']) || empty($data['codiceFiscale'])) {
    $result = array(
        'success' => false,
        'message' => 'Invalid JSON data'
    );
    echo json_encode($result);
    exit();
}

$email = filter_var($data['mail'], FILTER_VALIDATE_EMAIL);
$password = $data['password'];
$nome = $data['nome'];
$cognome = $data['cognome'];
$codiceFiscale = $data['codiceFiscale'];

if (!$email) {
    $result = array(
        'success' => false,
        'message' => 'Invalid email format'
    );
    echo json_encode($result);
    exit();
}

$query = "SELECT IdCliente FROM tcliente WHERE mail = ?";
$checkStatement = mysqli_prepare($db, $query);
mysqli_stmt_bind_param($checkStatement, "s", $email);
mysqli_stmt_execute($checkStatement);
mysqli_stmt_store_result($checkStatement);

if (mysqli_stmt_num_rows($checkStatement) > 0) {
    $result = array(
        'success' => false,
        'message' => 'Email address already exists'
    );
    echo json_encode($result);
    exit();
}

$insertQuery = "INSERT INTO tcliente (nome, cognome, codiceFiscale, password, mail) VALUES (?, ?, ?, ?, ?)";
$insertStatement = mysqli_prepare($db, $insertQuery);

if ($insertStatement) {
    mysqli_stmt_bind_param($insertStatement, "sssss", $nome, $cognome, $codiceFiscale, $password, $email);

    if (mysqli_stmt_execute($insertStatement)) {
        $userID = mysqli_insert_id($db);
        $_SESSION['userID'] = $userID;

        $result = array(
            'success' => true,
            'message' => 'Registration successful'
        );
    } else {
        $result = array(
            'success' => false,
            'message' => 'Failed to register user'
        );
    }

    mysqli_stmt_close($insertStatement);
} else {
    $result = array(
        'success' => false,
        'message' => 'Failed to prepare statement'
    );
}

mysqli_close($db);

echo json_encode($result);
