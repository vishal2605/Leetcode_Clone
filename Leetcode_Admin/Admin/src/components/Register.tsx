import React, { useState } from 'react';
import { Button, TextField, Typography } from '@mui/material';
import { BASE_URL } from "../config.js";
import { useNavigate } from 'react-router-dom';
import {adminEmailState} from '../store/selector/adminEmail';
import { useRecoilValue,useSetRecoilState } from 'recoil';
import { adminState } from '../store/atoms/admin';
import axios from 'axios';

type Admin={
  target:{
    name:string,
    value:string
  }
}
function Register() {
  // Your component logic here
  const navigate=useNavigate();
  const adminEmail=useRecoilValue(adminEmailState);
  const setAdmin=useSetRecoilState(adminState);
  const [formData,setFormData]=useState({
    name:'',
    email:'',
    password:''
    
  })
  const handleSubmit=()=>{
    axios.post(`${BASE_URL}/admin/signup`,{
      username:formData.email,
      password:formData.password,
      name:formData.name
    }).then(response=>{
      localStorage.setItem('adminToken',response.data.token);
      console.log(localStorage.getItem('adminToken'));
      setAdmin({
        adminEmail:formData.email,
      });
      navigate('/problemset');
    })
    .catch(error=>{
      console.error('User registration error',error);
    });
  }
  const handleChange = (e:Admin) => {
    const { name, value } = e.target;
    console.log(name,value)
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  return (
    <div >
      <div className='container'>
      <center>
        <Typography variant="h4" component={"h2"} style={{ marginTop:'50px',marginBottom:'50px' }}>Register</Typography>
      </center>
        <form>
          <TextField label="Name" variant='outlined' style={{width:300}}></TextField>
          <br></br>
          <TextField label="Email" variant="outlined" style={{marginTop:'10px',width:300}}name="email" onChange={handleChange}></TextField>
          <br/>
          <TextField label="Password" type="Password" name="password" variant="outlined"  onChange={handleChange} style={{marginTop:'10px',width:300}}></TextField>
          <br></br>
          <Button variant="contained" style={{marginTop:'10px', width:300 , backgroundColor:"rgb(64, 68, 70)"}} onClick={handleSubmit}>Register</Button>
          <br></br>
          <p >Already have an account? <a style={{color:"#7CB9E8"}} href="/register">Login here</a></p>
        </form>
      </div>
    </div>
  )
}

export default Register;
