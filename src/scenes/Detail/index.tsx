import React, {useRef, useEffect, useCallback} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  ScrollView,
  Animated,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import {DATA, IIcon} from '../../config/travel';
import {ICON_SIZE, SPACING, width} from '../../config/theme';

import {Icon} from '../../components/Icon';
import {SharedElement} from 'react-navigation-shared-element';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  icons: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    marginVertical: 20,
  },
});

function Detail({navigation, route}) {
  const {item} = route.params;
  const ref = useRef();
  const selectedItemIndex = DATA.findIndex((i) => i.id === item.id);
  const mountedAnimated = useRef(new Animated.Value(0)).current;
  const activeIndex = useRef(new Animated.Value(selectedItemIndex)).current;
  const activeIndexAnimation = useRef(new Animated.Value(selectedItemIndex))
    .current;

  const animation = useCallback(
    (toValue, delay = 0) =>
      Animated.timing(mountedAnimated, {
        toValue,
        duration: 500,
        delay,
        useNativeDriver: true,
      }),
    [mountedAnimated],
  );

  useEffect(() => {
    return navigation.addListener('beforeRemove', () => {
      animation(0).start();
    });
  }, [navigation, animation]);
  useEffect(() => {
    Animated.parallel([
      Animated.timing(activeIndexAnimation, {
        toValue: activeIndex,
        duration: 300,
        useNativeDriver: true,
      }),
      animation(1, 500),
    ]).start();
  }, [animation, activeIndexAnimation, activeIndex]);

  const translateY = mountedAnimated.interpolate({
    inputRange: [0, 1],
    outputRange: [50, 0],
  });

  const size = ICON_SIZE + SPACING * 2;
  const translateX = activeIndexAnimation.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: [size, 0, -size],
  });

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View
        style={[
          styles.icons,
          {
            marginLeft: width / 2 - ICON_SIZE / 2 - SPACING,
            transform: [{translateX}],
          },
        ]}>
        {DATA.map((item, index) => {
          const inputRange = [index - 1, index, index + 1];
          const opacity = activeIndexAnimation.interpolate({
            inputRange,
            outputRange: [0.3, 1, 0.3],
            extrapolate: 'clamp',
          });
          return (
            <TouchableOpacity
              key={item.id}
              activeOpacity={0.9}
              style={{padding: SPACING}}
              onPress={() => {
                activeIndex.setValue(index);
                ref?.current?.scrollToIndex({
                  index,
                  animated: true,
                });
              }}>
              <Animated.View style={{alignItems: 'center', opacity}}>
                <SharedElement id={`item.${item.id}.icon`}>
                  <Icon uri={item.imageUri} />
                </SharedElement>
                <Text
                  style={{
                    fontSize: 10,
                  }}>
                  {item.title}
                </Text>
              </Animated.View>
            </TouchableOpacity>
          );
        })}
      </Animated.View>
      <Animated.FlatList<IIcon>
        style={{opacity: mountedAnimated, transform: [{translateY}]}}
        ref={ref}
        data={DATA}
        keyExtractor={(i) => i.id}
        horizontal
        pagingEnabled
        initialScrollIndex={selectedItemIndex}
        nestedScrollEnabled
        getItemLayout={(data, index) => ({
          length: width,
          offset: width * index,
          index,
        })}
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(ev) => {
          const newIndex = Math.floor(ev.nativeEvent.contentOffset.x / width);

          activeIndex.setValue(newIndex);
        }}
        renderItem={({item}) => (
          <ScrollView
            style={{
              width: width - SPACING * 2,
              margin: SPACING,
              backgroundColor: 'rgba(0,0,0,0.05)',
              borderRadius: 16,
            }}>
            <View style={{padding: SPACING}}>
              <Text style={{fontSize: 16}}>
                {Array(50).fill(`${item.title} inner text \n`)}
              </Text>
            </View>
          </ScrollView>
        )}
      />
    </SafeAreaView>
  );
}

Detail.sharedElements = (route, otherRoute, showing) => {
  // const {item} = route.params;
  return DATA.map((item) => `item.${item.id}.icon`);
};
export default Detail;
