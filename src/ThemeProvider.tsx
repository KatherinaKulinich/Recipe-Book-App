import React from "react";



export type Theme = 'light' | 'dark';


export type ThemeContext = { 
    theme: Theme; 
    toggleTheme: () => void;
}

export interface ThemeProviderProps {
    children: React.ReactNode
}


export const ThemeContext = React.createContext<ThemeContext>(
  {} as ThemeContext
);



export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {

  const [theme, setTheme] = React.useState<Theme>("dark");
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };


  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};