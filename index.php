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

    <div class='info'>
        <div class="descrizione">
            <h2>Informazioni</h2>

            <p>
                La Biblioteca Comunale di Foggia, fondata nel 1869, è un luogo di cultura e conoscenza che accoglie tutti gli appassionati di lettura. Con un vasto archivio di libri, riviste e documenti storici, la biblioteca offre una risorsa inestimabile per studenti, ricercatori e curiosi. Situata nel cuore di Foggia è un punto di riferimento per la comunità, promuovendo eventi culturali e attività didattiche che stimolano la crescita personale e collettiva.
            </p>

        </div>
        <div class="orari">
            <h2>Orari di apertura</h2>
            <p>
                <strong>Lunedì:</strong> 9:00 - 18:00<br>
                <strong>Martedì:</strong> 9:00 - 18:00<br>
                <strong>Mercoledì:</strong> 9:00 - 18:00<br>
                <strong>Giovedì:</strong> 9:00 - 18:00<br>
                <strong>Venerdì:</strong> 9:00 - 18:00<br>
                <strong>Sabato:</strong> Chiuso<br>
                <strong>Domenica:</strong> Chiuso<br>
            </p>
        </div>
    </div>


    <div class="map-container">
        <h1>Dove trovarci</h1>
        <div class='location'>
        </div>
    </div>
</body>

</html>
<script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key=AIzaSyC2eB0uH1_PcUqvpsoWzrCBCr0fXuRuF2U&callback=initMap" async defer></script>
<script src="resources/js/index.js"></script>