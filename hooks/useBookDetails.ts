import { useMemo } from "react";
import { useFetchBookDetail } from "./useFetchBookDetail";
import { useFetchAuthors } from "./useFetchAuthors";
import { useFetchRatings } from "./useFetchRatings";
import { useFetchReviews } from "./useFetchReviews";
import { NYTimesBookReview } from "@/types/nytimes-library";

export function useBookDetails(bookKey: string | undefined) {
    const bookDetail = useFetchBookDetail(bookKey);

    const authorKeys = useMemo(() => {
        return bookDetail?.authors?.map((author) => author.author.key) || [];
    }, [bookDetail]);

    const authors = useFetchAuthors(authorKeys);
    const rating = useFetchRatings(bookKey);
    const reviews:NYTimesBookReview[] = useFetchReviews(bookDetail?.title);

    return { bookDetail, authors, rating, reviews };
}
