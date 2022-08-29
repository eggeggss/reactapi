import React from 'react';
import { createContext, useContext } from 'react';

export const AppContext = createContext({
    isloading: false
});

export const useApp =()=>{
    return useContext(AppContext);
}