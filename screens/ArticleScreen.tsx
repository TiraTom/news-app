import * as React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import { RootStackParamList } from '../types/navigation';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { addClip, deleteClip } from '../store/actions/user';
import { State } from '../types/state';
import ClipButton from '../components/ClipButton';
import Loading from '../components/Loading';

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'Article'>;
  route: RouteProp<RootStackParamList, 'Article'>;
};

const ArticleScreen = (props: Props) => {
  const article = props.route.params.article;

  const user = useSelector((state: State) => state.user);
  const { clips } = user;

  const isClipped = () => {
    return clips.some((clip) => clip.url === props.route.params.article.url);
  };

  const toggleClip = () => {
    if (isClipped()) {
      dispatch(deleteClip(article));
    } else {
      dispatch(addClip(article));
    }
  };

  const dispatch = useDispatch();

  return (
    <SafeAreaView style={styles.container}>
      <ClipButton onPress={toggleClip} enabled={isClipped()} />
      <WebView
        source={{
          uri: article.url,
        }}
        startInLoadingState={true}
        renderLoading={() => <Loading />}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default ArticleScreen;
