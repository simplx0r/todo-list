/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import { styled } from '@mui/system';
import {
  Box, Typography, IconButton, FormControlLabel, Checkbox, checkboxClasses, touchRippleClasses, svgIconClasses, MenuItem, Menu,
} from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import SettingsIcon from '@mui/icons-material/Settings';
import { colors } from 'shared';
import { TaskCard } from './TaskCard';
import { AddTaskModal } from './AddTaskModal';
import { MenuWithNews } from './MenuWithNews';

const TodoContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '30px',
  width: '390px',
  maxHeight: '844px',
  margin: '0 auto',
  flexDirection: 'column',
  padding: '13px 17px 37px 39px',
  backgroundColor: `${colors.todoBg}`,
  color: '#f4f4f4',
});

const TodoHeaderContainer = styled(Box)({
  display: 'flex',
  width: '100%',
  justifyContent: 'space-between',
});

const TodoHeaderTitle = styled(Typography)({
  fontFamily: 'Actor',
  fontSize: '36px',
  lineHeight: '43px',
  fontWeight: '400',
});
const TodayTasksContainer = styled(Box)({
  display: 'flex',
  width: '100%',
});
const TodayCheckbox = styled(Checkbox)({
  [`&, &.${checkboxClasses.checked}`]: {
    color: '#f4f4f4',
  },
  [`&, &.${touchRippleClasses.ripple}`]: {
    borderRadius: '16px',
  },

});

const CheckboxTitle = styled(FormControlLabel)({
  fontFamily: 'Abhaya',
  fontSize: '24px',
  lineHeight: '28px',
  fontWeight: 600,
  color: '#f4f4f4',
});
const AddSvg = styled(AddCircleOutlineIcon)({
  color: '#fff',
});
interface Task {
    label: string;
    description: string;
}

const TodayTasks = () => {
  const [isChecked, setChecked] = useState(false);
  const [showModal, setShowModalTask] = useState(false);
  const checkboxHandler = () => setChecked((prev) => !prev);
  const changeShowModal = () => setShowModalTask((prev) => !prev);
  const [tasks, setTasks] = useState<Task[]>([]);
  const addTaskHandler = (data: Task) => { setTasks((prev) => [...prev, data]); };

  return (
    <TodayTasksContainer>
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
      <IconButton aria-label="add task" onClick={changeShowModal}><AddSvg /></IconButton>
      {showModal && (
      <AddTaskModal
        isOpened={showModal}
        addTask={addTaskHandler}
        closeModal={changeShowModal}
      />
      )}
      {isChecked ? tasks.map((task) => <TaskCard {...task} />) : ''}

    </TodayTasksContainer>
  );
};

const TodoList = () => {
  const [isMenuOpened, setMenuOpened] = useState(false);
  return (
    <TodoContainer>
      <TodoHeaderContainer>
        <TodoHeaderTitle>To Do</TodoHeaderTitle>
        <IconButton>
          <SettingsIcon />
          <MenuWithNews isOpen={isMenuOpened} onClose={() => { setMenuOpened((prev) => !prev); }} />

        </IconButton>
      </TodoHeaderContainer>
      <TodayTasks />
    </TodoContainer>
  );
};
export { TodoList };
