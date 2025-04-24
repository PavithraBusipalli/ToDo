import React, { useState, useContext } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import todoCardStyles from "./Todo-cardStyles.module.scss";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import DoneIcon from '@mui/icons-material/Done';
import Modal from '@mui/material/Modal';
import VisibilityIcon from '@mui/icons-material/Visibility';


interface Todo {
    title: string,
    description: string,
    status: string,
}
interface TodoCardProps {
    task: Todo;
    onDelete: () => void;
    onUpdate: (updatedTask: Partial<Todo>) => Promise<void>;
}
const TodoCard: React.FC<TodoCardProps> = ({task, onDelete, onUpdate}) => {
    const [open, setOpen] = useState(false);
    const [editedTask, setEditedTask] = useState({title: task.title, Description: task.description});
    const [viewDescriptionOpen, setViewDescriptionOpen] = useState(false);

const handleViewDescriptionOpen = () => setViewDescriptionOpen(true);
const handleViewDescriptionClose = () => setViewDescriptionOpen(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleSave = () => {
        onUpdate({
            title: editedTask.title,
            description: editedTask.Description,
            status: task.status, // Keep the current status
        });
        handleClose();
    }

    const handleDone = () => {
        onUpdate({
            status: 'Completed'
        })
    }


    return (
        <Box display={'flex'} flexDirection={'row'} className={todoCardStyles['taskContainer']}>
            <Box display={'flex'} justifyContent={'space-between'} width="100%" padding={'1rem'}>
                <Typography variant="h6">{task.title}</Typography>
            </Box>
            <Box display={"flex"} gap="0.5rem" className={todoCardStyles['boxContainer']}>
                <Button variant="outlined" onClick={handleViewDescriptionOpen}>{task.status ? <VisibilityIcon />: ''}</Button>
                {
                    task.status === 'Pending' ?  (
                        <>
                            <Button variant="outlined" onClick={handleOpen}><EditIcon /></Button>
                            <Button variant="outlined" onClick={onDelete}><DeleteOutlineIcon /></Button>
                            <Button variant="outlined" onClick={handleDone}><DoneIcon /></Button>
                        </>
                    ) : <>Done<DoneIcon/></>
                }
            </Box>
            <Modal
                open={viewDescriptionOpen}
                onClose={handleViewDescriptionClose}
                aria-labelledby="view-description-modal-title"
                aria-describedby="view-description-modal-description"
            >
                <Box className={todoCardStyles['modal']}>
                    <Typography variant="h6" id="view-description-modal-title">Task Description</Typography>
                    <Typography variant="body1" id="view-description-modal-description" marginTop="1rem">
                        {task.description}
                    </Typography>
                    <Box display="flex" justifyContent="flex-end" gap="1rem" mt={2}>
                        <Button variant="outlined" onClick={handleViewDescriptionClose}>Close</Button>
                    </Box>
                </Box>
            </Modal>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="edit-task-modal-title"
                aria-describedby="edit-task-modal-description"
            >
                <Box className={todoCardStyles['modal']}>
                    <Typography>Edit Task</Typography>
                    <TextField
                        label='Title'
                        fullWidth
                        margin="normal"
                        value={editedTask.title}
                        onChange={(e) => setEditedTask({...editedTask, title: e.target.value})}
                    />
                    <TextField
                        label='Description'
                        fullWidth
                        margin="normal"
                        value={editedTask.Description}
                        onChange={(e) => setEditedTask({...editedTask, Description: e.target.value})}
                    />
                    <Box display="flex" justifyContent="flex-end" gap="1rem" mt={2}>
                        <Button variant="outlined" onClick={handleClose}>Cancel</Button>
                        <Button variant="contained" onClick={handleSave}>Save</Button>
                    </Box>
                </Box>
            </Modal>
        </Box>
    )
}   

export {
    TodoCard
}