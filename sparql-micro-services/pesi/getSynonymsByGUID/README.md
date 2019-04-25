
# pesi/getSynonymsByGUID


This service retrieves the list of synonyms of a taxon from [PESI (Pan-European Species directories Infrastructure)](http://www.eu-nomen.eu/portal/) by using its identifier. 

Each synonym comes with the following information:
- scientific name (`dwc:scientificName`),
- author (`dwc:scientificNameAuthorship`),
- the URL of the taxon Web page (`schema:sameAs`).

**Query mode**: SPARQL

**Parameters**: 
- id: PESI's internal taxon identifier




## Produced graph example

```turtle
@prefix dwc: <http://rs.tdwg.org/dwc/terms/> .
@prefix schema: <http://schema.org/> .

_:b42175
    dwc:scientificName "Abies alba subsp. apennina Brullo & al.";
    dwc:scientificNameAuthorship "Brullo & al.";
    schema:sameAs <http://www.eu-nomen.eu/portal/taxon.php?GUID=6CDE0E36-57B9-47D2-A4CC-1D47295AF457>.
    
_:b42176
    dwc:scientificName "Abies nobilis A.Dietr.";
    dwc:scientificNameAuthorship "A.Dietr.";
    schema:sameAs <http://www.eu-nomen.eu/portal/taxon.php?GUID=CA341FCB-F4D3-4F27-B18E-8DD0EF5DEF08>.
```

## Usage example (SPARQL)

```sparql
prefix dwc: <http://rs.tdwg.org/dwc/terms/>

SELECT * WHERE {
  SERVICE <http://example.org/sparql-ms/pesi/getSynonymsByGUID?id=6A8E85BD-5E52-4AE2-9444-99128C87A672>
    { [] dwc:scientificName ?name.  }
}
```

