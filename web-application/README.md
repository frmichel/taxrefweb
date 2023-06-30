# TAXREF-Web 

**Warning: this web application is no longer maintained.**

This project investigates how the [SPARQL Micro-Service](https://github.com/frmichel/sparql-micro-service) architecture [1] can help re-design a part of the [TAXREF-Web application](https://taxref.mnhn.fr/taxref-web/). The point is to query multiple Web APIs using a uniform language, SPARQL, and a uniform representation based on well-adopted vocabularies.

It consists of [SPARQL micro-services](../sparql-micro-services) wrapping Web APIs from the biodiversity domain, and a prototypical web application (his folder) that leverages these SPARQL micro-services to detect disagreements between [TAXREF](https://inpn.mnhn.fr/programme/referentiel-taxonomique-taxref?lg=en) and third-party data sources.

## Sources

The comparison is carried out between TAXREF information and the following data sources:
 
 - [WoRMS (World Register of Marine Species)](http://www.marinespecies.org/),
 - [GBIF (Global Biodiversity Information Facility)](https://www.gbif.org/), 
 - [FishBase](https://www.fishbase.se/search.php), 
 - [Sandre (Service d'administration nationale des données et référentiels sur l'eau)](http://www.sandre.eaufrance.fr/),
 - [Tropicos](https://www.tropicos.org/),
 - [PESI (Pan-European Species directories Infrastructure)](http://www.eu-nomen.eu/portal/),
 - [Index Fungorum](http://www.indexfungorum.org/).
 
By querying the developed SPARQL micro-services, the application detects and shows disagreements with respect to valid name, author, 
taxonomic rank, habitat, parent taxon and synonyms.

## Installation
Copy the content of this folder into the web server directory (e.g. in /var/www/html or $HOME/public_html).
The web application will be accessible at ```http://<your-server>/taxon.php?id=<TAXREF Taxon ID>```. 
For instance: ```http://localhost/taxon.php?id=67104```.

[1] Michel F., Zucker C., Gargominy O. & Gandon F. (2018). Integration of Web APIs and Linked Data Using SPARQL Micro-Services — Application to Biodiversity Use Cases. Information 9(12):310.
