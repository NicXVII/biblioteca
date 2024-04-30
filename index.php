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
    <link rel="stylesheet" href="resources/css/components/nav.css">
</head>

<body>
    <?php
    require_once('components/nav.php');
    ?>
</body>

</html>