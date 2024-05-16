<?php
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}
$id = null;
$type = null;
$casaEditrice = null;
if (isset($_REQUEST['id'])) {
    $id = $_REQUEST['id'];
}
if (isset($_REQUEST['tipo_elemento'])) {
    $type = $_REQUEST['tipo_elemento'];
}

if (isset($_REQUEST['casaEditrice'])) {
    $casaEditrice = $_REQUEST['casaEditrice'];
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
    <title>Biblioteca | Ricerca Dettagliata</title>
    <link rel="stylesheet" href="resources/css/show.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/sweetalert2@11/dist/sweetalert2.min.css">

</head>

<body>
    <input type="hidden" name="idvValue" id="idValue" value="<?php echo $id; ?>">
    <input type="hidden" name="typeValue" id="typeValue" value="<?php echo $type; ?>">
    <input type="hidden" name="casaEditriceValue" id="casaEditriceValue" value="<?php echo $casaEditrice; ?>">


    <?php
    require_once('components/nav.php');
    ?>
    <div class="title"></div>
    <div class='detailContaienr'>
        <div class='detailImg'>
        </div>
        <div class='detail'>
        </div>
    </div>

</body>

</html>
<script src="resources/js/show.js"></script>
<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>