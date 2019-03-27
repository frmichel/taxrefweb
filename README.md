# TAXREF-Web

This project investigates how the [SPARQL Micro-Service](https://github.com/frmichel/sparql-micro-service) architecture [1] can help re-design a part of the [TAXREF-Web application](https://taxref.mnhn.fr/taxref-web/). The point is to query multiple Web APIs using a uniform language, SPARQL, and a uniform representation based on well-adopted vocabularies.

It provides two components:
- SPARQL micro-services wrapping Web APIs from the biodiversity domain, such as GBIF, WoRMS, Fishbase, Index Fungorum, EoL. These micro-services consistently translate Web APIs responses into RDF graphs utilizing the [Schema.org](https://schema.org/), [Darwin Core RDF Terms](https://dwc.tdwg.org/rdf/) and [TAXREF-LD](https://datahub.ckan.io/dataset/taxref-ld) vocabularies.
- A prototypical web application that leverages these SPARQL micro-services to detect disagreements between [TAXREF](https://inpn.mnhn.fr/programme/referentiel-taxonomique-taxref?lg=en) and third-party data sources with respect to taxonomic information (synonymy, taxonomic rank, author, vernacular names), habitats, bibliographic references, species interactions and life traits.

[1] Michel F., Zucker C., Gargominy O. & Gandon F. (2018). Integration of Web APIs and Linked Data Using SPARQL Micro-Services — Application to Biodiversity Use Cases. Information 9(12):310.
