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

// Read the service custom arguments
$name = $customArgs['name'];

$tab = explode(" ", $name);
$genus_name = $tab[0] ?? null;
$species_name = $tab[1] ?? null;
$infra_name = $tab[2] ?? null;

// Format the Web API query URL
$apiQuery = str_replace('{genus_name}', urlencode($genus_name), $apiQuery);
$apiQuery = str_replace('{species_name}', urlencode($species_name), $apiQuery);
$apiQuery = str_replace('{infra_name}', urlencode($infra_name), $apiQuery);

?>