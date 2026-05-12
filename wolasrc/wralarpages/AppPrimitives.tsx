// @ts-nocheck
import React from 'react';
import { Dimensions,  StyleSheet,
  
  
  Pressable,
  Text, 
  View } from 'react-native';
import { ArrowLeftIcon } from 'react-native-heroicons/outline';
import { COLORS, typography, UI } from './designSystem';

export const AppText = ({ children, style, numberOfLines }: any) => (
  <Text numberOfLines={numberOfLines} style={style}>
    {children}
  </Text>
);

export const AppButton = ({ title, onPress, rightIcon, style }: any) => (
  <Pressable onPress={onPress} style={[styles.button, style]}>
    <Text style={typography.buttonText}>{title}</Text>
    {rightIcon ? <View>{rightIcon}</View> : null}
  </Pressable>
);

export const AppCard = ({ children, style }: any) => <View style={[styles.card, style]}>{children}</View>;

export const Tag = ({ text, style }: { text: string; style?: any }) => (
  <View style={[styles.tag, style]}>
    <Text style={styles.tagText}>{text}</Text>
  </View>
);

export const IconButton = ({ icon, onPress }: any) => (
  <Pressable onPress={onPress} style={styles.iconButton}>
    {icon}
  </Pressable>
);

export const Header = ({
  title,
  subtitle,
  onBack,
  right,
}: {
  title: string;
  subtitle?: string;
  onBack?: () => void;
  right?: React.ReactNode;
}) => (
  <View style={styles.headerWrap}>
    <View style={styles.headerActionsRow}>
      <View style={styles.headerSide}>
        {onBack ? (
          <IconButton icon={<ArrowLeftIcon color={COLORS.text} size={UI.icon.md} />} onPress={onBack} />
        ) : null}
      </View>
      <View style={styles.headerCenterSpacer} />
      <View style={[styles.headerSide, styles.headerSideRight]}>{right}</View>
    </View>
    <AppText style={[typography.titleLarge, styles.exploreTitle]}>{title}</AppText>
    {subtitle ? <Text style={typography.headerSubtitle}>{subtitle}</Text> : null}
  </View>
);

const styles = StyleSheet.create({
  headerWrap: {
    minHeight: UI.height.header,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  headerActionsRow: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: '100%',
    marginBottom: UI.spacing.xs,
    alignItems: 'center',
  },
  headerSide: {
    alignItems: 'flex-start',
    flex: 1,
  },
  headerCenterSpacer: {
    flex: 1,
  },
  headerSideRight: {
    alignItems: 'flex-end',
  },
  iconButton: {
    height: Dimensions.get('window').width * 0.107,
    backgroundColor: 'rgba(255,255,255,0.12)',
    alignItems: 'center',
    borderRadius: UI.radius.pill,
    borderWidth: Dimensions.get('window').width * 0.003,
    width: Dimensions.get('window').width * 0.107,
    borderColor: 'rgba(220, 38, 38, 0.3)',
    justifyContent: 'center',
  },
  card: {
    overflow: 'hidden',
    backgroundColor: COLORS.panel,
    borderColor: COLORS.border,
    borderRadius: UI.radius.lg,
    borderWidth: 1,
  },
  button: {
    borderRadius: UI.radius.md,
    backgroundColor: COLORS.accent,
    paddingHorizontal: UI.spacing.md,
    flexDirection: 'row',
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tag: {
    paddingHorizontal: UI.spacing.xs,
    alignSelf: 'flex-start',
    paddingVertical: UI.spacing.xxs,
    borderRadius: UI.radius.pill,
    backgroundColor: 'rgba(225,33,36,0.3)',
  },
  tagText: {
    letterSpacing: 0.2,
    fontFamily: 'SFProText-Regular',
    color: '#FF8A8C',
    fontSize: UI.font.tiny,
  },
});
