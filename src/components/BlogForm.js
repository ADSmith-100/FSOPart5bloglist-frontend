import React, { useState } from "react";

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
      url: newBlogUrl,
    });
    setNewBlogTitle("");
    setNewBlogUrl("");
    setNewBlogAuthor("");
  };

  return (
    <div className="formDiv">
      <form onSubmit={addBlog}>
        <h2>Create a new blog</h2>
        title: <input value={newBlogTitle} onChange={handleBlogTitleChange} id='title'/>
        author:{" "}
        <input id='author' value={newBlogAuthor} onChange={handleBlogAuthorChange} />
        url: <input id='url' value={newBlogUrl} onChange={handleBlogUrlChange} />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

// BlogForm.propTypes = {
//   createBlog: PropTypes.func.isRequired,
// };

export default BlogForm;
