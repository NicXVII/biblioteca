<?php
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

require_once("../database.php");

// Check if the request method is POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    $result = [
        'success' => false,
        'message' => 'Invalid request'
    ];
    echo json_encode($result);
    exit();
}

// Check if the database connection is established
if (!$db) {
    $result = [
        'success' => false,
        'message' => 'Failed to connect to database'
    ];
    echo json_encode($result);
    exit();
}

// Get JSON data from the request body
$json = file_get_contents('php://input');
$data = json_decode($json, true);

// Validate JSON data
if (
    !isset($data['autore']) || empty($data['autore']) ||
    !isset($data['idCarta']) || empty($data['idCarta'])
) {
    $result = [
        'success' => false,
        'message' => 'Invalid JSON data'
    ];
    echo json_encode($result);
    exit();
}

// Extract data from JSON
$autori = $data['autore'];
$idCarta = $data['idCarta'];

foreach ($autori as $autoreId) {
    $insertQuery = "INSERT INTO tlibro (idCartaGeoPolitica, idAutore) VALUES (?, ?)";
    $insertStatement = mysqli_prepare($db, $insertQuery);

    if ($insertStatement) {
        mysqli_stmt_bind_param($insertStatement, "ii", $idCarta, $autoreId);

        if (mysqli_stmt_execute($insertStatement)) {
            $result = [
                'success' => true,
                'message' => 'Authors inserted successfully',
            ];
        } else {
            $result = [
                'success' => false,
                'message' => 'Failed to insert author',
                'idAutore' => $autoreId
            ];
            // Break the loop if insertion fails
            break;
        }

        mysqli_stmt_close($insertStatement);
    } else {
        $result = [
            'success' => false,
            'message' => 'Failed to prepare statement'
        ];
        break;
    }
}

mysqli_close($db);

echo json_encode($result);
