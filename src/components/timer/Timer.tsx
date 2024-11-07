import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../../constants/theme';

interface TimerProps {
  time: string;
  mode: 'work' | 'shortBreak' | 'longBreak';
}

export function Timer({ time, mode }: TimerProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {mode === 'work' 
          ? 'Tempo de Foco' 
          : mode === 'shortBreak' 
            ? 'Pausa Curta' 
            : 'Pausa Longa'}
      </Text>
      <Text style={styles.timer}>{time}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingBottom: 160,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 48,
  },
  timer: {
    fontSize: 96,
    fontWeight: 'bold',
    color: COLORS.text,
  },
}); 