import { useState, useEffect } from "react";

export function useColorScheme() {
  const [colorScheme, setColorScheme] = useState(
    window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
  );

  const changeHandler = (e) => {
    const newColorScheme = e.matches ? "dark" : "light";
    setColorScheme(newColorScheme);
  };

  useEffect(() => {
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", changeHandler);
    return () => {
      window
        .matchMedia("(prefers-color-scheme: dark)")
        .removeEventListener("change", changeHandler);
    };
  });

  return colorScheme;
}
