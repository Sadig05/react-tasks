import { createContext } from "react";

export type Theme = "light" | "dark";

export interface ThemeContextProps {
    theme: Theme;
    toggleTheme: () => void;
}

const initialThemeContext: ThemeContextProps = {
    theme: "light",
    toggleTheme: () => {},
};

export const ThemeContext = createContext(initialThemeContext);
