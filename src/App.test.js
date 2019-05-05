import React from 'react';
import {shallow, mount} from 'enzyme';
import App, {Context} from './App';
import {BrowserRouter as Router} from 'react-router-dom';
import RepositoryList from './components/repository-list/RepositoryList';
import Error from './components/error/Error';
import Loader from './components/loader/Loader';
import * as api from './api';
import {DEBOUNCE_DELAY} from './common/constants';

const defaultState = {
  search: {
    query: ''
  },
  list: {
    loaded: [],
    clicked: null,
    loading: false,
    error: null
  },
  button: {
    starred: null,
    loading: false,
    error: null
  },
  chart: {
    data: null,
    loading: false,
    error: null,
    effectiveHours: null
  }
};

jest.useFakeTimers();

describe('<App/>', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<App/>);
    expect(wrapper.length).toEqual(1);
  });
});

describe('<RepositoryList/>', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('shows error when request fails', () => {
    const state = {
      ...defaultState,
      list: {
        ...defaultState.list,
        error: 'error'
      }
    };

    const dispatch = () => {};

    const wrapper = mount(
      <Context.Provider value={{state, dispatch}}>
        <RepositoryList/>
      </Context.Provider>
    );

    expect(wrapper.find(Error)).toHaveLength(1);
  });

  it('shows loader when request loads', () => {
    const state = {
      ...defaultState,
      list: {
        ...defaultState.list,
        loading: true
      }
    };

    const dispatch = () => {};

    const wrapper = mount(
      <Context.Provider value={{state, dispatch}}>
        <RepositoryList/>
      </Context.Provider>
    );

    expect(wrapper.find(Loader)).toHaveLength(1);
  });

  it('shows exact number of list items loaded', () => {
    const state = {
      ...defaultState,
      list: {
        ...defaultState.list,
        loaded: [{id: 1}, {id: 2}]
      }
    };

    const dispatch = () => {};

    const wrapper = mount(
      <Router>
        <Context.Provider value={{state, dispatch}}>
          <RepositoryList/>
        </Context.Provider>
      </Router>
    );

    expect(wrapper.find('.RepositoryContainer')).toHaveLength(state.list.loaded.length);
  });

  it('fetches on search query', async () => {
    const state = {
      ...defaultState,
      search: {
        query: 'react'
      }
    };

    const dispatch = jest.fn(() => {});

    const mockSuccessResponse = [{}, {}];

    const spy = jest.spyOn(api, 'fetchRepositories').mockImplementation(() => Promise.resolve(mockSuccessResponse));

    const wrapper = mount(
        <Context.Provider value={{state, dispatch}}>
          <RepositoryList/>
        </Context.Provider>
    );

    expect(await spy).toHaveBeenCalledTimes(1);
    expect(await spy).toHaveBeenCalledWith('react');

    expect(dispatch).toHaveBeenCalledTimes(2);
    expect(dispatch).toHaveBeenNthCalledWith(1, {type: 'SET_LIST_LOADING'});
    expect(dispatch).toHaveBeenNthCalledWith(2, {type: 'SET_REPOSITORIES', repositories: mockSuccessResponse});
  });

  // TODO: State update was not wrapper in act(...), find out a solution
  it('debounces search input', () => {
    const query = 'react';

    const mockSuccessResponse = [{id: 1}, {id: 2}];
    const spy = jest.spyOn(api, 'fetchRepositories').mockImplementation(() => Promise.resolve(mockSuccessResponse));

    const wrapper = mount(
        <App/>
    );

    wrapper.find('input').simulate('change', {target: {value: query}});
    wrapper.find('input').simulate('change', {target: {value: query}});

    jest.advanceTimersByTime(DEBOUNCE_DELAY * 2);

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(query);
  })
});
