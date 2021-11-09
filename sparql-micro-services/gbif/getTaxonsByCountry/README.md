
# gbif/getTaxonByID


This service retrieves information about a taxon from [GBIF (Global Biodiversity Information Facility)](https://www.gbif.org/) by using its identifier. 

Each taxon is identified by an instance of the `dwc:Taxon` that provides the following information:
- currently accepted/valid name (`dwc:acceptedNameUsage` and `dwc:acceptedNameUsageID`) if different from the scientific name,
- scientific name (`dwc:scientificName` and `dwc:scientificNameID`),
- author (`dwc:scientificNameAuthorship`),
- classification (`dwc:kingdom`, `dwc:phylum`, `dwc:class`, `dwc:order`, `dwc:family`, `dwc:genus`),
- the URL of the taxon Web page (`schema:sameAs`),
- parent taxon (`skos:broader`),
- taxonomic rank.

**Query mode**: dereferencing to RDF content, SPARQL

**Parameters**: 
- id: GBIF's internal taxon identifier




## Produced graph example

```turtle
@prefix dwc: <http://rs.tdwg.org/dwc/terms/> .
@prefix taxrefp: <http://taxref.mnhn.fr/lod/property/> .

<http://example.org/ld/gbif/taxon/2360305>
    a dwc:Taxon;
    dwc:scientificName "Alburnoides bipunctatus";
    dwc:acceptedNameUsage "Alburnoides bipunctatus (Bloch, 1782)" ;
    dwc:scientificNameAuthorship "(Bloch, 1782)";
    dwc:kingdom "Animalia";
    dwc:phylum "Chordata";
    dwc:class "Actinopterygii";
    dwc:order "Cypriniformes";
    dwc:family "Cyprinidae";
    dwc:genus "Alburnoides";
    skos:broader <http://example.org/ld/gbif/taxon/2360279>;
    schema:sameAs <https://www.gbif.org/species/2360305>;
    taxrefp:hasRank <http://taxref.mnhn.fr/lod/taxrank/Species>.
```

## Usage example (SPARQL)

```sparql
prefix dwc: <http://rs.tdwg.org/dwc/terms/>

SELECT * WHERE {
  SERVICE <http://example.org/sparql-ms/gbif/getTaxonByID?id=2360305>
    { ?taxon dwc:scientificName ?name; dwc:scientificNameAuthorship ?author.  }
}
```

## Usage example (dereferencing)

    curl --header "Accept:text/turtle" http://example.org/ld/gbif/taxon/2360305

