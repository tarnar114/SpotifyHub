const express=require('express')
const SpotifyWebAPI=require('spotify-web-api-node')
const cors = require("cors")
const bodyParser = require("body-parser")
const app=express();
var credentials={
    clientId:"b361bf43faca4c9d862e46bacaa0997c",
    clientSecret:"c6340cf9a33d44d09630dc36b65d82db",
    redirectUri:"http://localhost:3000",
};
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
var SpotifyAPI = new SpotifyWebAPI(credentials);
app.post('/login',(req,res)=>{
    const code=req.body.code
    console.log(req.body.code)
    SpotifyAPI.authorizationCodeGrant(req.body.code).then((data)=>{
        try {
            SpotifyAPI.setAccessToken(data.body.access_token)
            SpotifyAPI.setRefreshToken(data.body.refresh_token)
            res.json({
                access_token:data.body.access_token,
                refresh_token:data.body.refresh_token,
                expires_in:data.body.expires_in
            })
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


app.listen(3001)