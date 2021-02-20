import React from 'react';

import './search-panel.css';

const SearchPanel = ({onSearchLabel}) => {
  return (
    <input type="text"
              className="form-control search-input"
              placeholder="type to search" 
              onChange={(e) => onSearchLabel(e.target.value)}/>
  );
};

export default SearchPanel;
