import { createContext } from "react";
export const HomeContext = createContext({
    showLoadingScreen: false,
    setShowLoadingScreen: () => {}
});
export default HomeContext;