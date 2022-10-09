import React from "react";

export default function Comment({ comments }) {
  return (
    <div className="text-start">
      <div className="inline-flex">
        <p>
          <b>{comments.username}</b> {comments.comment}
        </p>
        {/* <button className="btn btn-sm">reply</button> */}
      </div>
      {/* <p>{comments.replies}</p> */}
      {comments.replies.map((reply, index) => {
        return (
          <div key={index}>
            &nbsp;<b>{reply.id}</b> {reply.comments}
          </div>
        );
      })}
      {/* {console.log(comments.replies)} */}
    </div>
  );
}
