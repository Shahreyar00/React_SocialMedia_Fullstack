import { useContext, useState } from "react";
import "./comments.scss";
import { AuthContext } from "../../context/authContext";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import moment from "moment";
import { publicRequest } from "../../requestMethod";

const Comments = ({ postId }) => {
    const [desc, setDesc] = useState("");
    const { currentUser } = useContext(AuthContext);

    const { isLoading, error, data } = useQuery(["comments"], () =>
            publicRequest.get("/comments?postId=" + postId).then((res) => {
            return res.data;
        })
    );

    const queryClient = useQueryClient();

    const mutation = useMutation(
        (newComment) => {
            return publicRequest.post("/comments", newComment);
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries(["comments"]);
            },
        }
    );

    const handleClick = async (e) => {
        e.preventDefault();
        mutation.mutate({ desc, postId });
        setDesc("");
    };

    // console.log(data?.length);

    return (
        <div className="comments">
            <div className="write">
                <img src={currentUser.profilePic} alt="" />
                <input
                    type="text"
                    placeholder="write a comment"
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                />
                <button onClick={handleClick}>Send</button>
            </div>
            {error
                ? "Something went wrong"
                : isLoading
                ? "loading"
                : data.map((comment) => (
                    <div className="comment" key={comment.id}>
                        <img src={comment.profilePic} alt="" />
                        <div className="info">
                            <span className="infoName">{comment.name}</span>
                            <p className="infoDesc">{comment.desc}</p>
                        </div>
                        <span className="date">
                            {moment(comment.createdAt).fromNow()}
                        </span>
                    </div>
                ))}
        </div>
    );
};

export default Comments;