import React, {
  createContext, Dispatch, PropsWithChildren,
  SetStateAction, useContext, useEffect, useMemo, useState,
} from 'react';
import { useQuery } from 'react-query';

interface News {
articles: {
    title: string;
    url: string;
    urlToImage: string;
}
}
interface NewsContext {
    isLoading: boolean;
    setNews:Dispatch<React.SetStateAction<News[] | undefined>> | undefined;
    allNews: News[] | undefined
}
const initialValue = {
  isLoading: false,
  setNews: undefined,
  allNews: [] as News[],
};
const NewsContext = createContext<NewsContext>(initialValue);

const NewsProvider = ({ children }: PropsWithChildren) => {
  const [news, setNews] = useState<News[]>();

  const getNews = async () => {
    const { data } = await fetch('https://newsapi.org/v2/everything?q=Apple&from=2023-01-14&sortBy=popularity&apiKey=API_KEY').catch((e) => e).then((res) => res);
    setNews(data);
    return news;
  };

  const { isLoading, data } = useQuery(['news'], getNews);
  const newsContext = useMemo(() => ({ allNews: news, setNews, isLoading }), [isLoading, news]);
  return (
    <NewsContext.Provider value={newsContext}>{children}</NewsContext.Provider>
  );
};

const useNews = () => ({ ...useContext(NewsContext) });

export { NewsProvider, useNews };
