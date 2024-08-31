import React from 'react';
import { StyleSheet, View, ScrollView, FlatList, Image } from 'react-native';
import { Text } from '~/components/ui/text';
import { LinearGradient } from 'expo-linear-gradient';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { Dimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import Carousel from 'react-native-snap-carousel';


const { width: screenWidth } = Dimensions.get('window');

const HomePage = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();


  return (
    <View style={styles.container}>
      {/* Şeffaf Header */}
      <View style={[styles.header, { paddingTop: insets.top }]}>
        <TouchableOpacity
          onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
          style={styles.menuButton}
        >
          <Ionicons name="menu" size={30} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.profileButton}>
          <Image
            source={require('../../../assets/images/react-logo.png')}
            style={styles.profilePicture}
          />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView}>
        <LinearGradient
          colors={['#4c669f', '#3b5998', '#192f6a']}
          style={styles.headerGradient}
        >
          <Text style={styles.headerTitle}>Günlük Özet</Text>
        </LinearGradient>

        <View style={styles.productsSection}>
          <Text style={styles.sectionTitle}>Eğitmen Ürünleri</Text>
          <View style={styles.productCardPlaceholder}>
            <Text>Eğitmen ürün kartları buraya eklenecek</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f2f5',
  },
  menuButton: {
    padding: 5,
  },
  profileButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
  },
  profilePicture: {
    width: '100%',
    height: '100%',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    zIndex: 1000,
    backgroundColor: 'rgba(255, 255, 255, 0.7)', // Şeffaf arka plan
  },
  headerGradient: {
    paddingTop: 80, // Header'a yer açmak için
    paddingBottom: 30,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
  },
  dailyInfoList: {
    paddingHorizontal: 10,
  },
  dailyInfoItem: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    marginHorizontal: 10,
    width: screenWidth - 80,
  },
  dailyInfoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  dailyInfoValue: {
    fontSize: 24,
    color: '#fff',
  },
  productsSection: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  productCardPlaceholder: {
    backgroundColor: '#e0e0e0',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    height: 200,
  },
});

export default HomePage;