import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'motion/react';
import { Play, RotateCcw, Trophy, CheckCircle, XCircle, Home, Brain, Target, Eye } from 'lucide-react';
import { allQuestions } from './questions_ans';
import BackGround from '../assets/background.png'


// Dynamic background color palette for each of the 10 questions
const backgroundColors = [
  // Question 1: Deep Ocean Blue
  {
    primary: '#0f172a',
    secondary: '#1e293b', 
    tertiary: '#334155',
    gradient: `url(${BackGround}) no-repeat center/cover`

  },
  // Question 2: Forest Green
  {
    primary: '#064e3b',
    secondary: '#065f46',
    tertiary: '#047857',
    gradient: `url(${BackGround}) no-repeat center/cover`

  },
  // Question 3: Sunset Orange
  {
    primary: '#7c2d12',
    secondary: '#ea580c',
    tertiary: '#f97316',
    gradient: `url(${BackGround}) no-repeat center/cover`

  },
  // Question 4: Royal Purple
  {
    primary: '#581c87',
    secondary: '#7c3aed',
    tertiary: '#8b5cf6',
    gradient: `url(${BackGround}) no-repeat center/cover`

  },
  // Question 5: Crimson Red
  {
    primary: '#7f1d1d',
    secondary: '#dc2626',
    tertiary: '#ef4444',
    gradient: `url(${BackGround}) no-repeat center/cover`

  },
  // Question 6: Teal Blue
  {
    primary: '#134e4a',
    secondary: '#0f766e',
    tertiary: '#14b8a6',
    gradient: `url(${BackGround}) no-repeat center/cover`

  },
  // Question 7: Golden Yellow
  {
    primary: '#713f12',
    secondary: '#ca8a04',
    tertiary: '#eab308',
    gradient: `url(${BackGround}) no-repeat center/cover`

  },
  // Question 8: Rose Pink
  {
    primary: '#881337',
    secondary: '#e11d48',
    tertiary: '#f43f5e',
    gradient: `url(${BackGround}) no-repeat center/cover`

  },
  // Question 9: Indigo Blue
  {
    primary: '#312e81',
    secondary: '#4338ca',
    tertiary: '#6366f1',
    gradient: `url(${BackGround}) no-repeat center/cover`

  },
  // Question 10: Emerald Green
  {
    primary: '#064e3b',
    secondary: '#059669',
    tertiary: '#10b981',
    gradient: `url(${BackGround}) no-repeat center/cover`

  }
];

// Default background for menu/results
const defaultBackground = {
  primary: '#0f172a',
  secondary: '#1e293b',
  tertiary: '#0f172a',
  gradient: ``
  
};

// Animation variants for reusable animations
const pageVariants = {
  initial: { 
    opacity: 0, 
    scale: 0.8,
    rotateX: -15
  },
  animate: { 
    opacity: 1, 
    scale: 1,
    rotateX: 0,
    transition: { 
      type: "spring", 
      bounce: 0.4, 
      duration: 0.8,
      staggerChildren: 0.1
    }
  },
  exit: { 
    opacity: 0, 
    scale: 0.8, 
    rotateX: 15,
    transition: { 
      duration: 0.6 
    }
  }
};

const containerVariants = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  initial: { 
    opacity: 0, 
    y: 20 
  },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: { 
      type: "spring", 
      bounce: 0.3 
    }
  }
};

const buttonVariants = {
  initial: { scale: 1 },
  whileHover: { 
    scale: 1.05,
    transition: { type: "spring", bounce: 0.4, duration: 0.4 }
  },
  whileTap: { 
    scale: 0.95,
    transition: { type: "spring", bounce: 0.6, duration: 0.2 }
  }
};

const iconBounceVariants = {
  initial: { scale: 1, rotate: 0 },
  animate: { 
    scale: [1, 1.2, 1], 
    rotate: [0, 360],
    transition: { 
      duration: 2,
      ease: "easeInOut",
      times: [0, 0.5, 1]
    }
  }
};

