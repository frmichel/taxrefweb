<?php
$taxrefID = $_GET["id"];


$IDs = array(
    "taxref" => $taxrefID);

?>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title></title>
    <link rel="stylesheet" href="public/stylesheets/libs/bootstrap/bootstrap.min.css">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.6.3/css/solid.css" integrity="sha384-+0VIRx+yz1WBcCTXBkVQYIBVNEFH1eP6Zknm16roZCyeNg2maWEpk/l/KsyFKs7G" crossorigin="anonymous">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.6.3/css/fontawesome.css" integrity="sha384-jLuaxTTBR42U2qJ/pm4JRouHkEDHkVqH0T1nyQXn1mZ7Snycpf6Rl25VBNthU4z0" crossorigin="anonymous">
    <link rel="stylesheet" href="public/stylesheets/taxon.css">
    <script>
        var IDs = <?php echo json_encode($IDs)?>;
    </script>
</head>
<body>
<nav class="navbar navbar-expand-lg navbar-dark fixed-top" id="sideNav">
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav">
            <li class="nav-item">
                <a class="nav-link js-scroll-trigger" href="#datasets-list">Datasets</a>
            </li>
            <li class="nav-item">
                <a class="nav-link js-scroll-trigger" href="#overview">Taxonomy</a>
            </li>
            <li class="nav-item">
                <a class="nav-link js-scroll-trigger" href="#synonyms">Synonyms</a>
            </li>
        </ul>
    </div>
</nav>
<section class="p-3 p-lg-5 d-flex d-column fixed-top" id="title">
    <div>
        <h1></h1>
    </div>
</section>
<div class="container-fluid p-0" data-spy="scroll" data-target="#sideNav" data-offset="0" id="container">
</div>
<script data-main="public/javascripts/main" src="public/javascripts/libs/require.js"></script>
</body>
</html>