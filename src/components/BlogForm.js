import React, { useState } from "react";
import PropTypes from "prop-types";

const BlogForm = ({ createBlog, user }) => {
  const [newBlogTitle, setNewBlogTitle] = useState("");
  const [newBlogAuthor, setNewBlogAuthor] = useState("");
  const [newBlogUrl, setNewBlogUrl] = useState("");

  const handleBlogAuthorChange = (e) => {
    setNewBlogAuthor(e.target.value);
  };
  const handleBlogTitleChange = (e) => {
    setNewBlogTitle(e.target.value);
  };

  const handleBlogUrlChange = (e) => {
    setNewBlogUrl(e.target.value);
  };

  const addBlog = (event) => {
    event.preventDefault();
    createBlog({
      title: newBlogTitle,
      author: newBlogAuthor,
      url: newBlogTitle,
    });
    setNewBlogTitle("");
    setNewBlogUrl("");
    setNewBlogAuthor("");
  };

  return (
    <div>
      <form onSubmit={addBlog}>
        <h2>Create a new blog</h2>
        title: <input value={newBlogTitle} onChange={handleBlogTitleChange} />
        author:{" "}
        <input value={newBlogAuthor} onChange={handleBlogAuthorChange} />
        url: <input value={newBlogUrl} onChange={handleBlogUrlChange} />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
};

export default BlogForm;
