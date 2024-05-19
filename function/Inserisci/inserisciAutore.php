<?php
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

require_once("../database.php");

header('Content-Type: application/json');

if (!$db) {
    $result = [
        'success' => false,
        'message' => 'Failed to connect to database'
    ];
    echo json_encode($result);
    exit();
}

$json = file_get_contents('php://input');
$data = json_decode($json, true);

if (
    !isset($data['nome']) || empty($data['nome']) ||
    !isset($data['cognome']) || empty($data['cognome'])
) {
    $result = [
        'success' => false,
        'message' => 'Invalid JSON data'
    ];
    echo json_encode($result);
    exit();
}

$nome = $data['nome'];
$cognome = $data['cognome'];

$query = "CALL insertAutore(?, ?)";
$stmt = mysqli_prepare($db, $query);

if ($stmt) {
    mysqli_stmt_bind_param($stmt, 'ss', $nome, $cognome);

    if (mysqli_stmt_execute($stmt)) {
        $result = [
            'success' => true,
            'message' => 'Author inserted successfully'
        ];
    } else {
        $result = [
            'success' => false,
            'message' => 'Failed to insert author '
        ];
    }

    mysqli_stmt_close($stmt);
} else {
    $result = [
        'success' => false,
        'message' => 'Failed to prepare the statement'
    ];
}

mysqli_close($db);

echo json_encode($result);
