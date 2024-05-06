<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ricerca | Biblioteca</title>
    <link rel="stylesheet" href="resources/css/ricerca.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/sweetalert2@11/dist/sweetalert2.min.css">

</head>

<body>
    <?php
    require_once('components/nav.php')
    ?>
    <div class="content">
        <div class="search">
            <input type="text" id="search" placeholder="Cerca un libro">
            <button id="searchBtn">Cerca</button>
        </div>
        <div class="searchResults">
        </div>
    </div>

</body>

</html>
<script src="resources/js/ricerca.js"></script>
<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>