import React from "react";

const CommentList = ({ comments }) => {
  const renderedComments = comments.map((comment) => {
    let content;

    if (comment.status === "approved") {
      content = comment.comment;
    }

    if (comment.status === "pending") {
      content = "Awaiting Moderation";
    }

    if (comment.status === "rejected") {
      content = "Comment rejected";
    }
    console.log(comment);
    return <li key={comment.id}>{content}</li>;
  });

  return <ul>{renderedComments}</ul>;
};

export default CommentList;
