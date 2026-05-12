// @ts-nocheck
import { COLORS, typography, UI } from './designSystem';
import blogData from '../roudata/blog';
import { AppCard, AppText, Header } from './AppPrimitives';
import React from 'react';
import { Image, StyleSheet,Pressable,  View, FlatList,  } from 'react-native';

type Props = {
  onOpenBlog: (blog: any) => void;
};

export default function JournalScreen({ onOpenBlog }: Props) {
  return (
    <View style={styles.screen}>
      <Header title="Woodland Journal" subtitle="Stories about landscape, timber heritage, and British Columbia" />
      <FlatList
        contentContainerStyle={styles.listContent}
        data={blogData as any[]}
        keyExtractor={(item: any) => item.title}
        renderItem={({ item }: any) => (
          <Pressable onPress={() => onOpenBlog(item)}>
            <AppCard style={styles.blogCard}>
              <Image source={item.image} style={styles.blogImage} />
              <View style={styles.blogOverlay} />
              <View style={styles.blogCopy}>
                <AppText style={styles.blogTitle}>{item.title}</AppText>
                <AppText numberOfLines={2} style={styles.blogSubtitle}>{item.subtitle}</AppText>
              </View>
            </AppCard>
          </Pressable>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, paddingHorizontal: UI.spacing.md, paddingTop: UI.spacing.sm },
  title: { marginTop: UI.spacing.xs },
  listContent: { gap: UI.spacing.md, paddingBottom: UI.spacing.lg, paddingTop: UI.spacing.sm },
  blogCard: { height: 220 },
  blogImage: { height: '100%', width: '100%' },
  blogOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.44)' },
  blogCopy: { bottom: UI.spacing.sm, left: UI.spacing.sm, position: 'absolute', right: UI.spacing.sm },
  blogTitle: {
    lineHeight: 35,
    fontFamily: 'CormorantGaramond-Medium',
    color: COLORS.text,
    fontSize: 33,
  },
  blogSubtitle: {
    fontSize: UI.font.body,
    fontFamily: 'SFProText-Regular',
    marginTop: UI.spacing.xs,
    lineHeight: 20,
    color: COLORS.mutedStrong,
  },
});
