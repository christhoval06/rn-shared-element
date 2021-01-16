import React from 'react';
import {StyleSheet, Image, View} from 'react-native';

import {ICON_SIZE} from '../../config/theme';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ddd',
    width: ICON_SIZE,
    height: ICON_SIZE,
    borderRadius: ICON_SIZE / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 40,
    height: 40,
  },
});

interface IconProps {
  uri: string;
}
export function Icon({uri}: IconProps) {
  return (
    <View style={styles.container}>
      <Image source={{uri}} style={styles.icon} />
    </View>
  );
}
