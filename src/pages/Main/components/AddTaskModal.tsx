/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { useForm } from 'react-hook-form';
import { styled } from '@mui/system';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import FormGroup from '@mui/material/FormGroup';
import FormHelperText from '@mui/material/FormHelperText';
import TextField from '@mui/material/TextField';
import { TaskCardProps } from './TaskCard';

interface AddTaskModalProps {
    isOpened: boolean
    addTask: (data: TaskCardProps)=> void
    closeModal: ()=>void
}

const DialogButton = styled(Button)({
  backgroundColor: '#000',
});
const AddTaskInput = styled(TextField)({
  padding: '20px',
});

function AddTaskModal({ isOpened, addTask, closeModal }: AddTaskModalProps) {
  const { register, handleSubmit } = useForm<TaskCardProps>();
  return (
    <Dialog open={isOpened} onClose={closeModal} aria-labelledby="add task">
      <DialogTitle id="add-task">Add Task</DialogTitle>
      <DialogContent>
        <FormControl component="fieldset">
          <FormGroup>
            <AddTaskInput
              id="task-name"
              label="Task name"
              {...register('label', { required: true })}
              required

            />
            <AddTaskInput
              id="task-name"
              label="Task description..."
              {...register('description', { required: true })}
              required

            />
          </FormGroup>
          <FormHelperText> </FormHelperText>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <DialogButton onClick={closeModal}>
          Cancel
        </DialogButton>
        <DialogButton onClick={handleSubmit((task) => addTask(task))}>
          Add task
        </DialogButton>
      </DialogActions>
    </Dialog>
  );
}

export { AddTaskModal };
