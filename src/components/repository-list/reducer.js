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
                repositories: action.repositories
            };
        default:
            return state
    }
};

export default reducer;
