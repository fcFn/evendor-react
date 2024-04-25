// App.js
import React from 'react';
import EventFilter from './components/Filter';
import VendorList from './components/VendorList';

function App() {
  return (
    <div>
      <h1>EVENDOR</h1>
      <EventFilter />
      <VendorList />

    </div>
  );
}

export default App;
