import { createContext } from "react";
export const AdminContext = createContext({
    showLoadingScreen: false,
    setShowLoadingScreen: () => {}
});
export default AdminContext;