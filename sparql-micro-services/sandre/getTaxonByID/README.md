
# sandre/getTaxonByID


This service retrieves information about a taxon from [Sandre (Service d'administration nationale des données et référentiels sur l'eau)](http://www.sandre.eaufrance.fr/) by using its identifier. 

Each taxon is identified by an instance of the `dwc:Taxon` that provides the following information:
- scientific name (`dwc:scientificName`),
- author (`dwc:scientificNameAuthorship`),
- currently valid name (`dwc:acceptedNameUsage`),
- french vernacular name (`dwc:vernacularName`),
- parent taxon (`skos:broader`),
- taxonomic rank.

**Query mode**: dereferencing to RDF content, SPARQL

**Parameters**: 
- id: Sandre's internal taxon identifier




## Produced graph example

```turtle
@prefix dwc: <http://rs.tdwg.org/dwc/terms/> .
@prefix taxrefp: <http://taxref.mnhn.fr/lod/property/> .

<http://example.org/ld/sandre/taxon/2088>
    a dwc:Taxon;
    dwc:scientificName "Alburnoides bipunctatus";
    dwc:acceptedNameUsage "Alburnoides bipunctatus (Bloch, 1782)" ;
    dwc:scientificNameAuthorship "(Bloch, 1782)";
    dwc:vernacularName "Spirlin"@fr;
    skos:broader <http://example.org/ld/sandre/taxon/2087>;
    taxrefp:hasRank <http://taxref.mnhn.fr/lod/taxrank/Species>.
```

## Usage example (SPARQL)

```sparql
prefix dwc: <http://rs.tdwg.org/dwc/terms/>

SELECT * WHERE {
  SERVICE <http://example.org/sparql-ms/sandre/getTaxonByID?id=2088>
    { ?taxon dwc:scientificName ?name; dwc:scientificNameAuthorship ?author.  }
}
```

## Usage example (dereferencing)

    curl --header "Accept:text/turtle" http://example.org/ld/sandre/taxon/2088

