import { useState } from 'react';
import css from './Searchbar.module.css';

export function Searchbar({ onSubmit }) {
  const [search, setSearch] = useState('');
  const [prevSearch, setPrevSearch] = useState('');

  const handleChange = e => {
    setSearch(e.currentTarget.value);
  };

  const onHandleSubmit = e => {
    e.preventDefault();
    if (prevSearch === search) {
      window.alert(`Try new search query`);
      return;
    }
    onSubmit(search);
    setPrevSearch(search);
    reset();
  };

  const reset = () => {
    setSearch('');
  };
  return (
    <header className={css.searchbar}>
      <form onSubmit={onHandleSubmit} className={css.searchform}>
        <button type="submit" className={css.searchformbutton}>
          <span className={css.searchformbuttonlabel}>Search</span>
        </button>

        <input
          className={css.searchforminput}
          value={search}
          onChange={handleChange}
          type="text"
          name="search"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
}
