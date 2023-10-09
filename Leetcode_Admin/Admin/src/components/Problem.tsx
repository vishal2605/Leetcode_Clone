import React from 'react';
import { Button, TextField, Typography, Grid} from '@mui/material';
import VideocamIcon from '@mui/icons-material/Videocam';

type Data={
    problem:{
    title: string,
    difficulty:string,
    questionLink:string,
    videoLink:string
  }
}
export function Problem({props,index}:any) {

  console.log(index);
  const defaultCss={
    color:'green'
  }
  if(props.difficulty==='Medium'){
    defaultCss.color='rgb(255 192 30)'
  }
  if(props.difficulty==='Hard'){
    defaultCss.color='#FF375F'
  }

  const handleQuestionClick=()=>{
    const URL=props.questionLink;
    window.location.href=URL;
  }
  const handleVideoLink=()=>{
    const URL=props.videoLink;
    window.location.href=URL;
  }
  return (
    
    <Grid container spacing={3} st>
    <Grid item xs>
      <Typography style={{ display:'flex',marginLeft:'20px', alignItems:'center'}}>{index+1}</Typography>
    </Grid>
    <Grid item xs={5}>
      <Typography className='login-button' onClick={handleQuestionClick}>{props.title}</Typography>
    </Grid>
    <Grid item xs>
      <Typography style={defaultCss}>{props.difficulty}</Typography>
    </Grid>
    <Grid item xs>
      <VideocamIcon style={{cursor:'pointer'}} onClick={handleVideoLink}></VideocamIcon>
    </Grid>
  </Grid>
  );
}
