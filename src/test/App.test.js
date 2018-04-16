import configureMockStore from 'redux-mock-store';
import React from 'react';
import thunk from 'redux-thunk';
import App from '../App';
import * as actions  from '../redux-actions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const mockFn = jest.fn();

describe('App', () => {

  afterEach(() => {
    mockFn.mockReset();
    mockFn.mockRestore();
  });

  it('creates FETCH_PEOPLE_SUCCESS when fetching people has been done', () => {
   const expectedActions = [
      { type: actions.FETCH_PEOPLE_REQUEST }
     
    ];// body: { todos: ['do something'] } }

    const store = mockStore({ people: [] });
    
    return store.dispatch(actions.fetchPeople()).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions)
    })
  });
});
