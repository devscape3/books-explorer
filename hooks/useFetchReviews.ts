import { fetchReviews } from "@/api/books";
import { NYTimesBookReview } from "@/types/nytimes-library";
import { useEffect, useState } from "react";

export function useFetchReviews(bookKey: string | undefined) {
    const [reviews, setReviews] = useState<NYTimesBookReview[]>([]);

    useEffect(() => {
        if (!bookKey) return;

        async function loadReviews() {
            const reviews = await fetchAllReviews(bookKey as string);
                setReviews(reviews);
        }
        if (bookKey) {
            loadReviews();
        }
    }, [bookKey]);

    return reviews;
}


async function fetchAllReviews(name: string): Promise<NYTimesBookReview[]> {
    try {
        const reviews = await fetchReviews(name);
        return reviews;
    } catch (error) {
        console.error(`Failed to fetch reviews for ${name}:`, error);
        throw new Error(`Error fetching reviews for ${name} `)
    }
}