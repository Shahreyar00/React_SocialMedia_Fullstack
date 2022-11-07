import { useState } from "react";
import "./update.scss";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { publicRequest } from "../../requestMethod";
import axios from "axios";

const Update = ({ setOpenUpdate, user }) => {
    const [cover, setCover] = useState(null);
    const [profile, setProfile] = useState(null);
    const [texts, setTexts] = useState({
        email: user.email,
        password: user.password,
        name: user.name,
        city: user.city,
        website: user.website,
    });

    const upload = async (file) => {
        console.log(file)
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
    };

    const handleChange = (e) => {
        setTexts((prev) => ({ ...prev, [e.target.name]: [e.target.value] }));
    };

    const queryClient = useQueryClient();

    const mutation = useMutation(
        (user) => {
            return publicRequest.put("/users", user);
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries(["user"]);
            },
        }
    );

    const handleClick = async (e) => {
        e.preventDefault();
        let coverUrl;
        let profileUrl;
        coverUrl = cover ? await upload(cover) : user.coverPic;
        profileUrl = profile ? await upload(profile) : user.profilePic;
        
        mutation.mutate({ ...texts, coverPic: coverUrl, profilePic: profileUrl });
        setOpenUpdate(false);
        setCover(null);
        setProfile(null);
    }

    return (
        <div className="update">
            <div className="wrapper">
                <h1>Update Your Profile</h1>
                <form>
                    <div className="files">
                        <label htmlFor="cover">
                            <span>Profile Picture</span>
                            <div className="imgContainer">
                                <img
                                    src={ cover ? URL.createObjectURL(cover) : user.coverPic} alt=""
                                />
                                <CloudUploadIcon className="icon" />
                            </div>
                        </label>
                        <input
                            type="file"
                            id="cover"
                            style={{ display: "none" }}
                            onChange={(e) => setCover(e.target.files[0])}
                        />
                        <label htmlFor="profile">
                            <span>Cover Picture</span>
                            <div className="imgContainer">
                                <img
                                src={
                                    profile
                                    ? URL.createObjectURL(profile)
                                    : user.profilePic
                                }
                                alt=""
                                />
                                <CloudUploadIcon className="icon" />
                            </div>
                        </label>
                        <input
                            type="file"
                            id="profile"
                            style={{ display: "none" }}
                            onChange={(e) => setProfile(e.target.files[0])}
                        />
                    </div>
                    <label>Email</label>
                    <input
                        type="text"
                        value={texts.email}
                        name="email"
                        onChange={handleChange}
                    />
                    <label>Password</label>
                    <input
                        type="text"
                        value={texts.password}
                        name="password"
                        onChange={handleChange}
                    />
                    <label>Name</label>
                    <input
                        type="text"
                        value={texts.name}
                        name="name"
                        onChange={handleChange}
                    />
                    <label>Country / City</label>
                    <input
                        type="text"
                        name="city"
                        value={texts.city}
                        onChange={handleChange}
                    />
                    <label>Website</label>
                    <input
                        type="text"
                        name="website"
                        value={texts.website}
                        onChange={handleChange}
                    />
                    <button onClick={handleClick}>Update</button>
                </form>
                <button className="close" onClick={() => setOpenUpdate(false)}>
                    close
                </button>
            </div>
        </div>
    );
};


export default Update;