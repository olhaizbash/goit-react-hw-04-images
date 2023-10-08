import { useState, useEffect } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import css from './App.module.css';
import { SearchImages } from './servises/search-api';

export function App() {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [response, setResponse] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hits, setHits] = useState('');

  useEffect(() => {
    if (!search) {
      return;
    }
    async function getSearchData() {
      try {
        setLoading(true);
        const resp = await SearchImages(search, page);
        if (resp.length === 0) {
          window.alert(
            `There are no images matching your search query. Please try again.`
          );
          return;
        }
        const data = resp.map(({ id, webformatURL, largeImageURL }) => {
          return { id, webformatURL, largeImageURL };
        });
        console.log(data);
        setResponse(prevState => [...prevState, ...data]);
        setHits(resp.length);
      } catch (error) {
        window.alert(`Something went wrong :( Please try again.`);
      } finally {
        setLoading(false);
      }
    }
    getSearchData();
  }, [search, page]);

  const formSubmitHandler = data => {
    setSearch(data);
    setPage(1);
    setResponse([]);
    setLoading(false);
    setHits('');
  };

  const onNextPage = () => {
    setPage(prevState => prevState + 1);
  };

  return (
    <div className={css.app}>
      <Searchbar onSubmit={formSubmitHandler} />
      <ImageGallery data={response} />
      {response.length > 0 && hits >= 12 && <Button onNextPage={onNextPage} />}
      {loading && <Loader />}
    </div>
  );
}
