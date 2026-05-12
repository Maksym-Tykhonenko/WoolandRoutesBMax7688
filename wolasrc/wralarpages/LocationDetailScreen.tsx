// @ts-nocheck
import { BookmarkIcon as BookmarkSolid } from 'react-native-heroicons/solid';
import { AppButton, AppText, Header, IconButton, Tag } from './AppPrimitives';
import { BookmarkIcon, ShareIcon } from 'react-native-heroicons/outline';
import React from 'react';
import { COLORS, typography, UI } from './designSystem';
import {ScrollView, Dimensions,View,  Linking, Image,  StyleSheet,  } from 'react-native';

type Props = {
  item: any;
  isSaved: boolean;
  onBack: () => void;
  onShare: () => void;
  onToggleSaved: () => void;
};

export default function LocationDetailScreen({ item, isSaved, onBack, onShare, onToggleSaved }: Props) {
  return (
    <View style={styles.screen}>
      <Header
        onBack={onBack}
        right={
          <View style={styles.detailActions}>
            <IconButton
              icon={isSaved ? <BookmarkSolid color={COLORS.accent} size={UI.icon.md} /> : <BookmarkIcon color={COLORS.text} size={UI.icon.md} />}
              onPress={onToggleSaved}
            />
            <IconButton icon={<ShareIcon color={COLORS.text} size={UI.icon.md} />} onPress={onShare} />
          </View>
        }
      />
      <ScrollView contentContainerStyle={styles.detailScroll} showsVerticalScrollIndicator={false}>
        <Image source={item.image} style={styles.detailImage} />
        <Tag text={item.categoryName?.toUpperCase()} />
        <AppText style={styles.detailTitle}>{item.name}</AppText>
        <AppText style={styles.detailDesc}>{item.descriptionShort}</AppText>
        <View style={styles.coordinateBox}>
          <AppText style={styles.coordinateText}>{`${Number(item.coordinates[0]).toFixed(4)}, ${Number(item.coordinates[1]).toFixed(4)}`}</AppText>
        </View>
        <AppText style={[typography.titleMedium, styles.aboutLabel]}>About This Location</AppText>
        <AppText style={styles.longDescription}>{item.descriptionLong}</AppText>
        <AppButton onPress={() => {
          Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${item.coordinates[0]},${item.coordinates[1]}`);
        }} style={styles.detailCta} title="View on Map" />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, paddingHorizontal: UI.spacing.md, paddingTop: UI.spacing.sm },
  detailActions: { flexDirection: 'row', gap: UI.spacing.xs },
  detailScroll: { gap: UI.spacing.sm, paddingBottom: Dimensions.get('window').height * 0.23034 },
  detailImage: { borderRadius: UI.radius.lg, height: 214, marginTop: UI.spacing.xs, width: '100%' },
  detailTitle: {
    lineHeight: 45,
    color: COLORS.text,
    fontSize: 42,
    marginTop: UI.spacing.xs,
    fontFamily: 'CormorantGaramond-Medium',
  },
  detailDesc: {
    lineHeight: 21,
    fontFamily: 'SFProText-Regular',
    color: COLORS.mutedStrong,
    fontSize: UI.font.bodyLg,
  },
  coordinateBox: {
    padding: UI.spacing.sm,
    borderWidth: 1,
    backgroundColor: COLORS.panelSoft,
    borderRadius: UI.radius.md,
    borderColor: COLORS.border,
  },
  coordinateText: {
    color: COLORS.mutedStrong,
    fontFamily: 'SFProText-Regular',
    fontSize: UI.font.body,
  },
  aboutLabel: { marginTop: UI.spacing.xs },
  longDescription: {
    fontFamily: 'SFProText-Regular',
    color: COLORS.mutedStrong,
    fontSize: UI.font.body,
    lineHeight: 22,
  },
  detailCta: { marginTop: UI.spacing.md },
});
