import React, { useState, useEffect } from "react";
import axios from "axios";

const CommentList = ({ postId }) => {
  const [comments, setComments] = useState([]);

  const fetchData = async () => {
    axios.get(`http://localhost:4001/posts/${postId}/comments`).then((res) => {
      setComments(res.data);
    });
    console.log(comments);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const renderedComments = comments.map((comment) => {
    console.log(comment);
    return <li key={comment.id}>{comment.comment}</li>;
  });

  return <ul>{renderedComments}</ul>;
};

export default CommentList;
