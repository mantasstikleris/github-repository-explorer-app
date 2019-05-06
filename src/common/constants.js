export const DEBOUNCE_DELAY = 500;
export const ITEMS_PER_PAGE = 5;

const GIT_AUTHORIZATION_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

export const GIT_AUTHORIZATION_HEADER = {
    headers: {
        Authorization: GIT_AUTHORIZATION_TOKEN ? `token ${ GIT_AUTHORIZATION_TOKEN }` : ''
    }
};

export const CHART_OPTIONS = {
    tooltips: {
        displayColors: false,
        callbacks: {
            title: (tooltip) => `week #${tooltip[0].label}`
        }
    },
    legend: {
        display: false
    }
};
