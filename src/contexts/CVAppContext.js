import { createContext, useContext } from 'react';

const CVAppContext = createContext();

export const useCVAppContext = () => useContext(CVAppContext);
export default CVAppContext;
