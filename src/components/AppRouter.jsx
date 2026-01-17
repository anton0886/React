import { useContext, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { AuthContext } from '../context';
import { privateRoutes, publicRoutes } from '../router/routes.jsx';
import Loader from './UI/loader/loader';

const AppRouter = () => {
  const { isAuth, isLoading } = useContext(AuthContext);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        {isAuth
          ? privateRoutes.map((route) => {
              if (route.component) {
                const Component = route.component;
                return <Route path={route.path} element={<Component />} key={route.path} />;
              }
              return <Route path={route.path} element={route.element} key={route.path} />;
            })
          : publicRoutes.map((route) => {
              if (route.component) {
                const Component = route.component;
                return <Route path={route.path} element={<Component />} key={route.path} />;
              }
              return <Route path={route.path} element={route.element} key={route.path} />;
            })}
      </Routes>
    </Suspense>
  );
};

export default AppRouter;
