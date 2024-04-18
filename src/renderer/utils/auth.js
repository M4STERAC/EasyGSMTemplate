import { redirect } from 'react-router-dom';
import { FirebaseAuth } from './firebase';

export const getAuthToken = () => {
  return localStorage.getItem('authToken');
};

export const getNameAndPic = () => {
  const name = localStorage.getItem('name');
  const photoURL = localStorage.getItem('photoURL');
  return { name, pic: photoURL };
};

export const setAuthUser = async ({ accessToken, email, photoURL, displayName, uid }) => {
  if (accessToken) localStorage.setItem('authToken', accessToken);
  if (email) localStorage.setItem('email', email);
  if (photoURL) localStorage.setItem('photoURL', photoURL);
  if (displayName) localStorage.setItem('name', displayName);
  if (uid) localStorage.setItem('uid', uid);
};

//This is dummy code for when I add my own backend infrastructure
export const sendRequest = async (url, method, eventData) => {
  const authToken = getAuthToken();
  const response = await fetch(url, {
    method: method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`
    },
    body: JSON.stringify(eventData)
  });

  if (response.status === 422) return response;
  if (!response.okay) throw json({ message: 'Could not save event.' }, { status: 500 });
};

export const logout = () => {
  FirebaseAuth.logoutUser().then(() => {
    localStorage.clear();
  });
  return redirect('/');
};

export const authTokenLoader = () => {
  const authToken = getAuthToken();
  if (!authToken) {
    logout();
    return;
  }
  return authToken;
};

export const checkAuthTokenLoader = () => {
  const authToken = getAuthToken();
  if (!authToken) return redirect('/');
  return null;
};
