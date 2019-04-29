
# taxref/getTaxonByID


This service retrieves the information about a taxon from [TAXREF](https://taxref.mnhn.fr/taxref-web/accueil) by using its identifier.
It uses the taxref/getRankByRankID micro-service to map the rankID to the correct TAXREF-LD URI. 

Each taxon is identified by an instance of the `dwc:Taxon` that provides the following information:
- scientific name (`dwc:scientificName`),
- author (`dwc:scientificNameAuthorship`),
- currently valid name (`dwc:acceptedNameUsage`),
- classification (`dwc:kingdom`, `dwc:phylum`, `dwc:class`, `dwc:order`, `dwc:family`, `dwc:genus`),
- vernacular names (`dwc:vernacularName`),
- year of publication of the scientific name (`dwc:namePublishedInYear`),
- parent taxon (`skos:broader`),
- habitats,
- taxonomic rank.

**Query mode**: dereferencing to RDF content, SPARQL

**Parameters**: 
- id: TAXREF's internal taxon identifier




## Produced graph example

```turtle
@prefix dwc: <http://rs.tdwg.org/dwc/terms/> .
@prefix taxrefp: <http://taxref.mnhn.fr/lod/property/> .

<http://example.org/ld/taxref/taxon/67104>
    a dwc:Taxon;
    dwc:scientificName "Alburnoides bipunctatus";
    dwc:acceptedNameUsage "Alburnoides bipunctatus (Bloch, 1782)" ;
    dwc:scientificNameAuthorship "(Bloch, 1782)";
    dwc:vernacularName "Spirlin"@fr;
    dwc:vernacularName "Schneider"@en;
    dwc:kingdom "Animalia";
    dwc:phylum "Chordata";
    dwc:class "Actinopterygii";
    dwc:order "Cypriniformes";
    dwc:family "Leuciscidae";
    dwc:genus "Alburnoides";
    dwc:namePublishedInYear "1782";
    skos:broader <http://example.org/ld/taxref/taxon/188934>;
    taxrefp:hasRank <http://taxref.mnhn.fr/lod/taxrank/Species>;
    taxrefp:habitat <http://taxref.mnhn.fr/lod/habitat/FreshWater>.
```

## Usage example (SPARQL)

```sparql
prefix dwc: <http://rs.tdwg.org/dwc/terms/>

SELECT * WHERE {
  SERVICE <http://example.org/sparql-ms/taxref/getTaxonByID?id=67104>
    { ?taxon dwc:scientificName ?name; dwc:scientificNameAuthorship ?author.  }
}
```

## Usage example (dereferencing)

    curl --header "Accept:text/turtle" http://example.org/ld/taxref/taxon/67104

