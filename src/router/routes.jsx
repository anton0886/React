import { Navigate } from 'react-router-dom';
import React from 'react';

const About = React.lazy(() => import('../pages/About'));
const Login = React.lazy(() => import('../pages/Login'));
const PostIdPage = React.lazy(() => import('../pages/PostIdPage'));
const Posts = React.lazy(() => import('../pages/Posts'));

export const privateRoutes = [
  { path: '/about', component: About },
  { path: '/posts', component: Posts },
  { path: '/posts/:id', component: PostIdPage },
  { path: '*', element: <Navigate to="/posts" replace /> },
];

export const publicRoutes = [
  { path: '/login', component: Login },
  { path: '*', element: <Navigate to="/login" replace /> },
];
