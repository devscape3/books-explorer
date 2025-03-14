import { View, TextInput, StyleSheet } from "react-native";
import Svg, { G, Path, Defs, ClipPath, Rect } from 'react-native-svg';


interface SearchBoxProps {
    value: string;
    onChange: (text: string) => void;
    placeholder?: string;
}

export function SearchBox({ value, onChange, placeholder = "Search..." }: SearchBoxProps) {
    const width = 24
    const height = 24
    const color = '#9D9D9D'

    return (
        <View style={styles.searchContainer}>
            <View style={styles.icon}>
                <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
                    <G clipPath="url(#clip0)">
                        <Path
                            d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
                            stroke={color}
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <Path
                            d="M22 22L20 20"
                            stroke={color}
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </G>
                    <Defs>
                        <ClipPath id="clip0">
                            <Rect width="24" height="24" fill="white" />
                        </ClipPath>
                    </Defs>
                </Svg>

            </View>
            <TextInput
                style={styles.input}
                placeholder={placeholder}
                value={value}
                onChangeText={onChange}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    searchContainer: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#E8E8E8",
        backgroundColor: "#FAFAFA",
        borderRadius: 8,
        paddingVertical: 4,
        paddingHorizontal: 12,
        marginBottom: 10,

    },
    icon: {
        marginRight: 4,
        paddingHorizontal: 4
    },
    input: {
        flex: 1,
        fontSize: 16,
        textDecorationLine: 'none', // Ensure no underline
        borderBottomWidth: 0, // Prevent bottom border
    },
});
