// @ts-nocheck
import React, { useRef, useState } from 'react';
import {
    ScrollView,



    NativeScrollEvent,

    ImageBackground,

    NativeSyntheticEvent,

    View,
    TouchableOpacity,
    StyleSheet,
    Text,
    useWindowDimensions,
    StatusBar,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { laefontsems } from '../laefontsems';
import { useNavigation } from '@react-navigation/native';
import { ChevronRightIcon } from 'react-native-heroicons/outline';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY_ONBOARD = 'hasSeenOnboarding';

const COLORS = {
    text: '#F7F5F2',
    subtitle: 'rgba(247,245,242,0.78)',
    overlay: 'rgba(5,6,9,0.62)',
    barActive: '#E12124',
    barInactive: 'rgba(255,255,255,0.2)',
    buttonBg: '#E12124',
};

const SIZE = {
    progressGap: 4,
    title: 47,
    subtitle: 35,
    body: 16,
    buttonHeight: 44,
    progressHeight: 2,
    horizontal: 28,
    buttonRadius: 12,
};

const slides = [
    {
        title: 'Discover British\nColumbia Through\nWood and Wilderness',
        description: 'Explore ancient forests, wooden paths, quiet lakes, and heritage places shaped by nature and time.',
        image: require('../olrasests/wlirimgs/onborflows/Discover1.png'),
        button: 'Next',
    },
    {
        title: 'Find Routes With\nCharacter',
        description: 'Browse curated location categories and open detailed places with coordinates, route mood, and useful context.',
        image: require('../olrasests/wlirimgs/onborflows/find2.png'),
        button: 'Next',
    },
    {
        title: 'Save Places Worth\nReturning To',
        description: 'Build your own collection of forest routes, lakes, boardwalks, and lookout points for future trips.',
        image: require('../olrasests/wlirimgs/onborflows/save3.png'),
        button: 'Next',
    },
    {
        title: 'Travel With Awareness',
        description: 'Learn practical outdoor safety guidance before heading into forest areas, remote trails, and natural terrain.',
        image: require('../olrasests/wlirimgs/onborflows/travel4.png'),
        button: 'Next',
    },
    {
        title: 'Explore With\nConfidence',
        description: 'Use the map, test your knowledge, and read stories about the landscapes, structures, and heritage of British Columbia.',
        image: require('../olrasests/wlirimgs/onborflows/uexplore5.png'),
        button: 'Get Started',
    },
];

export default function OnboardUserBeforeExp() {
    const navigation = useNavigation<any>();
    const insets = useSafeAreaInsets();
    const { width, height } = useWindowDimensions();
    const scrollRef = useRef<ScrollView>(null);
    const [index, setIndex] = useState(0);

    const onDone = async () => {
        await AsyncStorage.setItem(STORAGE_KEY_ONBOARD, 'true');
        navigation.replace('MainApp');
    };

    const onNext = () => {
        const isLast = index === slides.length - 1;
        if (isLast) {
            onDone();
            return;
        }
        scrollRef.current?.scrollTo({ x: width * (index + 1), animated: true });
    };

    const onMomentumEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
        const nextIndex = Math.round(e.nativeEvent.contentOffset.x / width);
        setIndex(Math.max(0, Math.min(slides.length - 1, nextIndex)));
    };

    return (
        <View style={styles.root}>
            <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
            <ScrollView
                horizontal
                ref={scrollRef}
                onMomentumScrollEnd={onMomentumEnd}
                decelerationRate="fast"
                pagingEnabled
                style={styles.scroller}
                scrollEventThrottle={16}
                showsHorizontalScrollIndicator={false}
                bounces={false}
            >
                {slides.map((slide, slideIndex) => (
                    <ImageBackground key={slide.title} source={slide.image} style={{ height, width }}>
                        <View style={styles.overlay} />
                        <View style={[styles.content, { paddingBottom: Math.max(insets.bottom + 18, 26), paddingTop: Math.max(insets.top + 20, 42) }]}>
                            <View style={styles.progressRow}>
                                {slides.map((_, barIndex) => (
                                    <View
                                        key={`bar-${barIndex}`}
                                        style={[
                                            styles.progressBar,
                                            { backgroundColor: barIndex <= index ? COLORS.barActive : COLORS.barInactive },
                                        ]}
                                    />
                                ))}
                            </View>

                            <View style={styles.copyWrap}>
                                <Text style={styles.title}>{slide.title}</Text>
                                <Text style={styles.description}>{slide.description}</Text>
                            </View>

                            <TouchableOpacity activeOpacity={0.9} onPress={onNext} style={styles.button}>
                                <Text style={styles.buttonText}>{slide.button}</Text>
                                <ChevronRightIcon color={COLORS.text} size={18} />
                            </TouchableOpacity>
                        </View>
                    </ImageBackground>
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    root: {
        backgroundColor: '#050609',
        flex: 1,
    },
    scroller: {
        flex: 1,
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: COLORS.overlay,
    },
    content: {
        flex: 1,
        justifyContent: 'space-between',
        paddingHorizontal: SIZE.horizontal,
    },
    progressRow: {
        flexDirection: 'row',
        gap: SIZE.progressGap,
    },
    progressBar: {
        flex: 1,
        height: SIZE.progressHeight,
    },
    copyWrap: {
        marginTop: SIZE.subtitle,
    },
    title: {
        lineHeight: SIZE.title + 6,
        fontFamily: laefontsems.primary,
        color: COLORS.text,
        fontSize: SIZE.title,
    },
    buttonText: {
        fontSize: 29,
        color: COLORS.text,
        fontFamily: laefontsems.primary,
    },
    description: {
        marginTop: 16,
        fontSize: SIZE.body,
        fontFamily: laefontsems.primary,
        lineHeight: 39,
        color: COLORS.subtitle,
        maxWidth: '92%',
    },
    button: {
        flexDirection: 'row',


        height: SIZE.buttonHeight,

        alignItems: 'center',



        paddingHorizontal: 20,

        justifyContent: 'space-between',

        borderRadius: SIZE.buttonRadius,

        backgroundColor: COLORS.buttonBg,
    },
    
});
