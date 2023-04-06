import { useState, useEffect } from 'react';

type FetchState<T> = {
    data: T | null;
    error: Error | null;
    isLoading: boolean;
};

export default function useFetch<T>(
    url: string
): FetchState<T> & { reload: () => void } {
    const [state, setState] = useState<FetchState<T>>({
        data: null,
        error: null,
        isLoading: true,
    });

    const [key, setKey] = useState(0);

    const fetchData = async () => {
        try {
            const response = await fetch(url);
            const data = await response.json();
            setState({ data, error: null, isLoading: false });
        } catch (error) {
            setState({ data: null, error, isLoading: false });
        }
    };

    useEffect(() => {
        fetchData();
    }, [key]);

    const reload = () => {
        setState({ data: null, error: null, isLoading: true });
        setKey((prevKey) => prevKey + 1);
    };

    return { ...state, reload };
}
