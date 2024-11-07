import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../constants/theme';

interface ModeSelectorProps {
  currentMode: 'work' | 'shortBreak' | 'longBreak';
  onModeChange: (mode: 'work' | 'shortBreak' | 'longBreak') => void;
}

export function ModeSelector({ currentMode, onModeChange }: ModeSelectorProps) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          styles.button,
          styles.buttonShadow,
          currentMode === 'work' && { backgroundColor: COLORS.work }
        ]}
        onPress={() => onModeChange('work')}
      >
        <Ionicons 
          name="timer-outline" 
          size={18} 
          color={currentMode === 'work' ? '#FFFFFF' : '#FFFFFF'} 
          style={[
            styles.icon,
            currentMode === 'work' && styles.activeIcon
          ]}
        />
        <Text style={[
          styles.buttonText,
          currentMode === 'work' && styles.activeText,
          currentMode === 'work' && { color: '#FFFFFF' }
        ]}>
          Trabalho
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.button,
          styles.buttonShadow,
          currentMode === 'shortBreak' && { backgroundColor: COLORS.shortBreak }
        ]}
        onPress={() => onModeChange('shortBreak')}
      >
        <Ionicons 
          name="cafe-outline" 
          size={18} 
          color={currentMode === 'shortBreak' ? '#000000' : '#FFFFFF'} 
          style={[
            styles.icon,
            currentMode === 'shortBreak' && styles.activeIcon
          ]}
        />
        <Text style={[
          styles.buttonText,
          currentMode === 'shortBreak' && styles.activeText,
          currentMode === 'shortBreak' && { color: '#000000' }
        ]}>
          Pausa Curta
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.button,
          styles.buttonShadow,
          currentMode === 'longBreak' && { backgroundColor: COLORS.longBreak }
        ]}
        onPress={() => onModeChange('longBreak')}
      >
        <Ionicons 
          name="sunny-outline" 
          size={18} 
          color={currentMode === 'longBreak' ? '#FFFFFF' : '#FFFFFF'} 
          style={[
            styles.icon,
            currentMode === 'longBreak' && styles.activeIcon
          ]}
        />
        <Text style={[
          styles.buttonText,
          currentMode === 'longBreak' && styles.activeText,
          currentMode === 'longBreak' && { color: '#FFFFFF' }
        ]}>
          Pausa Longa
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 16,
    gap: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    paddingVertical: 12,
    borderRadius: 30,
    marginHorizontal: 16,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 16,
    backgroundColor: COLORS.inactive,
    minWidth: 90,
    gap: 4,
  },
  buttonShadow: {
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 12,
    textAlign: 'center',
    opacity: 0.7,
  },
  activeText: {
    opacity: 1,
    fontWeight: 'bold',
  },
  icon: {
    opacity: 0.7,
  },
  activeIcon: {
    opacity: 1,
  },
}); 