import React from 'react';
import Example from './container';
import { DndProvider } from 'react-dnd';
import Backend from 'react-dnd-html5-backend';

function App() {
  return (
    <div className='App'>
      <DndProvider backend={Backend}>
        <Example />
      </DndProvider>
    </div>
  );
}

export default App;
