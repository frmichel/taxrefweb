# TAXREF-Web Application

This folder provides the prototype of the TAXREF-Web application. 
The aim of the application is to compare taxonomic information maintained by TAXREF with the one provided by the following data sources:
 
 - [WoRMS (World Register of Marine Species)](http://www.marinespecies.org/),
 - [GBIF (Global Biodiversity Information Facility)](https://www.gbif.org/), 
 - [FishBase](https://www.fishbase.se/search.php), 
 - [Sandre (Service d'administration nationale des données et référentiels sur l'eau)](http://www.sandre.eaufrance.fr/),
 - [Tropicos](https://www.tropicos.org/),
 - [PESI (Pan-European Species directories Infrastructure)](http://www.eu-nomen.eu/portal/),
 - [Index Fungorum](http://www.indexfungorum.org/).
 
By querying the developed SPARQL micro-services, it detects and shows disagreements with respect to valid name, author, 
taxonomic rank, habitat, parent taxon and synonyms.

## Installation
Copy the content of this folder into the web server directory (e.g. in /var/www/html or $HOME/public_html),
 then use the deploy.sh script to customize the URLs of the SPARQL micro-services to query.
The web application will be accessible at ```http://<your-server>/taxon.php?id=<TAXREF Taxon ID>```. 
For instance: ```http://localhost/taxon.php?id=67104```.