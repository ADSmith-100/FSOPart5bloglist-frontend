import React, { useState } from "react";

const Blog = ({ blog, addLikes, removeBlog, user }) => {
  const [extraDataVisible, setExtraDataVisible] = useState(false);
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const handleView = (e) => {
    e.preventDefault();
    setExtraDataVisible(true);
  };

  const handleHideData = (e) => {
    e.preventDefault(e);
    setExtraDataVisible(false);
  };

  const handleAddLike = (e) => {
    addLikes({
      likes: blog.likes + 1,
    });
  };

  const handleRemoveBlog = (id, name) => {
    removeBlog(id, name);
  };

  return (
    <div className='blog'>
      {extraDataVisible === false ? (
        <div style={blogStyle}>
          {blog.title} {blog.author} <button id='view' onClick={handleView}>view</button>
        </div>
      ) : (
        <div style={blogStyle}>
          <p>
            {blog.title} <button onClick={handleHideData}>hide</button>
          </p>
          <p>{blog.author}</p>
          <p>{blog.url}</p>
          {blog.user.name === undefined ? (<p>waiting...</p>): (<p>user: {blog.user.name}</p>)}
          
          <p>
            likes: {blog.likes}{" "}
            <button id='like' onClick={() => handleAddLike(blog.id)}>like</button>{" "}
          </p>

          {blog.user.name === user ? (
            <button onClick={() => handleRemoveBlog(blog.id, blog.title)}>
              remove
            </button>
          ) : (
            <></>
          )}
        </div>
      )}
    </div>
  );
};


export default Blog;
