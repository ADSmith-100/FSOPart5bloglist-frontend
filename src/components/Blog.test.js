import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

test('renders title and author by default', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Test Author',
    url: "www.test.com",
    likes: 12
  }

  const component = render(
    <Blog blog={blog} />
  )

  expect(component.container).toHaveTextContent(
    'Component testing is done with react-testing-library'
  )
  expect(component.container).toHaveTextContent(
    'Test Author'
  )
  const div = component.container.querySelector('.blog')
  expect(div).not.toHaveTextContent(
    'www.test.com'
  )
const div2 = component.container.querySelector('.blog')
  expect(div2).not.toHaveTextContent(
    'likes'
  )
  });

   test('after clicking the button, extra info is displayed', () => {

   
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Test Author',
    url: "www.test.com",
    likes: 12,
    user: "testUser"
  }

  const component = render(
    <Blog blog={blog} />
  )

    const button = component.getByText('view')
    fireEvent.click(button)

    const div = component.container.querySelector('.blog')
    expect(div).toHaveTextContent(
    'www.test.com'
  )
         const div2 = component.container.querySelector('.blog')
    expect(div2).toHaveTextContent(
    'likes'
    )
  })

  test('clicking the like button twice calls event handler twice', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Test Author',
    url: "www.test.com",
    likes: 12,
    user: "testUser"
  }

  const mockHandler = jest.fn()

  const component = render(
    <Blog blog={blog} handleAddLike={mockHandler} addLikes={mockHandler}/>
  )

  const button = component.getByText('view')
    fireEvent.click(button)

  const button2 = component.getByText('like')
  fireEvent.click(button2)
  fireEvent.click(button2)
  

  expect(mockHandler.mock.calls).toHaveLength(2)
})


