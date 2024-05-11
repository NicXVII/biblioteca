
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
        $query = "SELECT tcartageopolitica.isbn, tcliente.nome, tcliente.cognome, tprenotazionecarta.dataPrenotazione, tprenotazionecarta.dataAccetazione
        FROM `tprenotazionecarta`
        JOIN tcartageopolitica
        ON tcartageopolitica.idCartaGeoPolitica = tprenotazionecarta.idCarta
        JOIN tcliente
        ON tcliente.IdCliente = tprenotazionecarta.idCliente
        ORDER BY tprenotazionecarta.dataPrenotazione DESC";

        $stmt = mysqli_prepare($db, $query);

        if ($stmt) {
            mysqli_stmt_execute($stmt);
            $queryResult = mysqli_stmt_get_result($stmt);

            if ($queryResult) {
                $resultArray =  [];
                while ($row = mysqli_fetch_array($queryResult)) {
                    $resultArray[] = [
                        'isbn' => $row['isbn'],
                        'nome' => $row['nome'],
                        'cognome' => $row['cognome'],
                        'dataPrenotazione' => $row['dataPrenotazione'],
                        'dataAccetazione' => $row['dataAccetazione'],
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
    } // Close database connection
    mysqli_close($db);
} else {
    $result = [
        'success'    =>  false,
        'message'   =>  'Invalid request method',
    ];
}

// Return results in JSON format
echo json_encode($result);
