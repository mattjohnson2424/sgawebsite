import { createContext } from "react";
export const EventsContext = createContext({
    showLoadingScreen: false,
    setShowLoadingScreen: () => {}
});
export default EventsContext;