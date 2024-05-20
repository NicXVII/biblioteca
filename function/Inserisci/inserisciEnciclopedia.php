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
}*/

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
/*$data['titolo'] = 'test';
$data['isbn'] = '1238976541203';
$data['data'] = '2024-12-04';
$data['idCasaEditrice']  = 1;
$data['volumiTotali'] = 3;*/
if (
    !isset($data['titolo']) || empty($data['titolo']) ||
    !isset($data['data']) || empty($data['data']) ||
    !isset($data['volumiTotali']) || empty($data['volumiTotali']) ||
    !isset($data['isbn']) || empty($data['isbn']) ||
    !isset($data['idCasaEditrice']) || empty($data['idCasaEditrice'])
) {
    $result = array(
        'success' => false,
        'message' => 'Invalid JSON data'
    );
    echo json_encode($result);
    exit();
}
var_dump($data['volumiTotali']);

$nome = $data['titolo'];
$isbn = $data['isbn'];
$data = $data['data'];
$volumiTotali = $data['volumiTotali'];
$idCasaEditrice = $data['idCasaEditrice'];

$insertQuery = "INSERT INTO `tenciclopedia` (`titolo`, `data`, `volumiTotali`, `isbn`, `idCasaEditrice`) VALUES (?,?,?,?,?);";
$insertStatement = mysqli_prepare($db, $insertQuery);

if ($insertStatement) {
    mysqli_stmt_bind_param($insertStatement, "ssisi", $nome, $data, $volumiTotali, $isbn, $idCasaEditrice);

    if (mysqli_stmt_execute($insertStatement)) {
        $enciclopediaID = mysqli_insert_id($db);

        $result = array(
            'success' => true,
            'message' => 'Enciclopedia inserted successfully',
            'id' => $enciclopediaID
        );
    } else {
        $result = array(
            'success' => false,
            'message' => 'Failed to Enciclopedia' . mysqli_stmt_error($insertStatement)
        );
    }

    mysqli_stmt_close($insertStatement);
} else {
    $result = array(
        'success' => false,
        'message' => 'Failed to prepare statement', mysqli_error($db)
    );
}

mysqli_close($db);

echo json_encode($result);
