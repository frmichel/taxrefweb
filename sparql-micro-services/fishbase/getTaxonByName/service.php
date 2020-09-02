<?php
namespace frmichel\sparqlms;

global $apiQuery;
global $customArgs;
global $logger;

// Read the service custom arguments
$name = $customArgs['name'];

$arr = explode(' ',trim($name), 2);

// Format the Web API query URL
$apiQuery = str_replace('{genus}', urlencode($arr[0]), $apiQuery);
$apiQuery = str_replace('{species}', urlencode($arr[1]), $apiQuery);
?>
