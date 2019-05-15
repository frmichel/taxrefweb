#!/bin/bash
#
# This script customizes the configuration file (public/javascripts/config.js) in order to set the URLs of
# the SPARQL micro-services to query


# The machine where the services are deployed.
SERVER='http:\/\/sms.i3s.unice.fr'

# URL at which SPARQL micro-services are deployed. Will replace the 'http://example.org/sparql-ms/'
SMSURL=$SERVER'\/sparql-ms-tw\/'

# Directory where to search for config file, from the directory where this script is launched
CONFIGDIR='./public/javascripts'

function substitute() {
    # Optional: first reset committed version
    #git checkout HEAD -- $3
    sed "s/$1/$2/g" $3 > $3.tmp
    mv $3.tmp $3
}

for FILE in `ls $CONFIGDIR/config.js`; do
    replace='http:\/\/example.org\/sparql-ms\/'
    echo "Changing $replace into $SMSURL in $FILE"
    substitute "$replace" "$SMSURL" "$FILE"
done
