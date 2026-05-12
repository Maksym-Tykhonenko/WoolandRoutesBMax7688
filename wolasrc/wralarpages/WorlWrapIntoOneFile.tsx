// @ts-nocheck
import BlogDetailScreen from './BlogDetailScreen';
import { COLORS } from './designSystem';
import JournalScreen from './JournalScreen';
import React, { memo, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {StatusBar, Share,  StyleSheet, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import SavedScreen from './SavedScreen';
import MapScreen from './MapScreen';
import SafetyScreen from './SafetyScreen';
import QuizScreen from './QuizScreen';
import { BottomBar, MainTabKey } from '../wolcomponents/BottomBar';
import LocationDetailScreen from './LocationDetailScreen';
import TipDetailScreen from './TipDetailScreen';
import ExploreScreen from './ExploreScreen';

const STORAGE_SAVED_KEY = 'savedLocationIds';

type InternalScreen = 'root' | 'location-detail' | 'tip-detail' | 'blog-detail';

function useSavedLookup() {
  const [savedLookup, setSavedLookup] = useState<Record<number, boolean>>({});

  React.useEffect(() => {
    AsyncStorage.getItem(STORAGE_SAVED_KEY).then(raw => {
      if (!raw) return;
      const ids = JSON.parse(raw) as number[];
      const nextLookup: Record<number, boolean> = {};
      ids.forEach(id => {
        nextLookup[id] = true;
      });
      setSavedLookup(nextLookup);
    });
  }, []);

  const toggleSaved = (id: number) => {
    setSavedLookup(prev => {
      const next = { ...prev, [id]: !prev[id] };
      const ids = Object.keys(next)
        .filter(key => next[Number(key)])
        .map(Number);
      AsyncStorage.setItem(STORAGE_SAVED_KEY, JSON.stringify(ids));
      return next;
    });
  };

  return { savedLookup, toggleSaved };
}

const WrapperComponent: React.FC = () => {
  const insets = useSafeAreaInsets();
  const { savedLookup, toggleSaved } = useSavedLookup();
  const [activeTab, setActiveTab] = useState<MainTabKey>('Explore');
  const [activeScreen, setActiveScreen] = useState<InternalScreen>('root');
  const [selectedLocation, setSelectedLocation] = useState<any | null>(null);
  const [selectedTip, setSelectedTip] = useState<any | null>(null);
  const [selectedBlog, setSelectedBlog] = useState<any | null>(null);

  const openLocation = (location: any) => {
    setSelectedLocation(location);
    setActiveScreen('location-detail');
  };

  const shareLocation = (item: any) =>
    Share.share({ message: `${item.name}\n${item.descriptionShort}\n${item.coordinates[0].toFixed(4)}, ${item.coordinates[1].toFixed(4)}` });

  const renderContent = () => {
    if (activeScreen === 'location-detail' && selectedLocation) {
      return (
        <LocationDetailScreen
          isSaved={!!savedLookup[selectedLocation.id]}
          item={selectedLocation}
          onBack={() => setActiveScreen('root')}
          onShare={() => shareLocation(selectedLocation)}
          onToggleSaved={() => toggleSaved(selectedLocation.id)}
        />
      );
    }
    if (activeScreen === 'tip-detail' && selectedTip) return <TipDetailScreen item={selectedTip} onBack={() => setActiveScreen('root')} />;
    if (activeScreen === 'blog-detail' && selectedBlog) return <BlogDetailScreen item={selectedBlog} onBack={() => setActiveScreen('root')} />;

    switch (activeTab) {
      case 'Explore':
        return <ExploreScreen onOpenLocation={openLocation} />;
      case 'Map':
        return <MapScreen onOpenLocation={openLocation} />;
      case 'Safety':
        return <SafetyScreen onOpenTip={(tip: any) => { setSelectedTip(tip); setActiveScreen('tip-detail'); }} />;
      case 'Quiz':
        return <QuizScreen />;
      case 'Saved':
        return <SavedScreen onOpenLocation={openLocation} savedLookup={savedLookup} />;
      case 'Journal':
        return <JournalScreen onOpenBlog={(blog: any) => { setSelectedBlog(blog); setActiveScreen('blog-detail'); }} />;
      default:
        return null;
    }
  };

  return (
    <SafeAreaView edges={['top']} style={[styles.root, { paddingBottom: insets.bottom }]}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.background} />
      <View style={styles.content}>{renderContent()}</View>
      <BottomBar
        activeTab={activeTab}
        onTabPress={(tab: MainTabKey) => {
          setActiveTab(tab);
          setActiveScreen('root');
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: { backgroundColor: COLORS.background, flex: 1 },
  content: { flex: 1 },
});

export const WorlWrapIntoOneFile = memo(WrapperComponent);
export default WorlWrapIntoOneFile;
