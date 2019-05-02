
# taxref/getClassificationByID


This service retrieves the classification of a given taxon from [TAXREF](https://taxref.mnhn.fr/taxref-web/accueil) by using its identifier.
The result is a list of instances of `dwc:Taxon`, one for each parent of the taxon.  

Each taxon belonging to the classification comes with the following information
- identifier of the taxon in TAXREF (`dwc:taxonID`),
- scientific name (`dwc:scientificName`),
- the URL of the taxon Web page on the [INPN (Inventaire National du Patrimoine Naturel)](https://inpn.mnhn.fr/accueil/index) website (`schema:sameAs`),
- taxonomic rank,
- parent taxon (`skos:broader`).

Compared to the taxref/getTaxonByID micro-service, that provides, together with the taxon information, the names of the taxa 
corresponding to the major taxonomic ranks (kingdom, phylum, class, order, family, genus), this service provides the whole 
classification, including taxa corresponding to secondary ranks (superfamily, subfamily, subgenus, etc.).

This service uses the taxref/getRankByRankID micro-service to map the rankID to the correct TAXREF-LD URI.

**Query mode**: SPARQL

**Parameters**: 
- id: TAXREF's internal taxon identifier




## Produced graph example

```turtle
@prefix dwc: <http://rs.tdwg.org/dwc/terms/> .
@prefix taxrefp: <http://taxref.mnhn.fr/lod/property/> .
@prefix schema: <http://schema.org/>.

<http://example.org/ld/taxref/taxon/188934> 
    dwc:taxonID "188934";
    dwc:scientificName "Alburnoides";
    schema:sameAs <https://inpn.mnhn.fr/espece/cd_nom/188934>;
    taxrefp:hasRank <http://taxref.mnhn.fr/lod/taxrank/Genus>;
    skos:broader <http://example.org/ld/taxref/taxon/825329>. 
    
<http://example.org/ld/taxref/taxon/825329>
    dwc:taxonID "825329";
    dwc:scientificName "Leuciscinae";
    schema:sameAs <https://inpn.mnhn.fr/espece/cd_nom/825329>;
    taxrefp:hasRank <http://taxref.mnhn.fr/lod/taxrank/Sub-family>;
    skos:broader <http://example.org/ld/taxref/taxon/905695>.
```

## Usage example (SPARQL)

```sparql
prefix dwc: <http://rs.tdwg.org/dwc/terms/>

SELECT * WHERE {
  SERVICE <http://example.org/sparql-ms/taxref/getClassificationByID?id=67104>
    { [] dwc:scientificName ?name.  }
}
```

