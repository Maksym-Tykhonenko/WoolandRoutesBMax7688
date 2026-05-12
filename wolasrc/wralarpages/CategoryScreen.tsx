// @ts-nocheck
import React from 'react';
import { Dimensions, FlatList, Image, Pressable, StyleSheet, View } from 'react-native';
import { AppCard, AppText, Header } from './AppPrimitives';
import { COLORS, typography, UI } from './designSystem';

type Props = {
  category: any;
  onBack: () => void;
  onOpenLocation: (location: any) => void;
};

export default function CategoryScreen({ category, onBack, onOpenLocation }: Props) {
  return (
    <View style={styles.screen}>
      <Header  onBack={onBack} />
      <View style={{marginBottom: -Dimensions.get('window').height * 0.04}}/>
      <AppText style={[typography.titleMedium, styles.categoryTitle]}>{category.name}</AppText>
      <FlatList
        contentContainerStyle={styles.listContent}
        data={category.places}
        keyExtractor={(item: any) => String(item.id)}
        renderItem={({ item }: any) => (
          <Pressable onPress={() => onOpenLocation({ ...item, categoryName: category.name })}>
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
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, paddingHorizontal: UI.spacing.md, paddingTop: UI.spacing.sm },
  categoryTitle: { marginBottom: UI.spacing.sm, marginTop: UI.spacing.xs },
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
    lineHeight: 17,
    fontFamily: 'SFProText-Regular',
    marginTop: 2,
    fontSize: UI.font.body,
    color: COLORS.mutedStrong,
  },
});
