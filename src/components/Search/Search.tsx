import styles from "./Search.module.scss";

import { FiSearch } from "react-icons/fi";

interface ISearchProps {
  search: string;
  setSearch: (search: string) => void;
}

const Search = ({ search, setSearch }: ISearchProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.icon}>
        <FiSearch />
      </div>
      <input
        type="text"
        placeholder="Search contacts"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
};

export default Search;
