import { router } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const sliderData = [
  {
    image: require('../../assets/images/image1.png'),
    text: 'Hoş geldiniz! Uygulamamızı keşfedin.',
    buttonText: 'İleri',
  },
  {
    image: require('../../assets/images/image2.png'),
    text: 'Hızlı ve kolay kullanım.',
    buttonText: 'İleri',
  },
  {
    image: require('../../assets/images/image3.png'),
    text: 'Hemen başlayın!',
    buttonText: 'Giriş Yap',
  },
];

const Intro = ({ navigation }) => {
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
      <Image source={sliderData[currentSlide].image} style={styles.image} />
      <Text style={styles.text}>{sliderData[currentSlide].text}</Text>
      <TouchableOpacity style={styles.button} onPress={handleNext}>
        <Text style={styles.buttonText}>{sliderData[currentSlide].buttonText}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Intro;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  image: {
    width: width * 0.8,
    height: width * 0.8,
    resizeMode: 'contain',
    marginBottom: 30,
  },
  text: {
    fontSize: 18,
    textAlign: 'center',
    marginHorizontal: 20,
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});