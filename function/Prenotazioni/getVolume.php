
<?php
ini_set('display_errors', 0);

if (session_status() == PHP_SESSION_NONE) {
    // Avvia la sessione solo se non è stata già avviata
    session_start();
}
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
        if (isset($data['search'])) {
            $search = '%' . $data['search'] . '%';
        } else {
            $search = '%' . '%';
        }
        $query = "SELECT tvolume.isbn, tcliente.nome, tcliente.cognome, tprenotazioneenciclopedia.dataPrenotazione, tprenotazioneenciclopedia.dataAccetazione, tprenotazioneenciclopedia.idPrenotazione
        FROM `tprenotazioneenciclopedia`
        JOIN tvolume
        ON tvolume.idVolume = tprenotazioneenciclopedia.idVolume
        JOIN tcliente
        ON tcliente.IdCliente = tprenotazioneenciclopedia.idCliente
        WHERE tcliente.nome LIKE ?
        OR tcliente.cognome LIKE ?
        OR tprenotazioneenciclopedia.dataAccetazione LIKE ?
        OR tprenotazioneenciclopedia.dataAccetazione LIKE ?
        OR tvolume.isbn LIKE ?
        ORDER BY tprenotazioneenciclopedia.dataPrenotazione DESC";

        $stmt = mysqli_prepare($db, $query);

        if ($stmt) {
            mysqli_stmt_bind_param($stmt, "sssss", $search, $search, $search, $search, $search);

            mysqli_stmt_execute($stmt);
            $queryResult = mysqli_stmt_get_result($stmt);

            if ($queryResult) {
                $resultArray =  [];
                while ($row = mysqli_fetch_array($queryResult)) {
                    $resultArray[] = [
                        'id'   => $row['idPrenotazione'],
                        'isbn' => $row['isbn'],
                        'nome' => $row['nome'],
                        'cognome' => $row['cognome'],
                        'dataPrenotazione'   => date('d/m/Y', strtotime($row['dataPrenotazione'])),
                        'dataAccetazione'    => ($row['dataAccetazione'] != null) ? date('d/m/Y', strtotime($row['dataAccetazione'])) : null,
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
