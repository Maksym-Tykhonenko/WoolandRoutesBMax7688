// @ts-nocheck
import { laefontsems } from '../laefontsems';
import { StatusBar, Dimensions, View, StyleSheet, Text, Image, } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Props = {
    durationMs?: number;
};

const HAS_SEEN_ONBOARDING_KEY = 'hasSeenOnboarding';

const COLORS = {
    bg: '#050609',
    text: '#F7F6F2',
    muted: 'rgba(247,246,242,0.56)',
    accent: '#E12124',
};

const SIZE = {
    title: 40,
    subtitle: 15,
    spacing: 10,
    dot: 7,
};

const LoadApplicetionWithAnim = ({ durationMs = 1200 }: Props): React.ReactElement => {
    const navigation = useNavigation<any>();
{/** 
    useEffect(() => {
        let isMounted = true;

        const timeoutId = setTimeout(() => {
            AsyncStorage.getItem(HAS_SEEN_ONBOARDING_KEY)
                .then(value => {
                    if (!isMounted) {
                        return;
                    }

                    const hasSeenOnboarding = value === 'true';
                    navigation.replace(hasSeenOnboarding ? 'MainApp' : 'OnboardUserBeforeExp');
                })
                .catch(() => {
                    if (!isMounted) {
                        return;
                    }

                    navigation.replace('OnboardUserBeforeExp');
                });
        }, durationMs);

        return () => {
            isMounted = false;
            clearTimeout(timeoutId);
        };
    }, [durationMs, navigation]);
*/}
    return (
        <View style={styles.root}>
            <Image source={require('../olrasests/wlirimgs/loadback.png')}
                style={{
                    width: Dimensions.get('window').width,


                    position: 'absolute',

                    resizeMode: 'cover',

                    height: Dimensions.get('window').height,
                }}
            />
            <StatusBar barStyle="light-content" backgroundColor={COLORS.bg} />
            <Image
                source={require('../olrasests/wlirimgs/loadinglogo.png')}
                style={{
                    width: Dimensions.get('window').width * 0.7,
                    height: Dimensions.get('window').width * 0.7,
                }}
                resizeMode="contain"
            />
        </View>
    );
};

const styles = StyleSheet.create({
    root: {
        justifyContent: 'center',
        backgroundColor: COLORS.bg,
        flex: 1,
        alignItems: 'center',
    },
    title: {
        fontSize: SIZE.title,
        lineHeight: SIZE.title + 2,
        fontFamily: laefontsems.primary,
        color: COLORS.text,
    },
    subtitle: {
        marginTop: SIZE.spacing,
        fontFamily: laefontsems.primary,
        fontSize: SIZE.subtitle,
        color: COLORS.muted,
    },
    dot: {
        marginTop: SIZE.spacing * 2,
        width: SIZE.dot,
        borderRadius: SIZE.dot,
        backgroundColor: COLORS.accent,
        height: SIZE.dot,
    },
});

export default LoadApplicetionWithAnim;
