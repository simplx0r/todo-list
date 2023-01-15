import { Typography, Checkbox } from '@mui/material';
import { Box, styled } from '@mui/system';
import React, {
  createContext, useContext, useMemo, useState,
} from 'react';

interface TaskCardProps {
    label: string;
    description: string;
}

const TaskBar = styled(Box)(({ color }: TaskBarProps) => ({
  height: '40px',
  backgroundColor: `${color}`,
  borderRadius: '3px',
  width: '5px',
}));

const TaskCardContainer = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',

});

const TaskTitle = styled(Typography)({
  fontFamily: 'Abhaya',
  fontStyle: 'normal',
  fontWeight: 600,
  fontSize: '24px',
  lineHeight: '28px',
  color: '#f4f4f4',
});

const TaskDescription = styled(Typography)({
  fontFamily: 'Abhaya',
  fontStyle: 'normal',
  fontWeight: 600,
  fontSize: '14px',
  lineHeight: '17px',
  color: 'rgba(255, 255, 255, 0.6)',
});

const TaskDescContainer = styled(Typography)({
  display: 'flex',
  flexDirection: 'column',

});

interface Colors {
    label: string;
}
interface TaskBarProps {
    color: (label: string)=>string;
}

const TaskCard = ({ label, description }: TaskCardProps) => {
  const [completed, setCompleted] = useState(false);

  const checkboxHandler = () => setCompleted((prev) => !prev);

  const generateRandomColor = (todoLabel: string) => {
    if (prevColors[todoLabel]) {
      return prevColors[todoLabel];
    }
    // eslint-disable-next-line no-bitwise
    setPrevColors({ ...prevColors, [label]: `#${((1 << 24) * Math.random() | 0).toString(16).padStart(6, '0')}` });
    return prevColors[todoLabel];
  };

  return (

    <TaskCardContainer>
      <TaskBar color={() => generateRandomColor(label)} />
      <TaskDescContainer>
        <TaskTitle>{label}</TaskTitle>
        <TaskDescription>{description}</TaskDescription>
      </TaskDescContainer>
      <Checkbox checked={completed} onChange={checkboxHandler} />
    </TaskCardContainer>

  );
};
export { TaskCard, TaskCardProps };
