<?php
session_start();
require_once("../database.php");

$result = array();

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
        $query = "SELECT tcliente.nome,tcliente.cognome, tprestitoenciclopedia.idPrenotazione, tvolume.isbn, tprestitoenciclopedia.dataInizio,tprestitoenciclopedia.dataFine
        FROM `tprestitoenciclopedia`
        JOIN tprenotazioneenciclopedia
        ON tprestitoenciclopedia.idPrenotazione = tprestitoenciclopedia.idPrenotazione
        JOIN tcliente
        ON tcliente.IdCliente = tprenotazioneenciclopedia.idCliente
        JOIN tvolume
        ON tvolume.idVolume = tprenotazioneenciclopedia.idVolume
        ORDER BY tprestitoenciclopedia.dataInizio
        ";


        $stmt = mysqli_prepare($db, $query);

        if ($stmt) {
            mysqli_stmt_execute($stmt);
            $queryResult = mysqli_stmt_get_result($stmt);

            if ($queryResult) {
                $resultArray =  [];
                while ($row = mysqli_fetch_array($queryResult)) {
                    $resultArray[] = [
                        'nome'  => $row['nome'],
                        'cognome'  => $row['cognome'],
                        'idPrenotazione'  => $row['idPrenotazione'],
                        'isbn'  => $row['isbn'],
                        'dataInizio'  => $row['dataInizio'],
                        'dataFine'  => $row['dataFine']
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
                'message'   =>  'Failed to prepare statement: ' . mysqli_error($db),
            ];
        }
    }
    mysqli_close($db);
} else {
    $result = [
        'success'    =>  false,
        'message'   =>  'Invalid request method',
    ];
}

echo json_encode($result);