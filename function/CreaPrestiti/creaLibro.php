<?php
session_start();
require_once("../database.php");

$result = array();

// Check if the request method is POST
if ($_SERVER['REQUEST_METHOD'] == 'POST')
//if (true) 
{
    $db;

    if (!$db) {
        $result = [
            'success'    =>  false,
            'message'   =>  'Failed to connect to database',
        ];
    } else {
        $data = json_decode(file_get_contents('php://input'), true);
        if (isset($data['id']) && isset($_SESSION['workerID'])) {
            $idPrenotazione = $data['id'];
            $idLavoratore = $_SESSION['workerID'];
            $dataInizio = date('Y-m-d H:i:s');

            $currentDate = date('Y-m-d H:i:s');
            $query = "INSERT INTO tprestito (idPrenotazione, idLavoratoreConsegna, dataInizio)
                      VALUES (?, ?, ?)";

            $stmt = mysqli_prepare($db, $query);

            if ($stmt) {
                mysqli_stmt_bind_param($stmt, "iis", $idPrenotazione, $idLavoratore, $dataInizio);
                mysqli_stmt_execute($stmt);
                $queryResult = mysqli_affected_rows($db);

                if ($queryResult > 0) {

                    $result = [
                        'success'       =>  true,
                    ];
                } else {
                    $result = [
                        'success'    =>  false,
                        'message'   =>  'Query execution failed',
                    ];
                }

                mysqli_stmt_close($stmt);
            } else {
                $result = [
                    'success'    =>  false,
                    'message'   =>  'Failed to prepare statement',
                ];
            }
        } else {
            $result = [
                'success'    =>  false,
                'message'   =>  'Missing element id',
            ];
        }

        // Close database connection
        mysqli_close($db);
    }
} else {
    $result = [
        'success'    =>  false,
        'message'   =>  'Invalid request method',
    ];
}

// Return results in JSON format
echo json_encode($result);
