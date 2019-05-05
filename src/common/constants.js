export const DEBOUNCE_DELAY = 500;
export const ITEMS_PER_PAGE = 5;

export const GIT_AUTHORIZATION_HEADER = {
    headers: {
        Authorization: `token ${ process.env.REACT_APP_GITHUB_TOKEN }`
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
