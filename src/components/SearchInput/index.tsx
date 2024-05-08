import React from 'react';
import './SearchInput.css';

interface IIinputProps extends React.ComponentPropsWithoutRef<'input'> {}

function SearchInput({ value, onChange }: IIinputProps) {
  return (
    <div>
      <label htmlFor='searchTerm'>Search:</label>
      <div className='search-input__base'>
        <input
          id='searchTerm'
          type='text'
          className='search-input__field'
          value={value}
          onChange={onChange}
          placeholder='Spider Man: No Way Home'
        />
      </div>
    </div>
  );
}

export default SearchInput;
