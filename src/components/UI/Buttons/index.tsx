import type { MouseEvent } from "react"

import { ButtonGroup, Button } from "@mui/material"
import type { ButtonProps } from "@mui/material"

interface ButtonConfig {
    label: string;
    color: 'primary' | 'success' | 'error';
    onClick?: (e: MouseEvent) => void;
    loading?: boolean;
}

interface ButtonsProps {
    buttons: ButtonConfig[];
    variant?: ButtonProps['variant'];
    size?: ButtonProps['size'];
    disabled?: boolean;
}

export const Buttons = ({
    buttons,
    variant = "outlined",
    size = "medium",
    disabled = false
}: ButtonsProps) => {
    return (
        <ButtonGroup
            variant={variant}
            size={size}
            aria-label="button group"
        >
            {buttons.map((button, index) => (
                <Button
                    key={index}
                    disabled={disabled || button.loading}
                    onClick={button.onClick}
                    sx={{
                        color: `${button.color}.main`,
                        '&:hover': {
                            backgroundColor: `rgba(${button.color === 'error' ? '211, 47, 47' :
                                button.color === 'success' ? '46, 125, 50' :
                                    '33, 150, 243'
                                }, 0.04)`,
                            borderColor: `${button.color}.main`,
                        },
                    }}
                >
                    {button.label}
                </Button>
            ))}
        </ButtonGroup>
    )
}