import {useState,useEffect} from 'react';
import { BASE_URL } from '../config';
import { JsonFunction } from 'react-router-dom';
import {Problem} from './Problem';
import { Button, TextField, Typography,Grid } from '@mui/material';
import axios from 'axios';
import Response from 'react'

type Data={
  problem:{
    title: string,
    difficulty:string,
    questionLink:string,
    videoLink:string
  }
}
function ProblemSet() {
  // Your component logic here
  const [problems, setProblems]= useState<Data[]>([]);
  // const [array, setArray]=useState(false);
  // const [twoPointer,setTwoPointer]=useState(false);
  // const [slidingWindow,setSlidingWindow]=useState(false);
  // const [Stack,setTwoPointer]=useState(false);


    useEffect(() => {
      
      axios.get(`${BASE_URL}/admin/problemSetAll/`, {
          headers: {
              "authorization": "Bearer " + localStorage.getItem("adminToken")
          }
      }).then((res)=>{
        // console.log(res.data);
        const data=res.data.problems;
        setProblems(data);
      }).catch((err:Error)=>{
        console.log("Fetch Error",err);
      });
    }, [])

    // console.log(problems);
  return (
    <div>
      <div>
        <div style={{borderBottom:'1px solid #000',padding:'10px'}}>
      <Grid container spacing={3} st>
    <Grid item xs>
      <Typography style={{fontWeight:'bold', marginLeft:'20px'}}>No</Typography>
    </Grid>
    <Grid item xs={5}>
      <Typography style={{fontWeight:'bold'}}>Title</Typography>
    </Grid>
    <Grid item xs>
      <Typography style={{fontWeight:'bold'}}>Difficulty</Typography>
    </Grid>
    <Grid item xs>
      <Typography style={{fontWeight:'bold'}}>Solution</Typography>
    </Grid>
  </Grid>
  </div>
          {problems.length > 0 && problems.map((problem,index)=> {
              {console.log(problem)};
              return <Problem props={problem} index={index} ></Problem>
              
            }
        )}
        {
          problems.length==0 && <Typography style={{display:'flex', justifyContent:'center'}}>
              there is no problems on site
          </Typography>
        }
      </div>


    </div>
  );
}

export default ProblemSet;
