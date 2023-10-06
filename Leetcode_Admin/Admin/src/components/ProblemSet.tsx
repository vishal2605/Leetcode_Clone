import {useState,useEffect} from 'react';
import { BASE_URL } from '../config';
import { JsonFunction } from 'react-router-dom';
import {Problem} from './Problem';
import { Button, TextField, Typography } from '@mui/material';
import axios from 'axios';
import Response from 'react'

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
function ProblemSet() {
  // Your component logic here
  const [problems, setProblems]= useState<Data[]>([]);

    useEffect(() => {
      
      axios.get(`${BASE_URL}/admin/problemSetAll/`, {
          headers: {
              "authorization": "Bearer " + localStorage.getItem("adminToken")
          }
      }).then((res)=>{
        // console.log(res.data);
        const data=res.data;
        setProblems(data);
      }).catch((err:Error)=>{
        console.log("Fetch Error",err);
      });
    }, [])

    // console.log(problems);
  return (
    <div>
      
      <div style={{display: "flex", flexWrap: "wrap", justifyContent: "center",marginTop:60}}>
          {problems.length > 0 && problems.map((problem,index)=> {
              {console.log(problem)};
              return <Problem props={problem} index={index} ></Problem>
            }
        )}
        {
          problems.length==0 && <Typography>
              there is no problems on site
          </Typography>
        }
      </div>
    </div>
  );
}

export default ProblemSet;
