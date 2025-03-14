import { fetchBooks } from "../books";

global.fetch = jest.fn() as jest.Mock;

describe("fetchBooks", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    const gf = global.fetch as jest.Mock;

    it("should call the correct API endpoint", async () => {
        gf.mockResolvedValueOnce({
            ok: true,
            json: jest.fn().mockResolvedValueOnce({ docs: [{ title: "Test Book" }] }),
            headers: new Headers({ "content-type": "application/json" }),
        });

        await fetchBooks("harry potter", ["title"], 10);

        expect(global.fetch).toHaveBeenCalledWith(
            "https://openlibrary.org/search.json?q=harry potter&limit=10"
        );
    });

    it("should return books when the API responds successfully", async () => {
        const mockBooks = [{ title: "Book A" }, { title: "Book B" }];

        gf.mockResolvedValueOnce({
            ok: true,
            json: jest.fn().mockResolvedValueOnce({ docs: mockBooks }),
            headers: new Headers({ "content-type": "application/json" }),
        });

        const books = await fetchBooks("harry potter");
        expect(books).toEqual(mockBooks);
    });

    it("should throw an error if API response is not JSON", async () => {
        gf.mockResolvedValueOnce({
            ok: true,
            json: jest.fn(),
            headers: new Headers({ "content-type": "text/html" }), // Invalid JSON response
        });

        await expect(fetchBooks("invalid")).rejects.toThrow("Invalid response format. Expected JSON.");
    });

    it("should throw an error if API request fails", async () => {
        gf.mockRejectedValueOnce(new Error("Network Error"));

        await expect(fetchBooks("error")).rejects.toThrow("Error fetching books. Please try again later.");
    });

    it("should throw an error if API response is unsuccessful", async () => {
        gf.mockResolvedValueOnce({
            ok: false,
            status: 500,
            json: jest.fn().mockResolvedValueOnce({}),
            headers: new Headers({ "content-type": "application/json" }),
        });

        await expect(fetchBooks("error")).rejects.toThrow("Error fetching books. Please try again later.");
    });
});
