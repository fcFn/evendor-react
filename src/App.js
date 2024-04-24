// App.js
import React from 'react';
import EventFilter from './components/Filter';
import VendorList from './components/VendorList';
import InfiniteScroll from './components/Search';

function App() {
  return (
    <div>
      <h1>EVENDOR</h1>
      <EventFilter />
      <VendorList />
      <InfiniteScroll>
        
      </InfiniteScroll>
    </div>
  );
}

export default App;
