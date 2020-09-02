<?php
namespace frmichel\sparqlms;

global $apiQuery;
global $customArgs;
global $logger;

// Read the service custom arguments
$name = $customArgs['name'];

// Format the Web API query URL
$apiQuery = str_replace('{name}', str_replace(" ", "_", $name), $apiQuery);
?>
