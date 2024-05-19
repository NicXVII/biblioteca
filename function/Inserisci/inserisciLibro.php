<?php
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}
require_once("../database.php");
$result = array();

/*if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    $result = array(
        'success' => false,
        'message' => 'Invalid request'
    );
    echo json_encode($result);
    exit();
}
*/
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
/*$data['nome'] = "test";
$data['isbn'] = "test";
$data['pubblicazione'] = "2024-01-01";
$data['idAutore'] = "1";
$data['idCasaEditrice'] = "1";*/
if (
    !isset($data['nome']) || empty($data['nome']) ||
    !isset($data['isbn']) || empty($data['isbn']) ||
    !isset($data['pubblicazione']) || empty($data['pubblicazione']) ||
    !isset($data['idAutore']) || empty($data['idAutore']) ||
    !isset($data['idCasaEditrice']) || empty($data['idCasaEditrice'])
) {
    $result = array(
        'success' => false,
        'message' => 'Invalid JSON data'
    );
    echo json_encode($result);
    exit();
}

$nome = $data['nome'];
$isbn = $data['isbn'];
$pubblicazione = $data['pubblicazione'];
$idAutore = $data['idAutore'];
$idCasaEditrice = $data['idCasaEditrice'];

$insertQuery = "INSERT INTO tlibro (nome, isbn, pubblicazione, idAutore, idCasaEditrice) VALUES (?, ?, ?, ?, ?)";
$insertStatement = mysqli_prepare($db, $insertQuery);

if ($insertStatement) {
    mysqli_stmt_bind_param($insertStatement, "sssii", $nome, $isbn, $pubblicazione, $idAutore, $idCasaEditrice);

    if (mysqli_stmt_execute($insertStatement)) {
        $bookID = mysqli_insert_id($db);

        $result = array(
            'success' => true,
            'message' => 'Book inserted successfully',
            'bookID' => $bookID
        );
    } else {
        $result = array(
            'success' => false,
            'message' => 'Failed to insert book'
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
