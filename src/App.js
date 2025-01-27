import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ModelSplitAnimation from './ModelSplitAnimation';
import ShardingAnimation from './ShardingAnimation';
import GatherUpdate from './GatherUpdate';


const App = () => {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path="/model-split" element={<ModelSplitAnimation />} />
        <Route path="/sharding" element={<ShardingAnimation />} />
        <Route path="/gather-update" element={<GatherUpdate />} />
      </Routes>
    </Router>
  );
};

export default App;