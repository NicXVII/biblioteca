<?php
session_start();
require_once("../database.php");

$result = array();

// Check if the request method is POST
//if ($_SERVER['REQUEST_METHOD'] == 'POST')
if (true) {
    $db;

    if (!$db) {
        $result = [
            'success'    =>  false,
            'message'   =>  'Failed to connect to database',
        ];
    } else {
        if (isset($_SESSION['userID'])) {
            $id = $_SESSION['userID'];

            $query = "SELECT tprenotazionecarta.dataPrenotazione, 
            tprenotazionecarta.dataAccetazione, 
            tcartageopolitica.titolo AS nome, 
            GROUP_CONCAT(tautore.nome, ' ', tautore.cognome) AS autori
     FROM `tprenotazionecarta` 
     JOIN tcartageopolitica 
     ON tcartageopolitica.idCartaGeoPolitica = tprenotazionecarta.idCarta
     JOIN tautorecarta
     ON tautorecarta.idCartaGeoPolitica = tcartageopolitica.idCartaGeoPolitica
     JOIN tautore 
     ON tautorecarta.idAutore = tautore.idAutore
     WHERE tprenotazionecarta.idCliente = ?
     GROUP BY tprenotazionecarta.dataPrenotazione, 
              tprenotazionecarta.dataAccetazione, 
              tcartageopolitica.titolo;
     
           
            ";

            $stmt = mysqli_prepare($db, $query);

            if ($stmt) {
                mysqli_stmt_bind_param($stmt, "i", $id);
                mysqli_stmt_execute($stmt);
                $queryResult = mysqli_stmt_get_result($stmt);

                if ($queryResult) {
                    $resultArray =  [];
                    while ($row = mysqli_fetch_array($queryResult)) {
                        $resultArray[] = [
                            'nome'         => $row['nome'],
                            'autori'        => $row['autori'],
                            'dataPrenotazione'  => date('d/m/Y', strtotime($row['dataPrenotazione'])),
                            'dataAccetazione'   => ($row['dataAccetazione'] != null) ? date('d/m/Y', strtotime($row['dataAccetazione'])) : null,
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
