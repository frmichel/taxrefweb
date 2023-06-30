#!/bin/bash
#
# This script replaces strings '<api_key>' in the config.ini files of the SPARQL micro-serices in the current diretory.

# Substitute $1 with $2 in string $3
function substitute() {
    # Optional: first reset committed version
    #git checkout HEAD -- $3
    sed "s|$1|$2|g" $3 > $3.tmp
    mv $3.tmp $3
}

# Replaces string '<api_key>' with $2 in config.ini files in diretory ./$1/
function substituteApiKey() {
    API_NAME=$1
    API_KEY=$2
    for FILE in $(ls ./$API_NAME/*/config.ini 2> /dev/null); do
        echo "Setting key '$API_KEY' in $FILE"
        substitute '<api_key>' "$API_KEY" "$FILE"
    done
}

# ================================== Set API keys ==========================

substituteApiKey    iucn                'put your key here'
substituteApiKey    tropicos            'put your key here'              
substituteApiKey    worldspidercatalog  'put your key here'
