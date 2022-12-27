import { createContext } from "react";
export const SettingsContext = createContext({
    showLoadingScreen: false,
    setShowLoadingScreen: () => {}
});
export default SettingsContext;