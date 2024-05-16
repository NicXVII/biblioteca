
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
        if (isset($data['id'])) {
            $id = $data['id'];
            $query = "SELECT tstanza.nome as nomeStanza, tarmadio.nome as nomeArmadio, tscaffalevolume.numeroScaffale as numeroScaffale, tvolume.idVolume as id, tscaffale.nome as nomeScaffale
            FROM tscaffalevolume
            JOIN tscaffale
            ON tscaffalevolume.idScaffale = tscaffale.idScaffale
            JOIN tarmadio
            ON tarmadio.idArmadio = tscaffale.idArmadio
            JOIN tstanza
            ON tscaffale.idStanza = tstanza.idStanza
            JOIN tvolume
            ON tvolume.idVolume = tscaffalevolume.idVolume
            WHERE tvolume.idVolume = ?";

            $stmt = mysqli_prepare($db, $query);

            if ($stmt) {
                mysqli_stmt_bind_param($stmt, "i", $id);
                mysqli_stmt_execute($stmt);
                $queryResult = mysqli_stmt_get_result($stmt);

                if ($queryResult) {
                    $resultArray =  [];
                    while ($row = mysqli_fetch_array($queryResult)) {
                        $resultArray[] = [
                            'id'                      => $row['id'],
                            'nomeStanza'              => $row['nomeStanza'],
                            'nomeArmadio'             => $row['nomeArmadio'],
                            'nomeScaffale'            => $row['nomeScaffale'],
                            'numeroScaffale'          => $row['numeroScaffale']
                        ];
                    }

                    $result = [
                        'success'       =>  true,
                        'data'          =>  $resultArray[0],
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
                'message'   =>  'Missing element idGenere',
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
