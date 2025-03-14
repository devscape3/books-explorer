import { useEffect, useState } from "react";
import { BookDetail } from "@/types";
import { fetchBookDetail } from "@/api/books";

export function useFetchBookDetail(bookKey: string | undefined) {
    const [bookDetail, setBookDetail] = useState<BookDetail | null>(null);

    useEffect(() => {
        if (!bookKey) return;
        fetchBookDetail(bookKey).then(setBookDetail);
    }, [bookKey]);

    return bookDetail;
}
