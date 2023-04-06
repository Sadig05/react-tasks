import { useContext } from "react";
import { ThemeContext } from "./ThemeContext";
import { Switch } from "antd";

export const ToggleButton = () => {
    const { theme, toggleTheme } = useContext(ThemeContext);

    return (
        <Switch
            checked={theme === "dark"}
            onChange={toggleTheme}
            checkedChildren="Dark"
            unCheckedChildren="Light"
        />
    );
};
