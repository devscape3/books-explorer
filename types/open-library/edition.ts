interface Entry {
    "type": { "key": "/type/edition" },
    "authors": { "key": string }[],
    "isbn_13": string[],
    "languages": { "key": string }[],
    "pagination": number,
    "publish_date": string,
    "publishers": string[],
    "source_records": string[],
    "subjects": string[],
    "title": string,
    "weight": string,
    "full_title": string,
    "works": { "key": string }[]
    "key": string,
    "covers": string[],
    "number_of_pages": string,
    "latest_revision": string,
    "revision": string,
    "created": { "type": string, "value": string },
    "last_modified": { "type": string, "value": string },
}

interface Edition {
    "links": {
        "self": string,
        "work": string,
        "next": string
    },
    "size": number,
    "entries": Entry[]
}