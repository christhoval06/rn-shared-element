import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {SharedElement} from 'react-navigation-shared-element';

import {DATA} from '../../config/travel';
import {SPACING} from '../../config/theme';

import {MarketingSlider} from '../../components/MarketingSlider';
import {Icon} from '../../components/Icon';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  icons: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
});

export default function List({navigation}) {
  return (
    <SafeAreaView style={styles.container}>
      <MarketingSlider />

      <View style={styles.icons}>
        {DATA.map((item) => (
          <TouchableOpacity
            activeOpacity={0.9}
            key={item.id}
            style={{padding: SPACING}}
            onPress={() => navigation.push('Detail', {item})}>
            <SharedElement id={`item.${item.id}.icon`}>
              <Icon uri={item.imageUri} />
            </SharedElement>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
}
