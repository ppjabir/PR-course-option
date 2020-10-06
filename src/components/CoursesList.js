import React from 'react';
import SchoolIcon from '@material-ui/icons/School';
import {
    makeStyles,
    List,
    ListItem,
    Divider,
    ListItemText,
    ListItemIcon
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        // maxWidth: '36ch',
        backgroundColor: theme.palette.background.paper,
        padding: 0,
        zIndex: 0
    },
    box: {
    },
    inline: {
        display: 'inline',
    },
}));

function CoursesList(props){
    const classes = useStyles();
    console.log("memberprops", props);
    return (
        <List component="nav" className={classes.root}>
            {props.data.map((item, key) => (
                <>
            <ListItem button alignItems="flex-start">
                <ListItemIcon>
                    <SchoolIcon />
                </ListItemIcon>
                <ListItemText
                    primary={`${item.type_name}(${item.type_name_eng})`}
                    // secondary="ഖുർആൻ ലേണിംഗ് പ്രോഗ്രാം"
                />
            </ListItem>
            <Divider variant="inset" component="li" />
            </>
            ))}
            
        </List>
    );
}

export default CoursesList;
