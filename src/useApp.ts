import React from 'react';
import { OnSubscriptionDataOptions, useQuery, useSubscription } from '@apollo/client';

import User from './User';
import { ALL_USERS } from './DAL/queries';
import { NEW_USER } from './DAL/subscriptions';

interface UseAppIncome {
    users: User[];
    setUsers: React.Dispatch<React.SetStateAction<User[]>>;
}

export interface UseAppOutcome {
    onSubscriptionData: (options: OnSubscriptionDataOptions) => void;
}

const useApp = ({ users, setUsers }: UseAppIncome): UseAppOutcome => {
    useQuery(ALL_USERS, {
        fetchPolicy: 'cache-and-network',
        onCompleted: (data) => setUsers(data.allUsers.nodes)
    });
    
    const onSubscriptionData = (options: OnSubscriptionDataOptions) => {
        if (options.subscriptionData.data?.listen?.relatedNode) {
            setUsers([...users, options.subscriptionData.data.listen.relatedNode])
        }
    }

    useSubscription(NEW_USER, {
        onSubscriptionData
    });

    return {
        onSubscriptionData
    }
};

export default useApp;