import React from 'react';
import { Link } from 'react-router-dom';
import user from '../image/user.png';
import sun from '../image/sun.png';
import moon from '../image/moon.png';
import {adminEmailState} from '../store/selector/adminEmail';
import { useRecoilValue,useSetRecoilState } from 'recoil';
import { adminState } from '../store/atoms/admin';
function NavBar() {
  // Your component logic here

  const adminEmail=useRecoilValue(adminEmailState);
  const setAdmin=useSetRecoilState(adminState);
  const handleClick=(()=>{

  });
  return (
    <header className='header'>
    <div >
        <span style={{color:'#7CB9E8', fontSize:'24px',}}>Code</span>
        <span style={{color:'black',fontSize:'24px'}}>Journey</span>
        <Link to={'/problemSet'}>
            <p className='login-button' style={{marginLeft:'25px'}}>Problem</p>
        </Link>
        < Link to={'/updateProblem'}>
            <p className='login-button'>Modify</p>
        </Link>
        <Link to={'/addProblem'}>
            <p className='login-button'>AddProblem</p>
        </Link>
        
    </div>

    <div>
        <img src={sun} style={{display:'inline-block', verticalAlign:'middle', marginBottom:'10px', marginRight:'20px',width:'25px', cursor:'pointer'}} onClick={handleClick}></img>
        {!adminEmail && <Link to={'/login'}>
            <p className='login-button'>Login</p>
        </Link>}
        {!adminEmail && < Link to={'/register'}>
        <button className="filled-button" style={{color:'rgb(64, 68, 70)', textDecoration:'none'}} >Signup</button>
        </Link>}
        {adminEmail && <Link to={'/profile'}>
            <img src={user} style={{display:'inline-block', verticalAlign:'middle', marginBottom:'10px', marginRight:'20px',width:'25px', cursor:'pointer'}}></img>
        </Link>}
    </div>
    </header>

  );
}

export default NavBar;
