import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { TouchableIcon } from "../TouchableIcon";

// Mock Ionicons to prevent font-loading issues
// Mock Ionicons to prevent font-loading issues
jest.mock("@expo/vector-icons", () => {
    return {
        Ionicons: jest.fn((props) => <div {...props} data-testid="touchable-icon" />),
    };
});

describe("TouchableIcon Component", () => {
    test("renders the Ionicon with the correct name", () => {
        const { getByTestId } = render(<TouchableIcon ionicIconName="home" />);

        const icon = getByTestId("touchable-icon");
        expect(icon.props.name).toBe("home");
    });

    test("triggers onPress when clicked", () => {
        const onPressMock = jest.fn();
        const { getByTestId } = render(<TouchableIcon onPress={onPressMock} />);

        fireEvent.press(getByTestId("touchable-icon"));
        expect(onPressMock).toHaveBeenCalledTimes(1);
    });

    test("uses default icon name when none is provided", () => {
        const { getByTestId } = render(<TouchableIcon />);

        const icon = getByTestId("touchable-icon");
        expect(icon.props.name).toBe("help-circle");
    });
});