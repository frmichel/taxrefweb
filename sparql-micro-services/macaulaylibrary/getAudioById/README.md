# macaulaylibrary/getAudioById

This service retrieves an audio recording from the [Macaulay Library](https://www.macaulaylibrary.org/), a scientific media archive related to birds, amphibians, fishes and mammals.
It is designed to dereference URIs produced in the `macaulaylibrary/getAudioBy*` services.

A recording is depicted as an instance of the `schema:AudioObject` class that provides a link to the audio file (`schema:contentUrl`), the author (`schema:author`), a thumbnail (`schema:thumbnailUrl`), a description (`schema:description`) and the URL of the related Web page (`schema:mainEntityOfPage`). Additional information may be provided such as a description, licence, and the individual that was recorded.


**Query mode**: dereferencing to RDF content

**Parameters**:
- `catalogId`: audio recording identifier (internal Macaulay Library identifier)


## Produced graph example

```turtle
<http://example.org/ld/macaulaylibrary/audio/id/131396>
    rdf:type schema:AudioObject .
    schema:author "Thomas C. Poulter" ;
    schema:contentUrl <https://download.ams.birds.cornell.edu/api/v1/asset/131396/audio> ;
    schema:mainEntityOfPage <https://macaulaylibrary.org/asset/131396> ;
    schema:thumbnailUrl <https://macaulaylibrary.org/media/Spectrograms/audio/poster/220/0/131/131396.jpg> ;
    schema:description "NOTES ...";
    schema:license "other" ;
    schema:about [
        foaf:age "Adult";
        foaf:gender "male";
        schema:name "Delphinus delphis"
    ].
```

## Usage example (dereferencing)

    curl --header "Accept:text/turtle" http://example.org/ld/macaulaylibrary/audio/id/131396
