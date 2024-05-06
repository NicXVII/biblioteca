<?php
session_start();
require_once("../database.php");

$result = array();

// Check if the request method is POST
//if ($_SERVER['REQUEST_METHOD'] == 'POST') 
if(true)
{
    $db;

    if (!$db) {
        $result = [
            'success'    =>  false,
            'message'   =>  'Failed to connect to database',
        ];
    } else {
        $data = json_decode(file_get_contents('php://input'), true);
      
        if (isset($_SESSION['userID']) && isset($data['id']) && isset($data['type'])) {
            $id = $_SESSION['userID'];
            $idPrenotazione = $data['id'];
            $type = $data['type'];
            $queryDelete = "";
            switch ($type) {
                case 'Libro':
                    $queryDelete = "DELETE FROM tprenotazione WHERE tprenotazione.idPrenotazione = ? AND tprenotazione.idCliente = ?";
                    break;
                case 'Enciclopedia':
                    $queryDelete = "DELETE FROM tprenotazioneenciclopedia WHERE tprenotazioneenciclopedia.idPrenotazione = ? AND tprenotazioneenciclopedia.idCliente = ?";
                    break;
                case 'Carta Geo Politica':
                    $queryDelete = "DELETE FROM tprenotazionecarta WHERE tprenotazionecarta.idPrenotazione = ? AND tprenotazionecarta.idCliente = ?";
                    break;
            }
            $stmt = mysqli_prepare($db, $queryDelete);

            if ($stmt) {
                mysqli_stmt_bind_param($stmt, "ii", $idPrenotazione, $id);
                mysqli_stmt_execute($stmt);
                $affectedRows = mysqli_stmt_affected_rows($stmt);

                if ($affectedRows > 0) {
                    $result = [
                        'success'       =>  true,
                        'message'       =>  'Row deleted',
                    ];
                } else {
                    $result = [
                        'success'       =>  false,
                        'message'       =>  'No rows affected',
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
                'message'   =>  'Missing element '.$data['id'].' '.$data['type'].' '.$_SESSION['userID'].'',
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
