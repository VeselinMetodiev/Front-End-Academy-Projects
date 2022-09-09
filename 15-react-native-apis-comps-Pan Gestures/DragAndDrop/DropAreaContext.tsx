import React from 'react';

export const DragAndDropConfig = {
        pageX: 100,
        pageY: 100,
        width: 100,
        height: 100,
}

export const DropAreaContext = React.createContext(DragAndDropConfig);
DropAreaContext.displayName = 'DragAndDropContext';