const progressBarVariants = {
  initial: { scaleX: 0 },
  animate: { 
    scaleX: 1,
    transition: { 
      type: "spring", 
      bounce: 0.2,
      duration: 1
    }
  }
};

const cardSlideVariants = {
  initial: { x: 300, opacity: 0 },
  animate: { 
    x: 0, 
    opacity: 1,
    transition: { 
      type: "spring", 
      bounce: 0.4,
      duration: 0.8
    }
  },
  exit: { 
    x: -300, 
    opacity: 0,
    transition: { 
      duration: 0.6 
    }
  }
};

const optionVariants = {
  initial: { opacity: 0, x: -50 },
  animate: (i) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.1,
      type: "spring",
      bounce: 0.3
    }
  }),
  whileHover: { x: 10, scale: 1.02 },
  whileTap: { scale: 0.98 }
};

const feedbackVariants = {
  initial: { scale: 0, opacity: 0 },
  animate: { 
    scale: 1, 
    opacity: 1,
    transition: { 
      type: "spring", 
      bounce: 0.6,
      duration: 0.5
    }
  }
};

const scoreCountVariants = {
  initial: { scale: 0.5, opacity: 0 },
  animate: { 
    scale: 1, 
    opacity: 1,
    transition: { 
      type: "spring", 
      bounce: 0.6,
      duration: 0.8,
      delay: 0.3
    }
  }
};

const newHighScoreVariants = {
  initial: { scale: 0, rotate: -180 },
  animate: { 
    scale: 1, 
    rotate: 0,
    transition: { 
      type: "spring", 
      bounce: 0.8,
      duration: 1,
      delay: 0.5
    }
  }
};

// Background transition variants
const backgroundVariants = {
  initial: { opacity: 0 },
  animate: { 
    opacity: 1,
    transition: { 
      duration: 1.5,
      ease: "easeInOut"
    }
  },
  exit: { 
    opacity: 0,
    transition: { 
      duration: 0.8 
    }
  }
};

