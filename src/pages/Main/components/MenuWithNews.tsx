import React from 'react';
import Menu from '@mui/material/Menu';

import { styled } from '@mui/material/styles';
import {
  Box, CircularProgress, Collapse, Link,
} from '@mui/material';
import { useQuery } from 'react-query';
import axios from 'axios';

interface MenuWithNewsProps {
    isOpen: boolean;
    closeHandler: ()=>void;
    anchor: Element | undefined,
}

interface News {
    articles: {
    author: string;
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    }[]
}

const NewsContainer = styled(Box)({
  display: 'flex',
  width: '100%',
  height: '40px',
  backgroundColor: '#fff',
});

const NewsMenu = styled(Menu)({
  padding: 0,
  border: 'none',
});

const NewsUrl = styled(Link)({});

const NewsImage = styled('img')({});
const getNews = async () => {
  const { data } = await axios.get<News>(
    'https://newsapi.org/v2/everything?q=Apple&from=&sortBy=popularity&apiKey=a1037698c87048d89d43fffdc48fec1e',
  );
  return data;
};

function MenuWithNews({ isOpen, closeHandler, anchor }: MenuWithNewsProps) {
  const {
    isLoading, data,
  } = useQuery(['news'], getNews);

  return (
    <NewsMenu id="news" open={isOpen} onClose={closeHandler} anchorEl={anchor}>
      {isLoading && <CircularProgress />}
      {data?.articles.slice(0, 20).map(({ title, url, urlToImage }) => (
        <NewsContainer key={title}>
          <NewsImage src={urlToImage} />
          <NewsUrl href={url}>{title}</NewsUrl>
        </NewsContainer>
      ))}
    </NewsMenu>
  );
}

export { MenuWithNews };
