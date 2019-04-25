
# tropicos/getSynonymsByNameID


This service retrieves the list of synonyms of a taxon from [Tropicos](https://www.tropicos.org/) by using its identifier. 

Each retrieved synonym provides the following information:
- scientific name (`dwc:scientificName`),
- author (`dwc:scientificNameAuthorship`),
- the URL of the taxon Web page (`schema:sameAs`).


**Query mode**: SPARQL

**Parameters**: 
- id: Tropicos's internal taxon identifier




## Produced graph example

```turtle
@prefix dwc: <http://rs.tdwg.org/dwc/terms/> .
@prefix schema: <http://schema.org/> .

_:b42153
    dwc:scientificName "Bryophthalmum uniflorum (L.) E.Mey.";
    dwc:scientificNameAuthorship "(L.) E. Mey";
    schema:sameAs <https://www.tropicos.org/Name/26800280>.
    
_:b42155
    dwc:scientificName "Chimaphila rhombifolia Hayata";
    dwc:scientificNameAuthorship "Hayata";
    schema:sameAs <https://www.tropicos.org/Name/26800285>.
```

## Usage example (SPARQL)

```sparql
prefix dwc: <http://rs.tdwg.org/dwc/terms/>

SELECT * WHERE {
  SERVICE <http://example.org/sparql-ms/tropicos/getSynonymsByNameID?id=26800115>
    { [] dwc:scientificName ?name.  }
}
```

