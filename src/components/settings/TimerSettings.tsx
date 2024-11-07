import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../constants/theme';

interface TimerSettingsProps {
  times: {
    work: number;
    shortBreak: number;
    longBreak: number;
  };
  onTimeChange: (type: 'work' | 'shortBreak' | 'longBreak', minutes: number) => void;
  onClose: () => void;
}

export function TimerSettings({ times, onTimeChange, onClose }: TimerSettingsProps) {
  const formatMinutes = (seconds: number) => Math.floor(seconds / 60);

  const handleTimeChange = (type: 'work' | 'shortBreak' | 'longBreak', change: number) => {
    const currentMinutes = formatMinutes(times[type]);
    const newMinutes = Math.max(1, currentMinutes + change);
    onTimeChange(type, newMinutes);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Configurações</Text>
        <TouchableOpacity onPress={onClose}>
          <Ionicons name="close" size={24} color={COLORS.text} />
        </TouchableOpacity>
      </View>

      <View style={styles.settingItem}>
        <Text style={styles.settingLabel}>Tempo de Foco</Text>
        <View style={styles.timeControl}>
          <TouchableOpacity 
            style={styles.button}
            onPress={() => handleTimeChange('work', -1)}
          >
            <Ionicons name="remove" size={24} color={COLORS.text} />
          </TouchableOpacity>
          <Text style={styles.timeText}>{formatMinutes(times.work)}min</Text>
          <TouchableOpacity 
            style={styles.button}
            onPress={() => handleTimeChange('work', 1)}
          >
            <Ionicons name="add" size={24} color={COLORS.text} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.settingItem}>
        <Text style={styles.settingLabel}>Pausa Curta</Text>
        <View style={styles.timeControl}>
          <TouchableOpacity 
            style={styles.button}
            onPress={() => handleTimeChange('shortBreak', -1)}
          >
            <Ionicons name="remove" size={24} color={COLORS.text} />
          </TouchableOpacity>
          <Text style={styles.timeText}>{formatMinutes(times.shortBreak)}min</Text>
          <TouchableOpacity 
            style={styles.button}
            onPress={() => handleTimeChange('shortBreak', 1)}
          >
            <Ionicons name="add" size={24} color={COLORS.text} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.settingItem}>
        <Text style={styles.settingLabel}>Pausa Longa</Text>
        <View style={styles.timeControl}>
          <TouchableOpacity 
            style={styles.button}
            onPress={() => handleTimeChange('longBreak', -1)}
          >
            <Ionicons name="remove" size={24} color={COLORS.text} />
          </TouchableOpacity>
          <Text style={styles.timeText}>{formatMinutes(times.longBreak)}min</Text>
          <TouchableOpacity 
            style={styles.button}
            onPress={() => handleTimeChange('longBreak', 1)}
          >
            <Ionicons name="add" size={24} color={COLORS.text} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0, 0, 0, 0.95)',
    padding: 20,
    borderRadius: 20,
    width: '90%',
    maxWidth: 400,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    color: COLORS.text,
    fontSize: 20,
    fontWeight: 'bold',
  },
  settingItem: {
    marginBottom: 20,
  },
  settingLabel: {
    color: COLORS.text,
    fontSize: 16,
    marginBottom: 10,
  },
  timeControl: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    padding: 8,
  },
  button: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.button,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timeText: {
    color: COLORS.text,
    fontSize: 18,
    fontWeight: 'bold',
    minWidth: 60,
    textAlign: 'center',
  },
}); 