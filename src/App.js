import React from 'react';
import './index.scss';
import { Success } from './components/Success';
import { Users } from './components/Users';

// Тут список пользователей: https://reqres.in/api/users

function App() {
  const [users, setUsers] = React.useState([]);
  const [invites, setinvites] = React.useState([]);
  const [isLoading, setLoading] = React.useState(true);
  const [success, setsuccess] = React.useState(false);
  const [searchValue, setsearchValue] = React.useState('');

  React.useEffect(() => {
    fetch('https://reqres.in/api/users')
    .then(res => res.json())
    .then((json) => {
      setUsers(json.data);
    })
    .catch((err) => {
      console.warn(err);
      alert('Ошибка при получении пользователей');
    })
    .finally(() => setLoading(false));
  }, []);


  const onChangesearchValue = (event) => {
    setsearchValue(event.target.value);
  }

  const onClickInvite = (id) => {
    if (invites.includes(id)) {
      setinvites(prev => prev.filter(_id => _id !== id));
    } else {
      setinvites((prev)  => [...prev, id]);
    }
  }

  const onClickSendInvites = () => {
    setsuccess(true);
  }

  return (
    <div className="App">
      {success ? (
        <Success count={invites.length} />
      ) : (
        <Users
          onChangesearchValue={onChangesearchValue}
          searchValue={searchValue}
          items={users}
          isLoading={isLoading}
          invites={invites}
          onClickInvite={onClickInvite}
          onClickSendInvites ={onClickSendInvites}
        />
      )}
    </div>
  );
}

export default App;
