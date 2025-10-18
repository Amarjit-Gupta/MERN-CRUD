import { useState } from "react";
import { NavLink, useNavigate } from "react-router";
import logo from '../assets/pass-icon.png'
const Navbar = () => {

    const [menu, setMenu] = useState(false);
    const navigate = useNavigate();

    let auth = localStorage.getItem("KuiWPP)ptxfbTjUC1@S20P%1a");
    let user = auth ? JSON.parse(auth) : "";

    const hanldeLogout = () => {
        localStorage.removeItem("KuiWPP)ptxfbTjUC1@S20P%1a");
        setMenu(false);
        navigate("/login");
    }

    return (
        <div className="navbar">
            <div className="navbar-image"><img src={logo} alt="" /></div>
            {auth ?
                <>
                    <button className="ham-burger" onClick={() => setMenu(!menu)}>{menu ? <span className="cross-icon">&times;</span> : <span>&#9776;</span>}</button>
                    <ul className={`un ${menu ? "x1" : ""}`}>
                        <li><NavLink style={{textDecoration:"none"}} to={"/"} onClick={() => setMenu(false)}>AllData</NavLink></li>
                        <li><NavLink style={{textDecoration:"none"}} to={"/add"} onClick={() => setMenu(false)}>AddData</NavLink></li>
                        <li className="logout"><button onClick={hanldeLogout} className="logout-btn">logout</button>&nbsp;<span className="name-icon">({user?.name.length>15?user?.name.slice(0,12)+"...":user?.name})</span></li>
                    </ul>
                </>
                :
                ""
            }
        </div>
    );
};
export default Navbar;