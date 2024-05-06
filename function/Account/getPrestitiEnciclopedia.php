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

            $query = "SELECT 
            tprestitoenciclopedia.dataInizio, 
            tprestitoenciclopedia.dataFine, 
            tenciclopedia.titolo AS nome,
            tvolume.numeroVolume,
            GROUP_CONCAT(tautore.nome, ' ', tautore.cognome) AS autori
        FROM 
            `tprestitoenciclopedia`
        JOIN 
            tprenotazioneenciclopedia ON tprenotazioneenciclopedia.idPrenotazione = tprestitoenciclopedia.idPrenotazione
        JOIN 
            tvolume ON tprenotazioneenciclopedia.idVolume = tvolume.idVolume
        JOIN 
            tenciclopedia ON tenciclopedia.idEnciclopedia = tvolume.idEnciclopedia
        JOIN 
            tautoreenciclopedia ON tautoreenciclopedia.idEnciclopedia = tenciclopedia.idEnciclopedia
        JOIN 
            tautore ON tautoreenciclopedia.idAutore = tautore.idAutore
        WHERE 
            tprenotazioneenciclopedia.idCliente = ?
        GROUP BY 
            tprestitoenciclopedia.dataInizio, 
            tprestitoenciclopedia.dataFine, 
            tenciclopedia.titolo,
            tvolume.numeroVolume;
        
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
                            'nome'         => $row['nome'] . " ,volume: " . $row['numeroVolume'],
                            'autori'        => $row['autori'],
                            'dataInizio'  => date('d/m/Y', strtotime($row['dataInizio'])),
                            'dataFine'   => ($row['dataFine'] != null) ? date('d/m/Y', strtotime($row['dataFine'])) : null,
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
