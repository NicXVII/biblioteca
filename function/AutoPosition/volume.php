<?php
session_start();
require_once("../database.php");

$result = array();
$db;

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
//$data['id'] = 118;
if (!isset($data['id']) || empty($data['id'])) {
    $result = [
        'success' => false,
        'message' => 'Invalid JSON data'
    ];
    echo json_encode($result);
    exit();
}
$idCarta = $data['id'];

$query = "CALL scaffaliVolume()";

$stmt = mysqli_prepare($db, $query);
if (!$stmt) {
    $result = [
        'success' => false,
        'message' => 'Failed to prepare statement for scaffaliVolume(): ' . mysqli_error($db)
    ];
    echo json_encode($result);
    exit();
}

if (!mysqli_stmt_execute($stmt)) {
    $result = [
        'success' => false,
        'message' => 'Failed to execute statement for scaffaliVolume(): ' . mysqli_stmt_error($stmt)
    ];
    echo json_encode($result);
    exit();
}

$queryResult = mysqli_stmt_get_result($stmt);

if (!$queryResult) {
    $result = [
        'success' => false,
        'message' => 'Failed to get result for scaffaliVolume(): ' . mysqli_error($db)
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
    $stmt = mysqli_prepare($db, "CALL VolumiInScaffale(?)");
    if (!$stmt) {
        $result = [
            'success' => false,
            'message' => 'Failed to prepare statement for VolumiInScaffale(): ' . mysqli_error($db),
        ];
        echo json_encode($result);
        exit();
    }

    mysqli_stmt_bind_param($stmt, "i", $idScaffale);

    if (!mysqli_stmt_execute($stmt)) {
        $result = [
            'success' => false,
            'message' => 'Failed to execute statement for VolumiInScaffale(): ' . mysqli_stmt_error($stmt),
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
    $stmt = mysqli_prepare($db, "CALL insertPosizioneVolume(?, ?, ?)");
    if (!$stmt) {
        $result = [
            'success' => false,
            'message' => 'Failed to prepare statement for insertPosizioneVolume(): ' . mysqli_error($db),
        ];
        echo json_encode($result);
        exit();
    }

    mysqli_stmt_bind_param($stmt, "iii", $idScaffale, $idCarta, $numeroScaffale);

    if (!mysqli_stmt_execute($stmt)) {
        $result = [
            'success' => false,
            'message' => 'Failed to execute statement for insertPosizioneVolume(): ' . mysqli_stmt_error($stmt),
        ];
        echo json_encode($result);
        exit();
    }

    $result = [
        'success' => true,
        'message' => 'Volume inserted successfully',
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
