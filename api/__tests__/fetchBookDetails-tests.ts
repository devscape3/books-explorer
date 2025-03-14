import { fetchBookDetail } from "../books";

global.fetch = jest.fn();

describe("fetchBookDetail", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should return book details when API call is successful", async () => {
        const mockResponse = {
            title: "Sample Book",
            authors: [{ name: "John Doe" }],
        };

        (fetch as jest.Mock).mockResolvedValue({
            ok: true,
            json: jest.fn().mockResolvedValue(mockResponse),
            headers: new Headers({ "content-type": "application/json" }), // Ensure correct content type
        });

        const result = await fetchBookDetail("/books/OL123M");
        expect(result).toEqual(mockResponse);
    });

    it("should throw an error if the book key is missing", async () => {
        await expect(fetchBookDetail("")).rejects.toThrow("Book key is required.");
    });

    it("should throw an error if API response is not OK", async () => {
        (fetch as jest.Mock).mockResolvedValue({
            ok: false,
            status: 404,
            json: jest.fn(),
            headers: new Headers({ "content-type": "application/json" }), // Still a valid JSON response
        });

        await expect(fetchBookDetail("/books/OL123M")).rejects.toThrow(
            "Invalid API response. Try again later. (Status: 404)"
        );
    });

    it("should throw an error if API response is not JSON", async () => {
        (fetch as jest.Mock).mockResolvedValue({
            ok: true,
            json: jest.fn().mockResolvedValue({}),
            headers: new Headers({ "content-type": "text/html" }), // Invalid content type
        });

        await expect(fetchBookDetail("/books/OL123M")).rejects.toThrow(
            "Invalid response format. Expected JSON."
        );
    });

    it("should throw an error if API returns an empty response", async () => {
        (fetch as jest.Mock).mockResolvedValue({
            ok: true,
            json: jest.fn().mockResolvedValue(null),
            headers: new Headers({ "content-type": "application/json" }),
        });

        await expect(fetchBookDetail("/books/OL123M")).rejects.toThrow(
            "Received empty response from API."
        );
    });

    it("should handle network errors gracefully", async () => {
        (fetch as jest.Mock).mockRejectedValue(new Error("Network Error"));

        await expect(fetchBookDetail("/books/OL123M")).rejects.toThrow(
            "Error fetching book details. Please try again later."
        );
    });
});
