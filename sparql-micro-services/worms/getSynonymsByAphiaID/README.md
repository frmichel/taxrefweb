
# worms/getSynonymsByAphiaID


This service retrieves the list of synonyms of a taxon from [WoRMS (World Register of Marine Species)](http://www.marinespecies.org/) by using its identifier (AphiaID). 

Each retrieved synonym comes with the following information:
- scientific name (`dwc:scientificName`),
- author (`dwc:scientificNameAuthorship`),
- the URL of the synonym Web page (`schema:sameAs`).

**Query mode**: SPARQL

**Parameters**: 
- id: WoRMS's internal taxon identifier




## Produced graph example

```turtle
@prefix dwc: <http://rs.tdwg.org/dwc/terms/> .
@prefix schema: <http://schema.org/> .

_:b42015 
    dwc:scientificName "Abramis bipunctatus (Bloch, 1782)";
    dwc:scientificNameAuthorship "(Bloch, 1782)";
    schema:sameAs <http://www.marinespecies.org/aphia.php?p=taxdetails&id=307568>.
    
_:b42016
    dwc:scientificName "Alburnus bipunctatus (Bloch, 1782)";
    dwc:scientificNameAuthorship "(Bloch, 1782)";
    schema:sameAs <http://www.marinespecies.org/aphia.php?p=taxdetails&id=307753>.
```

## Usage example (SPARQL)

```sparql
prefix dwc: <http://rs.tdwg.org/dwc/terms/>

SELECT * WHERE {
  SERVICE <https://example.org/sparql-ms/worms/getSynonymsByAphiaId?id=154288>
    { [] dwc:scientificName ?name.  }
}
```

