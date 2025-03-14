import { useEffect, useState } from "react";
import { Author } from "@/types";
import { fetchAuthors } from "@/api/books";

export function useFetchAuthors(authorKeys: string[]) {
    const [authors, setAuthors] = useState<Author[]>([]);

    useEffect(() => {
        if (authorKeys.length === 0) return;

        let isCancelled = false;
        fetchAuthors(authorKeys).then((data) => {
            if (!isCancelled) setAuthors(data);
        });

        return () => { isCancelled = true; }; // Cleanup on unmount
    }, [authorKeys]);

    return authors;
}
