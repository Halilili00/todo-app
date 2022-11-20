import React, {useRef, useEffect} from 'react'
import { Item } from '../types/Item';
import { Box, Button, Modal, TextField, Typography } from '@mui/material';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  };

interface Props {
    todo: Item;
    setTodo: React.Dispatch<React.SetStateAction<Item>>;
    modal: boolean;
    handleClose: () => void;
    handleSubmit: (e: React.FormEvent) => void;
}

// Kaksi vaihtoehto miten voi käyttää
//const CustomModal: React.FC<ItemProps> = ({activeItem, modal, handleClose}) => {
const CustomModal = ({todo, setTodo, modal, handleClose, handleSubmit}: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let { name, value } = event.target;
        const changedItem = { ...todo, [name]: value };
        setTodo(changedItem);
    
        console.log(todo);
      };

  useEffect(() => {
    inputRef.current?.focus(); //yritä myöhemmin miksi focus ei toimi
    console.log("modal")
  }, [])
  
    
  return (
    <Modal open={modal} onClose={handleClose} >
        <Box sx={{ ...style}}>
          <form onSubmit={handleSubmit}>
            <Typography variant='h3'>Add todo</Typography>
            <TextField type="text" label="Title" name='title' value={todo.title} onChange={handleChange} required ref={inputRef}/>
            <TextField label="Description" name='description' value={todo.description} onChange={handleChange} fullWidth/>
            <Button variant='contained' type='submit'>Submit</Button>
          </form>
        </Box>
    </Modal>
  )
}

export default CustomModal