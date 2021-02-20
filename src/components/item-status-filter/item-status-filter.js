import React from "react";

import "./item-status-filter.css";
const filterbuttons = [
  { name: "all", label: "All" },
  { name: "active", label: "Active" },
  { name: "done", label: "Done" },
];

const ItemStatusFilter = ({filter,onFilterItems}) => {
  const buttons = filterbuttons.map((btn) => {
    const isActive = btn.name === filter
    const classNames = 'btn ' + (isActive ? 'btn-info' : 'btn-outline-secondary');
    return (
      <button type="button" className={classNames} onClick={() => onFilterItems(btn.name)}>
        {btn.label}
      </button>
    );
  });
  return (
    <div className="btn-group">
     {buttons}
    </div>
  );
};
export default ItemStatusFilter;
