import React from 'react'
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        // maxWidth: '36ch',
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(6,5,5),
        zIndex: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",

    },
    inline: {
        display: 'inline',
    },
    text: {
        fontWeight: "bold",
        textAlign: "center",
        fontSize: "8vw",
        marginBottom: "16px",
        maxWidth: "500px"
    },
    textp: {
        fontSize: "4vw"
    },
    buttonStyle: {
        margin: theme.spacing(3,2),
        textTransform: "none"
    },
    root2: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    }

}));

function Profile() {
    const classes = useStyles(); 
    return (
        <Container maxWidth className={classes.root2}>
            <Container maxWidth m={2} className={classes.root}>
                <Typography className={classes.text} variant="h4">Muhammad Anas</Typography>  
                <Typography className={classes.textp} variant="body1">muhammadanas@gmail.com</Typography>  
                <Typography className={classes.textp} variant="body1">+971551234567</Typography>  
                <Typography className={classes.textp} variant="body1">United Arab Emirates</Typography>  
                <Typography className={classes.textp} variant="body1">40 Years</Typography>  
                <Typography className={classes.textp} variant="body1">Roll Number: 16115</Typography>  
                <Button className={classes.buttonStyle} variant="contained" color="secondary" disableElevation>View my Courses</Button>
            </Container>
                <Divider />
        </Container>
    )
}

export default Profile
