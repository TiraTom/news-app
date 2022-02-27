import * as React from 'react';
import { SafeAreaView, StyleSheet, FlatList } from 'react-native';
import { useSelector } from 'react-redux';
import { State } from '../types/state';
import ListItem from '../components/ListItem';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/navigation';
import { RouteProp } from '@react-navigation/native';

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'Clip'>;
  route: RouteProp<RootStackParamList, 'Clip'>;
};

const ClipScreen = (props: Props) => {
  const user = useSelector((state: State) => state.user);
  const { clips } = user;

  return (
    <SafeAreaView>
      <FlatList
        data={clips}
        renderItem={({ item }) => (
          <ListItem
            author={item.author}
            urlToImage={item.urlToImage}
            title={item.title}
            onPress={() =>
              props.navigation.navigate('Article', { article: item })
            }
          />
        )}
        keyExtractor={(_, index) => index.toString()}
      ></FlatList>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default ClipScreen;
