import React, { useMemo, useState } from 'react';

import { FlatList,  Pressable,Image, StyleSheet, View } from 'react-native';

import { COLORS, UI } from './designSystem';

import { AppButton, AppCard, AppText, Header, Tag } from './AppPrimitives';


import { allPlaces, categories } from './screenData';
import CategoryScreen from './CategoryScreen';
import { ArrowPathRoundedSquareIcon } from 'react-native-heroicons/outline';

type Props = {
  onOpenLocation: (location: any) => void;
};

export default function ExploreScreen({ onOpenLocation }: Props) {
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
  const selectedCategory = useMemo(
    () => categories.find(category => category.id === selectedCategoryId) || null,
    [selectedCategoryId],
  );

  if (selectedCategory) {
    return (
      <CategoryScreen
        category={selectedCategory}
        onBack={() => setSelectedCategoryId(null)}
        onOpenLocation={onOpenLocation}
      />
    );
  }

  return (
    <View style={styles.screen}>
      <Header title="Explore Woodland Routes" subtitle="Choose a category and open curated locations" />
      {/* <AppText style={[typography.titleLarge, styles.exploreTitle]}>Explore Woodland Routes</AppText> */}
      <FlatList
        contentContainerStyle={styles.listContent}
        data={categories}
        keyExtractor={(item: any) => String(item.id)}
        renderItem={({ item }: any) => (
          <Pressable onPress={() => setSelectedCategoryId(item.id)}>
            <AppCard style={styles.categoryCard}>
              <Image source={item.places[0].image} style={styles.cardImage} />
              <View style={styles.cardGradient} />
              <View style={styles.cardBottom}>
                <Tag style={styles.routesTag} text={`${item.places.length} ROUTES`} />
                <AppText style={styles.cardTitle}>{item.name}</AppText>
                <AppText numberOfLines={1} style={styles.cardSubtitle}>{item.places[0].descriptionShort}</AppText>
              </View>
            </AppCard>
          </Pressable>
        )}
        ListFooterComponent={
          <AppButton
            onPress={() => {
              const surprise = allPlaces[Math.floor(Math.random() * allPlaces.length)];
              onOpenLocation(surprise);
            }}
            rightIcon={<ArrowPathRoundedSquareIcon color={COLORS.text} size={UI.icon.md} />}
            style={[styles.surpriseButton, {
              gap: 8,
            }]}
            title="Surprise Route"
          />
        }
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, paddingHorizontal: UI.spacing.md, paddingTop: UI.spacing.sm },
  exploreTitle: { marginTop: UI.spacing.xs },
  listContent: { gap: UI.spacing.md, paddingBottom: UI.spacing.lg, paddingTop: UI.spacing.sm },
  categoryCard: { height: UI.height.card },
  cardImage: { height: '100%', width: '100%' },
  cardGradient: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.4)' },
  cardBottom: { bottom: UI.spacing.sm, left: UI.spacing.sm, position: 'absolute', right: UI.spacing.sm },
  routesTag: { alignSelf: 'flex-start', marginBottom: UI.spacing.xs },
  cardTitle: {
    color: COLORS.text,
    fontFamily: 'CormorantGaramond-Medium',
    fontSize: 24,
    lineHeight: 26,
  },
  cardSubtitle: {
    color: COLORS.mutedStrong,
    fontFamily: 'SFProText-Regular',
    fontSize: UI.font.body,
    lineHeight: 17,
    marginTop: 2,
  },
  surpriseButton: { marginTop: UI.spacing.sm },
});
