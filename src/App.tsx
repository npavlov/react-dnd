import React from 'react';
import Example from './container';
import { DndProvider } from 'react-dnd';
import Backend from 'react-dnd-html5-backend';
import './App.css';
import { ICard } from './models';

const list1: ICard[] = [
  {
    id: 1,
    text: 'Write a cool JS library'
  },
  {
    id: 2,
    text: 'Make it generic enough'
  },
  {
    id: 3,
    text: 'Write README'
  },
  {
    id: 4,
    text: 'Create some examples'
  },
  {
    id: 5,
    text: 'Spam in Twitter and IRC to promote it'
  },
  {
    id: 6,
    text: '???'
  },
  {
    id: 7,
    text: 'PROFIT'
  }
];

const list2: ICard[] = [
  {
    id: 8,
    text: 'eight'
  },
  {
    id: 9,
    text: 'nine'
  },
  {
    id: 10,
    text: 'ten'
  },
  {
    id: 11,
    text: 'eleven'
  },
  {
    id: 12,
    text: 'twelve'
  },
  {
    id: 13,
    text: 'thirteen'
  },
  {
    id: 14,
    text: 'fourteen'
  }
];

function App() {
  return (
    <div className='App'>
      <DndProvider backend={Backend}>
        <div className='grid'>
          <Example Items={list1} /> <Example Items={list2} />
        </div>
      </DndProvider>
    </div>
  );
}

export default App;
