
# sandre/getParentByID


This service retrieves information about the direct parent of a taxon from [Sandre (Service d'administration nationale des données et référentiels sur l'eau)](http://www.sandre.eaufrance.fr/) by using its identifier. 
This service uses the sandre/getTaxonByID micro-service to get information about the parent taxon, given its ID.

Each taxon is identified by an instance of the `dwc:Taxon` that provides the following information:
- identifier of the taxon in Sandre (`dwc:taxonID`),
- scientific name (`dwc:scientificName`),
- parent taxon (`skos:broader`),
- taxonomic rank.

**Query mode**: SPARQL

**Parameters**: 
- id: Sandre's internal taxon identifier




## Produced graph example

```turtle
@prefix dwc: <http://rs.tdwg.org/dwc/terms/> .
@prefix taxrefp: <http://taxref.mnhn.fr/lod/property/> .

<http://example.org/ld/sandre/taxon/2087> 
    dwc:taxonID 2087;
    dwc:scientificName "Alburnoides";
    skos:broader <http://example.org/ld/sandre/taxon/2084>;
    taxrefp:hasRank <http://taxref.mnhn.fr/lod/taxrank/Genus>.
```

## Usage example (SPARQL)

```sparql
prefix dwc: <http://rs.tdwg.org/dwc/terms/>

SELECT * WHERE {
  SERVICE <http://example.org/sparql-ms/sandre/getParentByID?id=2088>
    { [] dwc:scientificName ?name; dwc:scientificNameAuthorship ?author.  }
}
```

