// @ts-nocheck
import { COLORS, typography, UI } from './designSystem';

import {Pressable, Dimensions,  ScrollView, StyleSheet, View, FlatList,  } from 'react-native';

import React, { useMemo, useState } from 'react';

import MapView, { Marker } from 'react-native-maps';




import { allPlaces, categories, mapInitialRegion } from './screenData';

import { Header, AppCard, AppText, } from './AppPrimitives';

type Props = {
  onOpenLocation: (location: any) => void;
};

export default function MapScreen({ onOpenLocation }: Props) {
  const [activeCategory, setActiveCategory] = useState<number | 'all'>('all');
  const data = useMemo(
    () => (activeCategory === 'all' ? allPlaces : allPlaces.filter(place => place.categoryId === activeCategory)),
    [activeCategory],
  );

  return (
    <View style={styles.screen}>
      <Header title="Woodland Map" subtitle="Tap a location to view details" />
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filtersRow}
        contentContainerStyle={styles.filtersContent}
      >
        <Pressable
          onPress={() => setActiveCategory('all')}
          style={[styles.filterPill, activeCategory === 'all' && styles.filterPillActive]}
        >
          <AppText style={[styles.filterText, activeCategory === 'all' && styles.filterTextActive]}>All</AppText>
        </Pressable>
        {categories.map((category: any) => (
          <Pressable
            key={category.id}
            onPress={() => setActiveCategory(category.id)}
            style={[styles.filterPill, activeCategory === category.id && styles.filterPillActive]}
          >
            <AppText style={[styles.filterText, activeCategory === category.id && styles.filterTextActive]}>
              {category.name.split(' ')[0]}
            </AppText>
          </Pressable>
        ))}
      </ScrollView>
      <AppCard style={styles.mapCard}>
        <MapView initialRegion={mapInitialRegion} style={styles.map}>
          {data.map((place: any) => (
            <Marker
              coordinate={{ latitude: place.coordinates[0], longitude: place.coordinates[1] }}
              key={place.id}
              onPress={() => onOpenLocation(place)}
              pinColor={COLORS.accent}
              title={place.name}
            />
          ))}
        </MapView>
      </AppCard>
      <AppText style={styles.listTitle}>{`${data.length} Locations`}</AppText>
      <FlatList
        contentContainerStyle={styles.listContent}
        data={data.slice(0, 8)}
        keyExtractor={(item: any) => String(item.id)}
        renderItem={({ item }: any) => (
          <Pressable onPress={() => onOpenLocation(item)}>
            <AppCard style={styles.mapListCard}>
              <AppText style={styles.mapListTitle}>{item.name}</AppText>
              <AppText style={styles.mapListCoord}>{`${item.coordinates[0].toFixed(4)}, ${item.coordinates[1].toFixed(4)}`}</AppText>
            </AppCard>
          </Pressable>
        )}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, paddingHorizontal: UI.spacing.md, paddingTop: UI.spacing.sm },
  title: { marginTop: UI.spacing.xs },
  filtersRow: { marginTop: UI.spacing.sm },
  filtersContent: {
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingVertical: UI.spacing.xxs,
    height: Dimensions.get('window').height * 0.088,
  },
  filterPill: {
    backgroundColor: COLORS.panel,
    borderColor: COLORS.border,
    borderRadius: UI.radius.pill,
    borderWidth: 1,
    marginRight: UI.spacing.xs,
    paddingHorizontal: UI.spacing.sm,
    paddingVertical: UI.spacing.xs,
  },
  filterPillActive: {
    backgroundColor: COLORS.accent,
    borderColor: COLORS.accent,
  },
  filterText: {
    color: COLORS.mutedStrong,
    fontFamily: 'SFProText-Regular',
    fontSize: UI.font.caption,
  },
  filterTextActive: {
    color: '#FFFFFF',
  },
  mapCard: { height: UI.height.map, marginTop: UI.spacing.sm },
  map: { height: '100%', width: '100%' },
  listTitle: {
    color: COLORS.text,
    fontFamily: 'SFProText-Regular',
    fontSize: UI.font.bodyLg,
    marginTop: UI.spacing.md,
  },
  listContent: { gap: UI.spacing.md, paddingBottom: Dimensions.get('window').height * 0.16, paddingTop: UI.spacing.sm },
  mapListCard: { padding: UI.spacing.sm },
  mapListTitle: {
    color: COLORS.text,
    fontFamily: 'CormorantGaramond-Medium',
    fontSize: 20,
    lineHeight: 22,
  },
  mapListCoord: {
    color: COLORS.muted,
    fontFamily: 'SFProText-Regular',
    fontSize: UI.font.caption,
    marginTop: UI.spacing.xxs,
  },
});
