// React default import not required with automatic JSX runtime
import { memo } from 'react';
import cl from './loader.module.css';

const Loader = () => {
  return <div className={cl.loader}></div>;
};

export default memo(Loader);
