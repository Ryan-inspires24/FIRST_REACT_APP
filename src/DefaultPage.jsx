import React from 'react'
import {Link} from 'react-router-dom'
function DefaultPage(props){
  return(
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
          <li>
            <Link to="/products">Products</Link>
          </li>

        </ul>
      </nav>
      <div>
{props.children}
      </div>
    </div>
  )
}
export default DefaultPage
