import { forwardRef, memo } from 'react';
import classes from './MyInput.module.css';

const MyInputInner = forwardRef((props, ref) => {
  return <input className={classes.myInput} ref={ref} {...props} />;
});

const MyInput = memo(MyInputInner);

export default MyInput;
