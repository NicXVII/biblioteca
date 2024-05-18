<?php
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}
if (!isset($_SESSION['workerID'])) {

    header('Location: loginWorker.php');
    exit();
}
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="resources/css/insert.css">
    <title>Biblioteca | Inserisci Elemento</title>
</head>

<body>
    <?php
    require_once('components/nav.php');
    ?>
    <h1>Inserimento Autori/Casa Editrice</h1>
    <div class="content"></div>
</body>

</html>
<script src="resources/js/insert.js"></script>
<script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>