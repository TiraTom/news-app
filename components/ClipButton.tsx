import * as React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

type Props = {
  onPress: () => void;
  enabled: boolean;
};

const ClipButton = (props: Props) => {
  const name = props.enabled ? 'bookmark' : 'bookmark-o';

  return (
    <TouchableOpacity onPress={props.onPress} style={styles.container}>
      <FontAwesome name={name} size={40} color="gray" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 5,
  },
});

export default ClipButton;
