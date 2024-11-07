import React, { useState, useEffect, useRef } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet, Animated, TouchableOpacity } from 'react-native';
import { Timer } from '../components/timer/Timer';
import { Controls } from '../components/controls/Controls';
import { ModeSelector } from '../components/mode-selector/ModeSelector';
import { TimerSettings } from '../components/settings/TimerSettings';
import { COLORS, TIMES } from '../constants/theme';
import { Ionicons } from '@expo/vector-icons';

// Definindo a sequência de sprints
const SPRINT_SEQUENCE = [
  'work',
  'shortBreak',
  'work',
  'shortBreak',
  'work',
  'shortBreak',
  'work',
  'longBreak'
] as const;

export default function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [mode, setMode] = useState<'work' | 'shortBreak' | 'longBreak'>('work');
  const [timeLeft, setTimeLeft] = useState(TIMES.work);
  const [sprintIndex, setSprintIndex] = useState(0);
  const [isAutoMode, setIsAutoMode] = useState(false);
  const backgroundAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(0)).current;
  const [showSettings, setShowSettings] = useState(false);
  const [customTimes, setCustomTimes] = useState(TIMES);

  // Função para avançar para o próximo sprint
  const moveToNextSprint = () => {
    const nextIndex = (sprintIndex + 1) % SPRINT_SEQUENCE.length;
    const nextMode = SPRINT_SEQUENCE[nextIndex];
    
    setSprintIndex(nextIndex);
    setMode(nextMode);
    setTimeLeft(customTimes[nextMode]);
    
    // Anima a transição de cor
    Animated.timing(backgroundAnim, {
      toValue: nextMode === 'work' ? 0 : nextMode === 'shortBreak' ? 1 : 2,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: isPlaying ? 100 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();

    let interval: NodeJS.Timeout;
    if (isPlaying && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => time - 1);
      }, 1000);
    } else if (timeLeft === 0 && isAutoMode) {
      // Quando o timer chega a zero em modo automático
      moveToNextSprint();
      setIsPlaying(true); // Mantém rodando
    } else if (timeLeft === 0) {
      setIsPlaying(false);
    }

    return () => clearInterval(interval);
  }, [isPlaying, timeLeft, isAutoMode]);

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleReset = () => {
    setIsPlaying(false);
    setTimeLeft(customTimes[mode]);
  };

  const handleModeChange = (newMode: 'work' | 'shortBreak' | 'longBreak') => {
    setMode(newMode);
    setIsPlaying(false);
    setTimeLeft(customTimes[newMode]);
    
    // Encontra o índice correto no SPRINT_SEQUENCE
    const newIndex = SPRINT_SEQUENCE.findIndex(m => m === newMode);
    setSprintIndex(newIndex >= 0 ? newIndex : 0);
    
    Animated.timing(backgroundAnim, {
      toValue: newMode === 'work' ? 0 : newMode === 'shortBreak' ? 1 : 2,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };

  const handleTimeChange = (type: 'work' | 'shortBreak' | 'longBreak', minutes: number) => {
    const newTimes = {
      ...customTimes,
      [type]: minutes * 60
    };
    setCustomTimes(newTimes);
    setTimeLeft(newTimes[mode]);
  };

  const backgroundColor = backgroundAnim.interpolate({
    inputRange: [0, 1, 2],
    outputRange: [COLORS.work, COLORS.shortBreak, COLORS.longBreak],
  });

  return (
    <SafeAreaProvider>
      <Animated.View style={[styles.container, { backgroundColor }]}>
        <View style={styles.headerButtons}>
          <TouchableOpacity 
            style={[styles.headerButton, isAutoMode && styles.headerButtonActive]}
            onPress={() => setIsAutoMode(!isAutoMode)}
          >
            <Ionicons 
              name="infinite" 
              size={24} 
              color={COLORS.text} 
            />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.headerButton}
            onPress={() => setShowSettings(true)}
          >
            <Ionicons name="settings-outline" size={24} color={COLORS.text} />
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          <Timer 
            time={formatTime(timeLeft)} 
            mode={mode}
          />
          <View style={styles.controlsWrapper}>
            <Controls 
              isPlaying={isPlaying}
              onPlayPause={handlePlayPause}
              onReset={handleReset}
            />
          </View>
        </View>
        <Animated.View
          style={[
            styles.modeSelectorContainer,
            {
              transform: [{ translateY: slideAnim }],
              opacity: slideAnim.interpolate({
                inputRange: [0, 100],
                outputRange: [1, 0]
              })
            }
          ]}
        >
          <ModeSelector 
            currentMode={mode}
            onModeChange={handleModeChange}
          />
        </Animated.View>
        {showSettings && (
          <View style={styles.settingsOverlay}>
            <TimerSettings
              times={customTimes}
              onTimeChange={handleTimeChange}
              onClose={() => setShowSettings(false)}
            />
          </View>
        )}
        <StatusBar style="light" />
      </Animated.View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  controlsWrapper: {
    position: 'absolute',
    bottom: 120,
    left: 0,
    right: 0,
    zIndex: 2,
  },
  modeSelectorContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingBottom: 50,
    zIndex: 1,
  },
  headerButtons: {
    position: 'absolute',
    top: 40,
    right: 20,
    flexDirection: 'row',
    gap: 12,
    zIndex: 3,
  },
  headerButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerButtonActive: {
    backgroundColor: COLORS.button,
  },
  settingsOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 4,
  },
}); 