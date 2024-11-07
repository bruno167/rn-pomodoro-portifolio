import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../constants/theme';

interface SprintCounterProps {
  completedSprints: number;
}

export function SprintCounter({ completedSprints }: SprintCounterProps) {
  return (
    <View style={styles.container}>
      <View style={styles.counter}>
        <Ionicons name="checkmark-circle" size={20} color={COLORS.text} />
        <Text style={styles.counterText}>
          {completedSprints} {completedSprints === 1 ? 'Sprint' : 'Sprints'} concluído{completedSprints === 1 ? '' : 's'}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 3,
  },
  counter: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 8,
  },
  counterText: {
    color: COLORS.text,
    fontSize: 14,
    fontWeight: '500',
  },
}); 