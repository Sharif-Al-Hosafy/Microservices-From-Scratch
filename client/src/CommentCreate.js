import React, { useState } from "react";
import axios from "axios";

const CommentCreate = ({ postId }) => {
  const [comment, setComment] = useState("");

  const sub = async (event) => {
    event.preventDefault();
    await axios.post(`http://localhost:4001/posts/${postId}/comments`, {
      comment,
    });
    setComment("");
  };

  return (
    <div>
      <form onSubmit={sub}>
        <div className="form-group">
          <label>Comment:</label>
          <input
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="form-control"
          />
        </div>
        <button className="btn btn-primary"> Submit</button>
      </form>
    </div>
  );
};

export default CommentCreate;
