<?php
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}
?>
<!DOCTYPE html>
<html lang="it">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Biblioteca | Accedi</title>
    <link rel="stylesheet" href="resources/css/login.css" />
</head>

<body>

    <div class="login-container">
        <div class="login-window">
            <div class="login-form-container">
                <div class="login-form-title">
                    Accedi
                </div>
                <form class="login-form" id="login-form" method="post">
                    <label for="codiceFiscale ">Codice Fiscale </label>
                    <input type="text" name="codiceFiscale" id="codiceFiscale" placeholder="Codice Fiscale" required />
                    <label for="password">Password</label>
                    <input type="password" name="password" id="password" placeholder="Password" required />
                    <button class="btn" type="submit" name="submit" id="submit">
                        Accedi
                    </button>
                </form>
                <p>
                    Accedi come cliente
                    <a href="login.php">Accedi</a>
                </p>
            </div>
            <div class="login-attachment-container">
                <div class="photo-box login-attachment-photo">
                    <div class="login-attachment-text">
                        Buon lavoro!
                        Viva Foggia
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="pop-up-container hide" id="pop-up-container">
        <div class="pop-up">
            <div class="pop-up-close btn" onclick="hidePopUpError()">
                <i class="fa-solid fa-xmark"></i>
            </div>
            <div class="pop-up-text">
                pop up di esempio
            </div>
        </div>
    </div>
</body>

</html>

<script src="resources/js/loginLavoratore.js"></script>
<script src="https://cdn.jsdelivr.net/npm/sweetalert2@10"></script>