import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export const WoolandRoutesExpl = () => {
  return (
    <View style={styles.root}>
      <Text style={styles.text}>Explore screen was moved into WorlWrapIntoOneFile.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  text: {
    color: '#ffffff',
  },
});
