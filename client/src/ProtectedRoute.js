import React, { useEffect, useState } from 'react';
import { Route, Redirect } from 'react-router-dom';
import axios from 'axios';

const api = axios.create({
  baseURL: `http://localhost:3000/api/`,
});

export default function ProtectedRoute({ component: Component, ...rest }) {
  const [isAuth, setIsAuth] = useState(undefined);

  useEffect(async () => {
    setIsAuth(await validate());
  });

  const validate = async () => {
    return api
      .get('/validate', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((_res) => {
        return true;
      })
      .catch((_err) => {
        return false;
      });
  };

  return (
    <Route
      {...rest}
      render={(props) => {
        if (isAuth === undefined) {
          return <div>LOADING...</div>;
        } else if (isAuth) {
          return <Component />;
        } else if (!isAuth) {
          return (
            <Redirect to={{ pathname: '/', state: { from: props.location } }} />
          );
        }
      }}
    />
  );
}
