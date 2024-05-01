<?php
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

if (!isset($_SESSION['userID'])) {
    header('Location: login.php');
    exit();
}
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Biblioteca | Home</title>
    <link rel="stylesheet" href="resources/css/index.css">
</head>

<body>
    <?php
    require_once('components/nav.php');
    ?>
    <div class='title'>
        <h1>Biblioteca Comunale di Foggia</h1>
    </div>

    <div class='location'>
        <img src="resources/img/backgroundLoginRegister.jpg" alt="Posizione Biblioteca">
    </div>

    <div class='info'>
        <h2>Informazioni</h2>
        <p>
            La Biblioteca Comunale di Foggia è una biblioteca pubblica situata in Via Arpi, 107, 71121 Foggia FG.
            La biblioteca è stata fondata nel 1869 e dispone di un vasto archivio di libri, riviste e documenti storici.
            La biblioteca è aperta al pubblico dal lunedì al venerdì dalle 9:00 alle 18:00.
        </p>
    </div>
</body>

</html>