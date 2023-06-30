# gbif/getSynonymsByKey_sd

This service retrieves the list of synonyms of a taxon from [GBIF (Global Biodiversity Information Facility)](https://www.gbif.org/). It takes as input the accepted name identifier (GBIF key) provided using property `dwc:acceptedNameUsageID`.

In the graph produced, the taxon is represented as an instance of the `dwc:Taxon` class, related to the synonyms with the `http://taxref.mnhn.fr/lod/property/hasSynonym` property. Each synonym comes with the following information:
- scientific name and its id (`dwc:scientificName` and `dwc:scientificNameID`),
- scientific name authorship (`dwc:scientificNameAuthorship`),
- URL of the taxon name web page (`schema:sameAs`).

**Query mode**: SPARQL

**Parameters**:
- `dwc:acceptedNameUsageID`: GBIF internal identifier (key)


## Produced graph example

```turtle
@prefix dwc:     <http://rs.tdwg.org/dwc/terms/> .
@prefix taxrefp: <http://taxref.mnhn.fr/lod/property/> .
@prefix schema:  <http://schema.org/> .

<http://example.org/ld/gbif/taxon/2360305>
    a                        dwc:Taxon;
    dwc:acceptedNameUsageID "2360305";
    dwc:acceptedNameUsage   "Alburnoides bipunctatus (Bloch, 1782)";
    
    taxrefp:hasSynonym [
        dwc:scientificName "Abramis bipunctatus (Bloch, 1782)";
        dwc:scientificNameID "2360323";
        dwc:scientificNameAuthorship "(Bloch, 1782)";
        schema:sameAs <https://www.gbif.org/species/2360323>
    ], [
        dwc:scientificName "Alburnoides bipunctatus kubanicus Berg, 1932";
        dwc:scientificNameID "9753482";
        dwc:scientificNameAuthorship "Berg, 1932";
        schema:sameAs <https://www.gbif.org/species/9753482>;
    ].
```

## Usage example (SPARQL)

```sparql
prefix dwc:     <http://rs.tdwg.org/dwc/terms/>
prefix taxrefp: <http://taxref.mnhn.fr/lod/property/> .

SELECT * WHERE {
    ?taxon a dwc:Taxon;
        dwc:acceptedNameUsageID     "2360305";
        taxrefp:hasSynonym          ?synonym.
        
    ?synonym
        dwc:scientificName           ?name;
        dwc:scientificNameAuthorship ?authorship.
}

```
