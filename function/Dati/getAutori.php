<?php
session_start();
require_once("../database.php");

$result = array();

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $db;

    if (!$db) {
        $result = [
            'success'    =>  false,
            'message'   =>  'Failed to connect to database',
        ];
    } else {
        $query = "SELECT * FROM tautore ORDER BY tautore.nome";


        $stmt = mysqli_prepare($db, $query);

        if ($stmt) {
            mysqli_stmt_execute($stmt);
            $queryResult = mysqli_stmt_get_result($stmt);

            if ($queryResult) {
                $resultArray =  [];
                while ($row = mysqli_fetch_array($queryResult)) {
                    $resultArray[] = [
                        'idAutore' => $row['idAutore'],
                        'nome'      => $row['nome'],
                        'cognome'   => $row['cognome'],
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
                'message'   =>  'Failed to prepare statement: ' . mysqli_error($db), // E qui
            ];
        }
    }
    // Close database connection
    mysqli_close($db);
} else {
    $result = [
        'success'    =>  false,
        'message'   =>  'Invalid request method',
    ];
}

echo json_encode($result);
