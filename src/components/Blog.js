import React, { useState } from "react";

const Blog = ({ blog, username }) => {
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
    e.preventDefault();
    setExtraDataVisible(false);
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
          <p>
            likes: {blog.likes} <button>like</button>{" "}
          </p>
          <p>user: {blog.user.username}</p>
        </div>
      )}
    </div>
  );
};

export default Blog;
