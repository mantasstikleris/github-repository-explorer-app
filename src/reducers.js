const reducer = (state, action) => {
    switch(action.type) {
        case 'SET_SEARCH_QUERY':
            return {
                ...state,
                search: {
                    ...state.search,
                    query: action.query
                }
            };
        case 'SET_REPOSITORIES':
            return {
                ...state,
                list: {
                    ...state.list,
                    loaded: action.repositories,
                    loading: false
                }
            };
        case 'SET_REPOSITORY':
            return {
                ...state,
                list: {
                    ...state.list,
                    clicked: state.list.loaded.find(repository => repository.id === action.id)
                }
            };
        case 'SET_LIST_LOADING':
            return {
                ...state,
                list: {
                    ...state.list,
                    loading: true,
                    error: false
                }
            };
        case 'SET_LIST_ERROR':
            return {
                ...state,
                list: {
                    ...state.list,
                    loading: false,
                    error: action.error
                }
            };
        default:
            return state
    }
};

export default reducer;
