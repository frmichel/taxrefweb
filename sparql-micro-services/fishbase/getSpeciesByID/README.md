
# fishbase/getSpeciesByID


This service retrieves the information about a taxon from [FishBase](https://www.fishbase.se/search.php) by using its name identifier (SynCode). 
It uses the fishbase/getSpeciesInfoByID micro-service to enrich the result with additional information about the species, such as habitats and vernacular name.

Each taxon is identified by an instance of the `dwc:Taxon` that provides the following information:
- scientific name (`dwc:scientificName`),
- author (`dwc:scientificNameAuthorship`),
- english vernacular name  (`dwc:vernacularName`),
- year of publication of the scientific name (`dwc:namePublishedInYear`),
- taxonomic rank;
- habitats.

**Query mode**: dereferencing to RDF content, SPARQL

**Parameters**: 
- id: FishBase's internal synonym identifier (SynCode)




## Produced graph example

```turtle
@prefix dwc: <http://rs.tdwg.org/dwc/terms/> .
@prefix taxrefp: <http://taxref.mnhn.fr/lod/property/> .

<http://example.org/ld/fishbase/taxon/25357>
    a dwc:Taxon;
    dwc:scientificName "Alburnoides bipunctatus";
    dwc:scientificNameAuthorship "(Bloch, 1782)";
    dwc:namePublishedInYear "1782";
    taxrefp:hasRank <http://taxref.mnhn.fr/lod/taxrank/Species>;
    taxrefp:habitat <http://taxref.mnhn.fr/lod/habitat/FreshWater>, <http://taxref.mnhn.fr/lod/habitat/Brackish>.
```

## Usage example (SPARQL)

```sparql
prefix dwc: <http://rs.tdwg.org/dwc/terms/>

SELECT * WHERE {
  SERVICE <http://example.org/sparql-ms/fishbase/getSpeciesByID?id=25357>
    { ?taxon dwc:scientificName ?name; dwc:scientificNameAuthorship ?author.  }
}
```

## Usage example (dereferencing)

    curl --header "Accept:text/turtle" http://example.org/ld/fishbase/taxon/25357

