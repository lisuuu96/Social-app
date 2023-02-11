import './Appnav.css'
import { Link } from "react-router-dom";
import axios from 'axios';


const Appnav = (props) => {

    const handleLogout = (e) =>{
        e.preventDefault();
        axios.post("https://akademia108.pl/api/user/logout",{
            
        }).then((res)=>{

           if(res.data.message){
            props.setUser(null);
            localStorage.setItem('user',null)
           }
          

        });
    }

    return (
        <nav className="mainnav">
            <ul>
                <li>
                  <Link to='/'>Home</Link>
                </li>
                {!props.user && <li>
                  <Link to='/login'>Login</Link>
                </li>}
                 {props.user &&<li>
                  <Link to='/signup'>Signup</Link>
                </li>}

                {props.user &&<li>
                  <Link to='/' onClick={handleLogout}>Signup</Link>
                </li>}

            </ul>

        </nav>
    )
}
export default Appnav;