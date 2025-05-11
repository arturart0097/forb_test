import { Component, type ErrorInfo, type ReactNode } from "react";
import { Box, Typography } from "@mui/material";

interface Props {
    children?: ReactNode;
}

interface State {
    hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false
    };

    public static getDerivedStateFromError(_: Error): State {
        // Update state so the next render will show the fallback UI.
        return { hasError: true };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error("Uncaught error:", error, errorInfo);
    }

    public render() {
        const hasError = this.state.hasError;
        const children = this.props.children;

        if (hasError) {
            return (
                <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 1, height: '100vh' }}>
                    <Typography variant="h1">Something went wrong</Typography>
                    <Typography variant="body1">Please try refreshing the page</Typography>
                </Box>
            );
        }

        return children;
    }
}

export default ErrorBoundary;
