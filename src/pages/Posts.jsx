import { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import PostList from '../components/PostList';
import styles from './Posts.module.css';
import PostForm from '../components/PostForm';
import PostFilter from '../components/PostFilter';
import MyModal from '../components/UI/MyModal/MyModal';
import MyButton from '../components/UI/button/MyButton';
import { usePosts } from '../hooks/usePosts';
import PostService from '../API/PostService';
import Loader from '../components/UI/loader/loader';
import { useFetching } from '../hooks/useFetching';
import { getPageCount } from '../utils/pages';
import Pagination from '../components/UI/pagination/Pagination';
import { useObserver } from '../hooks/useObserver';
import MySelect from '../components/UI/select/MySelect';

function Posts() {
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState({ sort: '', query: '' });
  const [visible, setVisible] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const sortedAndSearchPosts = usePosts(posts, filter.sort, filter.query);
  const lastElement = useRef();

  const [fetchPosts, isPostLoading, postError] = useFetching(async () => {
    const response = await PostService.getAll(limit, page);
    setPosts((prev) => [...prev, ...response.data]);

    const totalCount = response.headers['x-total-count'];
    setTotalPages(getPageCount(totalCount, limit));
  });

  useObserver(lastElement, page < totalPages, isPostLoading, () => {
    setPage(page + 1);
  });

  useEffect(() => {
    fetchPosts(limit, page);
  }, [page, limit]);

  const createPost = (newPost) => {
    setPosts((prev) => [...prev, newPost]);
    setVisible(false);
  };

  const removePost = (post) => {
    setPosts((prev) => prev.filter((p) => p.id !== post.id));
  };

  const changePage = (page) => {
    setPage(page);
  };

  const openModal = useCallback(() => setVisible(true), []);
  const createPostCb = useCallback((newPost) => {
    setPosts((prev) => [...prev, newPost]);
    setVisible(false);
  }, []);

  const removePostCb = useCallback((post) => {
    setPosts((prev) => prev.filter((p) => p.id !== post.id));
  }, []);

  const changePageCb = useCallback((p) => setPage(p), []);

  const onLimitChange = useCallback((value) => setLimit(value), []);

  const limitOptions = useMemo(
    () => [
      { value: 5, name: '5' },
      { value: 10, name: '10' },
      { value: 25, name: '25' },
      { value: -1, name: 'All posts' },
    ],
    []
  );

  return (
    <div className="App">
      <div className={styles.topButton}>
        <MyButton onClick={openModal}>Create user</MyButton>
      </div>
      <MyModal visible={visible} setVisible={setVisible}>
        <PostForm create={createPostCb} />
      </MyModal>
      <PostFilter filter={filter} setFilter={setFilter} />
      {postError && <h1>Error ${postError}</h1>}
      <MySelect value={limit} onChange={onLimitChange} defaultValue="Posts quantity" options={limitOptions} />
      <PostList remove={removePostCb} posts={sortedAndSearchPosts} title="javascript posts" />
      <div ref={lastElement} className={styles.lastElement} />
      {isPostLoading && (
        <div className={styles.loaderWrap}>
          <Loader />
        </div>
      )}
      <Pagination totalPages={totalPages} page={page} changePage={changePageCb} />
    </div>
  );
}

export default Posts;
