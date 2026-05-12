// @ts-nocheck
import { AppCard, AppText, Header } from './AppPrimitives';

import React from 'react';



import { COLORS, typography, UI } from './designSystem';

import { allPlaces } from './screenData';

import {Pressable, Dimensions, StyleSheet, Image,  FlatList,  View } from 'react-native';

type Props = {
  savedLookup: Record<number, boolean>;
  onOpenLocation: (location: any) => void;
};

export default function SavedScreen({ savedLookup, onOpenLocation }: Props) {
  const savedList = allPlaces.filter(place => savedLookup[place.id]);

  return (
    <View style={styles.screen}>
      <Header title="Saved Locations" subtitle="Your bookmarked routes" />
      {savedList.length === 0 ? (
        <View style={styles.emptyState}>
          <AppText style={styles.emptyText}>No saved places yet</AppText>
        </View>
      ) : (
        <FlatList
          contentContainerStyle={styles.listContent}
          data={savedList}
          keyExtractor={(item: any) => String(item.id)}
          renderItem={({ item }: any) => (
            <Pressable onPress={() => onOpenLocation(item)}>
              <AppCard style={styles.placeCard}>
                <Image source={item.image} style={styles.cardImage} />
                <View style={styles.cardGradient} />
                <View style={styles.cardBottom}>
                  <AppText style={styles.cardTitle}>{item.name}</AppText>
                  <AppText numberOfLines={1} style={styles.cardSubtitle}>{item.descriptionShort}</AppText>
                </View>
              </AppCard>
            </Pressable>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, paddingHorizontal: UI.spacing.md, paddingTop: UI.spacing.sm },
  title: { marginTop: UI.spacing.xs },
  listContent: { gap: UI.spacing.md, paddingBottom: UI.spacing.lg, paddingTop: UI.spacing.sm },
  placeCard: { height: UI.height.card },
  cardImage: { height: '100%', width: '100%' },
  cardGradient: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.4)' },
  cardBottom: { bottom: UI.spacing.sm, left: UI.spacing.sm, position: 'absolute', right: UI.spacing.sm },
  cardTitle: {
    lineHeight: 26,
    fontFamily: 'CormorantGaramond-Medium',
    color: COLORS.text,
    fontSize: 24,
  },
  cardSubtitle: {
    marginTop: 2,
    color: COLORS.mutedStrong,
    lineHeight: 17,
    fontSize: UI.font.body,
    fontFamily: 'SFProText-Regular',
  },
  emptyState: {  justifyContent: 'center', marginTop: Dimensions.get('window').height * 0.25, alignItems: 'center', },
  emptyText: {
    fontFamily: 'SFProText-Regular',
    color: COLORS.muted,
    fontSize: UI.font.bodyLg,
  },
});
