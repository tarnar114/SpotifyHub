import React from 'react'
import { makeStyles, createStyles} from '@material-ui/core/styles'
import backg from '../assets/HomeBackG.jpg'
import {Grid,Typography} from '@material-ui/core'
import ListAltIcon from '@material-ui/icons/ListAlt';
const styles=makeStyles({
    // backg:{
    //     backgroundImage:`url(${backg})`,
    //     backgroundSize: 'auto',
    //     backgroundRepeat: 'no-repeat',
    //     backgroundPosition: 'top left'
    // }
    Grid:{
       height:800,
       width:980,
       marginLeft:500
    },
    Icons:{
        width:180,
        height:180
    }
})
export default function home() {
    const classes=styles()
    return (
        <React.Fragment>
            <div  
            style={{
                backgroundImage:`url(${backg})`,
                backgroundSize:'cover',
                height:700,
                width:'100%',
                opacity:0.7             
                // backgroundPosition:'center'
            }}>   
            </div>
            <Grid className={classes.Grid} container spacing={3}>
                <Grid item xs={3}>
                    <ListAltIcon className={classes.Icons}></ListAltIcon>
                </Grid>
                <Grid item xs={9}>
                    <Typography variant='h4'>
                        <br />
                        Personalized lists based on your stats
                    </Typography>
                </Grid>
                <Grid item xs={3}>
                    <ListAltIcon className={classes.Icons}></ListAltIcon>
                </Grid>
                <Grid item xs={9}>
                    <Typography variant='h4'>
                        <br />
                        Personalized lists based on your stats
                    </Typography>
                    <Typography variant='body1'>
                        description
                    </Typography>
                </Grid>
                <Grid item xs={3}>
                    <ListAltIcon className={classes.Icons}></ListAltIcon>
                </Grid>
                <Grid item xs={9}>
                    <Typography variant='h4'>
                        <br />
                        Personalized lists based on your stats
                    </Typography>
                </Grid>
            </Grid> 

        </React.Fragment>
    )
}
