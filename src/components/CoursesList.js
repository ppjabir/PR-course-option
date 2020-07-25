import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Typography from '@material-ui/core/Typography';
import SchoolIcon from '@material-ui/icons/School';

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

export default function AlignItemsList() {
    const classes = useStyles();

    return (
        <List component="nav" className={classes.root}>
            <ListItem button alignItems="flex-start">
                <ListItemIcon>
                    <SchoolIcon />
                </ListItemIcon>
                <ListItemText
                    primary="അന്നൂർ (Annoor)"
                    secondary="ഖുർആൻ ലേണിംഗ് പ്രോഗ്രാം"
                />
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem button alignItems="flex-start">
                <ListItemIcon>
                    <SchoolIcon />
                </ListItemIcon>
                <ListItemText
                    primary="ലൈഫ്  (Life)"
                    secondary="ഖുർആൻ ലേണിംഗ് പ്രോഗ്രാം"
                />
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem button alignItems="flex-start">
                <ListItemIcon>
                    <SchoolIcon />
                </ListItemIcon>
                <ListItemText
                    primary="ഇ മദ്രസ"
                    secondary="മദ്രസ ലേണിംഗ് പ്രോഗ്രാം"
                />
            </ListItem>
            {/* <Divider /> */}
        </List>
    );
}
