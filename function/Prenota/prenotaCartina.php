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
        $data = json_decode(file_get_contents('php://input'), true);
        if (isset($data['id'])) {
            $idLibro = $data['id'];
            $idUtente = $_SESSION['userID'];

            $queryControllo = "SELECT COUNT(*) FROM tprenotazionecarta 
            WHERE tprenotazionecarta.idCliente = ? 
            AND tprenotazionecarta.idCarta  = ?
            AND tprenotazionecarta.dataAccetazione IS NULL;
            ";
            $stmt = mysqli_prepare($db, $queryControllo);

            if ($stmt) {
                mysqli_stmt_bind_param($stmt, "ii", $idUtente, $idLibro);
                mysqli_stmt_execute($stmt);
                mysqli_stmt_bind_result($stmt, $count);
                mysqli_stmt_fetch($stmt);
                mysqli_stmt_close($stmt);

                if ($count > 0) {
                    $result = [
                        'success'    =>  false,
                        'message'   =>  'You have already booked this carta',
                    ];
                    echo json_encode($result);
                    exit();
                }
            }


            $queryControllo = "SELECT COUNT(*) FROM tprestitocarta 
            JOIN tprenotazionecarta
            ON tprestitocarta.idPrenotazione = tprenotazionecarta.idPrenotazione
            WHERE tprenotazionecarta.idCliente = ?
            AND tprenotazionecarta.idCarta = ?
            AND tprestitocarta.dataFine IS NULL;            
            ";

            $stmt = mysqli_prepare($db, $queryControllo);

            if ($stmt) {
                mysqli_stmt_bind_param($stmt, "ii", $idUtente, $idLibro);
                mysqli_stmt_execute($stmt);
                mysqli_stmt_bind_result($stmt, $count);
                mysqli_stmt_fetch($stmt);
                mysqli_stmt_close($stmt);

                if ($count > 0) {
                    $result = [
                        'success'    =>  false,
                        'message'   =>  'You have already booked this book',
                    ];
                    echo json_encode($result);
                    exit();
                }
            }
            $query = "INSERT INTO tprenotazionecarta (idCliente, idCarta, dataPrenotazione, dataAccetazione) VALUES (?, ?, NOW(), NULL)";

            $stmt = mysqli_prepare($db, $query);

            if ($stmt) {
                mysqli_stmt_bind_param($stmt, "ii", $idUtente, $idLibro);
                mysqli_stmt_execute($stmt);

                if (mysqli_stmt_affected_rows($stmt) > 0) {
                    $result = [
                        'success'       =>  true,
                        'data'          =>  "Libro prenotato correttamente",
                    ];
                } else {
                    $result = [
                        'success'    =>  false,
                        'message'   =>  'Failed to book  a book',
                    ];
                }

                // Close statement
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
                'message'   =>  'Missing book ID in request body',
            ];
        }

        mysqli_close($db);
    }
} else {
    $result = [
        'success'    =>  false,
        'message'   =>  'Invalid request method',
    ];
}

echo json_encode($result);
