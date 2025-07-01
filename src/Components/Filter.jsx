import React from 'react';

const Filter = ({ themes, years, onFilterChange }) => {
  return (
    <div>
      <h3>Filter Sets</h3>
      <div>
        <label htmlFor="theme">Theme:</label>
        <select id="theme" onChange={(e) => onFilterChange('theme', e.target.value)}>
          <option value="">All Themes</option>
          {themes.map((theme) => (
            <option key={theme.id} value={theme.name}>
              {theme.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="year">Year:</label>
        <select id="year" onChange={(e) => onFilterChange('year', e.target.value)}>
          <option value="">All Years</option>
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Filter;
