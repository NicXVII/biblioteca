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
            $query = "SELECT tlibro.nome as nomeLibro, tlibro.isbn, tlibro.idLibro as idLibro, tlibro.pubblicazione, tcasaeditrice.nome as nomeEditore, tcasaeditrice.idCasaEditrice as idEditore, tautore.idAutore as idAutore, tautore.nome as nomeAutore, tautore.cognome as cognomeAutore, tautore.dataNascita, tautore.dataMorte
            FROM `tlibro`
            JOIN tcasaeditrice ON tcasaeditrice.idCasaEditrice = tlibro.idCasaEditrice
            JOIN tautore ON tautore.idAutore = tlibro.idAutore
            WHERE tlibro.idLibro = ? ";

            $stmt = mysqli_prepare($db, $query);

            if ($stmt) {
                mysqli_stmt_bind_param($stmt, "i", $id);
                mysqli_stmt_execute($stmt);
                $queryResult = mysqli_stmt_get_result($stmt);

                if ($queryResult) {
                    $resultArray =  [];
                    while ($row = mysqli_fetch_array($queryResult)) {
                        $resultArray = [
                            'BookName'          => $row['nomeLibro'],
                            'ISBN'              => $row['isbn'],
                            'BookID'            => $row['idLibro'],
                            'PublicationDate'   => $row['pubblicazione'],
                            'PublisherName'     => $row['nomeEditore'],
                            'PublisherID'       => $row['idEditore'],
                            'AuthorID'          => $row['idAutore'],
                            'AuthorName'        => $row['nomeAutore'],
                            'AuthorSurname'     => $row['cognomeAutore'],
                            'AuthorBirthDate'   => $row['dataNascita'],
                            'AuthorDeathDate'   => $row['dataMorte']
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
