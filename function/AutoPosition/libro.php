<?php
session_start();
require_once("../database.php");

$result = array();
$db;

// Controllo se la connessione al database è riuscita
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
$data['id'] = 21;
// Controllo se i dati JSON sono validi
if (!isset($data['id']) || empty($data['id'])) {
    $result = [
        'success' => false,
        'message' => 'Invalid JSON data'
    ];
    echo json_encode($result);
    exit();
}
$idLibro = $data['id'];

$query = "CALL scaffaliLibro()";

$stmt = mysqli_prepare($db, $query);
if (!$stmt) {
    $result = [
        'success' => false,
        'message' => 'Failed to prepare statement for scaffaliLibro()'
    ];
    echo json_encode($result);
    exit();
}

if (!mysqli_stmt_execute($stmt)) {
    $result = [
        'success' => false,
        'message' => 'Failed to execute statement for scaffaliLibro()'
    ];
    echo json_encode($result);
    exit();
}

$queryResult = mysqli_stmt_get_result($stmt);

if (!$queryResult) {
    $result = [
        'success' => false,
        'message' => 'Failed to get result for scaffaliLibro()'
    ];
    echo json_encode($result);
    exit();
}

$idScaffali =  [];
$i = 0;
while ($row = mysqli_fetch_array($queryResult)) {
    $idScaffali[$i] = $row['idScaffale'];
    $i++;
}

mysqli_stmt_close($stmt);

$countBOOKS = [];
//echo json_encode($idScaffali);
for ($i = 0; $i < sizeof($idScaffali); $i++) {
    $id = $idScaffali[$i];
    //echo ($id);
    $query = "CALL LibriinScaffale($id);";
    $queryResult = mysqli_query($db, $query);

    if (!$queryResult) {
        $countBOOKS[] = [
            'idScaffale' => $id,
            'count' => 0,
        ];
    } else {

        $row = mysqli_fetch_array($queryResult);
        $countBOOKS[] = [
            'idScaffale' => $id,
            'count' => $row['COUNT(*)'],
        ];
    }
}

$idScaffale = null;
$numeroScaffale = null;

foreach ($countBOOKS as $shelf) {
    if ($shelf['count'] < 20) {
        $idScaffale = $shelf['idScaffale'];
        $numeroScaffale = $shelf['count'] + 1;
        break;
    }
}

echo $idScaffale . '    ';
echo $numeroScaffale . '        ';
echo $idLibro . ' ';
$finalQuery = "CALL insertPosizioneLibro($idScaffale,$idLibro,$numeroScaffale);";
$queryResult = mysqli_query($db, $finalQuery);

if (!$queryResult) {
    $result = [
        'success' => false,
        'message' => 'Failed to execute query for insertPosizioneLibro()'
    ];
    echo json_encode($result);
    exit();
}

$result = [
    'success' => true,
    'message' => 'Book inserted successfully'
];

mysqli_close($db);
echo json_encode($result);
