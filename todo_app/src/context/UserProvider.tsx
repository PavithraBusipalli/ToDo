import React, { useState, ReactNode } from 'react';
import { userContext } from './userContext';

interface User {
    id: string,
    name: string,
    email: string
}

interface UserProviderProps {
    children: ReactNode
}

export const UserProvider: React.FC<UserProviderProps> = ({children}) => {
    const [user, setUser] = useState<User | null>(() => {
        const storedUser = localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : null;
    });
    const login = (userData: User) => {
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData)); // Persist user data
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user'); // Clear user data
    };
    
    return (
        <userContext.Provider value={{user, login, logout}}>
            {children}
        </userContext.Provider>
    )
}