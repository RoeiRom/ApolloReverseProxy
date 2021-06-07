import React, { useState } from 'react';
// import { useSubscription, useQuery } from '@apollo/client';

import User from './User';
import useApp from './useApp';
// import { ALL_USERS } from './DAL/queries';
// import { NEW_USER } from './DAL/subscriptions';

const App: React.FC = () => {

  const [users, setUsers] = useState<User[]>([]);

  useApp({
    users, 
    setUsers
  })

  return (
    <div>
      {
        users.map(user => (
          <div>
            Id: {user.id} Name: {user.name}
          </div>
        ))
      }
    </div>
  )
}

export default App;
