import { TextField,Typography,Button,Grid } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BASE_URL } from '../config';

function AddProblem() {
  // Your component logic here
  const [formData,setFormData]=useState({
    title:'',
    difficulty:'',
    questionLink:'',
    tag:'',
    videoLink:''
  })

  const handleChange = (e:any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit=()=>{
      axios.post(`${BASE_URL}/admin/problem`,{
        title:formData.title,
        difficulty:formData.difficulty,
        questionLink:formData.questionLink,
        tag:formData.tag,
        videoLink:formData.videoLink
      },{
        headers:{
          "authorization": "Bearer " + localStorage.getItem("adminToken")
        }
        
      }).then((res)=>{
        console.log(res.data);
        alert("Question is Added!")
      })
  };

  return (
    <div>
      <div className='container'>
      <center>
        <Typography variant="h4" component={"h2"} style={{ marginTop:'50px',marginBottom:'50px' }} onChange={handleChange}>Add New Question</Typography>
      </center>
        <form>
          <TextField label="Title" variant="outlined" style={{width:300}}name="title" onChange={handleChange}></TextField>
          <br/>
          <TextField label="Difficulty" type="text" name="difficulty" variant="outlined"  onChange={handleChange} style={{marginTop:'10px',width:300}}></TextField>
          <br></br>
          <TextField label="QuestionLink" type="text" name="questionLink" variant="outlined"  onChange={handleChange} style={{marginTop:'10px',width:300}}></TextField>
          <br></br>
          <TextField label="Tag" type="text" name="Tag" variant="outlined"  onChange={handleChange} style={{marginTop:'10px',width:300}}></TextField>
          <br></br>
          <TextField label="VideoLink" type="text" name="videoLink" variant="outlined"  onChange={handleChange} style={{marginTop:'10px',width:300}}></TextField>
          <br></br>
          <Button variant="contained" style={{marginTop:'10px', width:300 , backgroundColor:"rgb(64, 68, 70)"}} onClick={handleSubmit}>Add</Button>
        </form>
      </div>
    </div>
  );
}

export default AddProblem;