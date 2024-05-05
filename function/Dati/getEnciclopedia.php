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
        $data['id'] = 10;
        if (isset($data['id'])) {
            $id = $data['id'];
            $query = "SELECT 
            tenciclopedia.idEnciclopedia,
            tenciclopedia.titolo,
            tenciclopedia.data,
            tenciclopedia.volumiTotali,
            tenciclopedia.isbn,
            tcasaeditrice.nome AS casa_editrice_nome,
            tcasaeditrice.idCasaEditrice,
            GROUP_CONCAT(DISTINCT CONCAT(tautore.nome, ' ', tautore.cognome)) AS autori,
            GROUP_CONCAT(DISTINCT tvolume.isbn) AS isbn_volumi,
            GROUP_CONCAT(DISTINCT tvolume.numeroVolume) AS numero_volumi

        FROM 
            tenciclopedia
        JOIN 
            tautoreenciclopedia ON tautoreenciclopedia.idEnciclopedia = tenciclopedia.idEnciclopedia
        JOIN 
            tcasaeditrice ON tcasaeditrice.idCasaEditrice = tenciclopedia.idCasaEditrice
        LEFT JOIN 
            tvolume ON tvolume.idEnciclopedia = tenciclopedia.idEnciclopedia
        LEFT JOIN 
            tautore ON tautore.idAutore = tautoreenciclopedia.idAutore
        WHERE 
            tenciclopedia.idEnciclopedia = ?
        GROUP BY
            tenciclopedia.titolo,
            tenciclopedia.data,
            tenciclopedia.volumiTotali,
            tenciclopedia.isbn,
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
                        $resultArray[] = [
                            'id'                => $row['idEnciclopedia'],
                            'BookName'          => $row['titolo'],
                            'volumiTotali'      => $row['volumiTotali'],
                            'ISBN'              => $row['isbn'],
                            'PublicationDate'   => $row['data'],
                            'PublisherName'     => $row['casa_editrice_nome'],
                            'PublisherID'       => $row['idCasaEditrice'],
                            'Authors'           => $row['autori'],
                            'isbn_volumi'       => $row['isbn_volumi'],
                            'numero_volumi'     => $row['numero_volumi']
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
                    'message'   =>  'Failed to prepare statement: ' . mysqli_error($db), // E qui
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
