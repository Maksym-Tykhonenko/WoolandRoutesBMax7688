import { StyleSheet } from 'react-native';
import { laefontsems } from '../laefontsems';

export const UI = {
  spacing: { xxs: 4, xs: 8, sm: 12, md: 16, lg: 20, xl: 24 },
  radius: { sm: 10, md: 14, lg: 18, xl: 22, pill: 999 },
  font: { tiny: 10, caption: 12, body: 14, bodyLg: 15, title: 34, section: 28 },
  icon: { sm: 14, md: 18, lg: 20 },
  height: { header: 54, card: 136, map: 250 },
};

export const COLORS = {
  accent: '#E12124',
  background: '#050609',
  panelSoft: '#131821',
  panel: '#0C0F14',
  border: 'rgba(255,255,255,0.08)',
  text: '#F6F3EF',
  mutedStrong: 'rgba(246,243,239,0.72)',
  successBg: 'rgba(22,163,74,0.23)',
  errorBorder: '#DC2626',
  successBorder: '#16A34A',
  muted: 'rgba(246,243,239,0.56)',
  errorBg: 'rgba(220,38,38,0.23)',
};

export const typography = StyleSheet.create({
  titleLarge: {
    lineHeight: 38,
    fontSize: UI.font.title,
    fontFamily: laefontsems.primary,
    color: COLORS.text,
  },
  titleMedium: {
    lineHeight: 31,
    fontFamily: laefontsems.primary,
    color: COLORS.text,
    fontSize: UI.font.section,
  },
  body: {
    color: COLORS.mutedStrong,
    fontFamily: laefontsems.bodyRegular,
    fontSize: UI.font.body,
    lineHeight: 22,
  },
  caption: {
    fontSize: UI.font.caption,
    fontFamily: laefontsems.bodyRegular,
    lineHeight: 16,
    color: COLORS.muted,
  },
  headerTitle: {
    fontSize: UI.font.bodyLg,
    fontFamily: laefontsems.primary,
    textTransform: 'lowercase',
    letterSpacing: 0.5,
    color: COLORS.text,
  },
  headerSubtitle: {
    marginTop: UI.spacing.xxs,
    fontFamily: laefontsems.bodyRegular,
    lineHeight: 16,
    fontSize: UI.font.caption,
    color: COLORS.muted,
  },
  buttonText: {
    fontSize: 26,
    fontFamily: laefontsems.primary,
    color: COLORS.text,
  },
});
