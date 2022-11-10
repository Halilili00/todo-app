import React from 'react'
import { Button, Container, Typography, Paper} from '@mui/material'

const Home = () => {
  return (
    <Container fixed>
        <Typography variant='h3'>Todo App</Typography>
        <Paper>
            <Button variant='contained'>Add task</Button>
        </Paper>
    </Container>
  )
}

export default Home