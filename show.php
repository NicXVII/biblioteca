<?php
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}
$id = null;
$type = null;
if (isset($_REQUEST['id'])) {
    $id = $_REQUEST['id'];
}
if (isset($_REQUEST['tipo_elemento'])) {
    $type = $_REQUEST['tipo_elemento'];
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
    <title>Biblioteca | Ricerca Dettagliata</title>
    <link rel="stylesheet" href="resources/css/show.css">
</head>

<body>
    <input type="hidden" name="idvValue" id="idValue" value="<?php echo $id; ?>">
    <input type="hidden" name="typeValue" id="typeValue" value="<?php echo $type; ?>">

    <?php
    require_once('components/nav.php');
    ?>

</body>
<script src="resources/js/show.js"></script>

</html>