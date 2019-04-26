#!/bin/bash
#
# This script customizes the configuration files (config.ini) and SPARQL files (insert.sparql, construct.sparql)
# of each SPARQL micro-service by replacing the "example.org" hostname and "<api_key>" values committed on the public repo.


# The machine where the services are deployed. Will replace the 'http://example.org'
SERVER='http:\/\/sms.i3s.unice.fr'
# URL at which SPARQL micro-services are deployed
SMSURL=$SERVER'\/sparql-ms-tw'

# Directory where to search for SPARQL micro-services, from the directory where this script is launched
SMSDIR=.

function substitute() {
    # Optional: first reset committed version
    #git checkout HEAD -- $3
    sed "s/$1/$2/g" $3 > $3.tmp
    mv $3.tmp $3
}


# --- Tropicos API token ---
API_KEY='<paste your api token here>'
for FILE in $(ls $SMSDIR/tropicos/*/config.ini 2> /dev/null); do
    replace='<api_key>'
    echo "Changing $replace into $API_KEY in $FILE"
    substitute "$replace" "$API_KEY" "$FILE"
done

# --- Replace example.org/sparql-ms with local sparql micro-services path in sparql files ---
for FILE in `ls $SMSDIR/*/*/*.sparql`; do
    replace='http:\/\/example.org\/sparql-ms'
    echo "Changing $replace into $SMSURL in $FILE"
    substitute "$replace" "$SMSURL" "$FILE"
done

# --- Replace example.org with local server URL in sparql files ---
for FILE in `ls $SMSDIR/*/*/*.sparql`; do
    replace='http:\/\/example.org'
    echo "Changing $replace into $SERVER in $FILE"
    substitute "$replace" "$SERVER" "$FILE"
done

# --- Replace example.org with local server URL in config.ini file ---
for FILE in `ls $SMSDIR/config.ini`; do
    replace='http:\/\/example.org'
    echo "Changing $replace into $SMSURL in $FILE"
    substitute "$replace" "$SMSURL" "$FILE"
done
