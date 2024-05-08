<?php
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}
$worker = null;
if (isset($_SESSION['workerID'])) {
    $worker = true;
}
if (!isset($_SESSION['userID']) && !isset($_SESSION['workerID'])) {
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
    <input type="hidden" id="worker" value="<?php echo $worker; ?>">
    <?php
    require_once('components/nav.php');
    ?>
    <div class='title'>
        <h1>Biblioteca Comunale di Foggia</h1>
    </div>

    <div class='location'>
        <?php
        if (isset($_SESSION['userID'])) {
            echo '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2990.2188669231373!2d15.557238876442474!3d41.4561680917255!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1339d84fd7af3ccf%3A0x17d51498dcfa8899!2sBiblioteca%20di%20Foggia%20%22la%20Magna%20Capitana%22!5e0!3m2!1sit!2sit!4v1715008983363!5m2!1sit!2sit" width="850" height="600" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>';
        }
        ?>

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
<script src="resources/js/index.js"></script>