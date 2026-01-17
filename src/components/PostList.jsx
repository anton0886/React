// React default import not required with automatic JSX runtime
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { useRef, createRef, memo } from 'react';
import PostItem from './PostItem';
import styles from './PostList.module.css';

const PostList = ({ posts, title, remove }) => {
  const nodeRefs = useRef(new Map());

  return (
    <div>
      <h1 className={styles.title}>{title}</h1>
      <TransitionGroup>
        {posts.map((post, index) => {
          let ref = nodeRefs.current.get(post.id);
          if (!ref) {
            ref = createRef();
            nodeRefs.current.set(post.id, ref);
          }
          return (
            <CSSTransition key={post.id} timeout={500} classNames="post" nodeRef={ref}>
              <PostItem ref={ref} remove={remove} post={post} number={index + 1} />
            </CSSTransition>
          );
        })}
      </TransitionGroup>
    </div>
  );
};

export default memo(PostList);
