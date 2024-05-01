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
        $_SESSION['userID'] = 1;
        if (isset($_SESSION['userID'])) {
            $id = $_SESSION['userID'];
            $query = "SELECT tprestito.dataInizio, tprestito.dataFine, tlibro.nome AS nomeLibro, tautore.nome AS nomeAutore, tautore.cognome AS cognomeAutore  
            FROM `tprestito` 
            JOIN tprenotazione ON tprenotazione.idPrenotazione = tprestito.idPrenotazione
            JOIN tlibro ON tlibro.idLibro = tprenotazione.idLibro
            JOIN tautore ON tlibro.idAutore = tautore.idAutore
            WHERE tprenotazione.idCliente = ? 
            LIMIT 0, 25;
            ";

            $stmt = mysqli_prepare($db, $query);

            if ($stmt) {
                mysqli_stmt_bind_param($stmt, "s", $id);
                mysqli_stmt_execute($stmt);
                $queryResult = mysqli_stmt_get_result($stmt);

                if ($queryResult) {
                    $resultArray =  [];
                    while ($row = mysqli_fetch_array($queryResult)) {
                        $resultArray[] = [
                            'dataInizio'    =>  $row['dataInizio'],
                            'dataFine'      =>  $row['dataFine'],
                            'nomeLibro'     =>  $row['nomeLibro'],
                            'nomeAutore'    =>  $row['nomeAutore'],
                            'cognomeAutore' =>  $row['cognomeAutore'],

                        ];
                    }

                    $result = [
                        'success'       =>  true,
                        'data'          =>  $resultArray,
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
                'message'   =>  'Missing element idUtente',
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
