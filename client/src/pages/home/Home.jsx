import React from "react";
import { Posts, Share, Stories } from "../../components";
import "./home.scss";

const Home = () => {
    return (
        <div className="home">
            <Stories />
            <Share />
            <Posts />
        </div>
    )
}

export default Home