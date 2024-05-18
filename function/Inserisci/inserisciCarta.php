<?php
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}
require_once("../database.php");
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
/*$data['nome'] = '12';
$data['isbn'] = '12';
$data['pubblicazione'] = '2024-12-04';
$data['dataRiferimento'] = '2024-12-04';
$data['idCasaEditrice']  = 1;*/
if (
    !isset($data['nome']) || empty($data['nome']) ||
    !isset($data['isbn']) || empty($data['isbn']) ||
    !isset($data['pubblicazione']) || empty($data['pubblicazione']) ||
    !isset($data['dataRiferimento']) || empty($data['dataRiferimento']) ||
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
$dataRiferimento = $data['dataRiferimento'];
$idCasaEditrice = $data['idCasaEditrice'];

$insertQuery = "INSERT INTO `tcartageopolitica` (`titolo`, `data`, `dataRappresentazione`, `idCasaEditrice`, `isbn`) VALUES (?,?,?,?,?);";
$insertStatement = mysqli_prepare($db, $insertQuery);

if ($insertStatement) {
    mysqli_stmt_bind_param($insertStatement, "sssis", $nome, $pubblicazione, $dataRiferimento, $idCasaEditrice, $isbn);

    if (mysqli_stmt_execute($insertStatement)) {
        $cartaID = mysqli_insert_id($db);

        $result = array(
            'success' => true,
            'message' => 'Carta Geo Politica inserted successfully',
            'id' => $cartaID
        );
    } else {
        $result = array(
            'success' => false,
            'message' => 'Failed to insert Carta Geo Politica'
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
