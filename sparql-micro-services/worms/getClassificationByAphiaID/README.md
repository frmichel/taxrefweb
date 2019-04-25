
# worms/getClassificationByAphiaID


This service retrieves the classification of a given taxon from [WoRMS (World Register of Marine Species)](http://www.marinespecies.org/) by using its identifier (AphiaID). 

Each taxon belonging to the classification is identified by an instance of the `dwc:Taxon` that provides the following information:
- identifier of the taxon in WoRMS (`dwc:taxonID`),
- scientific name (`dwc:scientificName`),
- URL of the taxon Web page (`schema:sameAs`),
- taxonomic rank,
- parent taxon (`skos:broader`).

**Query mode**: SPARQL

**Parameters**: 
- id: WoRMS's internal taxon identifier




## Produced graph example

```turtle
@prefix dwc: <http://rs.tdwg.org/dwc/terms/> .
@prefix taxrefp: <http://taxref.mnhn.fr/lod/property/> .
@prefix schema: <http://schema.org/>.

<http://example.org/ld/worms/taxon/154288> 
    a dwc:Taxon;
    dwc:taxonID "154288";
    dwc:scientificName "Alburnoides bipunctatus";
    schema:sameAs <http://www.marinespecies.org/aphia.php?p=taxdetails&id=154288>;
    taxrefp:hasRank <http://taxref.mnhn.fr/lod/taxrank/Species>;
    skos:broader <http://example.org/ld/worms/taxon/154286>.
    
<http://example.org/ld/worms/taxon/154286>
    a dwc:Taxon;
    dwc:taxonID "154286";
    dwc:scientificName "Alburnoides";
    schema:sameAs <http://www.marinespecies.org/aphia.php?p=taxdetails&id=154286>;
    taxrefp:hasRank <http://taxref.mnhn.fr/lod/taxrank/Genus>;
    skos:broader <http://example.org/ld/worms/taxon/826613>.
```

## Usage example (SPARQL)

```sparql
prefix dwc: <http://rs.tdwg.org/dwc/terms/>

SELECT * WHERE {
  SERVICE <https://example.org/sparql-ms/worms/getClassificationyAphiaID?id=154288>
    { [] dwc:scientificName ?name.  }
}
```

