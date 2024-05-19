<?php
session_start();
require_once("../database.php");

$result = array();
$db;

// Controllo se la connessione al database è riuscita
if (!$db) {
    $result = [
        'success' => false,
        'message' => 'Failed to connect to database: ' . mysqli_connect_error()
    ];
    echo json_encode($result);
    exit();
}

$json = file_get_contents('php://input');
$data = json_decode($json, true);
//$data['id'] = 21;

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

// Prima query: chiamata alla procedura scaffaliLibro()
$query = "CALL scaffaliCarta()";

$stmt = mysqli_prepare($db, $query);
if (!$stmt) {
    $result = [
        'success' => false,
        'message' => 'Failed to prepare statement for scaffaliLibro(): ' . mysqli_error($db)
    ];
    echo json_encode($result);
    exit();
}

if (!mysqli_stmt_execute($stmt)) {
    $result = [
        'success' => false,
        'message' => 'Failed to execute statement for scaffaliLibro(): ' . mysqli_stmt_error($stmt)
    ];
    echo json_encode($result);
    exit();
}

$queryResult = mysqli_stmt_get_result($stmt);

if (!$queryResult) {
    $result = [
        'success' => false,
        'message' => 'Failed to get result for scaffaliLibro(): ' . mysqli_error($db)
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

mysqli_free_result($queryResult);

$countBOOKS = [];

foreach ($idScaffali as $idScaffale) {
    // Seconda query: chiamata alla procedura LibriinScaffale()
    $query = "CALL CarteInScaffale(&idScaffale);";
    $queryResult = mysqli_query($db, $query);

    if (!$queryResult) {
        $result = [
            'success' => false,
            'message' => 'Failed to execute query for LibriinScaffale(): ' . mysqli_error($db)
        ];
        echo json_encode($result);
        exit();
    }

    $row = mysqli_fetch_array($queryResult);
    $countBOOKS[] = [
        'idScaffale' => $idScaffale,
        'count' => $row['COUNT(*)'],
    ];

    mysqli_free_result($queryResult);
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

if ($idScaffale !== null && $numeroScaffale !== null) {
    // Terza query: chiamata alla procedura insertPosizioneLibro()
    $finalQuery = "CALL insertPosizioneLibro($idScaffale, $idLibro, $numeroScaffale);";
    $queryResult = mysqli_query($db, $finalQuery);

    if (!$queryResult) {
        $result = [
            'success' => false,
            'message' => 'Failed to execute query for insertPosizioneLibro(): ' . mysqli_error($db)
        ];
        echo json_encode($result);
        exit();
    }

    $result = [
        'success' => true,
        'message' => 'Book inserted successfully'
    ];

    // Leggi tutti i risultati delle query per evitare il problema dei comandi fuori sincrono
    mysqli_free_result($queryResult);
} else {
    $result = [
        'success' => false,
        'message' => 'No suitable shelf found or an error occurred'
    ];
}

mysqli_close($db);
echo json_encode($result);