// Dynamic styles based on current background
const createDynamicStyles = (bgColors) => ({
  appContainer: {
    minHeight: '100vh',
    background: bgColors.gradient,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '1rem',
    position: 'relative',
    overflow: 'hidden'
  },
  gameContainer: {
    minHeight: '100vh',
    background: bgColors.gradient,
    padding: '1rem',
    position: 'relative',
    overflow: 'hidden'
  },
  menuContainer: {
    maxWidth: '28rem',
    width: '100%',
    position: 'relative',
    zIndex: 10
  },
  gameContent: {
    maxWidth: '42rem',
    margin: '0 auto',
    position: 'relative',
    zIndex: 10
  },
  resultsContainer: {
    maxWidth: '32rem',
    width: '100%',
    textAlign: 'center',
    position: 'relative',
    zIndex: 10
  },
  titleSection: {
    textAlign: 'center',
    marginBottom: '3rem'
  },
  iconContainer: (bgColor = '#2563eb') => ({
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '5rem',
    height: '5rem',
    backgroundColor: bgColor,
    borderRadius: '50%',
    marginBottom: '1.5rem',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.3)'
  }),
  largeIconContainer: (bgColor = '#eab308') => ({
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '6rem',
    height: '6rem',
    backgroundColor: bgColor,
    borderRadius: '50%',
    marginBottom: '1rem',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.4)'
  }),
  mainTitle: {
    fontSize: '2.25rem',
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: '0.5rem',
    textShadow: '0 2px 10px rgba(0, 0, 0, 0.3)'
  },
  subtitle: {
    color: '#e2e8f0',
    fontSize: '1.125rem',
    textShadow: '0 1px 5px rgba(0, 0, 0, 0.3)'
  },
  sectionTitle: {
    fontSize: '1.875rem',
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: '0.5rem',
    textShadow: '0 2px 10px rgba(0, 0, 0, 0.3)'
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '1rem',
    marginBottom: '2rem'
  },
  statCard: {
    backgroundColor: `rgba(255, 255, 255, 0.1)`,
    backdropFilter: 'blur(15px)',
    borderRadius: '0.75rem',
    padding: '1rem',
    textAlign: 'center',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)'
  },
  statIcon: (color = '#60a5fa') => ({
    width: '1.5rem',
    height: '1.5rem',
    color: color,
    margin: '0 auto 0.5rem'
  }),
  statTitle: {
    color: '#ffffff',
    fontWeight: '600',
    marginBottom: '0.25rem'
  },
  statSubtitle: {
    color: '#e2e8f0',
    fontSize: '0.875rem'
  },
  primaryButton: {
    width: '100%',
    backgroundColor: 'rgba(37, 99, 235, 0.9)',
    color: '#ffffff',
    fontWeight: 'bold',
    padding: '1rem 2rem',
    borderRadius: '0.75rem',
    fontSize: '1.25rem',
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.75rem',
    marginBottom: '1rem',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.3)',
    backdropFilter: 'blur(10px)',
  },
  secondaryButton: {
    width: '100%',
    backgroundColor: 'rgba(55, 65, 81, 0.9)',
    color: '#ffffff',
    fontWeight: 'bold',
    padding: '0.75rem 1.5rem',
    borderRadius: '0.5rem',
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    backdropFilter: 'blur(10px)',
  },
  reviewButton: {
    width: '100%',
    backgroundColor: 'rgba(5, 150, 105, 0.9)',
    color: '#ffffff',
    fontWeight: 'bold',
    padding: '0.75rem 1.5rem',
    borderRadius: '0.5rem',
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    backdropFilter: 'blur(10px)',
  },
  textButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    color: '#e2e8f0',
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
  },
  gameHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1.5rem'
  },
  headerText: {
    color: '#e2e8f0',
    textShadow: '0 1px 5px rgba(0, 0, 0, 0.3)'
  },
  progressBar: {
    width: '100%',
    backgroundColor: 'rgba(55, 65, 81, 0.6)',
    borderRadius: '9999px',
    height: '0.75rem',
    marginBottom: '2rem',
    overflow: 'hidden',
    backdropFilter: 'blur(10px)',
    boxShadow: 'inset 0 2px 10px rgba(0, 0, 0, 0.3)'
  },
  progressFill: {
    backgroundColor: '#ffffff',
    height: '100%',
    borderRadius: '9999px',
    transformOrigin: 'left',
    boxShadow: '0 0 15px rgba(255, 255, 255, 0.5)'
  },
  questionCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(20px)',
    borderRadius: '1rem',
    padding: '2rem',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    boxShadow: '0 25px 50px rgba(0, 0, 0, 0.3)'
  },
  questionText: {
    fontSize: '1.5rem',
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: '2rem',
    textAlign: 'center',
    lineHeight: '1.6',
    textShadow: '0 2px 10px rgba(0, 0, 0, 0.3)'
  },
  optionsGrid: {
    display: 'grid',
    gap: '1rem'
  },
  optionButton: (showFeedback, isCorrect, isSelected) => {
    let baseStyles = {
      width: '100%',
      padding: '1rem',
      textAlign: 'left',
      borderRadius: '0.75rem',
      fontWeight: '500',
      border: '2px solid',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      backdropFilter: 'blur(10px)'
    };

    if (showFeedback) {
      if (isCorrect) {
        return {
          ...baseStyles,
          backgroundColor: 'rgba(22, 163, 74, 0.9)',
          borderColor: 'rgba(21, 128, 61, 0.9)',
          color: '#ffffff',
          boxShadow: '0 10px 25px rgba(22, 163, 74, 0.3)'
        };
      } else if (isSelected) {
        return {
          ...baseStyles,
          backgroundColor: 'rgba(220, 38, 38, 0.9)',
          borderColor: 'rgba(185, 28, 28, 0.9)',
          color: '#ffffff',
          boxShadow: '0 10px 25px rgba(220, 38, 38, 0.3)'
        };
      } else {
        return {
          ...baseStyles,
          backgroundColor: 'rgba(55, 65, 81, 0.6)',
          borderColor: 'rgba(75, 85, 99, 0.6)',
          color: '#9ca3af',
          cursor: 'not-allowed'
        };
      }
    } else {
      return {
        ...baseStyles,
        backgroundColor: 'rgba(55, 65, 81, 0.7)',
        borderColor: 'rgba(75, 85, 99, 0.7)',
        color: '#ffffff',
      };
    }
  },
  feedback: {
    textAlign: 'center',
    marginTop: '1.5rem'
  },
  feedbackText: (isCorrect) => ({
    fontSize: '1.125rem',
    fontWeight: '500',
    color: isCorrect ? '#4ade80' : '#f87171',
    textShadow: '0 2px 10px rgba(0, 0, 0, 0.3)'
  }),
  infoCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(15px)',
    borderRadius: '0.75rem',
    padding: '1rem',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)'
  },
  infoTitle: {
    color: '#ffffff',
    fontWeight: '600',
    marginBottom: '0.5rem'
  },
  instructionsList: {
    color: '#e2e8f0',
    fontSize: '0.875rem',
    listStyle: 'none',
    padding: 0,
    margin: 0
  },
  instructionItem: {
    marginBottom: '0.25rem'
  },
  scoreCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(20px)',
    borderRadius: '1rem',
    padding: '2rem',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    boxShadow: '0 25px 50px rgba(0, 0, 0, 0.3)',
    marginBottom: '2rem'
  },
  scoreDisplay: {
    fontSize: '3.75rem',
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: '0.5rem',
    textShadow: '0 4px 20px rgba(0, 0, 0, 0.3)'
  },
  scoreTotal: {
    fontSize: '1.875rem',
    color: '#e2e8f0'
  },
  scoreMessage: {
    fontSize: '1.25rem',
    color: '#e2e8f0',
    marginBottom: '1rem',
    textShadow: '0 2px 10px rgba(0, 0, 0, 0.3)'
  },
  percentageText: {
    color: '#e2e8f0'
  },
  newHighScoreBadge: {
    position: 'absolute',
    top: '-10px',
    right: '-10px',
    backgroundColor: '#dc2626',
    color: '#ffffff',
    fontSize: '0.75rem',
    fontWeight: 'bold',
    padding: '0.25rem 0.5rem',
    borderRadius: '9999px',
    transform: 'rotate(15deg)',
    boxShadow: '0 4px 15px rgba(220, 38, 38, 0.4)'
  },
  highScoreContainer: {
    position: 'relative',
    display: 'inline-block'
  },
  buttonGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem'
  },
  answersContainer: {
    marginBottom: '2rem',
    scrollbarWidth: 'thin',
    scrollbarColor: 'rgba(255, 255, 255, 0.3) transparent'
  },
  answerCard: (isCorrect) => ({
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(15px)',
    borderRadius: '0.75rem',
    padding: '1.5rem',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    marginBottom: '1rem',
    borderLeft: `4px solid ${isCorrect ? '#16a34a' : '#dc2626'}`,
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)'
  }),
  answerQuestion: {
    fontSize: '1.125rem',
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: '1rem',
    textShadow: '0 1px 5px rgba(0, 0, 0, 0.3)'
  },
  answerDetails: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem'
  },
  answerRow: (isYourAnswer, isCorrectAnswer) => {
    let color = '#e2e8f0';
    if (isCorrectAnswer) color = '#4ade80';
    if (isYourAnswer && !isCorrectAnswer) color = '#f87171';
    
    return {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      color: color,
      fontSize: '1rem'
    };
  },
  answerLabel: {
    fontWeight: '600',
    minWidth: '120px'
  },
  answerText: {
    flex: 1
  },
  // Animated background overlay
  backgroundOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: bgColors.gradient,
    opacity: 0.8,
    zIndex: 1
  },
  // Floating particles effect
  floatingParticle: {
    position: 'absolute',
    width: '6px',
    height: '6px',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: '50%',
    pointerEvents: 'none'
  }
});

