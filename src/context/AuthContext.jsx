import { createContext } from 'react';

// This file now ONLY exports the context, keeping Vite's Fast Refresh happy
export const AuthContext = createContext(null);