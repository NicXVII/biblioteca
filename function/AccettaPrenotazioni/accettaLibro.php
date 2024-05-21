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
        $data = json_decode(file_get_contents('php://input'), true);
        $data['id'] = 75;
        if (isset($data['id'])) {
            $id = $data['id'];

            $queryIdLibro = "SELECT tprenotazione.idLibro FROM tprenotazione
            WHERE tprenotazione.idPrenotazione = ?";
            $stmt = mysqli_prepare($db, $queryIdLibro);

            mysqli_stmt_bind_param($stmt, "i", $id);
            mysqli_stmt_execute($stmt);
            $resultIdLibro = mysqli_stmt_get_result($stmt);
            $idLibro = mysqli_fetch_array($resultIdLibro)['idLibro'];

            // Debugging: Check if the correct book ID is fetched
            //echo $idLibro;

            $queryControllo = "CALL checkPrestitoLibro($idLibro);";

            // Execute the query
            $queryControlloResult = $db->query($queryControllo);

            $count = null;
            if ($queryControlloResult) {
                $result = $queryControlloResult->fetch_array(MYSQLI_ASSOC);
                $count  = $result['NumberOfCompletedReservations'];
            } else {
                $result = [
                    'success'    =>  false,
                    'message'   =>  'Query failed: ' . $db->error,
                ];
                json_encode($result);
                mysqli_close($db);
                exit(0);
            }

            //echo 'count ' . $count;
            if ($count > 0) {
                $result = [
                    'success'    =>  false,
                    'message'   =>  'Book is already borrowed',
                ];
                echo json_encode($result);
                mysqli_close($db);
                exit();
            }

            $db->next_result();

            $currentDate = date('Y-m-d');
            $query = "UPDATE tprenotazione
                      SET dataAccetazione = ?
                      WHERE idPrenotazione = ?";

            $stmt = mysqli_prepare($db, $query);

            if ($stmt) {
                mysqli_stmt_bind_param($stmt, "si", $currentDate, $id);
                mysqli_stmt_execute($stmt);
                $queryResult = mysqli_affected_rows($db);

                if ($queryResult > 0) {
                    $result = [
                        'success' => true,
                    ];
                } else {
                    $result = [
                        'success' => false,
                        'message' => 'Impossibile eseguire la query. Potrebbe esserci un problema con l\'esecuzione della query stessa o con i dati forniti.',
                    ];
                }

                mysqli_stmt_close($stmt);
            } else {
                $result = [
                    'success' => false,
                    'message' => 'Impossibile preparare la query. Errore: ' . $db->error . '. Data corrente: ' . $currentDate . '. ID: ' . $id,
                ];
            }
        } else {
            $result = [
                'success'    =>  false,
                'message'   =>  'Missing element id',
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
