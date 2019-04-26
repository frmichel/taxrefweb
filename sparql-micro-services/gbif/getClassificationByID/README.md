
# gbif/getClassificationByID


This service retrieves the classification of a given taxon from [GBIF (Global Biodiversity Information Facility)](https://www.gbif.org/) by using its identifier (AphiaID). 

Each taxon belonging to the classification comes with the following information:
- identifier of the taxon in GBIF (`dwc:taxonID`),
- scientific name (`dwc:scientificName`),
- the URL of the taxon Web page (`schema:sameAs`),
- taxonomic rank,
- parent taxon (`skos:broader`).

**Query mode**: SPARQL

**Parameters**: 
- id: GBIF's internal taxon identifier




## Produced graph example

```turtle
@prefix dwc: <http://rs.tdwg.org/dwc/terms/> .
@prefix taxrefp: <http://taxref.mnhn.fr/lod/property/> .
@prefix schema: <http://schema.org/>.

<http://example.org/ld/gbif/taxon/7336> 
    dwc:taxonID 7336;
    dwc:scientificName "Cyprinidae";
    schema:sameAs <https://www.gbif.org/species/7336>;
    taxrefp:hasRank <http://taxref.mnhn.fr/lod/taxrank/Family>;
    skos:broader <http://example.org/ld/gbif/taxon/1153> .
    
<http://example.org/ld/gbif/taxon/1153> 
    dwc:taxonID 1153;
    dwc:scientificName "Cypriniformes";
    schema:sameAs <https://www.gbif.org/species/1153>;
    taxrefp:hasRank <http://taxref.mnhn.fr/lod/taxrank/Order>;
    skos:broader <http://example.org/ld/gbif/taxon/204>.
```

## Usage example (SPARQL)

```sparql
prefix dwc: <http://rs.tdwg.org/dwc/terms/>

SELECT * WHERE {
  SERVICE <http://example.org/sparql-ms/gbif/getClassificationByID?id=2360279>
    { [] dwc:scientificName ?name.  }
}
```
