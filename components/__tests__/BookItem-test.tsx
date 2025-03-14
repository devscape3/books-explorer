import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { BookItem } from "@/components/BookItem";
import { Book } from "@/types";

describe("BookItem Component", () => {
    const mockBook: Book = {
        title: "Harry Potter and the Philosopher's Stone",
        author_name: ["J.K. Rowling"],
        key: ''
    };
    const mockOnPress = jest.fn();

    it("renders book title and author correctly", () => {
        const { getByText } = render(<BookItem book={mockBook} onPress={mockOnPress} />);
        expect(getByText("Harry Potter and the Philosopher's Stone")).toBeTruthy();
        expect(getByText("J.K. Rowling")).toBeTruthy();
    });

    it("renders 'Unknown Author' when no author is provided", () => {
        const bookWithoutAuthor: Partial<Book> = { title: "Mystery Book" };
        const { getByText } = render(<BookItem book={bookWithoutAuthor as Book} onPress={mockOnPress} />);
        expect(getByText("Mystery Book")).toBeTruthy();
        expect(getByText("Unknown Author")).toBeTruthy();
    });

    it("calls onPress when pressed", () => {
        const { getByRole } = render(<BookItem book={mockBook} onPress={mockOnPress} />);
        fireEvent.press(getByRole("button"));
        expect(mockOnPress).toHaveBeenCalledTimes(1);
    });
});
