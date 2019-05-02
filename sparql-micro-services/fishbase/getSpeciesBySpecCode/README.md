
# fishbase/getSpeciesBySpecCode


This service retrieves the information about a species from [FishBase](https://www.fishbase.se/search.php) by using its identifier (SpecCode). 

Each taxon is identified by an instance of the `dwc:Taxon` that provides the following information:
- scientific name (`dwc:scientificName`),
- author (`dwc:scientificNameAuthorship`),
- english vernacular name (`dwc:vernacularName`),
- habitats.

**Query mode**: SPARQL

**Parameters**: 
- id: FishBase's internal species identifier (SpecCode)




## Produced graph example

```turtle
@prefix dwc: <http://rs.tdwg.org/dwc/terms/> .
@prefix taxrefp: <http://taxref.mnhn.fr/lod/property/> .

_:b42015
    a dwc:Taxon;
    dwc:scientificName "Alburnoides bipunctatus";
    dwc:scientificNameAuthorship "(Bloch, 1782)";
    dwc:vernacularName "Schneider"@en;
    taxrefp:habitat <http://taxref.mnhn.fr/lod/habitat/FreshWater>, <http://taxref.mnhn.fr/lod/habitat/Brackish>.
```

## Usage example (SPARQL)

```sparql
prefix dwc: <http://rs.tdwg.org/dwc/terms/>

SELECT * WHERE {
  SERVICE <http://example.org/sparql-ms/fishbase/getSpeciesBySpecCode?id=4875>
    { [] dwc:scientificName ?name; dwc:scientificNameAuthorship ?author.  }
}
```

