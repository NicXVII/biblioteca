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
        if (isset($_SESSION['workerID'])) {
            $id = $_SESSION['workerID'];
            $query = "SELECT * FROM `tlavoratore`
            WHERE tlavoratore.IdLavoratore = ?";

            $stmt = mysqli_prepare($db, $query);

            if ($stmt) {
                mysqli_stmt_bind_param($stmt, "s", $id);
                mysqli_stmt_execute($stmt);
                $queryResult = mysqli_stmt_get_result($stmt);

                if ($queryResult) {
                    $resultArray =  [];
                    while ($row = mysqli_fetch_array($queryResult)) {
                        $resultArray[] = [
                            'nome'              => $row['nome'],
                            'cognome'           => $row['cognome'],
                            'codiceFiscale'     => $row['codiceFiscale'],
                            'password'          => $row['password'],
                        ];
                    }

                    $result = [
                        'success'       =>  true,
                        'data'          =>  $resultArray[0],
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
                'message'   =>  'Missing element idGenere',
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
