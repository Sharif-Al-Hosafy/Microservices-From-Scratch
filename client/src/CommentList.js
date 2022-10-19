import React from "react";

const CommentList = ({ comments }) => {
  const renderedComments = comments.map((comment) => {
    console.log(comment);
    return <li key={comment.id}>{comment.comment}</li>;
  });

  return <ul>{renderedComments}</ul>;
};

export default CommentList;
