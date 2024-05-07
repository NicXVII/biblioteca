<?php
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}
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

$db;

if (!$db) {
    $result = [
        'success'    =>  false,
        'message'   =>  'Failed to connect to database',
    ];
    echo json_encode($result);
    exit();
}

$json = file_get_contents('php://input');
$data = json_decode($json, true);

$email = mysqli_real_escape_string($db, $data['email']);
$pass  = mysqli_real_escape_string($db, $data['password']);

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $result = array(
        'success' => false,
        'message' => 'Invalid email format'
    );
    echo json_encode($result);
    exit();
}

$query = "SELECT * FROM tlavoratore WHERE codiceFiscale = ? AND password = ?";
$statement = mysqli_prepare($db, $query);

if ($statement) {
    mysqli_stmt_bind_param($statement, "ss", $email, $pass);

    mysqli_stmt_execute($statement);

    $queryResult = mysqli_stmt_get_result($statement);

    if (mysqli_num_rows($queryResult) == 1) {

        $record = mysqli_fetch_array($queryResult);
        $_SESSION['workerID'] = $record['idLavoratore'];

        // Ottenimento dell'ID utente autenticato
        //$userID = $_SESSION['userID'];
        $result = array(
            'success' => true,
            'message' => 'Logged',
        );
    } else {
        $result = array(
            'success' => false,
            'message' => 'Invalid email or password'
        );
    }

    // Chiudi l'istruzione preparata
    mysqli_stmt_close($statement);
} else {
    $result = array(
        'success' => false,
        'message' => 'Failed to prepare statement'
    );
}

mysqli_close($db);

echo json_encode($result);
