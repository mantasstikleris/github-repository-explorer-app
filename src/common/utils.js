import { useState, useEffect } from 'react';

export const useDebounce = (value, delay) => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(
        () => {
            const handler = setTimeout(() => {
                setDebouncedValue(value);
            }, delay);

            return () => {
                clearTimeout(handler);
            };
        },
        [value, delay]
    );

    return debouncedValue;
};

export const matchGithubResponseLinks = (link) => link.match(/\bhttps?:\/\/[^>]+/gi);
export const getParamFromUrl = (param, url) => new URL(url).searchParams.get(param);
export const starredUrl = (repoName) => `https://api.github.com/user/starred/${repoName}`;
export const createNumberSequenceArray = (length, startNumber) => Array.from({length}, (_, index) => index + startNumber);
