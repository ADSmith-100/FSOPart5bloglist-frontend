import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'

test('BlogForm call the event handler received as props with the right details when a blog is created', ()=> {

  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Test Author',
    url: "www.test.com",
    likes: 12
  }

  const mockHandler = jest.fn()


  const component = render(
    <BlogForm blog={blog} handleBlogTitleChange={mockHandler} handleBlogAuthorChange={mockHandler} createBlog={mockHandler}handleBlogUrlChange={mockHandler}/>
  )

//   const button = component.getByText('new blog')
//   fireEvent.click(button)

  const form = component.container.querySelector('form')

  const title = component.container.querySelector('#title')

  const author = component.container.querySelector('#author')

  const url = component.container.querySelector('#url')

    fireEvent.change(title, {
        target: {value: 'Component testing is done with react-testing-library'}
    })
    fireEvent.change(author, {
        target: {value: 'Test Author'}
    })
    fireEvent.change(url, {
        target: {value: "www.test.com"}
    })

    fireEvent.submit(form)

    expect(mockHandler.mock.calls[0][0].title).toBe('Component testing is done with react-testing-library')
    expect(mockHandler.mock.calls[0][0].author).toBe('Test Author')
    console.log(mockHandler.mock.calls)
    expect(mockHandler.mock.calls[0][0].url).toBe("www.test.com")

  })