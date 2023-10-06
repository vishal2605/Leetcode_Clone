import React from 'react';
import { Button, TextField, Typography } from '@mui/material';

type Data={
  problem:{
    title: string,
    difficulty:string,
    description: string,
    topicTag: [{ type: String }],
    example: [{
        input:string,
        output:string,
    }],
    constraints: string,
    testcase:[{
      input:string,
      output:string,
    }]
  }
}
export function Problem({props}:any,{index}:any) {
  console.log(index);

  return (
    <div style={{display:'flex',justifyContent:'space-around'}}>
      <Typography variant='h4'>{index+1}</Typography>
      <Typography variant='h4'>{props.title}</Typography>
      <Typography variant='h4'>{props.difficulty}</Typography>
    </div>
  );
}
