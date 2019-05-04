import {GIT_AUTHORIZATION_HEADER, ITEMS_PER_PAGE} from "./common/constants";
import {matchGithubResponseLinks, getParamFromUrl} from './common/utils';

const starredUrl = (repoName) => `https://api.github.com/user/starred/${repoName}`;

const fetchIsRepositoryStarred = (repoName) => (
    fetch(starredUrl(repoName), GIT_AUTHORIZATION_HEADER)
        .then(response => response.status === 204)
        .catch(() => null)
);

const fetchContributorsCount = (contributorsUrl) => (
    fetch(`${contributorsUrl}?per_page=1&anon=1`, GIT_AUTHORIZATION_HEADER)
        .then(response => {
            const link = response.headers.get('link');

            if (!link) {
                return 1;
            }

            return getParamFromUrl('page', matchGithubResponseLinks(link).pop());
        })
        .catch(() => null)
);

export const fetchRepositories = (query) => {
    return fetch(`https://api.github.com/search/repositories?q=${query}&per_page=${ITEMS_PER_PAGE}`, GIT_AUTHORIZATION_HEADER)
        .then(response => response.json())
        .then(async data => (
            await Promise.all(
                data.items.map(async ({id, full_name, description, stargazers_count, forks, open_issues, license, url, language, contributors_url}) => {

                    const starred = await fetchIsRepositoryStarred(full_name);
                    const contributors = await fetchContributorsCount(contributors_url);

                    return {
                        id,
                        description,
                        language,
                        starred,
                        apiUrl: url,
                        name: full_name,
                        forks: forks,
                        stars: stargazers_count,
                        issues: open_issues,
                        license: license && license.spdx_id,
                        contributors: contributors && parseInt(contributors, 10)
                    }
                })
            )
        ))
};
