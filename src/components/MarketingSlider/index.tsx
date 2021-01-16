import React from 'react';
import {StyleSheet, FlatList, View, Text} from 'react-native';

import {SLIDER_DATA, IMarketing} from '../../config/travel';
import {ITEM_WIDTH, width, SPACING} from '../../config/theme';

const styles = StyleSheet.create({
  itemContainer: {
    width: ITEM_WIDTH,
    height: ITEM_WIDTH * 0.6,
    borderRadius: 16,
    padding: SPACING,
    margin: SPACING,
  },
  itemText: {
    fontSize: 24,
    color: '#FFF',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
});

export function MarketingSlider() {
  return (
    <FlatList<IMarketing>
      data={SLIDER_DATA}
      horizontal
      showsHorizontalScrollIndicator={false}
      snapToInterval={ITEM_WIDTH + SPACING * 2}
      contentContainerStyle={{
        paddingRight: width - ITEM_WIDTH - SPACING * 2,
      }}
      keyExtractor={(item) => item.color}
      decelerationRate={'fast'}
      renderItem={({item}) => (
        <View style={[styles.itemContainer, {backgroundColor: item.color}]}>
          <Text style={styles.itemText}>{item.title}</Text>
        </View>
      )}
    />
  );
}
