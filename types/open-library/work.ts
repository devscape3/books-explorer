export interface Work {
    "title": string,
    "key": string,
    "authors": { "author": { "key": string }, "type": { "key": string } }[],
    "type": { "key": string },
    "description": string,
    "covers": string[],
    "subject_places": string[],
    "subjects": string[],
    "subject_people": string[],
    "subject_times": string[],
    "location": string,
    "latest_revision": string,
    "revision": string,
    "created": { "type": string, "value": string },
    "last_modified": { "type": string, "value": string }
}