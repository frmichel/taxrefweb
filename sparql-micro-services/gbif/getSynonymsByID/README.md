
# gbif/getSynonymsByID


This service retrieves the list of synonyms of a taxon from  [GBIF (Global Biodiversity Information Facility)](https://www.gbif.org/) by using its identifier. 

Each synonym comes with the following information:
- scientific name (`dwc:scientificName`),
- author (`dwc:scientificNameAuthorship`),
- the URL of the taxon Web page (`schema:sameAs`).

**Query mode**: SPARQL

**Parameters**: 
- id: GBIF's internal taxon identifier




## Produced graph example

```turtle
@prefix dwc: <http://rs.tdwg.org/dwc/terms/> .
@prefix schema: <http://schema.org/> .

_:b42202
    dwc:scientificName "Abramis bipunctatus (Bloch, 1782)";
    dwc:scientificNameAuthorship "(Bloch, 1782)";
    schema:sameAs <https://www.gbif.org/species/2360323>.
    
_:b42203
    dwc:scientificName "Alburnoides bipunctatus kubanicus Berg, 1932";
    dwc:scientificNameAuthorship "Berg, 1932";
    schema:sameAs <https://www.gbif.org/species/9753482>.
```

## Usage example (SPARQL)

```sparql
prefix dwc: <http://rs.tdwg.org/dwc/terms/>

SELECT * WHERE {
  SERVICE <http://example.org/sparql-ms/gbif/getSynonymsById?id=2360305>
    { [] dwc:scientificName ?name.  }
}
```

