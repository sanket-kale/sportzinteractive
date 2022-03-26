import { AppBar, Container, Grid , TextField, Toolbar, Typography } from '@material-ui/core';
import React,{useState,useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MediaCard from './MediaCard';
import Autocomplete from '@material-ui/lab/Autocomplete';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    title: {
        flexGrow: 1,
        display: 'none',
        [theme.breakpoints.up('sm')]: {
          display: 'block',
        },
      },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }));
  
   
export default function Players (){
    const classes = useStyles();
    const[formData,setFormData]=useState()
    const[match,setMatch]=useState(0)
    useEffect(()=>{
        fetch("https://api.npoint.io/20c1afef1661881ddc9c")
        .then(response=>response.json())
        .then(data=>setFormData(data))
    },[])
    const onSearched=(e)=>{
        console.log(e)
        setMatch({
            PFName:e.target.textContent,
        })
    }   
    console.log(formData,match)
    return(
        <>
        <AppBar position="relative">
                <Toolbar>
                <Typography className={classes.title} variant="h6" noWrap>
                    SportszInteractive
                </Typography>
             
           
                <div style={{ width: 300,paddingLeft:'10px' }}>
                
                <Autocomplete
                    freeSolo
                    edge="end"
                    onChange={onSearched}
                    options={formData && formData.playerList}
                    id="free-solo-demo"
                    getOptionLabel={(option) => option.TName}
                    renderOption={(option) => option.PFName}
                    renderInput={(params) => (
                    <TextField {...params} label="Search" margin="normal" variant="outlined" />
                    )}
                />
               
             </div>
                </Toolbar>
            </AppBar>
        <Container fixed>           
            <div className={classes.root}>
            <Grid container spacing={6}>
            {match!==0 &&  match.PFName!==""? 
            formData && formData.playerList.map((ele,key)=>
            match.PFName===ele.PFName &&
                <Grid item xs={3}>
                <MediaCard ele={ele}/>
                </Grid>
            )
            :
                formData && formData.playerList.sort((a, b) => parseFloat(a.Value) - parseFloat(b.Value)).map((ele,key)=>
                <Grid item xs={3}>
                <MediaCard ele={ele}/>
                </Grid>
            )}
            </Grid>
            </div>
        </Container>
        </>
    )
}