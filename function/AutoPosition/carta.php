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

// Controllo se i dati JSON sono validi
if (!isset($data['id']) || empty($data['id'])) {
    $result = [
        'success' => false,
        'message' => 'Invalid JSON data'
    ];
    echo json_encode($result);
    exit();
}
$idCarta = $data['id'];

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
    // Prepare statement for CarteInScaffale
    $stmt = mysqli_prepare($db, "CALL CarteInScaffale(?)");
    if (!$stmt) {
        $result = [
            'success' => false,
            'message' => 'Failed to prepare statement for CarteInScaffale(): ' . mysqli_error($db),
        ];
        echo json_encode($result);
        exit();
    }

    // Bind parameter to the prepared statement
    mysqli_stmt_bind_param($stmt, "i", $idScaffale); // Assuming idScaffale is an integer

    // Execute the prepared statement
    if (!mysqli_stmt_execute($stmt)) {
        $result = [
            'success' => false,
            'message' => 'Failed to execute statement for CarteInScaffale(): ' . mysqli_stmt_error($stmt),
        ];
        echo json_encode($result);
        exit();
    }

    $queryResultScaffale = mysqli_stmt_get_result($stmt);

    if ($queryResultScaffale) {
        $row = mysqli_fetch_array($queryResultScaffale);
        $countBOOKS[] = [
            'idScaffale' => $idScaffale,
            'count' => $row['COUNT(*)'],
        ];
        mysqli_free_result($queryResultScaffale);
    } else {
    }

    mysqli_stmt_close($stmt);
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
    $stmt = mysqli_prepare($db, "CALL insertPosizioneCarta(?, ?, ?)");
    if (!$stmt) {
        $result = [
            'success' => false,
            'message' => 'Failed to prepare statement for insertPosizioneCarta(): ' . mysqli_error($db),
        ];
        echo json_encode($result);
        exit();
    }

    mysqli_stmt_bind_param($stmt, "iii", $idScaffale, $idCarta, $numeroScaffale); // Assuming all parameters are integers

    if (!mysqli_stmt_execute($stmt)) {
        $result = [
            'success' => false,
            'message' => 'Failed to execute statement for insertPosizioneCarta(): ' . mysqli_stmt_error($stmt),
        ];
        echo json_encode($result);
        exit();
    }

    $result = [
        'success' => true,
        'message' => 'Carta inserted successfully',
    ];

    mysqli_stmt_close($stmt);
} else {
    $result = [
        'success' => false,
        'message' => 'No suitable shelf found or an error occurred',
    ];
}

mysqli_close($db);
echo json_encode($result);
