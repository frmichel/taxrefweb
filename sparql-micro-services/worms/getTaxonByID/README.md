
# worms/getTaxonByID


This service retrieves information about a taxon from [WoRMS (World Register of Marine Species)](http://www.marinespecies.org/) by using its identifier (AphiaID). 

Each taxon is identified by an instance of the `dwc:Taxon` that provides the following information:
- scientific name (`dwc:scientificName`),
- author (`dwc:scientificNameAuthorship`),
- currently valid name (`dwc:acceptedNameUsage`),
- classification (`dwc:kingdom`, `dwc:phylum`, `dwc:class`, `dwc:order`, `dwc:family`, `dwc:genus`),
- the URL of the taxon Web page (`schema:sameAs`),
- habitats,
- taxonomic rank.

**Query mode**: dereferencing to RDF content, SPARQL

**Parameters**: 
- id: WoRMS's internal taxon identifier




## Produced graph example

```turtle
@prefix dwc: <http://rs.tdwg.org/dwc/terms/> .
@prefix taxrefp: <http://taxref.mnhn.fr/lod/property/> .

<http://example.org/ld/worms/taxon/154288>
    a dwc:Taxon;
    dwc:scientificName "Alburnoides bipunctatus";
    dwc:acceptedNameUsage "Alburnoides bipunctatus (Bloch, 1782)" ;
    dwc:scientificNameAuthorship "(Bloch, 1782)";
    dwc:kingdom "Animalia";
    dwc:phylum "Chordata";
    dwc:class "Actinopterygii";
    dwc:order "Cypriniformes";
    dwc:family "Cyprinidae";
    dwc:genus "Alburnoides";
    schema:sameAs <http://www.marinespecies.org/aphia.php?p=taxdetails&id=154288>;
    taxrefp:hasRank <http://taxref.mnhn.fr/lod/taxrank/Species>;
    taxrefp:habitat <http://taxref.mnhn.fr/lod/habitat/FreshWater>, <http://taxref.mnhn.fr/lod/habitat/BrackishWater>.
```

## Usage example (SPARQL)

```sparql
prefix dwc: <http://rs.tdwg.org/dwc/terms/>

SELECT * WHERE {
  SERVICE <http://example.org/sparql-ms/worms/getTaxonByID?id=154288>
    { ?taxon dwc:scientificName ?name; dwc:scientificNameAuthorship ?author.  }
}
```

## Usage example (dereferencing)

    curl --header "Accept:text/turtle" http://example.org/ld/worms/taxon/154288

