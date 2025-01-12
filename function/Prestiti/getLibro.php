
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
        $query = "SELECT tcliente.nome,tcliente.cognome, tprenotazione.idPrenotazione, tlibro.isbn,tprestito.dataInizio,tprestito.dataFine, tprestito.idPrestito, tprestito.idLavoratoreConsegna, tprestito.idLavoratoreRitiro
        FROM `tprestito`
        JOIN tprenotazione
        ON tprestito.idPrenotazione = tprenotazione.idPrenotazione
        JOIN tcliente
        ON tcliente.IdCliente = tprenotazione.idCliente
        JOIN tlibro
        ON tlibro.idLibro = tprenotazione.idLibro
        WHERE tcliente.nome LIKE ?
        OR tcliente.cognome LIKE ?
        OR tprestito.dataInizio LIKE ?
        OR tprestito.dataFine LIKE ?
        OR tlibro.isbn LIKE ?
        ORDER BY tprestito.dataInizio
        ";


        $stmt = mysqli_prepare($db, $query);

        if ($stmt) {
            mysqli_stmt_bind_param($stmt, "sssss", $search, $search, $search, $search, $search);
            mysqli_stmt_execute($stmt);
            $queryResult = mysqli_stmt_get_result($stmt);

            if ($queryResult) {
                $resultArray =  [];
                while ($row = mysqli_fetch_array($queryResult)) {
                    $resultArray[] = [
                        'idLavoratoreConsegna'   => $row['idLavoratoreConsegna'],
                        'idLavoratoreRitiro'   => $row['idLavoratoreRitiro'],
                        'id'   => $row['idPrestito'],
                        'nome'  => $row['nome'],
                        'cognome'  => $row['cognome'],
                        'idPrenotazione'  => $row['idPrenotazione'],
                        'isbn'  => $row['isbn'],
                        'dataInizio'           => date('d/m/Y', strtotime($row['dataInizio'])),
                        'dataFine'             => ($row['dataFine'] != null) ? date('d/m/Y', strtotime($row['dataFine'])) : null,
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
