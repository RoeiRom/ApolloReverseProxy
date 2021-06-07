import React, { useState } from 'react';
import { useSubscription, useQuery } from '@apollo/client';

import User from './User';
import { ALL_USERS } from './DAL/queries';
import { NEW_USER } from './DAL/subscriptions';

const App: React.FC = () => {

  const [users, setUsers] = useState<User[]>([]);

  useQuery(ALL_USERS, {
    fetchPolicy: 'cache-and-network',
    onCompleted: (data) => setUsers(data.allUsers.nodes)
  });

  useSubscription(NEW_USER, {
    onSubscriptionData: (options) => {
      if (options.subscriptionData.data?.listen?.relatedNode) {
        setUsers([...users, options.subscriptionData.data.listen.relatedNode])
      }
    }
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
