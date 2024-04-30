<link rel="stylesheet" href="../resources/css/components/nav.css">
<?php
ob_start();
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}
$id = null;
$idConcerto = null;
if (isset($_SESSION['userID']))
    $id = $_SESSION['userID'];

if (isset($_SESSION['idConcerto']))
    $idConcerto = $_SESSION['idConcerto'];

?>
<nav class="nav-bar" id="nav-bar">
    <input type="hidden" name="hidden" id="userID" value="<?php echo $id; ?>">
    <input type="hidden" name="hidden" id="concertID" value="<?php echo $idConcerto; ?>">

    <div>
        <ul>
            <li>
                <a href="index.php">
                    <i class="fa-solid fa-house"></i>
                    <img src="#" alt="logoBiblioteca">
                </a>
            </li>
            <li>
                <a href="show.php?type=concert">
                    <i class="fa-solid fa-scroll"></i>
                    Ricerca Elementi
                </a>
            </li>
            <li>
                <a href="show.php?type=artist">
                    <i class="fa-solid fa-scroll"></i>
                    Account
                </a>
            </li>
        </ul>
    </div>
</nav>


<script src="resources/js/components/nav.js"></script>