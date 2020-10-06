import React, {useContext} from 'react'
import AppBar from '@material-ui/core/AppBar'
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";
import { SiteContext } from "../SiteContext"
// import Toolbar from '@material-ui/core/Toolbar'
// import Typography from '@material-ui/core/Typography'
// import IconButton from '@material-ui/core/IconButton'
import {
    Toolbar,
    Typography,
    IconButton
} from '@material-ui/core';
// import { MenuIcon } from '@material-ui/icons'
// import {
//     ArrowBackIcon,
//     ExitToAppIcon
// } from '@material-ui/icons';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ShareIcon from '@material-ui/icons/Share';

const useStyles = makeStyles( (theme) => ({
    grow: {
        flexGrow: 1,
    },
}) )



function NavBar() {
    const classes = useStyles();
    var contextData = useContext(SiteContext);
const { setIsLoggedIn } = contextData;
const history = useHistory();
const logoutClick = () => {
    setIsLoggedIn(false);
    history.push("/");
}
    
    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        edge="start"
                        className=""
                        color="inherit"
                        aria-label="open drawer"
                     >
                         <ArrowBackIcon />
                     </IconButton>
                    <Typography color="inherit">
                        Courses
                    </Typography>
                <div className={classes.grow} />
                <div>
                    <IconButton
                        aria-label="show more"
                        aria-haspopup="true"
                        color="inherit"
                    >
                        <ShareIcon />
                    </IconButton>
                </div>
                <div>
                    <IconButton
                        aria-label="show more"
                        aria-haspopup="true"
                        color="inherit"
                    >
                        <ExitToAppIcon onClick={()=> logoutClick()}/>
                    </IconButton>
                </div>
                </Toolbar>
            </AppBar>    
        </div>
    )
}

export default NavBar