const CleanQuizGame = () => {
  const [gameState, setGameState] = useState('menu');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState([]);
  const [highScore, setHighScore] = useState(0);
  const [isNewHighScore, setIsNewHighScore] = useState(false);

  // Get current background colors based on game state and question
  const getCurrentBackground = () => {
    if (gameState === 'playing' && questions.length > 0) {
      return backgroundColors[currentQuestion] || defaultBackground;
    }
    return defaultBackground;
  };

  const currentBgColors = getCurrentBackground();
  const styles = createDynamicStyles(currentBgColors);

  // Motion values for smooth background transitions
  const backgroundProgress = useMotionValue(0);
  const animatedBackground = useTransform(
    backgroundProgress,
    [0, 1],
    [defaultBackground.gradient, currentBgColors.gradient]
  );

  // Update background when question changes
  useEffect(() => {
    if (gameState === 'playing') {
      backgroundProgress.set(1);
    } else {
      backgroundProgress.set(0);
    }
  }, [gameState, currentQuestion, backgroundProgress]);

  const generateRandomQuestions = () => {
    const shuffled = [...allQuestions].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 10); // Changed from 5 to 10 questions
  };

  const checkForNewHighScore = (finalScore) => {
    if (finalScore > highScore) {
      setHighScore(finalScore);
      setIsNewHighScore(true);
      return true;
    }
    setIsNewHighScore(false);
    return false;
  };

  const startGame = () => {
    setQuestions(generateRandomQuestions());
    setGameState('playing');
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setUserAnswers([]);
  };

  const handleAnswerClick = (selectedIndex) => {
    setSelectedAnswer(selectedIndex);
    setShowFeedback(true);

    const isCorrect = selectedIndex === questions[currentQuestion].correct;
    if (isCorrect) {
      setScore(score + 1);
    }

    const newUserAnswers = [...userAnswers];
    newUserAnswers[currentQuestion] = selectedIndex;
    setUserAnswers(newUserAnswers);

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setShowFeedback(false);
      } else {
        checkForNewHighScore(isCorrect ? score + 1 : score);
        setGameState('results');
      }
    }, 1500);
  };

  const backToMenu = () => {
    setGameState('menu');
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setQuestions([]);
    setUserAnswers([]);
    setIsNewHighScore(false);
  };

  const showAnswers = () => {
    setGameState('review');
  };

  const getScoreMessage = () => {
    const percentage = (score / questions.length) * 100;
    if (isNewHighScore) return "🎉 NEW HIGH SCORE! 🎉";
    if (percentage === 100) return "Perfect Score! 🏆";
    if (percentage >= 90) return "Outstanding! 🌟";
    if (percentage >= 80) return "Excellent! ⭐";
    if (percentage >= 70) return "Great Job! 👏";
    if (percentage >= 60) return "Good Work! 👍";
    if (percentage >= 50) return "Nice Try! 💪";
    return "Keep Learning! 📚";
  };

  // Floating particles component for ambient effect
  const FloatingParticles = () => {
    const particles = Array.from({ length: 20 }, (_, i) => i); // Increased to 20 for more visual appeal
    
    return (
      <>
        {particles.map((particle) => (
          <motion.div
            key={particle}
            style={{
              ...styles.floatingParticle,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, Math.random() * 20 - 10, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: particle * 0.2,
            }}
          />
        ))}
      </>
    );
  };

  return (
    <AnimatePresence mode="wait">
      {/* Menu Screen */}
      {gameState === 'menu' && (
        <motion.div 
          key="menu"
          style={styles.appContainer}
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <FloatingParticles />
          
          <motion.div 
            style={styles.menuContainer}
            variants={containerVariants}
          >
            <motion.div 
              style={styles.titleSection}
              variants={itemVariants}
            >
              <motion.div 
                style={styles.iconContainer()}
                variants={iconBounceVariants}
                initial="initial"
                animate="animate"
              >
                <Brain style={{ width: '2.5rem', height: '2.5rem', color: '#ffffff' }} />
              </motion.div>
              <motion.h1 
                style={styles.mainTitle}
                variants={itemVariants}
              >
                Quiz Game
              </motion.h1>
              <motion.p 
                style={styles.subtitle}
                variants={itemVariants}
              >
                Test your knowledge with 10 questions!
              </motion.p>
            </motion.div>

            <motion.div 
              style={styles.statsGrid}
              variants={itemVariants}
            >
              <motion.div 
                style={styles.statCard}
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ type: "spring", bounce: 0.4 }}
              >
                <Target style={styles.statIcon()} />
                <div style={styles.statTitle}>10 Questions</div>
                <div style={styles.statSubtitle}>Per Game</div>
              </motion.div>
              <motion.div 
                style={styles.statCard}
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ type: "spring", bounce: 0.4 }}
              >
                <Trophy style={styles.statIcon('#eab308')} />
                <div style={styles.statTitle}>High Score</div>
                <div style={styles.statSubtitle}>{highScore}/10</div>
              </motion.div>
            </motion.div>

            <motion.button
              onClick={startGame}
              style={styles.primaryButton}
              variants={buttonVariants}
              whileHover="whileHover"
              whileTap="whileTap"
            >
              <Play style={{ width: '1.5rem', height: '1.5rem' }} />
              Start 10-Question Quiz
            </motion.button>

            <motion.div 
              style={styles.infoCard}
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
            >
              <h3 style={styles.infoTitle}>How to Play:</h3>
              <ul style={styles.instructionsList}>
                <li style={styles.instructionItem}>• Answer 10 multiple choice questions</li>
                <li style={styles.instructionItem}>• Choose the correct answer for each question</li>
                <li style={styles.instructionItem}>• Get your final score out of 10</li>
                <li style={styles.instructionItem}>• Review all correct answers after the game</li>
              </ul>
            </motion.div>
          </motion.div>
        </motion.div>
      )}

      {/* Game Screen */}
      {gameState === 'playing' && questions.length > 0 && (
        <motion.div 
          key={`playing-${currentQuestion}`}
          style={styles.gameContainer}
          variants={backgroundVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <FloatingParticles />
          
          <motion.div 
            style={styles.gameContent}
            variants={containerVariants}
            initial="initial"
            animate="animate"
          >
            <motion.div 
              style={styles.gameHeader}
              variants={itemVariants}
            >
              <motion.button
                onClick={backToMenu}
                style={styles.textButton}
                whileHover={{ scale: 1.05, color: '#ffffff' }}
                whileTap={{ scale: 0.95 }}
              >
                <Home style={{ width: '1.25rem', height: '1.25rem' }} />
                Menu
              </motion.button>
              <div style={styles.headerText}>
                Question {currentQuestion + 1} of {questions.length}
              </div>
              <motion.div 
                style={styles.headerText}
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 0.3 }}
                key={score}
              >
                Score: {score}
              </motion.div>
            </motion.div>

            <motion.div 
              style={styles.progressBar}
              variants={itemVariants}
            >
              <motion.div 
                style={styles.progressFill}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: (currentQuestion + 1) / questions.length }}
                transition={{ 
                  type: "spring", 
                  bounce: 0.3,
                  duration: 0.8 
                }}
              />
            </motion.div>

            <AnimatePresence mode="wait">
              <motion.div 
                key={currentQuestion}
                style={styles.questionCard}
                variants={cardSlideVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <motion.h2 
                  style={styles.questionText}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, type: "spring", bounce: 0.3 }}
                >
                  {questions[currentQuestion].question}
                </motion.h2>

                <motion.div 
                  style={styles.optionsGrid}
                  variants={containerVariants}
                  initial="initial"
                  animate="animate"
                >
                  {questions[currentQuestion].options.map((option, index) => (
                    <motion.button
                      key={index}
                      onClick={() => handleAnswerClick(index)}
                      disabled={showFeedback}
                      style={styles.optionButton(
                        showFeedback,
                        index === questions[currentQuestion].correct,
                        index === selectedAnswer
                      )}
                      variants={optionVariants}
                      custom={index}
                      whileHover={!showFeedback ? "whileHover" : {}}
                      whileTap={!showFeedback ? "whileTap" : {}}
                    >
                      <span>{option}</span>
                      <AnimatePresence>
                        {showFeedback && index === questions[currentQuestion].correct && (
                          <motion.div
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ type: "spring", bounce: 0.6 }}
                          >
                            <CheckCircle style={{ width: '1.25rem', height: '1.25rem', color: '#ffffff' }} />
                          </motion.div>
                        )}
                        {showFeedback && index === selectedAnswer && index !== questions[currentQuestion].correct && (
                          <motion.div
                            initial={{ scale: 0, rotate: 180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ type: "spring", bounce: 0.6 }}
                          >
                            <XCircle style={{ width: '1.25rem', height: '1.25rem', color: '#ffffff' }} />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.button>
                  ))}
                </motion.div>

                <AnimatePresence>
                  {showFeedback && (
                    <motion.div 
                      style={styles.feedback}
                      variants={feedbackVariants}
                      initial="initial"
                      animate="animate"
                    >
                      <motion.p 
                        style={styles.feedbackText(selectedAnswer === questions[currentQuestion].correct)}
                        animate={{ 
                          scale: [1, 1.05, 1],
                          color: selectedAnswer === questions[currentQuestion].correct ? '#4ade80' : '#f87171'
                        }}
                        transition={{ duration: 0.5 }}
                      >
                        {selectedAnswer === questions[currentQuestion].correct 
                          ? "Correct! Well done!" 
                          : "Incorrect. Better luck next time!"}
                      </motion.p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}

      {/* Results Screen */}
      {gameState === 'results' && (
        <motion.div 
          key="results"
          style={styles.appContainer}
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <FloatingParticles />
          
          <motion.div 
            style={styles.resultsContainer}
            variants={containerVariants}
          >
            <motion.div 
              style={styles.titleSection}
              variants={itemVariants}
            >
              <motion.div style={styles.highScoreContainer}>
                <motion.div 
                  style={styles.largeIconContainer(isNewHighScore ? '#dc2626' : '#eab308')}
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 1.5, type: "spring", bounce: 0.3 }}
                >
                  <Trophy style={{ width: '3rem', height: '3rem', color: '#ffffff' }} />
                </motion.div>
                <AnimatePresence>
                  {isNewHighScore && (
                    <motion.div 
                      style={styles.newHighScoreBadge}
                      variants={newHighScoreVariants}
                      initial="initial"
                      animate="animate"
                    >
                      NEW!
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
              <motion.h2 
                style={styles.sectionTitle}
                variants={itemVariants}
              >
                Quiz Complete!
              </motion.h2>
            </motion.div>

            <motion.div 
              style={styles.scoreCard}
              variants={itemVariants}
              whileHover={{ scale: 1.02, y: -5 }}
            >
              <motion.div 
                style={styles.scoreDisplay}
                variants={scoreCountVariants}
                initial="initial"
                animate="animate"
              >
                {score}<span style={styles.scoreTotal}>/{questions.length}</span>
              </motion.div>
              <motion.p 
                style={styles.scoreMessage}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, type: "spring", bounce: 0.3 }}
              >
                {getScoreMessage()}
              </motion.p>
              <motion.div 
                style={styles.percentageText}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                {Math.round((score / questions.length) * 100)}% Correct
              </motion.div>
              {highScore > 0 && !isNewHighScore && (
                <motion.div 
                  style={{ ...styles.percentageText, marginTop: '0.5rem' }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.2 }}
                >
                  Best Score: {highScore}/{questions.length}
                </motion.div>
              )}
            </motion.div>

            <motion.div 
              style={styles.buttonGroup}
              variants={itemVariants}
            >
              <motion.button
                onClick={showAnswers}
                style={styles.reviewButton}
                variants={buttonVariants}
                whileHover="whileHover"
                whileTap="whileTap"
              >
                <Eye style={{ width: '1.25rem', height: '1.25rem' }} />
                Review Answers
              </motion.button>
              <motion.button
                onClick={startGame}
                style={styles.primaryButton}
                variants={buttonVariants}
                whileHover="whileHover"
                whileTap="whileTap"
              >
                <RotateCcw style={{ width: '1.25rem', height: '1.25rem' }} />
                Play Again
              </motion.button>
              <motion.button
                onClick={backToMenu}
                style={styles.secondaryButton}
                variants={buttonVariants}
                whileHover="whileHover"
                whileTap="whileTap"
              >
                <Home style={{ width: '1.25rem', height: '1.25rem' }} />
                Back to Menu
              </motion.button>
            </motion.div>
          </motion.div>
        </motion.div>
      )}

      {/* Answer Review Screen */}
      {gameState === 'review' && (
        <motion.div 
          key="review"
          style={styles.appContainer}
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <FloatingParticles />
          
          <motion.div 
            style={styles.resultsContainer}
            variants={containerVariants}
          >
            <motion.div 
              style={styles.titleSection}
              variants={itemVariants}
            >
              <motion.div 
                style={styles.iconContainer('#059669')}
                animate={{ rotateY: [0, 360] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              >
                <Eye style={{ width: '2.5rem', height: '2.5rem', color: '#ffffff' }} />
              </motion.div>
              <motion.h2 
                style={styles.sectionTitle}
                variants={itemVariants}
              >
                Answer Review
              </motion.h2>
              <motion.p 
                style={styles.subtitle}
                variants={itemVariants}
              >
                Review all 10 questions and answers
              </motion.p>
            </motion.div>

            <motion.div 
              style={styles.answersContainer}
              variants={containerVariants}
              initial="initial"
              animate="animate"
            >
              {questions.map((question, index) => {
                const userAnswer = userAnswers[index];
                const isCorrect = userAnswer === question.correct;
                
                return (
                  <motion.div 
                    key={index} 
                    style={styles.answerCard(isCorrect)}
                    variants={itemVariants}
                    whileHover={{ scale: 1.02, x: 10 }}
                  >
                    <motion.div 
                      style={styles.answerQuestion}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }} // Faster stagger for 10 questions
                    >
                      {index + 1}. {question.question}
                    </motion.div>
                    <motion.div 
                      style={styles.answerDetails}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.05 + 0.1 }}
                    >
                      <div style={styles.answerRow(true, isCorrect)}>
                        <span style={styles.answerLabel}>Your Answer:</span>
                        <span style={styles.answerText}>
                          {question.options[userAnswer]} {isCorrect ? '✓' : '✗'}
                        </span>
                      </div>
                      {!isCorrect && (
                        <div style={styles.answerRow(false, true)}>
                          <span style={styles.answerLabel}>Correct Answer:</span>
                          <span style={styles.answerText}>
                            {question.options[question.correct]} ✓
                          </span>
                        </div>
                      )}
                    </motion.div>
                  </motion.div>
                );
              })}
            </motion.div>

            <motion.div 
              style={styles.buttonGroup}
              variants={itemVariants}
            >
              <motion.button
                onClick={startGame}
                style={styles.primaryButton}
                variants={buttonVariants}
                whileHover="whileHover"
                whileTap="whileTap"
              >
                <RotateCcw style={{ width: '1.25rem', height: '1.25rem' }} />
                Take Quiz Again
              </motion.button>
              <motion.button
                onClick={backToMenu}
                style={styles.secondaryButton}
                variants={buttonVariants}
                whileHover="whileHover"
                whileTap="whileTap"
              >
                <Home style={{ width: '1.25rem', height: '1.25rem' }} />
                Back to Menu
              </motion.button>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CleanQuizGame;
