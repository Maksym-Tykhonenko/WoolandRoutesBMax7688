// @ts-nocheck



import React from 'react';

import { COLORS, UI } from './designSystem';




import { StyleSheet, View } from 'react-native';

import {
  Header,
  AppCard,
  AppText,
} from './AppPrimitives';

type Props = {
  item: any;
  onBack: () => void;
};

export default function TipDetailScreen({ item, onBack }: Props) {
  return (
    <View style={styles.screen}>
      <Header title={item.title} onBack={onBack} />
      {/* <AppText style={styles.detailTitle}>{item.title}</AppText> */}
      <AppCard style={styles.tipDetailCard}>
        <AppText style={styles.tipDetailText}>{item.full}</AppText>
      </AppCard>
    </View>
  );
}

const styles = StyleSheet.create({
  tipDetailCard: { marginTop: UI.spacing.md, padding: UI.spacing.md },
  detailTitle: {
    fontFamily: 'CormorantGaramond-Medium',
    
    
    fontSize: 42,
    
    marginTop: UI.spacing.xs,
    
    
    lineHeight: 45,
    
    color: COLORS.text,
  },
  tipDetailText: {
    fontSize: UI.font.bodyLg,
    fontFamily: 'SFProText-Regular',
    color: COLORS.mutedStrong,
    lineHeight: 24,
  },
  screen: { flex: 1, paddingHorizontal: UI.spacing.md, paddingTop: UI.spacing.sm },
});
