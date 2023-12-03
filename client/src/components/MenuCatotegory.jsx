import React from 'react';
import { Paper, Typography, List, ListItem, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';


const CategoryMenu = ({ handleCategoryClick }) => {
    const categories = ['All','TechnologyNews', 'Phones', 'Computers', 'Others'];

    return (
        <Paper elevation={3} sx={{ borderRadius: 5, p: 2, mt: 3 }}>
            <Typography variant="h6" gutterBottom>
                Categories
            </Typography>
            <List>
                {categories.map(category => (
                    <ListItem
                        key={category}
                        
                        onClick={() => handleCategoryClick(category)} 
                    >
                        <ListItemText primary={category} />
                    </ListItem>
                ))}
            </List>
        </Paper>
    );
};

export default CategoryMenu;