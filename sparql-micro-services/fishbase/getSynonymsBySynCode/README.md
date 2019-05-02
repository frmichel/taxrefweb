
# fishbase/getSynonymsBySynCode


This service retrieves the list of synonyms of a taxon from  [FishBase](https://www.fishbase.se/search.php) by using its name identifier (SynCode). 

Each synonym comes with the following information:
- scientific name (`dwc:scientificName`),
- author (`dwc:scientificNameAuthorship`).

**Query mode**: SPARQL

**Parameters**: 
- id: FishBase's internal taxon's name identifier (SynCode)




## Produced graph example

```turtle
@prefix dwc: <http://rs.tdwg.org/dwc/terms/> .
@prefix schema: <http://schema.org/> .

_:b42232
    dwc:scientificName "Abramis bipunctatus (Bloch, 1782)";
    dwc:scientificNameAuthorship "(Bloch, 1782)";
    
_:b42233
    dwc:scientificName "Alburnoides bipunctatus (Bloch, 1782)";
    dwc:scientificNameAuthorship "(Bloch, 1782)";
    
```

## Usage example (SPARQL)

```sparql
prefix dwc: <http://rs.tdwg.org/dwc/terms/>

SELECT * WHERE {
  SERVICE <http://example.org/sparql-ms/fishbase/getSynonymsBySynCode?id=25357>
    { [] dwc:scientificName ?name.  }
}
```

