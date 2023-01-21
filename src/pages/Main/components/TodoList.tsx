/* eslint-disable react/jsx-props-no-spreading */
import React, { useRef, useState } from 'react';
import { styled } from '@mui/material/styles';
import {
  Box, Typography, IconButton,
} from '@mui/material';

import SettingsIcon from '@mui/icons-material/Settings';

import { colors } from 'shared';

import { MenuWithNews } from './MenuWithNews';

import { Tasks } from './Tasks';

const TodoContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  borderRadius: '30px',
  width: '390px',
  height: '844px',
  maxHeight: '844px',
  overflowY: 'auto',
  '&::-webkit-scrollbar': {
    width: '0.4em',
  },
  '&::-webkit-scrollbar-track': {
    boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
    webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: '#424242',

    boxShadow: 'inset 0 0 6px rgba(0, 0, 0, 0.3)',
    borderRadius: '20px',
  },
  margin: '0 auto',
  flexDirection: 'column',
  padding: '13px 17px 37px 39px',
  backgroundColor: `${colors.todoBg}`,
  color: '#f4f4f4',
  gap: '32px',
});

const TodoHeaderContainer = styled(Box)({
  display: 'flex',
  width: '100%',
  justifyContent: 'space-between',
  position: 'sticky',
  top: '10px',
});

const TodoHeaderTitle = styled(Typography)({
  fontFamily: 'Actor',
  fontSize: '36px',
  lineHeight: '43px',
  fontWeight: '400',

});

const TodoSettingsIcon = styled(SettingsIcon)({
  fill: '#f4f4f4',
  width: '30px',
  height: '30px',
});

const TodoList = () => {
  const [isMenuOpened, setMenuOpened] = useState(false);
  const iconRef = useRef<SVGSVGElement | null>(null);
  const openMenuHandler = () => setMenuOpened((prev) => !prev);

  const dayInMonth = Array(30).fill('').map((_, index) => (index <= 9 ? `0${index + 1}` : `${index + 1}`));
  const generateCurrentDate = (currentDay: string) => {
    const monthFromDate = new Date().getMonth() + 1;
    const curMonth = monthFromDate <= 9 ? `0${monthFromDate}` : `${monthFromDate}`;
    return `${curMonth} / ${currentDay}`;
  };
  return (
    <TodoContainer>
      <TodoHeaderContainer>
        <TodoHeaderTitle>To Do</TodoHeaderTitle>
        <IconButton>
          <TodoSettingsIcon onClick={openMenuHandler} ref={iconRef} />
          {iconRef.current && (
          <MenuWithNews
            isOpen={isMenuOpened}
            closeHandler={openMenuHandler}
            anchor={iconRef.current}
          />
          )}

        </IconButton>
      </TodoHeaderContainer>
      <Tasks day="today" />
      {dayInMonth.map((day) => <Tasks key={day} day={generateCurrentDate(day)} />)}
    </TodoContainer>
  );
};
export { TodoList };
