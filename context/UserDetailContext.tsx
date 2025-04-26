import { createContext } from 'react';
import { UserContextType } from '@/types/user';

export const UserDetailContext = createContext<UserContextType>({
    user: null,
    setUser: () => {},
}); 