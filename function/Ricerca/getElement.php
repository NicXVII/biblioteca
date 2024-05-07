<?php
session_start();
require_once("..//database.php");
$data = json_decode(file_get_contents('php://input'), true);
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

        if (isset($data['tipoElemento']) && isset($data['ricerca'])) {
            $tipoElemento = $data['tipoElemento'];
            $ricerca = '%' . $data['ricerca'] . '%';

            switch ($tipoElemento) {
                case 'libri':
                    $query = "SELECT 
                                tlibro.idLibro as id,
                                tlibro.nome AS titolo,
                                tlibro.isbn,
                                tlibro.pubblicazione AS anno_pubblicazione,
                                tautore.nome AS autore_nome,
                                tautore.cognome AS autore_cognome,
                                tcasaeditrice.nome AS casa_editrice,
                                tcasaeditrice.idCasaEditrice   AS casa_editrice_id

                            FROM 
                                tlibro
                            JOIN 
                                tautore ON tlibro.idAutore = tautore.idAutore
                            JOIN 
                                tcasaeditrice ON tlibro.idCasaEditrice = tcasaeditrice.idCasaEditrice
                            WHERE 
                                tlibro.nome LIKE ? OR
                                tlibro.pubblicazione = ? OR
                                tcasaeditrice.nome LIKE ?";
                    break;
                case 'enciclopedie':
                    $query = "SELECT
                    tenciclopedia.idEnciclopedia AS id,
                    tenciclopedia.titolo AS titolo,
                    tenciclopedia.isbn,
                    tenciclopedia.data AS anno_pubblicazione,
                    tcasaeditrice.nome AS casa_editrice,
                    tcasaeditrice.idCasaEditrice  AS casa_editrice_id,
                    GROUP_CONCAT(tautore.nome, ' ', tautore.cognome) AS autore_nome,
                    tautore.cognome AS autore_cognome
                FROM 
                    tenciclopedia
                JOIN tcasaeditrice ON tenciclopedia.idCasaEditrice = tcasaeditrice.idCasaEditrice
                JOIN tautoreenciclopedia AS ta1 ON ta1.idEnciclopedia = tenciclopedia.idEnciclopedia
                JOIN tautore ON tautore.idAutore = ta1.idAutore
                WHERE 
                    (tenciclopedia.titolo LIKE ? OR
                    tenciclopedia.data = ? OR
                    tcasaeditrice.nome LIKE ?);
                ";
                    break;
                case 'cartine':
                    $query = "SELECT DISTINCT
                    tcartageopolitica.idCartaGeoPolitica AS id,
                    tcartageopolitica.isbn,
                    tcartageopolitica.titolo,
                    tcartageopolitica.data AS anno_pubblicazione,
                    tcartageopolitica.dataRappresentazione AS rappresentazione,
                    tautore.cognome AS autore_cognome,
                    tcasaeditrice.nome AS casa_editrice,
                    tcasaeditrice.idCasaEditrice  AS casa_editrice_id,
                    GROUP_CONCAT(tautore.nome, ' ', tautore.cognome ORDER BY tautore.cognome, tautore.nome) AS autore_nome
                FROM 
                    tcartageopolitica
                JOIN 
                    tautorecarta ON tautorecarta.idCartaGeoPolitica = tcartageopolitica.idCartaGeoPolitica
                JOIN 
                    tautore ON tautorecarta.idAutore = tautore.idAutore
                JOIN 
                    tcasaeditrice ON tcartageopolitica.idCasaEditrice = tcasaeditrice.idCasaEditrice
                WHERE 
                    tcartageopolitica.titolo LIKE ? OR
                    tcartageopolitica.data = ? OR
                    tcasaeditrice.nome LIKE ?
                GROUP BY 
                    tcartageopolitica.idCartaGeoPolitica;
                ";
                    break;


                case 'tutto':
                    $query = "SELECT 
                                'libro' AS tipo_elemento,
                                idLibro AS id,
                                nome AS titolo,
                                isbn,
                                pubblicazione AS anno_pubblicazione,
                                tautore.nome AS autore_nome,
                                tautore.cognome AS autore_cognome,
                                tcasaeditrice.nome AS casa_editrice
                            FROM 
                                tlibro
                            JOIN 
                                tautore ON tlibro.idAutore = tautore.idAutore
                            JOIN 
                                tcasaeditrice ON tlibro.idCasaEditrice = tcasaeditrice.idCasaEditrice
                            WHERE 
                                nome LIKE ? OR
                                pubblicazione = ? OR
                                tcasaeditrice.nome LIKE ?
                            UNION
                            SELECT 
                                'volume' AS tipo_elemento,
                                idVolume AS id,
                                titolo,
                                isbn,
                                anno_pubblicazione,
                                tautore.nome AS autore_nome,
                                tautore.cognome AS autore_cognome,
                                tcasaeditrice.nome AS casa_editrice
                            FROM 
                                tvolume
                            JOIN 
                                tautore ON tvolume.idAutore = tautore.idAutore
                            JOIN 
                                tcasaeditrice ON tvolume.idCasaEditrice = tcasaeditrice.idCasaEditrice
                            WHERE 
                                titolo LIKE ? OR
                                anno_pubblicazione = ? OR
                                tcasaeditrice.nome LIKE ?
                            UNION
                            SELECT 
                                'cartaGeoPolitica' AS tipo_elemento,
                                idCartaGeoPolitica AS id,
                                titolo,
                                data AS anno_pubblicazione,
                                tautore.nome AS autore_nome,
                                tautore.cognome AS autore_cognome,
                                tcasaeditrice.nome AS casa_editrice
                            FROM 
                                tcartageopolitica
                            JOIN 
                                tautore ON tcartageopolitica.idAutore = tautore.idAutore
                            JOIN 
                                tcasaeditrice ON tcartageopolitica.idCasaEditrice = tcasaeditrice.idCasaEditrice
                            WHERE 
                                titolo LIKE ? OR
                                data = ? OR
                                tcasaeditrice.nome LIKE ?";
                    break;

                default:
                    $result = [
                        'success'    =>  false,
                        'message'   =>  'Tipo di elemento non valido',
                    ];
                    echo json_encode($result);
                    exit;
            }

            $stmt = mysqli_prepare($db, $query);
            if ($stmt === false) {
                die("Error in preparing SQL query: " . mysqli_error($db));
            }

            mysqli_stmt_bind_param($stmt, "sss", $ricerca, $ricerca, $ricerca);
            mysqli_stmt_execute($stmt);
            $queryResult = mysqli_stmt_get_result($stmt);

            if ($queryResult) {
                $resultArray =  [];
                while ($row = mysqli_fetch_array($queryResult)) {
                    $resultArray[] = [
                        'id'                 => $row['id'],
                        'tipo_elemento'      => $tipoElemento,
                        'titolo'             => $row['titolo'],
                        'isbn'               => $row['isbn'],
                        'anno_pubblicazione' => date('d/m/Y', strtotime($row['anno_pubblicazione'])),
                        'autore_nome'        => $row['autore_nome'],
                        'autore_cognome'     => $row['autore_cognome'],
                        'casa_editrice'      => $row['casa_editrice'],
                        'casa_editrice_id'   => $row['casa_editrice_id']
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

            mysqli_close($db);
        } else {
            $result = [
                'success'    =>  false,
                'message'   =>  'Missing element tipoElemento or ricerca',
            ];
        }
    }
} else {
    $result = [
        'success'    =>  false,
        'message'   =>  'Invalid request method',
    ];
}
echo json_encode($result);
