<?php
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}
$type = null;
if (!isset($_SESSION['workerID']) || !isset($_REQUEST['type'])) {

    header('Location: loginWorker.php');
    exit();
}
$type = $_REQUEST['type'];
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="resources/css/insertElement.css">
    <title>Biblioteca | Inserisci Elemento</title>
</head>

<body>
    <input type="hidden" id="type" value="<?php echo $type; ?>">
    <?php
    require_once('components/nav.php');
    ?>
    <div class="formDiv"></div>
</body>

</html>
<script src="resources/js/insertElement.js"></script>