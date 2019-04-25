<?php
namespace frmichel\sparqlms;


use frmichel\sparqlms\common\Utils;

require_once '../common/Utils.php';
/**
 * This script can be provided to complement the service config.ini file.
 *
 * It receives 3 global variables:
 * - $customArgs is the set of custom arguments that have been passed to the service.
 * - $apiQuery contains the Web API query template. The script must set the parameters to
 *   produce the ready-to-run query string.
 * - $logger is provided as a convenience in case the script wants to log any information.
 */
global $apiQuery;
global $customArgs;
global $logger;

// Read the service custom arguments
$synCode = $customArgs['id'][0];

$specCode = getSpecCode($synCode);
$logger->notice("Retrieved taxon code: " . $specCode);

// Format the Web API query URL
if ($specCode == null)
    // In case the previous call failed, produce an empty query string for the service to be ignored
    $apiQuery = "";
else
    $apiQuery = str_replace('{specCode}', urlencode($specCode), $apiQuery);

/**
 * Query the Web API to get the species code associated with the synCode
 *
 * @param string $synCode
 * @return string the first code associated with that taxon name. Null if none or an error occured
 */
function getSpecCode($synCode)
{
    global $logger;

    $apiQuery = 'https://fishbase.ropensci.org/synonyms?SynCode=' . urlencode($synCode);
    $logger->notice("Web API request: " . $apiQuery);
    $result = Utils::loadJsonDocument($apiQuery);
    if ($result !== FALSE) {
        $json = json_decode($result, true);
        if ($json != null)
            return $json['data'][0]['SpecCode'];
    }
    return null;

}

?>
