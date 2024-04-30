<?php
session_start();
?>
<!DOCTYPE html>
<html lang="it">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Biblioteca | Registrati</title>
    <link rel="stylesheet" href="resources/css/login.css" />
</head>

<body>

    <div class="login-container">
        <div class="login-window">
            <div class="login-form-container register-form-container">
                <div class="login-form-title">
                    Registrati
                </div>
                <form class="login-form" id="register-form" method="post">
                    <label for="email">Email</label>
                    <input type="email" name="email" id="email" placeholder="Email" required />
                    <label for="firstname">Nome</label>
                    <input type="text" name="firstname" id="firstname" placeholder="Nome" required />
                    <label for="password">Password</label>
                    <input type="text" name="password" id="password" placeholder="Password" required />
                    <label for="conpass">Conferma Password:</label>
                    <input type="text" name="conpass" id="conpass" placeholder="Confirm Password" required />
                    <button class="btn" type="submit" name="submit" id="submit">
                        Registrati
                    </button>
                </form>
                <p>
                    Sei già un utente?
                    <a href="login.php">Accedi</a>
                </p>
            </div>
            <div class="login-attachment-container">
                <div class="photo-box login-attachment-photo">
                    <div class="login-attachment-text">
                        Registrati alla Biblioteca di Foggia
                    </div>
                </div>
            </div>
        </div>
    </div>
</body>

</html>

<script src="resources/js/register.js"></script>
<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>