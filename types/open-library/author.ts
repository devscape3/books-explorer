interface Author {
    personal_name: string;
    key: string;
    entity_type: string;
    birth_date?: string;
    links: Link[];
    alternate_names?: string[];
    name: string;
    remote_ids: RemoteIDs;
    type: EntityType;
    title?: string;
    bio?: string;
    fuller_name?: string;
    source_records?: string[];
    photos?: number[];
    latest_revision: number;
    revision: number;
    created: DateTime;
    last_modified: DateTime;
}

interface Link {
    title: string;
    url: string;
    type: EntityType;
}

interface RemoteIDs {
    viaf?: string;
    goodreads?: string;
    storygraph?: string;
    isni?: string;
    librarything?: string;
    amazon?: string;
    wikidata?: string;
    [key: string]: string | undefined;
}

interface EntityType {
    key: string;
}

interface DateTime {
    type: string;
    value: string;
}