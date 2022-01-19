import { useState } from 'react';
import PropTypes from 'prop-types';
import { FcSearch } from 'react-icons/fc';
import styles from './Searchbar.module.css';

export default function Searchbar({ onSubmit }) {
  const [imgName, setImgName] = useState('');
  const [page, setPage] = useState(1);

  const handleNameChange = e => {
    setImgName(e.currentTarget.value);
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (imgName.trim() === '') {
      alert('Please enter image name');
      return;
    }

    onSubmit(imgName);
    setImgName('');
    setPage(1);
  };

  return (
    <header className={styles.searchbar}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <button type="submit" className={styles.button}>
          <span className={styles.buttonLabel}>
            <FcSearch />
          </span>
        </button>

        <input
          className={styles.input}
          type="text"
          // autocomplete="off"
          // autofocus
          placeholder="Search images and photos"
          name="imgName"
          value={imgName}
          onChange={handleNameChange}
        />
      </form>
    </header>
  );
}

Searchbar.propTypes = {
  handleSubmit: PropTypes.func,
  handleNameChange: PropTypes.func,
  value: PropTypes.string,
};
