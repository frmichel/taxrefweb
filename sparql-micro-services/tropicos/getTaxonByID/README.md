
# tropicos/getTaxonByID


This service retrieves the information about a taxon from [Tropicos](https://www.tropicos.org/) by using its identifier (NameId). 

Each taxon is identified by an instance of the `dwc:Taxon` that provides the following information:
- scientific name (`dwc:scientificName`),
- author (`dwc:scientificNameAuthorship`),
- classification (`dwc:family`, `dwc:genus`),
- the URL of the taxon Web page (`schema:sameAs`),
- taxonomic rank.

**Query mode**: dereferencing to RDF content, SPARQL

**Parameters**: 
- id: Tropicos's internal taxon identifier




## Produced graph example

```turtle
@prefix dwc: <http://rs.tdwg.org/dwc/terms/> .
@prefix taxrefp: <http://taxref.mnhn.fr/lod/property/> .

<http://example.org/ld/tropicos/taxon/26800115>
    a dwc:Taxon;
    dwc:scientificName "Moneses uniflora";
    dwc:scientificNameAuthorship "A. Gray";
    dwc:family "Ericaceae";
    dwc:genus "Moneses";
    schema:sameAs <http://www.tropicos.org/Name/26800115>;
    taxrefp:hasRank <http://taxref.mnhn.fr/lod/taxrank/Species>.
```

## Usage example (SPARQL)

```sparql
prefix dwc: <http://rs.tdwg.org/dwc/terms/>

SELECT * WHERE {
  SERVICE <http://example.org/sparql-ms/tropicos/getTaxonByID?id=26800115>
    { ?taxon dwc:scientificName ?name; dwc:scientificNameAuthorship ?author.  }
}
```

## Usage example (dereferencing)

    curl --header "Accept:text/turtle" http://example.org/ld/tropicos/taxon/26800115

