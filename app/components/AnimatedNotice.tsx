import React, { useEffect, useRef, useState, useMemo } from 'react';
import { View, Text, Animated, Easing, Dimensions } from 'react-native';

const InfiniteScrollingNotice = ({ notice, style, textStyle }) => {
  if (!notice) return null;

  const scrollX = useRef(new Animated.Value(0)).current;
  const [textWidth, setTextWidth] = useState(0);
  const textWidthRef = useRef(0);
  const screenWidth = Dimensions.get('window').width;

  // UseMemo to prevent unnecessary re-renders
  const noticeText = useMemo(
    () => `   ${notice.title.toUpperCase()}: ${notice.description}   `,
    [notice.title, notice.description]
  );

  const onTextLayout = (e) => {
    const width = e.nativeEvent.layout.width;
    if (width !== textWidthRef.current) {
      textWidthRef.current = width;
      setTextWidth(width);
    }
  };

  useEffect(() => {
    if (textWidth === 0) return;

    scrollX.setValue(0); // Reset animation value to prevent stuck animation

    const animation = Animated.loop(
      Animated.timing(scrollX, {
        toValue: -textWidth,
        duration: (textWidth / screenWidth) * 6000,
        easing: Easing.linear,
        useNativeDriver: true, // Ensuring smooth performance
      })
    );

    animation.start();

    return () => {
      animation.stop();
      scrollX.setValue(0); // Reset animation on unmount
    };
  }, [textWidth]);

  return (
    <View style={[style, { overflow: 'hidden', flexDirection: 'row' }]}>
      <Animated.View
        style={{
          flexDirection: 'row',
          transform: [{ translateX: scrollX }],
        }}
      >
        <Text style={textStyle} onLayout={onTextLayout}>
          {noticeText}
        </Text>
        <Text style={textStyle}>{noticeText}</Text>
      </Animated.View>
    </View>
  );
};

export default InfiniteScrollingNotice;
