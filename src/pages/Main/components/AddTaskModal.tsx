/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';

import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { useForm } from 'react-hook-form';
import { styled } from '@mui/material/styles';
import FormControl from '@mui/material/FormControl';

import FormHelperText from '@mui/material/FormHelperText';
import TextField from '@mui/material/TextField';

import { TaskCardProps } from './TaskCard';

interface AddTaskModalProps {
    isOpened: boolean
    addTask: (data: TaskCardProps)=> void
    closeModal: ()=>void
}

const DialogButton = styled(Button)({
  backgroundColor: '#424242',
  color: '#fff',
});
const AddTaskDialog = styled(Dialog)({

});
const AddTaskDialogContent = styled(DialogContent)({});
const AddTaskDialogTitle = styled(DialogTitle)({
  paddingBottom: '8px',

});
const AddTaskFormGroup = styled(DialogContent)({
  display: 'flex',
  flexDirection: 'column',
  gap: '30px',
  padding: 0,
  width: '100%',

});

const AddTaskInput = styled(TextField)({
  marginTop: '5px',
});
function AddTaskModal({ isOpened, addTask, closeModal }: AddTaskModalProps) {
  const { register, handleSubmit } = useForm<TaskCardProps>();
  return (
    <AddTaskDialog open={isOpened} onClose={closeModal} aria-labelledby="add task">
      <AddTaskDialogTitle id="add-task">Add Task</AddTaskDialogTitle>
      <AddTaskDialogContent>
        <FormControl component="fieldset">
          <AddTaskFormGroup>
            <AddTaskInput
              id="task-name"
              {...register('label', { required: true })}
              required
              fullWidth
              label="Task Name"
            />
            <AddTaskInput
              id="task-description"
              {...register('description', { required: true })}
              required
              fullWidth
              label="Task Description"
            />
          </AddTaskFormGroup>
          <FormHelperText> </FormHelperText>
        </FormControl>
      </AddTaskDialogContent>
      <DialogActions>
        <DialogButton onClick={closeModal}>
          Cancel
        </DialogButton>
        <DialogButton onClick={handleSubmit((task) => addTask(task))}>
          Add task
        </DialogButton>
      </DialogActions>
    </AddTaskDialog>
  );
}

export { AddTaskModal };
