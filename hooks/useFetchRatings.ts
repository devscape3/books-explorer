import { fetchRatings } from "@/api/books";
import { useEffect, useState } from "react";

export function useFetchRatings(bookKey: string | undefined) {
    const [rating, setRating] = useState<{ average: string; count: string } | null>(null);

    useEffect(() => {
        if (!bookKey) return;
        fetchRatings(bookKey).then(setRating);
    }, [bookKey]);

    return rating;
}
