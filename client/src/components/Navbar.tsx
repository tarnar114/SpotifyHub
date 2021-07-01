import React,{ useState } from 'react';
import { Drawer,CssBaseline,AppBar,Toolbar,List,Typography,Divider,ListItem,ListItemText} from '@material-ui/core';
import BubbleChartIcon from '@material-ui/icons/BubbleChart';
import { makeStyles, createStyles,useTheme,Theme,} from '@material-ui/core/styles'
import { useQuery, useQueryClient, QueryClientProvider } from 'react-query'
import { Link,withRouter } from 'react-router-dom'
const AuthLinks = [
    { title: `Home`, path: `/` },
    { title: `Top Songs`, path: `/Top_Songs` },
    { title: `Top Artists`, path: `/Top_Artists` },
]
const useStyles = makeStyles((theme:Theme)=>createStyles({
    root: {
        display:'flex'
    },
    drawerPaper:{
        width:200,
        backgroundColor:theme.palette.background.default
    },
    drawer:{
        width:200,
        flexShrink:0,
        backgroundColor:theme.palette.background.default

    },
    content:{
        flexGrow:1,
        backgroundColor:theme.palette.background.default,
        padding:theme.spacing(3)
    }

})
);

 function Navbar(props) {
    var spotify_url = `https://accounts.spotify.com/authorize?client_id=${process.env.REACT_APP_CLIENT_ID}&response_type=code&redirect_uri=http://localhost:3000&scope=user-read-recently-played%20user-read-playback-state%20user-top-read%20user-follow-read%20playlist-read-private%20user-library-read%20playlist-read-collaborative&show_dialog=true`
    const [open,setOpen]=useState(false);
    const [anchorEl,setAnchorEl]=useState()
    // const handleClose=()=>{
    //     setOpen(false)
    // }

    // const handleClick=event=>{
    //     setOpen(true)
    //     setAnchorEl(event.currentTarget)
    // }
    const handleLink=(path,title)=>{
        let link;
        // console.log(props)
        {props.query? 
            link= <ListItem button key={title}component={Link} to={{
            pathname: path,
            search: `${props.location.search}`,
            state:{code:props.query}
          }}>{title}</ListItem>
                   
          :link=<ListItem component='a' href={spotify_url}>{title}</ListItem>
        }
        return link;
    }
    const classes = useStyles();
    return (
        
       
        <div className={classes.root}>
            <Drawer
            variant='permanent'
            anchor='left'
            className={classes.drawer}
            classes={{paper:classes.drawerPaper,}}
            >
                <Divider/>
                <List>
                    {AuthLinks.map(({title,path})=>(
                        handleLink(path,title)
                    ))}
                </List>
            </Drawer>
        </div>
    );
}
export default withRouter(Navbar)



 // <div>
        //     <AppBar position='fixed'>
        //         <Toolbar>
        //             <IconButton edge="start" color="inherit" aria-label="menu">
        //                 <BubbleChartIcon />
        //             </IconButton>
        //             <Typography variant="h6" >
        //                 Spotify stats
        //             </Typography>

                   
        //                 <Button color="inherit" component='a' href={spotify_url}> Login</Button>

        //                 <Button color="inherit" onClick={handleClick}> Global Options</Button>
        //                 <Menu
        //                 getContentAnchorEl={null}
        //                 open={open}
        //                 anchorEl={anchorEl}
        //                 anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        //                 transformOrigin={{ vertical: "top", horizontal: "center" }}
        //                 onClose={handleClose}
        //                 >
        //                     {
        //                         AuthLinks.map(({title,path})=>(
        //                             handleLink(path,title)
        //                         ))
        //                     }
        //                 </Menu>

                    
                    

        //         </Toolbar>
        //     </AppBar>
        // </div>