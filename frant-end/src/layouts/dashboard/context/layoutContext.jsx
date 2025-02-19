
import { useState, createContext } from "react"; // ==============================================================

// ==============================================================
export const LayoutContext = createContext({});

const LayoutProvider = ({
  children
}) => {
  const [sidebarCompact, setSidebarCompact] = useState(false);
  const [showMobileSideBar, setShowMobileSideBar] = useState(false); 
  const handleSidebarCompactToggle = () => setSidebarCompact(!sidebarCompact);
  const handleOpenMobileSidebar = () => setShowMobileSideBar(true); 
  const handleCloseMobileSidebar = () => setShowMobileSideBar(false);

  return <LayoutContext.Provider value={{
    sidebarCompact,
    showMobileSideBar,
    handleSidebarCompactToggle,
    handleCloseMobileSidebar,
    handleOpenMobileSidebar
  }}  > 
      {children}
    </LayoutContext.Provider> ;
};

export default LayoutProvider;