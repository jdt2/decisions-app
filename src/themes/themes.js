import { DefaultTheme } from "react-native-paper"

export const DecisionsTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        background: 'white',
        primary: '#263238',
        accent: '#263238',
        text: '#263238',
    },
    roundness: 12,
    fonts: {
        ...DefaultTheme.fonts,
        regular: {
            fontWeight: "400",
            fontFamily: 'Inter_400Regular',
        },
        medium: {
            fontWeight: "500",
            fontFamily: 'Inter_500Medium',
        },
        light: {
            fontWeight: "300",
            fontFamily: 'Inter_300Light',
        },
        thin: {
            fontWeight: "100",
            fontFamilY: 'Inter_100Thin',
        }
    }
}