import React from "react";

const initialState = {
    isLoggedIn: false,
    user: null, // Or an empty object for user details
    role: null,
};

export const AuthContext = React.createContext(initialState);

export const useAuth = () => {
    // State initialization with local storage persistence
    const [authState, setAuthState] = React.useState(
        () => {
            const persistedState = localStorage.getItem('authState');
            return persistedState ? {user: JSON.parse(persistedState).token,
                 isLoggedIn: JSON.parse(persistedState).isLoggedIn,
                role: JSON.parse(persistedState).role} 
            : initialState;
        }
    );

    // Login function
    const login = (user) => {
        setAuthState({ isLoggedIn: true, "user": user.token, "role": user.role });
        localStorage.setItem('authState', JSON.stringify({ isLoggedIn: true, "token": user.token, "role": user.role }));
    };

    // Logout function
    const logout = () => {
        setAuthState(initialState);
        localStorage.removeItem('authState');
    };
    // Return authentication state and functions
    return { isLoggedIn: authState.isLoggedIn, user: authState.user, role: authState.role, login, logout };
};
