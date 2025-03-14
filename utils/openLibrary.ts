import axios from "axios";

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

export const getEarliestEdition = async (workId: string): Promise<Edition | null> => {
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
                    new Date(a.publish_date!).getTime() - new Date(b.publish_date!).getTime()
            );

        return sortedEditions.length > 0 ? sortedEditions[0] : null;
    } catch (error) {
        console.error("Error fetching earliest edition:", error);
        return null;
    }
};