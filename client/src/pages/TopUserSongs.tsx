import React, { Component } from "react";
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

class TopUserSongs extends Component<any> {
  state = {
    items: []
  };
  componentDidMount() {
    axios.get("http://localhost:3001/top_songs")
    .then((res)=>{
      this.setState({items:res.data.topSongs})
    })
  }
  renderList(){
    const songs=this.state.items
    interface song {
      artist:string,
      song:string,
      album:string,
      link:string,
      img:string
  }
    const list=songs.map((data:song)=>{
      const p={
        ...data
      }
      return(
        <Grid item xs={12}>
          <ListItem image={p.img} title={p.song}></ListItem>
        </Grid>
      )
    });
    console.log(list)
    return list
  }
  render() {
    const {classes}=this.props
    return (
      <div className={classes.root}>
        <div>
          <h1>Top Songs</h1>
          <Grid container spacing={2}>
            {this.renderList()}
          </Grid>
        </div>
      </div>
    );
  }
}
export default withStyles(useStyles)(withCookies(TopUserSongs));
