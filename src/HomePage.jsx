import { Button } from '@mui/material';
import React from 'react'

const HomePage = () => {
    const onHomePageButtonClick = () => {
        // Navigate('/');
        alert('Button has been clicked');
    }
  return (
    <div>
      <h3>Home Page</h3>
      <Button variant="contained" onClick={onHomePageButtonClick}>Navigate to Home Page</Button>
    </div>
  )
}

export default HomePage
