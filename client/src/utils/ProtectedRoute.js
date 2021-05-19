// react
import React, { useEffect, useState } from 'react';
import { Route, Redirect } from 'react-router-dom';

// utils
import { api } from '../utils/api';

export default function ProtectedRoute({ component: Component, ...rest }) {
  const [isAuth, setIsAuth] = useState(undefined);

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      async function fetchData() {
        validate().then((data) => {
          if (isMounted) setIsAuth(data);
        });
      }
      fetchData();
    }
    return () => {
      isMounted = false;
    };
  }, []);

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
