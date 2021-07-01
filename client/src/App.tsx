import Navbar from "./components/Navbar";
import React,{useEffect,useState} from "react";
import TopUserSongs from "./pages/TopUserSongs";
import { QueryClient, QueryClientProvider } from "react-query";
import { Link, Route, Switch } from "react-router-dom";
import home from "./pages/home";
import Auth from "./Auth";
import SpotifyWebApi from 'spotify-web-api-node'
import TopUserArtists from "./pages/TopUserArtists";
import { withCookies,Cookies } from "react-cookie";

function App() {
const cookies = new Cookies();
const code = new URLSearchParams(window.location.search).get("code");
const accessToken=Auth(code)
const spotifyAPI=new SpotifyWebApi({clientId:process.env.REACT_APP_CLIENT_ID})
var token=cookies.get('accessToken')
console.log(token)
useEffect(()=>{
    if (!accessToken) return
    spotifyAPI.setAccessToken(accessToken!)
    token=accessToken
    // document.cookie=`accessToken=${accessToken!}`
    console.log(accessToken!)
  },[accessToken])

  return (
    // <QueryClientProvider client={queryClient}>
    <div>
      {accessToken ? <Navbar query={accessToken}></Navbar> : <Navbar></Navbar>}
      <Switch>
        <Route path="/" exact component={home}></Route>
        {accessToken &&
        <div>
        <Route path="/Top_Songs">
          <TopUserSongs />
        </Route>
        <Route path='/Top_Artists'>
          <TopUserArtists></TopUserArtists>
        </Route>
        </div>
        }
      </Switch>
    </div>
    // </QueryClientProvider>
  );
}
export default withCookies(App)