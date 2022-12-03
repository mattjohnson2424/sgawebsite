import { createContext } from "react";
export const BioContext = createContext({
    showLoadingScreen: false,
    setShowLoadingScreen: () => {}
});
export default BioContext;