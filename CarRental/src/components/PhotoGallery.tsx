import React, { useState } from 'react';
import { FlatList, Image, NativeScrollEvent, NativeSyntheticEvent, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { colors, typography } from '../constants/theme';

const maxPhotos = 5;

interface Props {
  images: string[];
}

export function PhotoGallery({ images }: Props) {
  const { width } = useWindowDimensions();
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const photos = images.slice(0, maxPhotos);
  const photoWidth = width - 32;

  if (photos.length === 0) {
    return null;
  }

  const onScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    setActiveIndex(Math.round(event.nativeEvent.contentOffset.x / photoWidth));
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={photos}
        keyExtractor={(item) => item}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={onScrollEnd}
        renderItem={({ item }) => (
          <Image source={{ uri: item }} style={[styles.photo, { width: photoWidth }]} resizeMode="cover" />
        )}
      />
      <View style={styles.footer}>
        <View style={styles.dots}>
          {photos.map((photo, index) => (
            <View key={photo} style={[styles.dot, index === activeIndex && styles.dotActive]} />
          ))}
        </View>
        <Text style={styles.counter}>{activeIndex + 1}/{photos.length}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  photo: {
    height: 200,
    borderRadius: 8,
    backgroundColor: colors.surfaceSecondary,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  dots: {
    flexDirection: 'row',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.border,
    marginRight: 6,
  },
  dotActive: {
    backgroundColor: colors.blue,
  },
  counter: {
    ...typography.caption,
    color: colors.textSecondary,
  },
});
