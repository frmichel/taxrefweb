
# indexfungorum/getTaxonByNameKey


This service retrieves information about a taxon from [Index Fungorum](http://www.indexfungorum.org/) by using its identifier. 
Index Fungorum Web API returns a XML response, that is converted into JSON by a PHP script. 
The result of the conversion is processed like any other Web API JSON response, i.e. the JSON-LD profile is applied and, then, the INSERT query is executed.

Each taxon is identified by an instance of the `dwc:Taxon` that provides the following information:
- scientific name (`dwc:scientificName`),
- author (`dwc:scientificNameAuthorship`),
- currently valid name (`dwc:acceptedNameUsage`),
- classification (`dwc:kingdom`, `dwc:phylum`, `dwc:class`, `dwc:order`, `dwc:family`, `dwc:genus`),
- the URL of the taxon Web page (`schema:sameAs`),
- taxonomic rank.

**Query mode**: dereferencing to RDF content, SPARQL

**Parameters**: 
- id: Index Fungorum's internal taxon identifier




## Produced graph example

```turtle
@prefix dwc: <http://rs.tdwg.org/dwc/terms/> .
@prefix taxrefp: <http://taxref.mnhn.fr/lod/property/> .

<http://example.org/ld/indexfungorum/taxon/451112>
    a dwc:Taxon;
    dwc:scientificName "Hypocrea citrina var. fungicola";
    dwc:acceptedNameUsage "Protocrea fungicola" ;
    dwc:scientificNameAuthorship "P. Karst.";
    dwc:kingdom "Fungi";
    dwc:phylum "Ascomycota";
    dwc:class "Sordariomycetes";
    dwc:order "Hypocreales";
    dwc:family "Hypocreaceae";
    dwc:genus "Hypocrea";
    schema:sameAs <http://www.indexfungorum.org/Names/NamesRecord.asp?RecordID=451112>;
    taxrefp:hasRank <http://taxref.mnhn.fr/lod/taxrank/Variety>.
```

## Usage example (SPARQL)

```sparql
prefix dwc: <http://rs.tdwg.org/dwc/terms/>

SELECT * WHERE {
  SERVICE <https://example.org/sparql-ms/indexfungorum/getTaxonByNameKey?id=451112>
    { ?taxon dwc:scientificName ?name; dwc:scientificNameAuthorship ?author.  }
}
```

## Usage example (dereferencing)

    curl --header "Accept:text/turtle" http://example.org/ld/indexfungorum/taxon/451112

