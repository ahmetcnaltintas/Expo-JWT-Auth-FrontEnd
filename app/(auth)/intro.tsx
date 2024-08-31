import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, Image } from 'react-native';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');

const sliderData = [
  {
    image: require('../../assets/images/image1.png'),
    text: 'Hoş geldiniz! Uygulamamızı keşfedin.',
  },
  {
    image: require('../../assets/images/image1.png'),
    text: 'Hızlı ve kolay kullanım.',
  },
  {
    image: require('../../assets/images/image1.png'),
    text: 'Hemen başlayın!',
  },
];

const Intro = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNext = () => {
    if (currentSlide < sliderData.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      router.navigate('/(auth)/login');
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" />
      {sliderData.map((slide, index) => (
        currentSlide === index && (
          <Animated.View 
            key={index} 
            style={StyleSheet.absoluteFillObject}
            entering={FadeIn}
            exiting={FadeOut}
          >
            <Image source={slide.image} style={styles.backgroundImage} />
          </Animated.View>
        )
      ))}
      <View style={styles.overlay}>
        <View style={styles.contentContainer}>
          <Animated.Text 
            style={styles.text}
            entering={FadeIn}
            exiting={FadeOut}
          >
            {sliderData[currentSlide].text}
          </Animated.Text>
          <TouchableOpacity style={styles.button} onPress={handleNext}>
            <Text style={styles.buttonText}>
              {currentSlide === sliderData.length - 1 ? 'Başla' : 'İleri'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  backgroundImage: {
    width: width,
    height: height,
    resizeMode: 'cover',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 50,
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 25,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Intro;