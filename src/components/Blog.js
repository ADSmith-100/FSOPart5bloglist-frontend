import React, { useState } from "react";

const Blog = ({ blog, addLikes, username }) => {
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

  return (
    <div>
      {extraDataVisible === false ? (
        <div style={blogStyle}>
          {blog.title} {blog.author} <button onClick={handleView}>view</button>
        </div>
      ) : (
        <div style={blogStyle}>
          <p>
            {blog.title} <button onClick={handleHideData}>hide</button>
          </p>
          <p>{blog.author}</p>
          <p>{blog.url}</p>
          <p>user: {blog.user.name}</p>
          <p>
            likes: {blog.likes}{" "}
            <button onClick={() => handleAddLike(blog.id)}>like</button>{" "}
          </p>
        </div>
      )}
    </div>
  );
};

export default Blog;
