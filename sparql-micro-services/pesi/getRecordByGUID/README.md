
# pesi/getRecordByGUID


This service retrieves information about a taxon from [PESI (Pan-European Species directories Infrastructure)](http://www.eu-nomen.eu/portal/) by using its identifier. 

Each taxon is identified by an instance of the `dwc:Taxon` that provides the following information:
- scientific name (`dwc:scientificName`),
- author (`dwc:scientificNameAuthorship`),
- currently valid name (`dwc:acceptedNameUsage`),
- classification (`dwc:kingdom`, `dwc:phylum`, `dwc:class`, `dwc:order`, `dwc:family`, `dwc:genus`),
- the URL of the taxon Web page (`schema:sameAs`),
- taxonomic rank.

**Query mode**: dereferencing to RDF content, SPARQL

**Parameters**: 
- id: PESI's internal taxon identifier




## Produced graph example

```turtle
@prefix dwc: <http://rs.tdwg.org/dwc/terms/> .
@prefix taxrefp: <http://taxref.mnhn.fr/lod/property/> .

<http://example.org/ld/pesi/taxon/6A8E85BD-5E52-4AE2-9444-99128C87A672>
    a dwc:Taxon;
    dwc:scientificName "Abies alba";
    dwc:acceptedNameUsage "Abies alba Mill." ;
    dwc:scientificNameAuthorship "Mill.";
    dwc:kingdom "Plantae";
    dwc:phylum "Tracheophyta";
    dwc:class "Pinopsida";
    dwc:order "Pinales";
    dwc:family "Pinaceae";
    dwc:genus "Abies";
    schema:sameAs <http://www.eu-nomen.eu/portal/taxon.php?GUID=6A8E85BD-5E52-4AE2-9444-99128C87A672>;
    taxrefp:hasRank <http://taxref.mnhn.fr/lod/taxrank/Species>.
```

## Usage example (SPARQL)

```sparql
prefix dwc: <http://rs.tdwg.org/dwc/terms/>

SELECT * WHERE {
  SERVICE <http://example.org/sparql-ms/pesi/getRecordByGUID?id=6A8E85BD-5E52-4AE2-9444-99128C87A672>
    { ?taxon dwc:scientificName ?name; dwc:scientificNameAuthorship ?author.  }
}
```

## Usage example (dereferencing)

    curl --header "Accept:text/turtle" http://example.org/ld/pesi/taxon/6A8E85BD-5E52-4AE2-9444-99128C87A672

