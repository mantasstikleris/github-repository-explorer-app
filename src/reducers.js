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
            const clicked = state.list.loaded.find(repository => repository.id === action.id);

            return {
                ...state,
                list: {
                    ...state.list,
                    clicked
                },
                button: {
                    starred: clicked.starred
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
        case 'SET_BUTTON_SUCCESS':
            return {
                ...state,
                button: {
                    ...state.button,
                    starred: !state.button.starred,
                    loading: false
                }
            };
        case 'SET_BUTTON_LOADING':
            return {
                ...state,
                button: {
                    ...state.button,
                    loading: true,
                    error: false
                }
            };
        case 'SET_BUTTON_ERROR':
            return {
                ...state,
                button: {
                    ...state.button,
                    loading: false,
                    error: action.error
                }
            };
        default:
            return state
    }
};

export default reducer;
