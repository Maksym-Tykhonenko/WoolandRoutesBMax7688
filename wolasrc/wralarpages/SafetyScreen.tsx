// @ts-nocheck
import React from 'react';
import { AppCard,  Header, AppText, } from './AppPrimitives';
import { StyleSheet, FlatList, Pressable, View } from 'react-native';
import tips from '../roudata/tips';
import { COLORS, typography, UI } from './designSystem';

type Props = {
  onOpenTip: (tip: any) => void;
};

export default function SafetyScreen({ onOpenTip }: Props) {
  return (
    <View style={styles.screen}>
      <Header title="Nature Safety Guide" subtitle="Essential knowledge for visiting trails, remote areas, and terrain transitions" />
      <FlatList
        contentContainerStyle={styles.listContent}
        data={tips as any[]}
        keyExtractor={(item: any) => item.id}
        renderItem={({ item }: any) => (
          <Pressable onPress={() => onOpenTip(item)}>
            <AppCard style={styles.tipCard}>
              <AppText style={styles.tipTitle}>{item.title}</AppText>
              <AppText style={styles.tipShort}>{item.short}</AppText>
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
  listContent: { gap: UI.spacing.md, paddingBottom: UI.spacing.lg, paddingTop: UI.spacing.sm },
  tipCard: { padding: UI.spacing.sm },
  tipTitle: {
    fontFamily: 'CormorantGaramond-Medium',
    color: COLORS.text,
    fontSize: 26,
    lineHeight: 28,
  },
  tipShort: {
    lineHeight: 19,



    fontFamily: 'SFProText-Regular',

    marginTop: UI.spacing.xs,

    fontSize: UI.font.body,

    color: COLORS.mutedStrong,
  },
});
