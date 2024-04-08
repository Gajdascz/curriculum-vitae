import { createContext, useContext } from 'react';

const DragAndDropContext = createContext();

export const useDragAndDropContext = () => useContext(DragAndDropContext);
export default DragAndDropContext;
