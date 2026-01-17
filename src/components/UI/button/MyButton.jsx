// React default import not required with automatic JSX runtime
import { memo } from 'react';
import classes from './MyButton.module.css';

const MyButton = ({ children, ...props }) => {
  return (
    <button {...props} className={classes.myBtn}>
      {children}
    </button>
  );
};

export default memo(MyButton);
