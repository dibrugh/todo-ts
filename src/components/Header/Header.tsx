import React from 'react'
import { Typography, Box } from '@mui/material';

interface HeaderProps {
    todoCount: number;
}

export const Header: React.FC<HeaderProps> = ({ todoCount }) => (
    <Box textAlign='left'>
        <Typography sx={{ fontSize: 35 }} variant="h1" gutterBottom>
            Todo list: {todoCount}
        </Typography>
    </Box>
)

