// React default import not required with automatic JSX runtime
import { forwardRef, memo } from 'react';
import { useNavigate } from 'react-router-dom';
import MyButton from './UI/button/MyButton';

const PostItemInner = forwardRef((props, ref) => {
  const navigate = useNavigate();
  const { post, remove } = props;

  return (
    <div ref={ref} className="post">
      <div className="post__content">
        <strong>
          {post.id}. {post.title}
        </strong>
        <div>{post.body}</div>
      </div>
      <div className="post__btns">
        <MyButton onClick={() => navigate(`${post.id}`)}>Open</MyButton>
        <MyButton onClick={() => remove(post)}>Delete</MyButton>
      </div>
    </div>
  );
});

const PostItem = memo(PostItemInner);

export default PostItem;
