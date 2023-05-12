import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUser } from './store/usersSlice';

import './App.css';

function App() {
  const { users, isLoading } = useSelector((state) => state.users);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser());
  }, []);

  if (isLoading) {
    <h2>loading...</h2>;
  }

  if (!users) {
    <p>No date found</p>;
  }

  return (
    <ul className='App'>
      {users.map((user) => (
        <li key={user.id}>{user.gender}</li>
      ))}
    </ul>
  );
}

export default App;
