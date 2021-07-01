import React, { Component } from 'react'
import SpotifyWebApi from "spotify-web-api-node";
import Auth from "../Auth";
import { withCookies, Cookies } from "react-cookie";
import ListItem from "../components/ListItem";
import { Grid } from "@material-ui/core";
import axios from 'axios'

import { makeStyles, createStyles,useTheme,Theme,withStyles,WithStyles} from '@material-ui/core/styles'
const useStyles =((theme:Theme)=>createStyles({
    root: {
        display:'flex',
        marginLeft:240
    },
    
})
);
interface Props extends WithStyles<typeof useStyles>{}


 class TopUserArtists extends Component<any> {
    state = {
        artistItems: []
    };
    componentDidMount() {
        // const spotifyAPI = new SpotifyWebApi({
        //     clientId: process.env.REACT_APP_CLIENT_ID,
        // });
        // const cookies = new Cookies();
        // const token = cookies.get("accessToken");
        // console.log(token);
        // spotifyAPI.setAccessToken(token);
        // spotifyAPI
        // .getMyTopArtists({limit:20,time_range:"long_term"})
        // .then((data)=>{
        //     console.log(data.body.items)
        //     const TopArt=data.body.items.map((data)=>({
        //         name:data.name,
        //         image:data.images[1].url,
        //     }));
        //     console.log(TopArt)
        //     this.setState({ artistItems:TopArt });
        //     console.log(this.state.artistItems)
        // });
        axios.get("http://localhost:3001/top_artists")
        .then((res)=>{
            console.log(res.data.topArtists)
            this.setState({artistItems:res.data.topArtists})
        })
    }
    renderList() {
        const art=this.state.artistItems
        console.log(art)
        interface artist {
            name:string,
            image:string
        }
        const Artists=art.map((data:artist)=>{
            const p={
                ...data
            }
            return(
                <Grid item xs={12}>
                    <ListItem image={p.image} title={p.name}></ListItem>
                </Grid>
            )
        });
        return Artists
    }
    render() {
        const {classes}=this.props;
        return (
            <div className={classes.root}>
                <div>
                <h1>Top Artists</h1>
                <Grid container spacing={2}>
                    {this.renderList()}
                </Grid>
                </div>
            </div>
        )
    }
}
export default withStyles(useStyles)(withCookies(TopUserArtists));