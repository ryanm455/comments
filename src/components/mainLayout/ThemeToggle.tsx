"use client"
import { memo } from "react";

import { Button } from "components/ui";
import Icon from "components/ui/Icon";
import { useTheme } from "next-themes";

import { FaMoon } from "@react-icons/all-files/fa/FaMoon";
import { FaSun } from "@react-icons/all-files/fa/FaSun";

const ThemeToggle = memo(() => {
    const { theme, setTheme } = useTheme();

    return (
        <Button
            icon={() =>
                theme === "light" ? <Icon as={FaMoon} /> : <Icon as={FaSun} />
            }
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            aria-label="Toggle theme"
        />
    );
});

export default ThemeToggle;