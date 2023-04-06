import { useState, useCallback } from "react";
import { ThemeContext, Theme, ThemeContextProps } from "./ThemeContext";

interface ThemeProviderProps {
    children: React.ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
    const [theme, setTheme] = useState<Theme>("light");

    const toggleTheme = useCallback(() => {
        setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
    }, []);

    const contextValue: ThemeContextProps = {
        theme,
        toggleTheme,
    };

    return (
        <ThemeContext.Provider value={contextValue}>
            {children}
        </ThemeContext.Provider>
    );
};
