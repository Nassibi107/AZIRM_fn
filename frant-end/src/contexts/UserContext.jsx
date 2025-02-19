import { createContext, useContext, useState } from "react";

const StateContext = createContext({
    user: {},
    setUser: () => {},
    logout: () => {},
    auth: false,
    setAuth: () => {}
});

export default function UserContext({ children }) {
    const [user, setUser] = useState({});
    const [auth, setAuth] = useState(false);

    const logout = () => {
       alert("Breaking session!");
        setUser({});
        setAuth(false);
        localStorage.removeItem('token');
    };

    return (
        <StateContext.Provider value={{ user, setUser, auth, setAuth, logout }}>
            {children}
        </StateContext.Provider>
    );
}

export const useUserContext = () => useContext(StateContext);
