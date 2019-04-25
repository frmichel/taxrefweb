
# taxref/getRankByRankID


This service retrieves information about a taxonomic rank from [TAXREF](https://taxref.mnhn.fr/taxref-web/accueil) by using its identifier. 

Each rank is identified by an instance of `schema:Thing`, that provides the french name (`schema:name`) and the TAXREF-LD URI of that rank (`schema:url`).

**Query mode**: SPARQL

**Parameters**: 
- id: TAXREF's internal rank identifier




## Produced graph example

```turtle
@prefix schema: <http://schema.org/> .

_:b42015
    a schema:Thing;
    schema:name "Espèce"@fr;
    schema:url <http://taxref.mnhn.fr/lod/taxrank/Species>.
    
```

## Usage example (SPARQL)

```sparql
prefix schema: <http://schema.org/> .

SELECT * WHERE {
  SERVICE <https://example.org/sparql-ms/taxref/getRankByRankId?id=ES>
    { [] schema:url ?uri.  }
}
```

