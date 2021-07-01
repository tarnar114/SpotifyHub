const express=require('express')
require('dotenv').config()
const SpotifyWebAPI=require('spotify-web-api-node')
const cors = require("cors")
const bodyParser = require("body-parser")
const app=express();
const cookieParser = require('cookie-parser');

var credentials={
    clientId:process.env.clientId,
    clientSecret:process.env.clientSecret,
    redirectUri:process.env.redirectUri,
};

app.use(cors())
app.use(cookieParser());
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser());




var SpotifyAPI = new SpotifyWebAPI(credentials);
app.post('/login',(req,res)=>{
    const code=req.body.code
    console.log(req.body.code)
    SpotifyAPI.authorizationCodeGrant(req.body.code).then((data)=>{
        try {
            SpotifyAPI.setAccessToken(data.body.access_token)
            SpotifyAPI.setRefreshToken(data.body.refresh_token)
            // var date=new Date()
            // res.cookie('BackendAccessToken',data.body.access_token,{expires:new Date(date.getTime()+(data.body.expires_in*1000))})
            res.json({
                access_token:data.body.access_token,
                refresh_token:data.body.refresh_token,
                expires_in:data.body.expires_in
            })
            console.log(document.cookie)
        } catch (error) {
            console.log(error)
            res.sendStatus(400)
        }
        
    })
})
app.post('/refresh',(req,res)=>{
    const refToken=req.body.refreshToken
   
    SpotifyAPI.refreshAccessToken().then((data)=>{
        try {
            SpotifyAPI.setAccessToken(data.body.access_token)
            res.json({
                expires_in:data.body.expires_in,
                access_token:data.body.access_token
            })
        } catch (error) {
            console.log(error)
            res.sendStatus(400)
        };
    })
})
//make api calls from front end to 3rd party api
app.get('/top_artists',(req,res)=>{
    SpotifyAPI.getMyTopArtists({limit:20,time_range:"long_term"})
    .then((data)=>{
         console.log(data.body.items)
        const TopArt=data.body.items.map((data)=>({
            name:data.name,
            image:data.images[1].url,
        }));
        
        res.send({
            topArtists:TopArt
        })

    })
});
app.get('/top_songs',(req,res)=>{
    SpotifyAPI.getMyTopTracks({ time_range: "long_term", limit: 20 })
    .then((data)=>{
        const Top = data.body.items.map((data) => ({
            artist: data.artists.map((artists) => artists.name).join(","),
            song: data.name,
            album: data.album.name,
            link: data.uri,
            img: data.album.images[1].url,
          }));
          res.send({
            topSongs:Top
        })
    })
})

app.listen(3001)