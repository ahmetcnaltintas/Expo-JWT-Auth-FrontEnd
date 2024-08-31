import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Image, Text } from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { Link, router } from 'expo-router';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const { register } = useAuth();

  const validateForm = () => {
    let isValid = true;
    const newErrors = { name: '', email: '', password: '', confirmPassword: '' };

    if (!name.trim()) {
      newErrors.name = 'İsim gereklidir.';
      isValid = false;
    }

    if (!email) {
      newErrors.email = 'E-posta adresi gereklidir.';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Geçerli bir e-posta adresi girin.';
      isValid = false;
    }

    if (!password) {
      newErrors.password = 'Şifre gereklidir.';
      isValid = false;
    } else if (password.length < 6) {
      newErrors.password = 'Şifre en az 6 karakter olmalıdır.';
      isValid = false;
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Şifreler eşleşmiyor.';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };
  const handleRegister = async () => {
    if (!validateForm()) return;

    try {
      await register(name, email, password, confirmPassword);
      router.replace('/(app)');
    } catch (error) {
      console.error('Registration failed:', error);
      if (error.message === 'Email already in use') {
        setErrors({ ...errors, email: 'Bu e-posta adresi zaten kullanımda.' });
      } else if (error.message === 'Passwords do not match') {
        setErrors({ ...errors, confirmPassword: 'Şifreler eşleşmiyor.' });
      } else {
        setErrors({ ...errors, email: 'Kayıt olurken bir hata oluştu. Lütfen tekrar deneyin.' });
      }
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/react-logo.png')}
        style={styles.logo}
      />
      <View style={styles.inputContainer}>
        <Text style={styles.label}>İsim</Text>
        <TextInput
          style={[styles.input, errors.name ? styles.inputError : null]}
          placeholder="Adınızı girin"
          placeholderTextColor="#666"
          value={name}
          onChangeText={(text) => {
            setName(text);
            setErrors({ ...errors, name: '' });
          }}
        />
        {errors.name ? <Text style={styles.errorText}>{errors.name}</Text> : null}
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>E-posta</Text>
        <TextInput
          style={[styles.input, errors.email ? styles.inputError : null]}
          placeholder="E-posta adresinizi girin"
          placeholderTextColor="#666"
          value={email}
          onChangeText={(text) => {
            setEmail(text);
            setErrors({ ...errors, email: '' });
          }}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Şifre</Text>
        <TextInput
          style={[styles.input, errors.password ? styles.inputError : null]}
          placeholder="Şifrenizi girin"
          placeholderTextColor="#666"
          value={password}
          onChangeText={(text) => {
            setPassword(text);
            setErrors({ ...errors, password: '' });
          }}
          secureTextEntry
        />
        {errors.password ? <Text style={styles.errorText}>{errors.password}</Text> : null}
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Şifre Tekrar</Text>
        <TextInput
          style={[styles.input, errors.confirmPassword ? styles.inputError : null]}
          placeholder="Şifrenizi tekrar girin"
          placeholderTextColor="#666"
          value={confirmPassword}
          onChangeText={(text) => {
            setConfirmPassword(text);
            setErrors({ ...errors, confirmPassword: '' });
          }}
          secureTextEntry
        />
        {errors.confirmPassword ? <Text style={styles.errorText}>{errors.confirmPassword}</Text> : null}
      </View>
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Kayıt Ol</Text>
      </TouchableOpacity>
      <View style={styles.loginContainer}>
        <Text style={styles.loginText}>Zaten bir hesabınız var mı? </Text>
        <Link href="/login" style={styles.loginLink}>
          <Text style={styles.loginLinkText}>Giriş yap</Text>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 30,
    resizeMode: 'contain',
  },
  inputContainer: {
    width: '100%',
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  input: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: '#fff',
    color: '#333',
  },
  inputError: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loginContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  loginText: {
    color: '#333',
    fontSize: 16,
  },
  loginLink: {
    marginLeft: 5,
  },
  loginLinkText: {
    color: '#007AFF',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
});