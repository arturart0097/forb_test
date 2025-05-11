import { useNavigate } from "react-router-dom";
import { Box, Typography, Button } from "@mui/material";

export const NotFoundPage = () => {
    const navigate = useNavigate();

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 1, height: '100vh' }}>
            <Typography variant="h1">Not Found</Typography>
            <Button variant="contained" color="primary" onClick={() => navigate('/')}>Go to Home</Button>
        </Box>
    );
}

export default NotFoundPage;