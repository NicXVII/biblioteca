<?php
if (session_status() === PHP_SESSION_NONE) {
    ob_start();
}
$id = null;
$idConcerto = null;
if (isset($_SESSION['userID'])) {
    $id = $_SESSION['userID'];
}

if (isset($_SESSION['workerID']))
    $id = $_SESSION['workerID'];

if (isset($_SESSION['idConcerto']))
    $idConcerto = $_SESSION['idConcerto'];

?>
<link rel="stylesheet" href="resources/css/components/nav.css">

<nav class="nav-bar" id="nav-bar">
    <input type="hidden" name="hidden" id="userID" value="<?php echo $id; ?>">

    <div>
        <ul>

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