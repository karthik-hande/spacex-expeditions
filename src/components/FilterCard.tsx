import { observer } from "mobx-react-lite";
import React from "react";

import { IFilterOption } from "../models";

interface IProps {
  title: string;
  filterOptions: IFilterOption[];
  onFilterOption: (option: IFilterOption) => void;
}

const FilterCard: React.FC<IProps> = ({
  title,
  filterOptions,
  onFilterOption,
}) => {
  return (
    <div className="filter-card">
      <div className="filter-sub-header">
        <span className="text">{title}</span>
      </div>
      <div className="filters-container">
        {filterOptions.map((option) => {
          return (
            <div
              data-testid="option-item"
              className={"filter-item " + (option.selected ? "selected" : "")}
              key={option.value}
              onClick={() => onFilterOption(option)}
            >
              {option.name}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default observer(FilterCard);
