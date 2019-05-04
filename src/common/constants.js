export const DEBOUNCE_DELAY = 500;
export const ITEMS_PER_PAGE = 5;

export const GIT_AUTHORIZATION_HEADER = {
    headers: {
        Authorization: `token ${ process.env.REACT_APP_GITHUB_TOKEN }`
    }
};
