import { ApolloClient, from, InMemoryCache } from '@apollo/client';
import {MockedResponse} from '@apollo/client/testing';
import {act} from 'react-dom/test-utils';
import {ALL_USERS} from './DAL/queries';
import useApp, { UseAppOutcome } from './useApp';
import User from './User';
import TestHookComponent from './Utils/testingUtils';

const firstUser : User = {
    id: 1,
    name: 'roy'
}

const secondUser : User = {
    id: 2,
    name: 'sandy'
}

const dbMocksFull : MockedResponse[] = [
    {
        request: {
            query: ALL_USERS
        },
        result: {
            data: {
                allUsers: {
                    nodes: [firstUser, secondUser]
                }
            }
        }
    }
]

const dbMocksPartial : MockedResponse[] = [
    {
        request: {
            query: ALL_USERS
        },
        result: {
            data: {
                allUsers: {
                    nodes: [firstUser]
                }
            }
        }
    }
]

let useAppOutcome: UseAppOutcome;

describe('useApp tests', () => {
    test('query test', async() => {
        let users : User[] = [];
        const setUsers = (newUsers : User[]) => {
            users = newUsers;
        }
        new TestHookComponent(() => {
            useAppOutcome = useApp({
                users,
                // @ts-ignore
                setUsers
            });
        })
            .build()
            .dbMocks(dbMocksFull)
            .mount();

        await act(async() => {
            await new Promise(res => setTimeout(res, 0));
        });

        expect(users).toStrictEqual([firstUser, secondUser]);
    });

    it('subscription test', async() => {
        let users : User[] = [];
        const setUsers = (newUsers : User[]) => {
            users = newUsers;
        }
        new TestHookComponent(() => {
            useAppOutcome = useApp({
                users,
                // @ts-ignore
                setUsers
            });
        }).build().dbMocks(dbMocksPartial).mount();

        await act(async() => {
            await new Promise(res => setTimeout(res, 0));
            useAppOutcome.onSubscriptionData({
                client: new ApolloClient({
                    link: from([]),
                    cache: new InMemoryCache()
                }),
                subscriptionData: {
                    loading: false,
                    data: {
                        listen: {
                            relatedNode: secondUser
                        }
                    }
                }
            })
        });

        expect(users).toStrictEqual([firstUser, secondUser])
    })
})