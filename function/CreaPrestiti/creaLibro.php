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
        $data['id'] = 32;
        if (isset($data['id']) && isset($_SESSION['workerID'])) {


            $queryIdLibro = "SELECT tprenotazione.idLibro FROM tprenotazione
            WHERE tprenotazione.idPrenotazione = ?";
            $stmt = mysqli_prepare($db, $queryIdLibro);

            mysqli_stmt_bind_param($stmt, "i", $data['id']);
            mysqli_stmt_execute($stmt);;

            $resultIdLibro = mysqli_stmt_get_result($stmt);


            $idLibro = mysqli_fetch_array($resultIdLibro)['idLibro'];

            echo $idLibro;

            $queryControllo = "CALL checkPrestitoLibro($idLibro);";

            // Execute the query
            $queryControlloResult = $db->query($queryControllo);

            if ($queryControlloResult) {
                // Fetch the result as an associative array
                $result = $queryControlloResult->fetch_array(MYSQLI_ASSOC);

                // Check if the result is available and print the count
                if ($result) {
                    echo "Number of Completed Reservations: " . $result['NumberOfCompletedReservations'];
                } else {
                    echo "No data found.";
                }
            } else {
                echo "Query failed: " . $db->error;
            }

            $idPrenotazione = $data['id'];
            $idLavoratore = $_SESSION['workerID'];
            $dataInizio = date('Y-m-d H:i:s');

            $currentDate = date('Y-m-d H:i:s');
            $query = "INSERT INTO tprestito (idPrenotazione, idLavoratoreConsegna, dataInizio)
                      VALUES (?, ?, ?)";

            $stmt = mysqli_prepare($db, $query);

            if ($stmt) {
                mysqli_stmt_bind_param($stmt, "iis", $idPrenotazione, $idLavoratore, $dataInizio);
                mysqli_stmt_execute($stmt);
                $queryResult = mysqli_affected_rows($db);

                if ($queryResult > 0) {

                    $result = [
                        'success'       =>  true,
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
