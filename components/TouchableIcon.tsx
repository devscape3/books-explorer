import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";

export type TouchableIconProps = {
    onPress?: () => void;
    ionicIconName?: keyof typeof Ionicons.glyphMap;
};

export function TouchableIcon({ onPress, ionicIconName = "help-circle" }: TouchableIconProps) {
    return (
        <TouchableOpacity onPress={onPress} style={{ padding: 0 }}>
            <Ionicons testID="touchable-icon" name={ionicIconName} size={24} color="#19191B" style={{
                alignContent: "center",
                verticalAlign: 'middle'
            }} />
        </TouchableOpacity>
    );
}