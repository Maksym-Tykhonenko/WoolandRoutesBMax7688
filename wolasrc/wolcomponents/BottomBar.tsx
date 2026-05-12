import { Text, Dimensions, StyleSheet,Pressable,  View } from 'react-native';


import React, { memo } from 'react';

import {
    ShieldCheckIcon as ShieldOutline,



    SparklesIcon as SparklesOutline,

    BookOpenIcon as BookOpenOutline,

    MapIcon as MapOutline,

    QuestionMarkCircleIcon as QuestionOutline,

    BookmarkIcon as BookmarkOutline,
} from 'react-native-heroicons/outline';
import {




    BookmarkIcon as BookmarkSolid,

    BookOpenIcon as BookOpenSolid,



    MapIcon as MapSolid,

    QuestionMarkCircleIcon as QuestionSolid,

    ShieldCheckIcon as ShieldSolid,

    SparklesIcon as SparklesSolid,
} from 'react-native-heroicons/solid';
import { laefontsems } from '../laefontsems';

export type MainTabKey = 'Explore' | 'Map' | 'Safety' | 'Quiz' | 'Saved' | 'Journal';

type Props = {
    activeTab: MainTabKey;
    onTabPress: (tab: MainTabKey) => void;
};

const COLORS = {
    background: '#050609',
    border: 'rgba(255,255,255,0.08)',
    active: '#E12124',
    muted: 'rgba(240,240,240,0.48)',
};

const SIZE = {
    topPadding: 7,
    barHeight: 64,
    text: 9,
    icon: Dimensions.get('window').width * 0.07,
    bottomPadding: 8,
    rowHorizontal: 8,
};

type TabItem = {
    key: MainTabKey;
    label: string;
    icon: React.ComponentType<any>;
    activeIcon: React.ComponentType<any>;
};

const tabs: TabItem[] = [
    { key: 'Explore', label: 'Explore', icon: SparklesOutline, activeIcon: SparklesSolid },
    { key: 'Map', label: 'Map', icon: MapOutline, activeIcon: MapSolid },
    { key: 'Safety', label: 'Safety', icon: ShieldOutline, activeIcon: ShieldSolid },
    { key: 'Quiz', label: 'Quiz', icon: QuestionOutline, activeIcon: QuestionSolid },
    { key: 'Saved', label: 'Saved', icon: BookmarkOutline, activeIcon: BookmarkSolid },
    { key: 'Journal', label: 'Journal', icon: BookOpenOutline, activeIcon: BookOpenSolid },
];

const BottomBarComponent: React.FC<Props> = ({ activeTab, onTabPress }) => {
    return (
        <View style={styles.shell}>
            <View style={styles.row}>
                {tabs.map(tab => {
                    const isActive = tab.key === activeTab;
                    const Icon = isActive ? tab.activeIcon : tab.icon;

                    return (
                        <Pressable
                            key={tab.key}
                            onPress={() => onTabPress(tab.key)}
                            style={({ pressed }) => [styles.tab, pressed && styles.pressed]}
                        >
                            <Icon color={isActive ? COLORS.active : COLORS.muted} size={SIZE.icon} />
                            <Text style={[styles.label, { color: isActive ? COLORS.active : COLORS.muted }]}>{tab.label}</Text>
                        </Pressable>
                    );
                })}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    shell: {
        backgroundColor: COLORS.background,
        borderTopColor: 'rgba(220, 38, 38, 0.3)',
        borderTopWidth: Dimensions.get('window').width * 0.003,
        justifyContent: 'center',
        paddingBottom: Dimensions.get('window').height * 0.03,
        paddingTop: Dimensions.get('window').height * 0.017,
        position: 'absolute',
        bottom: 0,
        width: Dimensions.get('window').width,
    },
    row: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: SIZE.rowHorizontal,
    },
    tab: {
        alignItems: 'center',
        flex: 1,
        gap: 2,
        justifyContent: 'center',
    },
    label: {
        fontFamily: laefontsems.bodyRegular,
        fontSize: SIZE.text,
        letterSpacing: 0.15,
        lineHeight: SIZE.text + 2,
    },
    pressed: {
        opacity: 0.7,
    },
});

export const BottomBar = memo(BottomBarComponent);
