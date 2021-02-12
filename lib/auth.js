import React, { createContext, useContext, useEffect, useState } from 'react';
import firebase from './firebase';

function useProvideAuth() {
  const [user, setUser] = useState(null);
  const signWithGithub = () => {
    return firebase
      .auth()
      .signInWithPopup(new firebase.auth.GithubAuthProvider())
      .then((response) => setUser(response.user));
  };
  const signout = () => {
    return firebase
      .auth()
      .signOut()
      .then(() => setUser(false));
  };
  useEffect(() => {
    const unsubscribe = firebase
      .auth()
      .onAuthStateChanged((user) => setUser(user ? user : false));
    return () => unsubscribe();
  });

  return {
    user,
    signWithGithub,
    signout
  };
}

const authContext = createContext();

export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
  return useContext(authContext);
};
