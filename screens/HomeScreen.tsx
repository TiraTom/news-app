import * as React from 'react';
import {
  StyleSheet,
  FlatList,
  SafeAreaView,
  Platform,
  StatusBar,
  RefreshControl,
} from 'react-native';
import ListItem from '../components/ListItem';
import { Article } from '../types/article';
import Constants from 'expo-constants';
import axios from 'axios';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/navigation';
import { useState, useEffect, useRef } from 'react';
import Loading from '../components/Loading';

const URL = `https://newsapi.org/v2/top-headlines?country=jp&apiKey=${Constants.manifest?.extra?.newsApiKey}`;

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'Home'>;
};

const HomeScreen = (props: Props) => {
  const { navigation } = props;
  const pageRef = useRef(1);
  const fetchAllRef = useRef(false);
  const [refreshing, setRefreshing] = useState(false);

  const [articles, setArticles] = useState<Article[]>([]);
  useEffect(() => {
    setLoading(true);
    fetchArticles(1);
    setLoading(false);
  }, []);

  const fetchArticles = async (page: Number) => {
    try {
      const response = await axios.get(`${URL}&page=${page}`);

      if (response.data.articles.length > 0) {
        setArticles((prevArticles) => [
          ...prevArticles,
          ...response.data.articles,
        ]);
      } else {
        fetchAllRef.current = true;
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onEndReached = () => {
    if (!fetchAllRef.current) {
      pageRef.current = pageRef.current + 1;
      fetchArticles(pageRef.current);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    setArticles([]);
    pageRef.current = 1;
    fetchAllRef.current = false;
    await fetchArticles(1);
    setRefreshing(false);
  };

  const [loading, setLoading] = useState<Boolean>(true);

  return (
    <SafeAreaView style={styles.container}>
      {loading && <Loading />}
      <FlatList
        data={articles}
        renderItem={({ item }: { item: Article }) => (
          <ListItem
            author={item.author}
            urlToImage={item.urlToImage}
            title={item.title}
            onPress={() => navigation.navigate('Article', { article: item })}
          />
        )}
        keyExtractor={(_, index) => index.toString()}
        onEndReached={onEndReached}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    backgroundColor: '#fff',
  },
});

export default HomeScreen;
