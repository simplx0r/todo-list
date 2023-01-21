/* eslint-disable react/jsx-props-no-spreading */
import {
  Box, Checkbox, checkboxClasses, Collapse, FormControlLabel,
  IconButton, List, ListItemButton, listItemClasses, ListItemIcon, ListItemText, Slide, touchRippleClasses,
} from '@mui/material';
import { styled } from '@mui/system';
import React, { useState } from 'react';
import AddCircleOutline from '@mui/icons-material/AddCircleOutline';
import StarBorder from '@mui/icons-material/StarBorder';
import { FixedSizeList, ListChildComponentProps } from 'react-window';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import { useAlert } from 'app/providers';
import { AddTaskModal } from './AddTaskModal';
import { TaskBar, TaskCard } from './TaskCard';

const CheckboxTitle = styled(FormControlLabel)({
  fontFamily: 'Abhaya',
  fontSize: '24px',
  lineHeight: '28px',
  fontWeight: 600,
  color: '#f4f4f4',
});
const AddSvg = styled(AddCircleOutline)({
  color: '#fff',

});
const AddButton = styled(IconButton)({
  visibility: 'visible',
  '&:hover': {
    visibility: 'visible',
  },
});
interface Task {
    label: string;
    description: string;
}
interface TasksProps {
    day: string | 'today';
}

const TasksContainer = styled(Box)({
  display: 'flex',
  width: '90%',
  flexDirection: 'column',
  boxShadow: '16px 16px 20px rgba(0, 0, 0, 0.15), -8px -8px 20px rgba(255, 255, 255, 0.05)',
  borderRadius: '40px',
  padding: '16px 17px',
  gap: '16px',
  background: '#282828',
  overflowY: 'clip',

});

const TodayTasksContainer = styled(Box)(({ isShadowed }: {isShadowed: boolean}) => ({
  display: 'flex',
  flexDirection: 'column',
  width: '350px',
  boxShadow: isShadowed ? '16px 16px 20px rgba(0, 0, 0, 0.15), -8px -8px 20px rgba(255, 255, 255, 0.05)' : '',
  borderRadius: '25px',
}));

const TodayCheckbox = styled(Checkbox)({
  [`&, &.${checkboxClasses.checked}`]: {
    color: '#f4f4f4',
  },
  [`&, &.${touchRippleClasses.ripple}`]: {
    borderRadius: '16px',
  },

});
const OtherDaysTasksButton = styled(ListItemButton)({
  display: 'flex',
  [`&, &.${listItemClasses.root}`]: {
    width: '100% !important',
  },
});
const OtherDaysTasksName = styled(Box)({
  display: 'flex',
  gap: '10px',
  justifyContent: 'space-between',
  width: '100%',

});

const OtherDaysTaskContainer = styled(Box)({
  display: 'flex',
  gap: '16px',
});
const Tasks = ({ day }: TasksProps) => {
  const [isChecked, setChecked] = useState(false);
  const [showModal, setShowModalTask] = useState(false);
  const checkboxHandler = () => setChecked((prev) => !prev);
  const changeShowModal = () => setShowModalTask((prev) => !prev);
  const [tasks, setTasks] = useState<Task[]>([]);

  const { success } = useAlert();
  const addTaskHandler = (data: Task) => {
    setTasks((prev) => [...prev, data]);
    success('Задача успешно добавлена', 3);
  };

  return (

    <TodayTasksContainer isShadowed={day !== 'today'}>
      {day === 'today' ? (
        <CheckboxTitle
          label="Today tasks:"
          control={(
            <TodayCheckbox
              checked={isChecked}
              onChange={checkboxHandler}
              size="medium"
            />
          )}
        />
      ) : (
        <>
          <OtherDaysTasksButton onClick={checkboxHandler}>
            <OtherDaysTasksName>
              <OtherDaysTaskContainer>
                <TaskBar color="#fff" />
                {`${day} tasks` }
              </OtherDaysTaskContainer>
              {isChecked ? <ExpandLess /> : <ExpandMore />}
            </OtherDaysTasksName>
          </OtherDaysTasksButton>
          <Collapse in={isChecked}>
            <List component={Box} disablePadding>
              <ListItemButton sx={{ pl: 4 }} />
            </List>
          </Collapse>
        </>
      )}

      {showModal && (
        <AddTaskModal
          isOpened={showModal}
          addTask={addTaskHandler}
          closeModal={changeShowModal}
        />
      )}
      {isChecked && (
        <Collapse in={isChecked}>
          <TasksContainer>
            {tasks.map((task) => <TaskCard {...task} />)}
            <AddButton aria-label="add task" onClick={changeShowModal}><AddSvg /></AddButton>
          </TasksContainer>
        </Collapse>
      )}
    </TodayTasksContainer>

  );
};
export { Tasks };
