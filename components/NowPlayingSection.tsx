import { useCallback, useRef } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import Carousel, {
  ICarouselInstance,
  Pagination,
  TAnimationStyle,
} from "react-native-reanimated-carousel";
import SectionTitle from "./ui/SectionTitle";
import { window } from "../constants/sizes";
import useMovies from "../hooks/useMovies";

import {
  configureReanimatedLogger,
  ReanimatedLogLevel,
} from "react-native-reanimated";

configureReanimatedLogger({
  level: ReanimatedLogLevel.warn,
  strict: false,
});

const scale = 0.44;
const WINDOW_WIDTH = window.width;
const ITEM_WIDTH = WINDOW_WIDTH * scale;
const ITEM_HEIGHT = 240 * scale;

export default function MovieList({
  onPressNavigation,
}: {
  onPressNavigation: (movieId: string) => void;
}) {
  const { nowPlayingMovies } = useMovies();

  const progress = useSharedValue<number>(0);
  const ref = useRef<ICarouselInstance>(null);

  const onPressPagination = (index: number) => {
    ref.current?.scrollTo({
      count: index - progress.get(),
      animated: true,
    });
  };

  const animationStyle: TAnimationStyle = useCallback((value: number) => {
    "worklet";

    const zIndex = Math.round(interpolate(value, [-1, 0, 1], [10, 20, 30]));
    const rotateZ = `${interpolate(value, [-1, 0, 1], [-5, 0, 5])}deg`;
    const translateX = interpolate(
      value,
      [-1, 0, 1],
      [-WINDOW_WIDTH * 0.52, 0, WINDOW_WIDTH * 0.52]
    );

    const translateY = interpolate(value, [-1, 0, 1], [10, 0, 10]);
    const opacity = interpolate(value, [-1, 0, 1], [0.5, 1, 0.5]);

    return {
      transform: [{ rotateZ }, { translateX }, { translateY }],
      zIndex,
      opacity,
    };
  }, []);

  return (
    <View style={styles.container}>
      <SectionTitle
        title="Now Playing"
        hasSeeAll={true}
        style={{ marginHorizontal: 24 }}
      />
      <View>
        <Carousel
          ref={ref}
          loop
          onProgressChange={(_, val) => progress.set(val)}
          style={{
            width: window.width,
            height: 348,
            justifyContent: "center",
          }}
          width={ITEM_WIDTH}
          height={ITEM_HEIGHT}
          data={nowPlayingMovies.list}
          renderItem={({ item, index, animationValue }) => {
            const maskStyle = useAnimatedStyle(() => {
              const opacity = interpolate(
                animationValue.get(),
                [-1, 0, 1],
                [0, 1, 0]
              );

              return {
                opacity,
              };
            }, [animationValue]);

            return (
              <TouchableOpacity
                key={index}
                style={styles.item}
                onPress={() => onPressNavigation(item.id)}
              >
                <Image
                  style={styles.imageContainer}
                  source={{ uri: item.posterPath }}
                />
                <Animated.View style={[styles.details, maskStyle]}>
                  <Text
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    style={styles.name}
                  >
                    {item.title}
                  </Text>
                  <Text
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    style={styles.genres}
                  >
                    {item.genres}
                  </Text>
                </Animated.View>
              </TouchableOpacity>
            );
          }}
          autoPlay={false}
          customAnimation={animationStyle}
        />
        <Pagination.Custom
          progress={progress}
          data={[...new Array(5).keys()]}
          size={10}
          dotStyle={{
            borderRadius: 5,
            backgroundColor: "#303030",
          }}
          activeDotStyle={{
            borderRadius: 8,
            width: 20,
            height: 10,
            overflow: "hidden",
            backgroundColor: "#ffb43a",
          }}
          containerStyle={{
            gap: 8,
            alignItems: "center",
            height: 10,
          }}
          horizontal
          onPress={onPressPagination}
          customReanimatedStyle={(progress, index, length) => {
            let val = Math.abs(progress - index);
            if (index === 0 && progress > length - 1) {
              val = Math.abs(progress - length);
            }

            return {
              transform: [
                {
                  translateY: interpolate(
                    val,
                    [0, 1],
                    [0, 0],
                    Extrapolation.CLAMP
                  ),
                },
              ],
            };
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#121212",
    gap: 22,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fefefe",
    marginBottom: 16,
  },
  item: {
    gap: 12,
    alignItems: "center",
  },
  imageContainer: {
    width: "100%",
    aspectRatio: 2 / 3,
    borderRadius: 12,
  },
  details: {
    gap: 2,
    alignItems: "center",
  },
  name: {
    color: "#fefefe",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  genres: {
    color: "#919191",
    fontSize: 14,
    textAlign: "center",
  },
});
