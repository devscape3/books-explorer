export interface QueryResponse {
    "numFound": number,
    "start": number,
    "numFoundExact": Boolean,
    "num_found": number,
    "documentation_url": string,
    "q": string,
    "offset": null,
    "docs": Doc[]
}

export interface Doc {
    "author_key": string[],
    "author_name": string[],
    "cover_edition_key": string,
    "cover_i": number,
    "edition_count": number,
    "first_publish_year": string,
    "has_fulltext": Boolean,
    "ia": string[],
    "ia_collection_s": string,
    "key": string,
    "language": string[],
    "lending_edition_s": string,
    "lending_identifier_s": string,
    "public_scan_b": Boolean,
    "title": string,
}