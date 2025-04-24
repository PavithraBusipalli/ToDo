import { createContext } from 'react';

interface User {
    id: string;
    name: string;
    email: string;
}

interface UserContextType {
    user: User | null;
    login: (userData: User) => void;
    logout: () => void;
}

export const userContext = createContext<UserContextType | null>(null);