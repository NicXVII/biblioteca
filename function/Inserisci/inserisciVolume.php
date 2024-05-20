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
/*$data['nome'] = '12';
$data['isbn'] = '12';
$data['pubblicazione'] = '2024-12-04';
$data['dataRiferimento'] = '2024-12-04';
$data['idCasaEditrice']  = 1;*/

/*$data['numeroVolume'] = 1;
$data['isbn'] = '1238976543203';
$data['idEnciclopedia'] = 13;*/
if (
    !isset($data['numeroVolume']) || empty($data['numeroVolume']) ||
    !isset($data['isbn']) || empty($data['isbn']) ||
    !isset($data['idEnciclopedia']) || empty($data['idEnciclopedia'])
) {
    $result = array(
        'success' => false,
        'message' => 'Invalid JSON data'
    );
    echo json_encode($result);
    exit();
}

$numeroVolume = $data['numeroVolume'];
$isbn = $data['isbn'];
$idEnciclopedia = $data['idEnciclopedia'];

$insertQuery = "INSERT INTO `tvolume` (`isbn`, `numeroVolume`, `idEnciclopedia`) VALUES (?,?,?);";
$insertStatement = mysqli_prepare($db, $insertQuery);

if ($insertStatement) {
    mysqli_stmt_bind_param($insertStatement, "sii", $isbn, $numeroVolume, $idEnciclopedia);

    if (mysqli_stmt_execute($insertStatement)) {
        $volumeID = mysqli_insert_id($db);

        $result = array(
            'success' => true,
            'message' => 'Volume inserted successfully',
            'id' => $volumeID
        );
    } else {
        $result = array(
            'success' => false,
            'message' => 'Failed to Volume' . mysqli_stmt_error($insertStatement)
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
