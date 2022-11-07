import React, { useContext } from "react";
import "./navbar.scss";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Link } from "react-router-dom";
import { DarkModeContext } from "../../context/darkModeContext";
import { AuthContext } from "../../context/authContext";

const Navbar = () => {
    const { toggle, darkMode } = useContext(DarkModeContext);
    const { currentUser } = useContext(AuthContext);

    return (
        <div className="navbar">
            <div className="left">
                <Link to="/" style={{ textDecoration: "none" }}>
                    <span>MeSocial.</span>
                </Link>
                <HomeOutlinedIcon className="icons" />
                {darkMode ? (
                    <WbSunnyOutlinedIcon className="icons" onClick={toggle} />
                ) : (
                    <DarkModeOutlinedIcon className="icons" onClick={toggle} />
                )}
                <GridViewOutlinedIcon className="icons" />
                <div className="search">
                    <SearchOutlinedIcon className="icons" />
                    <input 
                        type="text" 
                        placeholder="Search..."    
                    />
                </div>
            </div>
            <div className="right">
                <PersonOutlinedIcon className="icons" />
                <EmailOutlinedIcon className="icons" />
                <NotificationsOutlinedIcon className="icons" />
                <div className="user">
                    <img 
                        src={currentUser?.profilePic} 
                        alt=""
                    />
                    <span>{currentUser?.name}</span>
                </div>
            </div>
        </div>
    );
};

export default Navbar