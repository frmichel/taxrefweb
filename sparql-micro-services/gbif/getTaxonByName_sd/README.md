# gbif/getTaxonByName_sd

This service retrieves information about a taxon from [GBIF (Global Biodiversity Information Facility)](https://www.gbif.org/) backbone taxonomy. It takes as input a taxon name provided using property `schema:name`.
The reason for using `schema:name` instead of e.g. `dwc:scientificName` is that the searched name may be accepted or a synonym. Hence the `schema:name` property that makes no assumption as to the nature of the name.

The graph produced may contain multiple taxa represented as instances of the `dwc:Taxon` class. Each one comes with the following information:
- currently accepted/valid name (`dwc:acceptedNameUsage` and `dwc:acceptedNameUsageID`),
- scientific name (`dwc:scientificName` and `dwc:scientificNameID`) 
- scientific name authorhip (`dwc:scientificNameAuthorship`),
- article in which the name was published (`dwc:namePublishedIn`),
- source (`dwc:nameAccordingTo`),
- classification (`dwc:kingdom`, `dwc:phylum`, `dwc:class`, `dwc:order`, `dwc:family`, `dwc:genus`),
- parent taxon (`skos:broader`),
- taxonomic rank (`dwc:taxonRank` and `taxrefp:hasRank`),
- URL of the taxon name web page (`schema:sameAs`).

**Query mode**: dereferencing to RDF content, SPARQL

**Parameters**:
- `schema:name`: scientific name

## Produced graph example

```turtle
@prefix dwc: <http://rs.tdwg.org/dwc/terms/> .
@prefix taxrefp: <http://taxref.mnhn.fr/lod/property/> .

<http://example.org/ld/gbif/taxon/2360305>
    a dwc:Taxon;
    dwc:acceptedNameUsage "Alburnoides bipunctatus (Bloch, 1782)" ;
    dwc:acceptedNameUsageID "2360305" ;
    dwc:scientificName "Alburnoides bipunctatus";
    dwc:scientificNameID "2360305";
    dwc:scientificNameAuthorship "(Bloch, 1782)";
    dwc:kingdom "Animalia";
    dwc:phylum "Chordata";
    dwc:class "Actinopterygii";
    dwc:order "Cypriniformes";
    dwc:family "Cyprinidae";
    dwc:genus "Alburnoides";

    skos:broader <http://example.org/ld/gbif/taxon/2360279>;
    schema:sameAs <https://www.gbif.org/species/2360305>;
    
    dwc:taxonRank "SPECIES";
    taxrefp:hasRank <http://taxref.mnhn.fr/lod/taxrank/Species>.
```

## Usage example (SPARQL)

```sparql
prefix dwc: <http://rs.tdwg.org/dwc/terms/>

SELECT * WHERE {
    ?taxon a dwc:Taxon;
        schema:name                  "Alburnoides bipunctatus";
        dwc:scientificName           ?name;
        dwc:scientificNameID         ?nameID;
        dwc:scientificNameAuthorship ?authorship;
        dwc:acceptedNameUsage        ?acceptedName.
}
```

## Usage example (dereferencing)

    curl --header "Accept:text/turtle" http://example.org/ld/gbif/taxon/2360305
