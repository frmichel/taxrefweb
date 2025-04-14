<?php
namespace frmichel\sparqlms;

/**
 * This script can be provided to complement the service config.ini file.
 *
 * It receives 3 global variables:
 * - $apiQuery contains the Web API query template. The script must set the parameters to
 *   produce the ready-to-run query string.
 * - $customArgs is the set of custom arguments that have been passed to the service.
 *   It is an associative array where the key is the argument name,
 *   and the value is an array of values for that argument
 * - $logger is provided as a convenience in case the script wants to log any information.
 */
global $apiQuery;
global $customArgs;
global $logger;

// Read the service custom argument
$name = trim($customArgs['name']);

// Split the name
$parts = preg_split('/\s+/', $name);

// Assign default values
$genus_name = $species_name = $infra_name = "";

switch (count($parts)) {
    case 1:
        list($genus_name) = $parts;
        break;
    case 2:
        list($genus_name, $species_name) = $parts;
        break;
    case 3:
        list($genus_name, $species_name, $infra_name) = $parts;
        break;
    default:
        $logger->warning("Name " . $name . " should have 1 to 3 strings");
        break;
}

// Format the Web API query URL
$apiQuery = str_replace('{genus_name}', urlencode($genus_name), $apiQuery);
$apiQuery = str_replace('{species_name}', urlencode($species_name), $apiQuery);
$apiQuery = str_replace('{infra_name}', urlencode($infra_name), $apiQuery);
?>