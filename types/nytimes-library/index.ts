export interface NYTimesBookReviewResponse {
    status: string;
    copyright: string;
    num_results: number;
    results: NYTimesBookReview[];
}

export interface NYTimesBookReview {
    url: string;
    publication_dt: string; // Date in "YYYY-MM-DD" format
    byline: string;
    book_title: string;
    book_author: string;
    summary: string;
    uuid: string;
    uri: string;
    isbn13: string[]; // Array of ISBN-13 numbers
}