// @ts-nocheck
import quizData from '../roudata/quiz';
import {ScrollView, Dimensions,StyleSheet, Pressable,   View } from 'react-native';
import { AppButton, AppCard, AppText, Header } from './AppPrimitives';
import React, { useMemo, useState } from 'react';
import { CheckCircleIcon, XCircleIcon } from 'react-native-heroicons/solid';
import {typography, COLORS,  UI } from './designSystem';

export default function QuizScreen() {
    const questions = (quizData as any[]).slice(0, 8);
    const [index, setIndex] = useState(0);
    const [answers, setAnswers] = useState<Record<number, number>>({});
    const [showFeedback, setShowFeedback] = useState(false);
    const isComplete = index >= questions.length;
    const score = useMemo(
        () => questions.reduce((acc, question) => acc + (answers[question.id] === question.correctIndex ? 1 : 0), 0),
        [answers, questions],
    );

    if (isComplete) {
        const percent = Math.round((score / questions.length) * 100);
        return (
            <View style={styles.screen}>
                <Header title="Quiz Complete" subtitle="Here's how you performed" />

                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.scrollContent}
                >
                    <View style={styles.resultWrap}>
                        <AppText style={styles.resultTitle}>Quiz Complete</AppText>
                        <AppText style={styles.resultPercent}>{`${percent}%`}</AppText>
                        <AppText style={styles.resultSub}>{`${score} out of ${questions.length} correct`}</AppText>
                    </View>
                    <View style={styles.listContent}>
                        {questions.map((item: any) => {
                            const pickedAnswer = answers[item.id];
                            const correct = pickedAnswer === item.correctIndex;

                            return (
                                <AppCard key={item.id} style={[styles.breakdownCard, correct ? styles.answerCorrect : styles.answerWrong]}>
                                    <AppText style={styles.breakdownQuestion}>{item.question}</AppText>
                                    <AppText style={styles.breakdownAnswer}>{`Your answer: ${item.options[pickedAnswer] ?? '-'}`}</AppText>
                                </AppCard>
                            );
                        })}
                    </View>

                    <AppButton
                        onPress={() => {
                            setIndex(0);
                            setAnswers({});
                            setShowFeedback(false);
                        }}
                        style={styles.quizNextButton}
                        title='Retake Quiz'
                    />
                </ScrollView>
            </View>
        );
    }

    const current = questions[index];
    const picked = answers[current.id];

    return (
        <View style={styles.screen}>
            <Header title="Safety Check" subtitle={`Question ${index + 1} of ${questions.length}`} />
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                <AppText style={styles.quizQuestion}>{current.question}</AppText>
                {current.options.map((option: string, optionIndex: number) => {
                    const answered = typeof picked === 'number';
                    const isPicked = picked === optionIndex;
                    const isCorrectOption = current.correctIndex === optionIndex;
                    const dynamicStyle = answered
                        ? isCorrectOption
                            ? styles.answerCorrect
                            : isPicked
                                ? styles.answerWrong
                                : styles.answerNeutral
                        : styles.answerNeutral;

                    return (
                        <Pressable
                            key={option}
                            disabled={answered}
                            onPress={() => {
                                setAnswers(prev => ({ ...prev, [current.id]: optionIndex }));
                                setShowFeedback(true);
                            }}
                            style={[styles.answerOption, dynamicStyle]}
                        >
                            <AppText style={styles.answerText}>{option}</AppText>
                        </Pressable>
                    );
                })}
                {showFeedback && typeof picked === 'number' ? (
                    <AppCard style={[styles.feedbackCard, picked === current.correctIndex ? styles.answerCorrect : styles.answerWrong]}>
                        <View style={styles.feedbackRow}>
                            {picked === current.correctIndex ? (
                                <CheckCircleIcon color={COLORS.successBorder} size={UI.icon.lg} />
                            ) : (
                                <XCircleIcon color={COLORS.errorBorder} size={UI.icon.lg} />
                            )}
                            <AppText style={styles.feedbackTitle}>{picked === current.correctIndex ? 'Correct' : 'Not quite'}</AppText>
                        </View>
                    </AppCard>
                ) : null}
                <AppButton
                    onPress={() => {
                        setShowFeedback(false);
                        setIndex(prev => prev + 1);
                    }}
                    style={styles.quizNextButton}
                    title={index + 1 === questions.length ? 'Finish Quiz' : 'Next Question'}
                />
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    screen: { flex: 1, paddingHorizontal: UI.spacing.md, paddingTop: UI.spacing.sm },
    scrollContent: { paddingBottom: Dimensions.get('window').height * 0.1934 },
    title: { marginTop: UI.spacing.xs },
    quizQuestion: {
        fontSize: UI.font.section,
        fontFamily: 'CormorantGaramond-Medium',
        marginTop: UI.spacing.sm,
        marginBottom: UI.spacing.sm,
        color: COLORS.text,
        lineHeight: 33,
    },
    answerOption: {
        padding: UI.spacing.sm,
        borderWidth: 1,
        borderRadius: UI.radius.md,
        borderColor: COLORS.border,
        marginBottom: UI.spacing.sm,
    },
    answerNeutral: { backgroundColor: COLORS.panel },
    answerCorrect: { backgroundColor: COLORS.successBg, borderColor: COLORS.successBorder },
    answerWrong: { backgroundColor: COLORS.errorBg, borderColor: COLORS.errorBorder },
    answerText: {
        color: COLORS.text,
        fontFamily: 'SFProText-Regular',
        fontSize: UI.font.bodyLg,
        lineHeight: 21,
    },
    feedbackCard: { marginTop: UI.spacing.xs, padding: UI.spacing.sm },
    feedbackRow: { alignItems: 'center', flexDirection: 'row', gap: UI.spacing.xs },
    feedbackTitle: {
        color: COLORS.text,
        fontFamily: 'CormorantGaramond-Medium',
        fontSize: 22,
    },
    quizNextButton: { marginTop: UI.spacing.md },
    resultWrap: {
        borderRadius: UI.radius.xl,
        backgroundColor: COLORS.panel,
        alignItems: 'center',
        borderWidth: 1,
        padding: UI.spacing.lg,
        marginTop: UI.spacing.sm,
        borderColor: COLORS.border,
    },
    resultTitle: {
        fontSize: UI.font.section,
        fontFamily: 'CormorantGaramond-Medium',
        color: COLORS.text,
    },
    resultPercent: {
        lineHeight: 76,
        color: COLORS.accent,
        fontSize: 70,
        fontFamily: 'CormorantGaramond-Medium',
        marginTop: UI.spacing.xs,
    },
    resultSub: {
        color: COLORS.muted,
        fontFamily: 'SFProText-Regular',
        fontSize: UI.font.bodyLg,
    },
    listContent: { gap: UI.spacing.md, paddingBottom: UI.spacing.lg, paddingTop: UI.spacing.sm },
    breakdownCard: { padding: UI.spacing.sm },
    breakdownQuestion: {
        lineHeight: 22,
        color: COLORS.text,
        fontSize: 20,
        fontFamily: 'CormorantGaramond-Medium',
    },
    breakdownAnswer: {
        color: COLORS.muted,
        fontSize: UI.font.body,
        fontFamily: 'SFProText-Regular',
        marginTop: UI.spacing.xs,
    },
});
