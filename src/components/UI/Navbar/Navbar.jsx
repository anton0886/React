import { useContext, useCallback } from 'react';
import { Link } from 'react-router-dom';
import MyButton from '../button/MyButton';
import { AuthContext } from '../../../context/index';

const Navbar = () => {
  const { isAuth, setIsAuth } = useContext(AuthContext);

  const logout = useCallback(() => {
    setIsAuth(false);
    localStorage.removeItem('auth');
  }, [setIsAuth]);

  return (
    <div className="navbar">
      <MyButton onClick={logout}>Log out</MyButton>
      <div className="navbar__links">
        <Link to="/about">About</Link>
        <Link to="/posts">Posts</Link>
      </div>
    </div>
  );
};

export default Navbar;
