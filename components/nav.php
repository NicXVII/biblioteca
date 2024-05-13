<?php
if (session_status() === PHP_SESSION_NONE) {
    ob_start();
}
$id = null;
$worker = null;
if (isset($_SESSION['userID'])) {
    $id = $_SESSION['userID'];
    $worker = true;
}

if (isset($_SESSION['workerID'])) {
    $id = $_SESSION['workerID'];
    $worker = false;
}

if ($worker === null && $id === null)
    header('Location: index.php');


?>
<link rel="stylesheet" href="resources/css/components/nav.css">

<nav class="nav-bar" id="nav-bar">
    <input type="hidden" name="hidden" id="userID" value="<?php echo $id; ?>">
    <input type="hidden" name="worker" id="worker" value="<?php echo $worker; ?>">


    <div>
        <ul id="ul">

            <li>
                <a href="index.php">
                    <i class="fa-solid fa-house"></i>
                    <img src="#" alt="logoBiblioteca">
                </a>
            </li>
            <li>
                <a href="ricerca.php">
                    <i class="fa-solid fa-scroll"></i>
                    Ricerca Elementi
                </a>
            </li>
            <li>
                <a href="account.php">
                    <i class="fa-solid fa-scroll"></i>
                    Account
                </a>
            </li>
        </ul>
    </div>
</nav>

<script src="resources/js/nav.js"></script>