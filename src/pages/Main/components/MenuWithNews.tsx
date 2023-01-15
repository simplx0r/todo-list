import React, { createContext } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { styled } from '@mui/system';
import { Box, Link } from '@mui/material';
import { NewsProvider, useNews } from './NewsContext';

interface MenuWithNewsProps {
    isOpen: boolean;
    closeHandler: ()=>void;

}

const NewsContainer = styled(Box)({
  display: 'flex',
  width: '100%',
  height: '30px',
});

const NewsUrl = styled(Link)({});

const NewsImage = styled('img')({});

function MenuWithNews({ isOpen, closeHandler }: MenuWithNewsProps) {
  const { allNews } = useNews();
  return (
    <NewsProvider>
      <Menu id="news" keepMounted open={isOpen} onClose={closeHandler}>
        {allNews?.map(({ articles: { title, url, urlToImage } }) => (

          <NewsContainer>
            <NewsImage src={urlToImage} />

            <NewsUrl href={url}>{title}</NewsUrl>

          </NewsContainer>
        ))}

      </Menu>
    </NewsProvider>
  );
}

export { MenuWithNews };
