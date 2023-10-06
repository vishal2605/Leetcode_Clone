import { useState,useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {RecoilRoot,useSetRecoilState} from 'recoil';
import Landing from './components/Landing';
import Login from './components/Login';
import Register from './components/Register';
import ProblemSet from './components/ProblemSet';
import ProblemAtTitle from './components/ProblemAtTitle';
import Profile from './components/Profile';
import UpdateProblem from './components/UpdateProblem';
import NavBar from './components/NavBar';
import axios from 'axios';
import { adminState } from './store/atoms/admin';
import { BASE_URL } from './config';
import './App.css'
import AddProblem from './components/AddProblem';

function App() {

  return <RecoilRoot>
    <Router>
      <NavBar></NavBar>
      <InitUser></InitUser>
      <Routes>
        <Route path='/' element={<Landing/>}></Route>
        <Route path='/login' element={<Login></Login>}></Route>
        <Route path='/register' element={<Register></Register>}></Route>
        <Route path= '/problemSet' element={<ProblemSet></ProblemSet>}></Route>
        <Route path='/problem/:problemTitle' element={<ProblemAtTitle></ProblemAtTitle>}></Route>
        <Route path='/profile/:adminName' element={<Profile></Profile>}></Route>
        <Route path='/updateProblem' element={<UpdateProblem></UpdateProblem>}></Route>
        <Route path='/addProblem' element={<AddProblem></AddProblem>}></Route>
      </Routes>
    </Router>

  </RecoilRoot>
}
function InitUser() {
  const setAdmin=useSetRecoilState(adminState);
  const init=async()=>{
    try{
      const res=await axios.get(`${BASE_URL}/admin/me`,{
        headers: {
          "authorization": "Bearer " + localStorage.getItem("adminToken")
      }
      })
      console.log(res.data);
      if(res.data.username){
        setAdmin({
          adminEmail:res.data.username
        })
      }
      else{
        setAdmin({
          adminEmail:null
        })
      }
    }
    catch(e){
      setAdmin({
        adminEmail:null
      })
    }
  }

  useEffect(()=>{
    init();
  },[]);
  return <> </>
}
export default App
