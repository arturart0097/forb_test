import { useEffect, useRef } from "react";

import { Box, Button } from "@mui/material";

import { fetchJokes, fetchMoreJokes, selectRefreshingJokeIds } from "@/store/slice/jokesSlice";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import type { RootState } from "@/store/store";

import { JokeCard } from "@/components/JokeCard";
import { Loader } from "@/components/UI/Loader";

function MainPage() {
    const dispatch = useAppDispatch();
    const { jokes, status, error } = useAppSelector((state: RootState) => state.jokes);
    const refreshingJokeIds = useAppSelector(selectRefreshingJokeIds);
    const didFetch = useRef(false);

    useEffect(() => {
        if (!didFetch.current) {
            dispatch(fetchJokes());
            didFetch.current = true;
        }
    }, [dispatch]);

    const handleLoadMore = () => {
        dispatch(fetchMoreJokes());
    };

    if (status === 'loading' && jokes.length === 0) {
        return <Loader />;
    }

    if (status === 'failed') {
        return <div>Error: {error}</div>;
    }

    return (
        <Box sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "20px",
        }}>
            <Box sx={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                alignItems: "center",
                justifyContent: "flex-start",
                gap: "20px",
                margin: "20px",
                maxWidth: "90%",
            }}>
                {jokes.map((joke) => (
                    <JokeCard key={joke.id} joke={joke} refreshing={refreshingJokeIds.includes(joke.id)} />
                ))}
            </Box>
            <Button
                variant="contained"
                color="primary"
                onClick={handleLoadMore}
                disabled={status === 'loading'}
                sx={{
                    mb: "40px",
                }}
            >
                {status === 'loading' ? 'Loading...' : 'Load more'}
            </Button>
        </Box>
    );
}

export default MainPage;