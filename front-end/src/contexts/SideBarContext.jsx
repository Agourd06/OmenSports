import React, { createContext, useState} from 'react';


const SideBarContext = createContext();

export const SideBarProvider = ({ children }) => {
    const [isSideBarVisible, setIsSideBarVisible] = useState(false);

    const toggleSideBar = () => {
        setIsSideBarVisible(prevState => !prevState);
    };

    return (
        <SideBarContext.Provider value={{ toggleSideBar, isSideBarVisible }}>
            {children}
        </SideBarContext.Provider>
    );
};

export default SideBarContext;
