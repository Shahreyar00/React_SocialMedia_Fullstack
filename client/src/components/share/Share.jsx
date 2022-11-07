import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import "./share.scss";
import Image from "../../assets/img.png";
import Map from "../../assets/map.png";
import Friend from "../../assets/friend.png";
import { publicRequest } from "../../requestMethod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const Share = () => {
    const [file, setFile] = useState(null);
    const [desc, setDesc] = useState("");

    // const upload = async() => {
    //     try{
    //         const formData = new FormData();
    //         formData.append("file", file);
    //         const res = await publicRequest.post("/upload", formData);
    //         console.log(res.data);
    //         return res.data;
    //     }catch(err){
    //         console.log(err);
    //     }
    // };

    const upload = async() => {
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", "uploads");
        try{
            const uploadRes = await axios.post(
                "https://api.cloudinary.com/v1_1/shahreyartrial/image/upload",
                data
            );
            const { url } = uploadRes.data;
            return url;
        }catch(err){
            console.log(err);
        }
    }

    const { currentUser } = useContext(AuthContext);

    const queryClient = useQueryClient();

    const mutation = useMutation(
        (newPost) => {
            return publicRequest.post("/posts", newPost);
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries(["posts"]);
            },
        }
    );

    const handleClick = async (e) => {
        e.preventDefault();
        let imgUrl = "";
        if (file) imgUrl = await upload();
        mutation.mutate({ desc, img: imgUrl });
        setDesc("");
        setFile(null);
    };

    return (
        <div className="share">
            <div className="container">
                <div className="top">
                    <img src={currentUser.profilePic} alt="" />
                    <input
                        type="text"
                        placeholder={`What's on your mind ${currentUser.name}?`}
                        onChange={(e) => setDesc(e.target.value)}
                        value={desc}
                    />
                    {file && (
                        <img className="file" alt="" src={URL.createObjectURL(file)} />
                    )}
                </div>
                <hr />
                <div className="bottom">
                    <div className="left">
                        <input
                            type="file"
                            id="file"
                            style={{ display: "none" }}
                            onChange={(e) => setFile(e.target.files[0])}
                        />
                        <label htmlFor="file">
                            <div className="item">
                                <img src={Image} alt="" />
                                <span>Add image</span>
                            </div>
                        </label>
                        <div className="item">
                            <img src={Map} alt="" />
                            <span>Add Place</span>
                        </div>
                        <div className="item">
                            <img src={Friend} alt="" />
                            <span>Tag Friends</span>
                        </div>
                    </div>
                    <div className="right">
                        <button onClick={handleClick}>Share</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Share