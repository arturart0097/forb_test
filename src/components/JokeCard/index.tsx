import type { MouseEvent } from "react";

import { useAppDispatch } from "@/hooks/useAppDispatch";
import { addJoke, deleteJoke, refreshJoke } from "@/store/slice/jokesSlice";

import { CircularProgress, Box, CardContent, Typography } from "@mui/material";

import type { IJoke } from "@/types/IJoke";

import { StyledJokeCard, StyledCardHeader, StyledHeaderTitle, StyledSetup, StyledPunchline } from "./StyledJokeCard";
import { Buttons } from "../UI/Buttons";

export const JokeCard = ({ joke, refreshing = false }: { joke: IJoke, refreshing?: boolean }) => {
    const dispatch = useAppDispatch();

    const handleButtonClick = (e: MouseEvent, action: string) => {
        e.stopPropagation();
        switch (action) {
            case 'Add':
                dispatch(addJoke(joke));
                break;
            case 'Delete':
                dispatch(deleteJoke(joke.id));
                break;
            case 'Refresh':
                dispatch(refreshJoke(joke.id));
                break;
        }
    };

    return (
        <>
            <Box sx={{ position: 'relative' }}>
                <StyledJokeCard
                    isCustom={joke.isCustom}
                    refreshing={refreshing}
                >
                    <StyledCardHeader
                        isCustom={joke.isCustom}
                        title={
                            <StyledHeaderTitle isCustom={joke.isCustom}>
                                <Typography variant="body2" color="text.secondary">
                                    {`Type: ${joke.type}`}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {`ID: ${joke.id}`}
                                </Typography>
                            </StyledHeaderTitle>
                        }
                    />
                    <CardContent sx={{ flex: 1, width: '100%', display: 'flex', flexDirection: 'column', gap: '5px', overflow: 'hidden' }}>
                        <StyledSetup>
                            {joke.setup}
                        </StyledSetup>
                        <StyledPunchline>
                            {joke.punchline}
                        </StyledPunchline>
                    </CardContent>
                    <Buttons buttons={
                        joke.isCustom
                            ? [
                                {
                                    label: "Delete",
                                    color: "error",
                                    onClick: (e) => handleButtonClick(e, 'Delete')
                                }
                            ]
                            : [
                                {
                                    label: "Delete",
                                    color: "error",
                                    onClick: (e) => handleButtonClick(e, 'Delete')
                                },
                                {
                                    label: "Add",
                                    color: "success",
                                    onClick: (e) => handleButtonClick(e, 'Add')
                                },
                                {
                                    label: "Refresh",
                                    color: "primary",
                                    onClick: (e) => handleButtonClick(e, 'Refresh'),
                                    loading: refreshing
                                }
                            ]
                    } />
                    {refreshing && (
                        <Box sx={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            background: 'rgba(255,255,255,0.7)',
                            zIndex: 2,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: '12px',
                        }}>
                            <CircularProgress />
                        </Box>
                    )}
                </StyledJokeCard>
            </Box>
        </>
    )
}