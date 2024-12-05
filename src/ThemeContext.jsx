import React, {  useState } from "react";

const ThemeContext= React.createContext();


export default ThemeContext

function ThemeContextProvider({children}){

    const[theme,setTheme]= useState(true)

    return(
        <ThemeContext.Provider value={{theme,setTheme}}>
            {children}
        </ThemeContext.Provider>
    )
}


export {ThemeContextProvider}