import { createContext, useContext, useState } from 'react';

const AppProjectContext = createContext();

export const AppProjectProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);

    return (
        <AppProjectContext.Provider value={{ loading, setLoading }}>
            {children}
        </AppProjectContext.Provider>
    );
};

export const useAppProject = () => useContext(AppProjectContext);
