import React from 'react'
import "./menu.scss"
import { Link } from 'react-router-dom'

export const Menu = () => {
  return (
    <div className='menu'>
      <div className="item">
      <Link to="/" className="listItem" >
        <img src='/home.svg' alt=""/>
        <span className="listItemTitle">Home</span>
      </Link>
      <Link to="/users" className="listItem" >
        <img src='/users.svg' alt=""/>
        <span className="listItemTitle">Users</span>
      </Link>
      <Link to="/posts" className="listItem">
        <img src='/posts.svg' alt=""/>
        <span className="listItemTitle">Posts</span>
      </Link>
      <Link to="/admins" className="listItem">
        <img src='/admins.svg' alt=""/>
        <span className="listItemTitle">Admins</span>
      </Link>
      </div>
    </div>
  )
}
