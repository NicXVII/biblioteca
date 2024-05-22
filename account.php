<?php
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}
$worker = false;

if (isset($_SESSION['userID'])) {
    $worker = false;
} else
    $worker = true;

if (!isset($_SESSION['workerID']) && !isset($_SESSION['userID'])) {
    header('Location: index.php');
}
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Biblioteca | Account</title>
    <link rel="stylesheet" href="resources/css/account.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/sweetalert2@11/dist/sweetalert2.min.css">

</head>

<body>
    <input type="hidden" id="worker" value="<?php echo $worker; ?>">

    <?php
    require_once('components/nav.php')
    ?>
    <div class="media">
        <div class="userMedia">
            <div class="userMediaData"></div>
            <div class="userMediaBtn"></div>
        </div>
        <div class='select'></div>
        <div class='prestiti'>
        </div>
        <div class='prenotazioni'>
        </div>
    </div>
</body>

</html>

<script src="resources/js/account.js"></script>
<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>