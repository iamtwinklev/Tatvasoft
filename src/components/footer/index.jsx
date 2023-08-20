import React from 'react'
import { Link } from 'react-router-dom'
import logo from "../../assets/images/logo.jpg"

const Footer = () => {
  return (
    <div>
      <footer>
        <div>
          <div>
            <div style={{
                  display:"flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: "5%"
            }}>
              <div>
                <Link to="/" title='logo'>
                  <img style={{width: "110px"}} src={logo} alt='logoImg'/>
                </Link>
              </div>
              <p>
                2023 Tatvasoft.com. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Footer
