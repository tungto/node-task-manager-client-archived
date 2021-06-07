import React, { useState } from 'react';
import { useTaskContext } from '../../context/task_context';
import styled from 'styled-components';

const SearchBar = () => {
  const { filters, updateFilters } = useTaskContext();

  return (
    <Wrapper>
      <div className='search-bar-container'>
        <input
          name='text'
          type='text'
          className='search-bar'
          placeholder='Search'
          value={filters.text}
          onChange={updateFilters}
        />
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin-top: 3rem;
  margin-bottom: 1rem;
  .search-bar {
    padding: 10px;
    width: 80%;
    border-radius: var(--radius);
    font-size: 1rem;
  }
`;

export default SearchBar;
