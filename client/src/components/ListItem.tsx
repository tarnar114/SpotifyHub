import React from 'react'
import {Card,CardContent,CardMedia,Typography} from '@material-ui/core'
import { Theme, createStyles, makeStyles, useTheme } from '@material-ui/core/styles';

const useStyles=makeStyles(()=>createStyles({
    root:{
        display:'flex',
        height:150,
        maxWidth:`calc(100% - 50px)`
    },
    media:{
        width:160,
        display:'flex'
    }

}))
export default function ListItem(props) {
    const classes=useStyles();
    return (
        <Card className={classes.root}>
            <CardMedia
                className={classes.media}
                image={props.image}
                />
            <CardContent>
                <Typography variant='h6'>
                    {props.title}
                </Typography>
            </CardContent>
        </Card>
    )
}
