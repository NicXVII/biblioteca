<?php
session_start();
require_once("../database.php");

$result = array();

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
        if (isset($data['id'])) {
            $id = $data['id'];
            $query = "SELECT 
                tcartageopolitica.titolo,
                tcartageopolitica.data,
                tcartageopolitica.dataRappresentazione,
                tcartageopolitica.isbn,
                tcasaeditrice.nome AS casa_editrice_nome,
                tcasaeditrice.idCasaEditrice,
                GROUP_CONCAT(tautore.nome, ' ', tautore.cognome SEPARATOR ', ') AS autori
            FROM 
                tcartageopolitica
            JOIN 
                tcasaeditrice ON tcasaeditrice.idCasaEditrice = tcartageopolitica.idCasaEditrice
            JOIN 
                tautorecarta ON tautorecarta.idCartaGeoPolitica = tcartageopolitica.idCartaGeoPolitica
            JOIN 
                tautore ON tautore.idAutore = tautorecarta.idAutore
            WHERE 
                tcartageopolitica.idCartaGeoPolitica = ?
            GROUP BY 
                tcartageopolitica.titolo,
                tcartageopolitica.data,
                tcartageopolitica.dataRappresentazione,
                tcartageopolitica.isbn,
                tcasaeditrice.nome,
                tcasaeditrice.idCasaEditrice;
            ";

            $stmt = mysqli_prepare($db, $query);

            if ($stmt) {
                mysqli_stmt_bind_param($stmt, "i", $id);
                mysqli_stmt_execute($stmt);
                $queryResult = mysqli_stmt_get_result($stmt);

                if ($queryResult) {
                    $resultArray =  [];
                    while ($row = mysqli_fetch_array($queryResult)) {
                        // Append each row to the $resultArray
                        $resultArray[] = [
                            'BookName'          => $row['titolo'],
                            'ISBN'              => $row['isbn'],
                            'PublicationDate'   => $row['data'],
                            'RepresentationDate' => $row['dataRappresentazione'],
                            'PublisherName'     => $row['casa_editrice_nome'],
                            'PublisherID'       => $row['idCasaEditrice'],
                            'Authors'           => $row['autori']
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

echo json_encode($result);
