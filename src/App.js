import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';  // Changed this line
import ModelSplitAnimation from './ModelSplitAnimation';
import ShardingAnimation from './ShardingAnimation';
import GatherUpdate from './GatherUpdate';

const App = () => {
  return (
    <Router>  {/* Removed basename since HashRouter handles it differently */}
      <Routes>
        <Route path="/model-split" element={<ModelSplitAnimation />} />
        <Route path="/sharding" element={<ShardingAnimation />} />
        <Route path="/gather-update" element={<GatherUpdate />} />
      </Routes>
    </Router>
  );
};

export default App;