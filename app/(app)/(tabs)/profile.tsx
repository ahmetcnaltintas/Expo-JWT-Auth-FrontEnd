import React from 'react';
import { Image, StyleSheet, View, ScrollView } from 'react-native';
import { Text } from '~/components/ui/text';
import { useAuth } from '~/context/AuthContext';
import Ionicons from '@expo/vector-icons/Ionicons';


const Profile = () => {
  const { user } = useAuth();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.profileContainer}>
        <Image source={require('../../../assets/images/react-logo.png')} style={styles.profileImage} />
        <View style={styles.userInfo}>
          <Text style={styles.name}>{user?.name}</Text>
          <Text style={styles.email}>{user?.email}</Text>
        </View>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>10</Text>
          <Text style={styles.statLabel}>Tamamlanmış Görevler</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>5</Text>
          <Text style={styles.statLabel}>Tamamlanmış Görevler</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>25</Text>
          <Text style={styles.statLabel}>Tüm Görevler</Text>
        </View>
      </View>

      <View style={styles.infoSection}>
        <View style={styles.infoItem}>
          <Ionicons name="school" size={24} color="#4A4A4A" style={styles.infoIcon} />
          <Text style={styles.infoText}>Bilgisayar Programcılığı</Text>
        </View>
        <View style={styles.infoItem}>
          <Ionicons name="location" size={24} color="#4A4A4A" style={styles.infoIcon} />
          <Text style={styles.infoText}>Bursa, Türkiye</Text>
        </View>
        <View style={styles.infoItem}>
          <Ionicons name="code-working" size={24} color="#4A4A4A" style={styles.infoIcon} />
          <Text style={styles.infoText}>Yazılım Geliştirici</Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  profileContainer: {
    alignItems: 'center',
    marginTop: 60,
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
    marginTop: 10,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  email: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
  },
  statsContainer: {
    flexDirection: 'column-reverse',
    justifyContent: 'space-around',
    marginTop: 20,
    paddingVertical: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginHorizontal: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  statLabel: {
    fontSize: 14,
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
    marginBottom: 15,
  },
  infoIcon: {
    marginRight: 15,
  },
  infoText: {
    fontSize: 16,
    color: '#4A4A4A',
  },
});