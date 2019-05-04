const reducer = (state, action) => {
    switch(action.type) {
        case 'SET_SEARCH_QUERY':
            return {
                ...state,
                searchQuery: action.searchQuery
            };
        default:
            return state
    }
};

export default reducer;
