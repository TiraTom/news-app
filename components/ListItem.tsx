import * as React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

type Props = {
  author: string;
  urlToImage?: string;
  title: string;
  onPress: () => void;
};

const ListItem = (props: Props) => {
  return (
    <TouchableOpacity style={styles.itemContainer} onPress={props.onPress}>
      <View style={styles.leftContainer}>
        {!!props.urlToImage && (
          <Image
            style={styles.tinyLogo}
            source={{
              uri: props.urlToImage,
            }}
          />
        )}
      </View>
      <View style={styles.rightContainer}>
        <Text style={styles.text} numberOfLines={3}>
          {props.title}
        </Text>
        <Text style={styles.subText}>{props.author}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    height: 100,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    flexDirection: 'row',
  },
  leftContainer: {
    width: 100,
  },
  rightContainer: {
    flex: 1,
    padding: 5,
    justifyContent: 'space-between',
  },
  tinyLogo: {
    width: 100,
    height: 100,
  },
  text: {
    fontSize: 14,
  },
  subText: {
    fontSize: 12,
    color: 'gray',
  },
});

export default ListItem;
