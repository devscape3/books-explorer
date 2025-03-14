import { NY_KEY } from "@/constants/Keys";
import { BookDetail } from "@/types";
import { NYTimesBookReview } from "@/types/nytimes-library";
import { Doc } from "@/types/open-library/query";
import { getEarliestEdition } from "@/utils/openLibrary";
import axios from "axios";

/**
 * Validates the HTTP response from an API request.
 *
 * @param response - The fetch API response object to be validated.
 * @param errorMessage - The error message to display if the response is not OK.
 * @throws If the response status is not OK (e.g., 404, 500).
 * @throws If the response is not in JSON format.
 */
export function checkResponse(response: Response, errorMessage:string) {
    const contentType = response.headers.get("content-type");

    // Check if response status is not OK (e.g., 404, 500)
    if (!response.ok) {
        throw new Error(`${errorMessage} (Status: ${response.status})`);
    }

    // Ensure response content type is JSON
    if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Invalid response format. Expected JSON.");
    }
}

/**
 * Fetch Docs from Open Library API by query string
 *
 * @param query - Book name or author name query string
 * @param fields - array of field names to fetch, currently all fields are fetched regardless of this parameter.
 * @param limit - how many rows to get
 * @returns list of docs matching query
 * @throws If the response status is not OK (e.g., 404, 500).
 * @throws If the response is not in JSON format.
 */

export const fetchBooks = async (query: string, fields: string[] = ['key', 'title', 'author_name', 'first_publish_year'], limit:number = 10): Promise<Doc[]> => {
    try {
        //const fieldsString = fields.join(",");
        //const response = await fetch(`https://openlibrary.org/search.json?q=${query}&fields=${fieldsString}&limit=${limit}`);
        const response = await fetch(`https://openlibrary.org/search.json?q=${query}&limit=${limit}`);
        checkResponse(response, "Invalid API response. Try again later.")
        const data = await response.json();
        return data.docs;
    } catch (error:any) {
        //console.error("Error fetching books:", error);
        throw new Error(error.message + "Error fetching books. Please try again later.");
    }
};

/**
 * fetch Work from Open Library API by workId
 *
 * @param bookKey - its workId like /works/OL45804W
 * @returns Work details
 * @throws If the response status is not OK (e.g., 404, 500).
 * @throws If the response is not in JSON format.
 */

export async function fetchBookDetail(bookKey: string): Promise<BookDetail | null> {
    try {
        if (!bookKey) throw new Error("Book key is required.");

        const response = await fetch(`https://openlibrary.org${bookKey}.json`);
        checkResponse(response, "Invalid API response. Try again later.");

        const data: BookDetail = await response.json();
        if (!data) throw new Error("Received empty response from API.");

        return data;
    } catch (error:any) {
        //console.error("Error fetching book details:", error);
        throw new Error(error.message + "Error fetching book details. Please try again later.");
    }
}

/**
 * fetch Authors of Work from Open Library API by workId
 *
 * @param authorKeys - its a list of authorKey like /authors/OL23919A
 * @returns list of Authors
 * @throws If the response status is not OK (e.g., 404, 500).
 * @throws If the response is not in JSON format.
 */

export async function fetchAuthors(authorKeys: string[]): Promise<Author[]> {
    try {
        const authorDetails = await Promise.all(
            authorKeys.map(async (authorKey) => {
                const response = await fetch(`https://openlibrary.org${authorKey}.json`);
                checkResponse(response, "Invalid API response. Try again later.")
                return response.json();
            })
        );
        return authorDetails;
    } catch (error) {
        //console.error("Error fetching author details:", error);
        throw new Error("Error fetching authors. Please try again later.");
    }
}

/**
 * fetch Rating of Work from Open Library API by workId
 *
 * @param bookKey - its workId like /works/OL45804W
 * @returns { average: string, count: string} rating information for Work
 * @throws If the response status is not OK (e.g., 404, 500).
 * @throws If the response is not in JSON format.
 */

export async function fetchRatings(bookKey: string): Promise<{ average: string; count: string }> {
    try {
        const response = await fetch(`https://openlibrary.org${bookKey}/ratings.json`);
        checkResponse(response, "Invalid API response. Try again later.")
        const data = await response.json();
        return {
            average: data.summary?.average || "N/A",
            count: data.summary?.count || "0",
        };
    } catch (error) {
        //console.error("Error fetching ratings:", error);
        return { average: "N/A", count: "0" };
    }
}

/**
 * fetch Reviews from New York Times API by ISBN13
 *
 * @param isbn - its isbn13
 * @returns Reviews for edition with given isbn
 * @throws If the response status is not OK (e.g., 404, 500).
 * @throws If the response is not in JSON format.
 */

export async function fetchReviews(isbn: string | null): Promise<NYTimesBookReview[]> {
    if (!isbn) return [];

    try {
        const response = await fetch(
            `https://api.nytimes.com/svc/books/v3/reviews.json?title=${isbn}&api-key=${NY_KEY}`
        );
        const data = await response.json();
        return data.results || [];
    } catch (error) {
        return [];
    }
}

/**
 * returns isbn13 of earliest edition for Work
 */

export async function fetchEarliestEditionISBN(bookKey: string): Promise<string | null> {
    const edition = await getEarliestEdition(bookKey);
    return edition?.isbn_13?.[0] || edition?.isbn_10?.[0] || null;
}

interface Edition {
    title: string;
    publish_date?: string;
    key: string;
    isbn_10: string[] | null;
    isbn_13: string[] | null;
}

interface EditionsResponse {
    entries: Edition[];
}

/**
 * get editions for a given work, their may be many editions published for a work
 *
 * @param bookKey - its workId like /works/OL45804W
 * @returns Array of Editions corresponding to the workId
 * @throws If the response status is not OK (e.g., 404, 500).
 * @throws If the response is not in JSON format.
 */


export const fetchEditions = async (workId: string): Promise<Edition[] | null> => {
    try {
        const url = `https://openlibrary.org${workId}/editions.json`;
        const response = await axios.get<EditionsResponse>(url);

        if (!response.data.entries || response.data.entries.length === 0) {
            throw new Error("No editions found for this book.");
        }

        // Filter out entries without publish_date and sort by date
        const sortedEditions = response.data.entries
            .filter((edition) => edition.publish_date)
            .sort(
                (a, b) =>
                    new Date(b.publish_date!).getTime() - new Date(a.publish_date!).getTime()
            );

        return sortedEditions;
    } catch (error) {
        //console.error("Error fetching earliest edition:", error);
        return null;
    }
};