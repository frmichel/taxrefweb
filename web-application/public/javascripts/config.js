define([], function(){
    //Base URL for SPARQL micro-service
    let MS_BASE_URL = "http://example.org/sparql-ms/";
    //Define the sparql endpoint to query and the URLs of the SPARQL microservices.
    let config = {
        sparqlEndpoint: "http://sms.i3s.unice.fr/sparql",
        microservices: {
            "TAXREF": {
                "taxon": MS_BASE_URL + "taxref/getTaxonByID?id=",
                "synonyms": MS_BASE_URL + "taxref/getSynonymsByID?id=",
                "habitats": MS_BASE_URL + "taxref/getTaxonByID?id=",
                "classification": MS_BASE_URL + "taxref/getClassificationByID?id="
            },
            "WoRMS": {
                taxon: MS_BASE_URL + "worms/getTaxonByID?id=",
                synonyms: MS_BASE_URL + "worms/getSynonymsByID?id=",
                habitats: MS_BASE_URL + "worms/getTaxonByID?id=",
                classification: MS_BASE_URL + "worms/getClassificationByID?id="
            },
            "GBIF": {
                taxon: MS_BASE_URL + "gbif/getTaxonByID?id=",
                synonyms: MS_BASE_URL + "gbif/getSynonymsByID?id=",
                classification: MS_BASE_URL + "gbif/getClassificationByID?id="
            },
            "FishBase": {
                taxon: MS_BASE_URL + "fishbase/getSpeciesBySynCode?id=",
                synonyms: MS_BASE_URL + "fishbase/getSynonymsBySynCode?id=",
                habitats: MS_BASE_URL + "fishbase/getSpeciesBySynCode?id=",
            },
            "SANDRE": {
                taxon: MS_BASE_URL + "sandre/getTaxonByID?id=",
                classification: MS_BASE_URL + "sandre/getParentByID?id=",
            },
            "TROPICOS": {
                taxon: MS_BASE_URL + "tropicos/getTaxonByID?id=",
                synonyms: MS_BASE_URL + "tropicos/getSynonymsByID?id=",
            },
            "Index Fungorum": {
                taxon: MS_BASE_URL + "indexfungorum/getTaxonByID?id=",
            },
            "Euro+Med Plantbase": {
                taxon: MS_BASE_URL + "pesi/getTaxonByID?id=",
                synonyms: MS_BASE_URL + "pesi/getSynonymsByID?id=",
            },
            "Fauna Europaea": {
                taxon: MS_BASE_URL + "pesi/getTaxonByID?id=urn:lsid:faunaeur.org:taxname:",
                synonyms: MS_BASE_URL + "pesi/getSynonymsByID?id=urn:lsid:faunaeur.org:taxname:",
            }
        }
    };
    
    return config;
});