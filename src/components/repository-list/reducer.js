const reducer = (state, action) => {
    switch(action.type) {
        case 'SET_SEARCH_QUERY':
            return {
                ...state,
                searchQuery: action.searchQuery
            };
        case 'SET_REPOSITORIES':
            return {
                ...state,
                repositories: action.repositories,
                loading: false
            };
        case 'SET_LOADING':
            return {
                ...state,
                loading: true,
                error: false
            };
        case 'SET_ERROR':
            return {
                ...state,
                loading: false,
                error: action.error
            };
        default:
            return state
    }
};

export default reducer;
