import DragAndDropContext from './DragAndDropContext';
import { useState } from 'react';

export default function DragAndDropProvider({ children }) {
  const [dragStatus, setDragStatus] = useState({
    selectedContext: null,
    startIndex: null,
    startLocation: null,
    overIndex: -1,
    overLocation: null
  });
  return (
    <DragAndDropContext.Provider value={{ dragStatus, setDragStatus }}>
      {children}
    </DragAndDropContext.Provider>
  );
}
