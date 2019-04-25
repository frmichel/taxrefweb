
# taxref/getSynonymsByID


This service retrieves the list of synonyms of a taxon from [TAXREF](https://taxref.mnhn.fr/taxref-web/accueil) by using its identifier. 

Each retrieved synonym comes with the following information:
- scientific name (`dwc:scientificName`),
- author (`dwc:scientificNameAuthorship`),
- year of publication of the scientific name (`dwc:namePublishedInYear`),
- the URL of the synonym Web page on the [INPN (Inventaire National du Patrimoine Naturel)](https://inpn.mnhn.fr/accueil/index) website (`schema:sameAs`).

**Query mode**: SPARQL

**Parameters**: 
- id: TAXREF's internal taxon identifier




## Produced graph example

```turtle
@prefix dwc: <http://rs.tdwg.org/dwc/terms/> .
@prefix schema: <http://schema.org/> .

_:b42015
    dwc:scientificName "Abramis bipunctatus (Bloch, 1782)";
    dwc:scientificNameAuthorship "(Bloch, 1782)";
    schema:sameAs <https://inpn.mnhn.fr/espece/cd_nom/561662>.
    
_:b42016
    dwc:scientificName "Alburnus bipunctatus (Bloch, 1782)";
    dwc:scientificNameAuthorship "(Bloch, 1782)";
    schema:sameAs <https://inpn.mnhn.fr/espece/cd_nom/560485>.
```

## Usage example (SPARQL)

```sparql
prefix dwc: <http://rs.tdwg.org/dwc/terms/>

SELECT * WHERE {
  SERVICE <https://example.org/sparql-ms/taxref/getSynonymsById?id=67104>
    { [] dwc:scientificName ?name.  }
}
```

