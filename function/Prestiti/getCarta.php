<?php
ini_set('display_errors', 0);

if (session_status() == PHP_SESSION_NONE) {
    // Avvia la sessione solo se non è stata già avviata
    session_start();
}
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
        $data = json_decode(file_get_contents('php://input'), true);
        if (isset($data['search'])) {
            $search = '%' . $data['search'] . '%';
        } else {
            $search = '%' . '%';
        }
        $query = "SELECT tcliente.nome, tcliente.cognome, tprestitocarta.idPrenotazione, tcartageopolitica.isbn, tprestitocarta.dataInizio,
        tprestitocarta.dataFine, tprestitocarta.idPrestito, tprestitocarta.idLavoratoreConsegna, tprestitocarta.idLavoratoreRitiro
        FROM `tprestitocarta`
        JOIN tprenotazionecarta
        ON tprestitocarta.idPrenotazione = tprenotazionecarta.idPrenotazione
        JOIN tcliente
        ON tcliente.IdCliente = tprenotazionecarta.idCliente
        JOIN tcartageopolitica
        ON tcartageopolitica.idCartaGeoPolitica = tprenotazionecarta.idCarta
        WHERE tcliente.nome LIKE ?
        OR tcliente.cognome LIKE ?
        OR tprestitocarta.dataInizio LIKE ?
        OR tprestitocarta.dataFine LIKE ?
        OR tcartageopolitica.isbn LIKE ?
        ORDER BY tprestitocarta.dataInizio";

        $stmt = mysqli_prepare($db, $query);

        if ($stmt) {
            mysqli_stmt_bind_param($stmt, "sssss", $search, $search, $search, $search, $search);
            mysqli_stmt_execute($stmt);
            $queryResult = mysqli_stmt_get_result($stmt);

            if ($queryResult) {
                $resultArray =  [];
                while ($row = mysqli_fetch_assoc($queryResult)) {
                    $resultArray[] = [
                        'idLavoratoreConsegna'   => $row['idLavoratoreConsegna'],
                        'idLavoratoreRitiro'   => $row['idLavoratoreRitiro'],
                        'id'   => $row['idPrestito'],
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
