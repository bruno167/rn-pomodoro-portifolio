import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../constants/theme';

interface TutorialProps {
  onComplete: () => void;
}

interface TutorialStep {
  title: string;
  description: string;
  position: {
    top?: number;
    bottom?: number;
    left?: number;
    right?: number;
  };
  icon: string;
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const TUTORIAL_STEPS: TutorialStep[] = [
  {
    title: 'Contador de Sprints',
    description: 'Acompanhe quantos ciclos de trabalho você já completou',
    position: { top: 100, left: 20 },
    icon: 'checkmark-circle',
  },
  {
    title: 'Modo Automático',
    description: 'Ative para alternar automaticamente entre trabalho e pausas',
    position: { top: 100, right: 70 },
    icon: 'infinite',
  },
  {
    title: 'Configurações',
    description: 'Ajuste o tempo de cada modo conforme sua necessidade',
    position: { top: 100, right: 20 },
    icon: 'settings-outline',
  },
  {
    title: 'Controles',
    description: 'Inicie, pause ou reinicie seu timer',
    position: { bottom: 220, left: (SCREEN_WIDTH - 250) / 2 },
    icon: 'play',
  },
  {
    title: 'Modos',
    description: 'Alterne entre trabalho e pausas manualmente',
    position: { bottom: 120, left: (SCREEN_WIDTH - 250) / 2 },
    icon: 'timer-outline',
  },
];

export function Tutorial({ onComplete }: TutorialProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [animation] = useState({
    fade: new Animated.Value(0),
    scale: new Animated.Value(0.9),
  });

  React.useEffect(() => {
    animateStep();
  }, [currentStep]);

  const animateStep = () => {
    animation.fade.setValue(0);
    animation.scale.setValue(0.9);

    Animated.parallel([
      Animated.timing(animation.fade, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.spring(animation.scale, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      })
    ]).start();
  };

  const handleNext = () => {
    if (currentStep < TUTORIAL_STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const currentTutorial = TUTORIAL_STEPS[currentStep];

  return (
    <View style={styles.overlay}>
      <View style={styles.container}>
        <Animated.View 
          style={[
            styles.spotlight,
            currentTutorial.position as any,
            { 
              opacity: animation.fade,
              transform: [{ scale: animation.scale }]
            }
          ]}
        >
          <View style={styles.iconContainer}>
            <Ionicons name={currentTutorial.icon as any} size={24} color={COLORS.text} />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.title}>{currentTutorial.title}</Text>
            <Text style={styles.description}>{currentTutorial.description}</Text>
          </View>
        </Animated.View>

        <View style={styles.bottomContainer}>
          <View style={styles.dotsContainer}>
            {TUTORIAL_STEPS.map((_, index) => (
              <Animated.View
                key={index}
                style={[
                  styles.dot,
                  index === currentStep && styles.activeDot,
                  { opacity: index === currentStep ? animation.fade : 0.3 }
                ]}
              />
            ))}
          </View>

          <TouchableOpacity 
            style={styles.nextButton} 
            onPress={handleNext}
          >
            <Text style={styles.nextButtonText}>
              {currentStep === TUTORIAL_STEPS.length - 1 ? 'Começar' : 'Próximo'}
            </Text>
            <Ionicons 
              name={currentStep === TUTORIAL_STEPS.length - 1 ? 'checkmark' : 'arrow-forward'} 
              size={20} 
              color={COLORS.text} 
              style={styles.nextIcon}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 9999,
  },
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  spotlight: {
    position: 'absolute',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 20,
    borderRadius: 20,
    width: 250,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.button,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  textContainer: {
    marginLeft: 8,
  },
  title: {
    color: COLORS.text,
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    color: COLORS.text,
    fontSize: 15,
    opacity: 0.9,
    lineHeight: 20,
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 50,
    alignItems: 'center',
    gap: 20,
  },
  nextButton: {
    backgroundColor: COLORS.button,
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  nextButtonText: {
    color: COLORS.text,
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 8,
  },
  nextIcon: {
    marginLeft: 8,
  },
  dotsContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.text,
  },
  activeDot: {
    backgroundColor: COLORS.button,
    width: 24,
  },
}); 