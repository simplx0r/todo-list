/* eslint-disable no-restricted-imports */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-bitwise */
import {
  Typography, Switch, SwitchProps,
} from '@mui/material';
import { Box, styled } from '@mui/system';
import React, {
  useState, useMemo,
} from 'react';
import { Unfinished, Finished } from 'app/assets';

interface TaskCardProps {
    label: string;
    description: string;
}

const TaskBar = styled(Box)(({ color }: {color: string}) => ({
  height: '40px',
  backgroundColor: `${color}`,
  borderRadius: '3px',
  width: '5px',
}));

const TaskCardContainer = styled(Box)({
  display: 'flex',
  width: '93%',
  justifyContent: 'space-between',

});

const TaskTitle = styled(Typography)(({ isFinished }: {isFinished: boolean}) => ({
  fontFamily: 'Abhaya',
  fontStyle: 'normal',
  fontWeight: 600,
  fontSize: '24px',
  lineHeight: '28px',
  color: '#f4f4f4',
  textDecoration: isFinished ? 'line-through' : '',
}));

const TaskDescription = styled(Typography)({
  fontFamily: 'Abhaya',
  fontStyle: 'normal',
  fontWeight: 600,
  fontSize: '14px',
  lineHeight: '17px',
  color: 'rgba(255, 255, 255, 0.6)',
});

const TodoCheckbox = styled((props: SwitchProps) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ checked }) => ({
  width: '55px',
  height: '35px',
  padding: 0,
  borderRadius: '20px',
  '& .MuiSwitch-switchBase': {
    padding: 0,
    margin: 2,
    transitionDuration: '300ms',
    '&.Mui-checked': {
      transform: 'translateX(19px)',

      '& + .MuiSwitch-track': {

        opacity: 1,
        border: 0,
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: 0.5,
      },
    },
    '&.Mui-focusVisible .MuiSwitch-thumb': {

      border: '6px solid #fff',
      boxShadow: 'inset 0px 0px 10px 3px rgba(0, 0, 0, 0.25)',
    },

  },
  '& .MuiSwitch-thumb': {
    boxSizing: 'border-box',
    width: '28px',
    height: '28px',
    margin: '2px',
    backgroundColor: '#f4f4f4',
    '&:before': {
      content: "''",
      position: 'absolute',
      width: '100%',
      height: '100%',
      left: 0,
      top: 0,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundImage: checked ? `url(${Finished})` : `url(${Unfinished})`,
    },

  },
  '& .MuiSwitch-track': {
    borderRadius: '20px',
    backgroundColor: checked ? '#10C200 !important' : '#366EFF !important',
    opacity: 1,

  },
}));

const TaskTitleContainer = styled(Box)({
  display: 'flex',
  gap: '12px',
  height: 'fit-content',
  width: '100%',
});

const TaskWithLabelContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
});
const TaskCard = ({ label, description }: TaskCardProps) => {
  const [completed, setCompleted] = useState(false);
  const checkboxHandler = () => setCompleted((prev) => !prev);
  const getColor = useMemo(() => `#${((1 << 24) * Math.random() | 0).toString(16).padStart(6, '0')}`, []);
  return (
    <TaskCardContainer>
      <TaskTitleContainer>
        <TaskBar color={getColor} />
        <TaskWithLabelContainer>
          <TaskTitle isFinished={completed}>{label}</TaskTitle>
          <TaskDescription>{description}</TaskDescription>
        </TaskWithLabelContainer>
      </TaskTitleContainer>

      <TodoCheckbox checked={completed} onChange={checkboxHandler} />
    </TaskCardContainer>
  );
};
export { TaskCard, TaskBar };
export type { TaskCardProps };
