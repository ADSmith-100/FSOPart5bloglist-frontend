import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setNotification } from "../reducers/notificationReducer";

//presentational component - not aware that event handler dispatches action
const Blog = ({ blog, handleClick }) => {
  return (
    <>
      <div>{blog.content}</div>
      <div>
        has {blog.votes}
        <button onClick={handleClick}>vote</button>
      </div>
    </>
  );
};

//container component - contains app logic.  coordinates presentational component anecdotes
const BlogList = (props) => {
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs);
  //   const filter = useSelector((state) => state.filterTerms);

  let blogsByVotes = [...blogs];
  blogsByVotes.sort(
    (a, b) => (a.votes < b.votes ? 1 : b.votes < a.votes ? -1 : 0)
    //could also use return a.likes.localeCompare(b.likes)I think
  );

  //   let filteredAnecdotesByVotes = anecdotesByVotes.filter((a) =>
  //     a.content.toLowerCase().includes(filter.toLowerCase())
  //   );

  return (
    <>
      {blogsByVotes.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          handleClick={() => {
            // dispatch(vote4(anecdote));
            // dispatch(setNotification(`you voted '${anecdote.content}'`, 10));
            // dispatch(notifyVote(anecdote.content));
            // setTimeout(() => {
            //   dispatch(notifyRemove());
            // }, 5000);
          }}
        />
      ))}
    </>
  );
};

export default BlogList;
