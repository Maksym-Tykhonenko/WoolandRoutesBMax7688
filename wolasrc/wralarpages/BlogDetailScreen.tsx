// @ts-nocheck
import React from 'react';
import { Dimensions, Image, ScrollView, StyleSheet, View } from 'react-native';
import { AppButton, AppText, Header } from './AppPrimitives';
import { COLORS, UI } from './designSystem';

type Props = {
  item: any;
  onBack: () => void;
};

export default function BlogDetailScreen({ item, onBack }: Props) {
  return (
    <View style={styles.screen}>
      <Header  onBack={onBack} />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.detailScroll}>
        <Image source={item.image} style={styles.detailImageTall} />
        <AppText style={styles.detailTitle}>{item.title}</AppText>
        <AppText style={styles.detailDesc}>{item.subtitle}</AppText>
        <AppText style={styles.longDescription}>{item.text}</AppText>
        <AppButton style={styles.backToJournalButton} title="Back to Journal" onPress={onBack} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, paddingHorizontal: UI.spacing.md, paddingTop: UI.spacing.sm },
  detailScroll: { gap: UI.spacing.sm, paddingBottom: Dimensions.get('window').height * 0.1934 },
  detailImageTall: { borderRadius: UI.radius.lg, height: 268, width: '100%' },
  detailTitle: {
    marginTop: UI.spacing.xs,
    fontFamily: 'CormorantGaramond-Medium',
    fontSize: 42,
    color: COLORS.text,
    lineHeight: 45,
  },
  detailDesc: {
    lineHeight: 21,
    fontSize: UI.font.bodyLg,
    fontFamily: 'SFProText-Regular',
    color: COLORS.mutedStrong,
  },
  longDescription: {
    lineHeight: 22,
    fontSize: UI.font.body,
    fontFamily: 'SFProText-Regular',
    color: COLORS.mutedStrong,
  },
  backToJournalButton: { marginTop: UI.spacing.md },
});
