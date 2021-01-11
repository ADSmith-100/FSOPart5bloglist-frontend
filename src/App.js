import React, { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import "./App.css";
import Togglable from "./components/Togglable";
import BlogForm from "./components/BlogForm";
import Notification from "./components/Notification";
// import setNotification from "./reducers/notificationReducer";
import { initializeBlogs } from "./reducers/blogReducer";
import { useSelector, useDispatch } from "react-redux";
import BlogList from "./components/BlogList";

const App = () => {
  const dispatch = useDispatch();

  const [blogs, setBlogs] = useState([]);
  // const [newBlog, setNewBlog] = useState([]);
  const [notification, setNotification] = useState(null);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => dispatch(initializeBlogs(blogs)));
  }, [dispatch]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      console.log(user);
      blogService.setToken(user.token);
    }
  }, []);

  const notifyWith = (message, type = "success") => {
    setNotification({
      message,
      type,
    });
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

  const removeBlog = (id, name) => {
    if (window.confirm(`Are you sure you want to delete ${name}?`)) {
      blogService

        .remove(id)
        .then(() => {
          const newBlogs = blogs.filter((b) => b.id !== id);
          setBlogs(newBlogs);
        })
        .catch((error) => {
          notifyWith(`'${name}' was already removed from server`, error);
          // setErrorMessage(`'${name}' was already removed from server`);
          // setTimeout(() => {
          //   setErrorMessage(null);
          // }, 5000);
          setBlogs(blogs.filter((p) => p.id !== id));
        });
    } else {
      alert("operation cancelled");
    }
  };

  const addLikesTo = (id) => {
    const blog = blogs.find((b) => b.id === id);
    const changedBlog = {
      ...blog,
      likes: blog.likes + 1,
    };

    blogService.update(id, changedBlog).then((returnedBlog) => {
      // let jsonBlog = JSON.parse(returnedBlog);
      // nope server responds with object this throws error
      //returnedBlog from server was not in a format that the front end totally could use.  The User object was missing - only had id.
      setBlogs(blogs.map((blog) => (blog.id !== id ? blog : changedBlog)));
    });
  };

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          id="username"
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          id="password"
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button id="login-button" type="submit">
        login
      </button>
    </form>
  );

  const handleLogout = (e) => {
    e.preventDefault();
    window.localStorage.removeItem("loggedBlogappUser");
    setUser(null);
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    console.log("logging in with", username, password);
    try {
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));

      blogService.setToken(user.token);

      setUser(user);

      setUsername("");
      setPassword("");
    } catch (exception) {
      notifyWith("Wrong credentials", exception);
      // setErrorMessage("Wrong credentials");
      // setTimeout(() => {
      //   setErrorMessage(null);
      // }, 5000);
    }
  };

  const blogFormRef = useRef();

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility();
    // const correctBlogForm = { ...blogObject, user: { name: user.name } };
    console.log(JSON.stringify(blogObject));
    blogService
      .create(blogObject)
      .then((blogObject) => {
        setBlogs(blogs.concat(blogObject));

        // notifyWith(
        //   `a new blog ${blogObject.title} by ${blogObject.author} was added : )`
        // );

        blogService.getAll().then((blogs) => {
          //make a copy of blogs array to avoid mutating issues
          let blogsByLikes = [...blogs];
          blogsByLikes.sort(
            (a, b) => (a.likes < b.likes ? 1 : b.likes < a.likes ? -1 : 0)
            //could also use return a.likes.localeCompare(b.likes)I think
          );

          console.log(blogsByLikes);
          setBlogs(blogsByLikes);
        });
      })

      .catch((error) => {
        notifyWith(error.response.data.error, error);
        // setErrorMessage(error.response.data.error);
        // setTimeout(() => {
        //   setErrorMessage(null);
        // }, 5000);
      });
  };

  const blogForm = () => (
    <Togglable id="new-blog" buttonLabel="new blog" ref={blogFormRef}>
      <BlogForm createBlog={addBlog} user={user.name} />
    </Togglable>
  );

  //   <form onSubmit={addBlog}>
  //     <h2>New Blog</h2>
  //     title:
  //     <input value={newBlogTitle} onChange={handleBlogTitleChange} />
  //     author:
  //     <input value={newBlogAuthor} onChange={handleBlogAuthorChange} />
  //     url:
  //     <input value={newBlogUrl} onChange={handleBlogUrlChange} />
  //     <button type="submit">create</button>
  //   </form>
  // );

  let blogsByLikes = [...blogs];
  blogsByLikes.sort(
    (a, b) => (a.likes < b.likes ? 1 : b.likes < a.likes ? -1 : 0)
    //could also use return a.likes.localeCompare(b.likes)I think
  );

  return (
    <div>
      <h2>blogs</h2>

      <br></br>
      <Notification notification={notification} />
      {/* {errorMessage !== null ? (
        <NotificationER message={errorMessage} />
      ) : (
        <NotificationOK message={comfirmMessage} />
      )} */}
      <br></br>

      {user === null ? (
        loginForm()
      ) : (
        <div>
          {user.name} logged-in{" "}
          <button id="logout" onClick={handleLogout}>
            logout
          </button>
          {blogForm()}
          <BlogList />
          {/* <ul>
            {blogsByLikes.map((blog, i) => (
              <Blog
                key={i}
                blog={blog}
                username={user.name}
                addLikes={() => addLikesTo(blog.id)}
                removeBlog={() => removeBlog(blog.id, blog.title)}
                user={user.name}
                setBlogs={setBlogs}
              />
            ))}
          </ul> */}
        </div>
      )}
    </div>
  );
};

export default App;
