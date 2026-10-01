import React, { useState } from 'react';
import { View, Image, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { colors } from '../constants/theme';

interface Props {
  images: string[];
}

export function ImageGallery({ images }: Props) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  if (!images || images.length === 0) {
    return null;
  }

  const previewImages = images.slice(0, 5);

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: previewImages[selectedIndex] || previewImages[0] }}
        style={styles.mainImage}
      />

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.thumbnailRow}>
        {previewImages.map((uri, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => setSelectedIndex(index)}
            style={[
              styles.thumbnailWrapper,
              selectedIndex === index && styles.thumbnailSelected,
            ]}
          >
            <Image source={{ uri }} style={styles.thumbnail} />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  mainImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    backgroundColor: colors.surfaceSecondary,
    marginBottom: 8,
  },
  thumbnailRow: {
    flexDirection: 'row',
  },
  thumbnailWrapper: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 6,
    marginRight: 8,
    overflow: 'hidden',
  },
  thumbnailSelected: {
    borderColor: colors.blue,
    borderWidth: 2,
  },
  thumbnail: {
    width: 60,
    height: 45,
    backgroundColor: colors.surfaceSecondary,
  },
});