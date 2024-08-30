import React from 'react';
import { Image, StyleSheet, View, ScrollView } from 'react-native';
import { Text } from '~/components/ui/text';
import { useAuth } from '~/context/AuthContext';
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from '@expo/vector-icons/Ionicons';

const Profile = () => {
  const { user } = useAuth();

  return (
    <ScrollView style={styles.container}>
      <LinearGradient
        colors={['#4c669f', '#3b5998', '#192f6a']}
        style={styles.headerGradient}
      >
        <View style={styles.profileContainer}>
          <Image source={require('../../../assets/images/react-logo.png')} style={styles.profileImage} />
          <View style={styles.userInfo}>
            <Text style={styles.name}>{user?.name}</Text>
            <Text style={styles.email}>{user?.email}</Text>
          </View>
        </View>
      </LinearGradient>

      <View style={styles.statsContainer}>
        {[
          { number: '10', label: 'Tamamlanmış' },
          { number: '5', label: 'Devam Eden' },
          { number: '25', label: 'Tüm Görevler' },
        ].map((stat, index) => (
          <View key={index} style={styles.statItem}>
            <Text style={styles.statNumber}>{stat.number}</Text>
            <Text style={styles.statLabel}>{stat.label}</Text>
          </View>
        ))}
      </View>

      <View style={styles.infoSection}>
        {[
          { icon: 'school', text: 'Bilgisayar Programcılığı' },
          { icon: 'location', text: 'Bursa, Türkiye' },
          { icon: 'code-working', text: 'Yazılım Geliştirici' },
        ].map((item, index) => (
          <View key={index} style={styles.infoItem}>
            <View style={styles.iconContainer}>
              <Ionicons name={item.icon} size={24} color="#fff" />
            </View>
            <Text style={styles.infoText}>{item.text}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f2f5',
  },
  headerGradient: {
    paddingTop: 60,
    paddingBottom: 30,
  },
  profileContainer: {
    alignItems: 'center',
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: '#fff',
  },
  userInfo: {
    alignItems: 'center',
    marginTop: 15,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  email: {
    fontSize: 16,
    color: '#e0e0e0',
    marginTop: 5,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: -30,
    marginHorizontal: 20,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#4c669f',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
  },
  infoSection: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#4c669f',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  infoText: {
    fontSize: 16,
    color: '#333',
  },
});