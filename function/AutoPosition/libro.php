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
        $query = "CALL scaffaliLibro()";


        $stmt = mysqli_prepare($db, $query);

        mysqli_stmt_execute($stmt);
        $queryResult = mysqli_stmt_get_result($stmt);

        if ($queryResult) {
            $idScaffali =  [];
            while ($row = mysqli_fetch_array($queryResult)) {
                $idScaffali[] = [
                    'idScaffale ' => $row['idScaffale'],
                ];
            }
        } else {
            $result = [
                'success'    =>  false,
                'message'   =>  'Query execution failed, searching idScaffali',
            ];
        }

        mysqli_stmt_close($stmt);
        $countBOOKS = [];
        $query = "CALL LibriinScaffale(?)";
        $stmt = mysqli_prepare($db, $query);

        foreach ($idScaffali as $idScaffale) {
            mysqli_stmt_bind_param($stmt, "i", $idScaffale);
            mysqli_stmt_execute($stmt);
            $queryResult = mysqli_stmt_get_result($stmt);

            if ($queryResult) {
                $row = mysqli_fetch_array($queryResult);
                $countBOOKS[] = [
                    'idScaffale' => $idScaffale,
                    'count' => $row['COUNT(*)'],
                ];
            } else {
                $result = [
                    'success' => false,
                    'message' => 'Query execution failed, searching books in shelf',
                ];
            }
        }

        mysqli_close($db);
    }
}
// Close database connection
else {
    $result = [
        'success'    =>  false,
        'message'   =>  'Invalid request method',
    ];
}

echo json_encode($result);
