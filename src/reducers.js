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
        case 'SET_CHART_DATA':
            return {
                ...state,
                chart: {
                    ...state.chart,
                    data: action.data,
                    effectiveHours: Math.round(action.data.datasets[0].data.reduce((acc, cur) => acc + cur, 0)) || 0,
                    loading: false
                }
            };
        case 'SET_CHART_LOADING':
            return {
                ...state,
                chart: {
                    ...state.chart,
                    loading: true,
                    error: false
                }
            };
        case 'SET_CHART_ERROR':
            return {
                ...state,
                chart: {
                    ...state.chart,
                    loading: false,
                    error: action.error
                }
            };
        case 'CLEAR_CHART_DATA':
            return {
              ...state,
              chart: {
                  ...state.chart,
                  data: null
              }
            };
        default:
            return state
    }
};

export default reducer;
