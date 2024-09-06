import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { moderateScale } from 'react-native-size-matters';

const App = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true); // State to handle loading

  // Fetch data from API
  useEffect(() => {
    axios
      .get('https://jsonplaceholder.org/posts') // Correct API URL
      .then((response) => {
        setData(response.data);
        setLoading(false); // Stop loading when data is fetched
      })
      .catch((error) => {
        console.error('Error fetching data: ', error);
        setLoading(false); // Stop loading on error as well
      });
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading data...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {data.map((item, index) => (
        <View key={index} style={styles.postContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{item.title}</Text>
          </View>
          {/* Display Image */}
          <Image source={{ uri: item.image }} style={styles.image} />
          {/* Scrollable content */}
          <View style={styles.contentWrapper}>
            <ScrollView nestedScrollEnabled={true}>
              <Text style={styles.content}>{item.content}</Text>
            </ScrollView>
          </View>
          <View style={styles.metaData}>
            <Text style={styles.metaText}>Category: {item.category || 'General'}</Text>
            <Text style={styles.metaText}>Published at: {item.publishedAt || 'N/A'}</Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: moderateScale(10),
    backgroundColor: '#fff',
    marginTop: moderateScale(40),
  },
  postContainer: {
    marginBottom: moderateScale(20),
    borderWidth: 1,
    padding: moderateScale(10),
    borderRadius: moderateScale(20),
    backgroundColor: '#fff', // Ensure background color is white for shadow visibility
    elevation: 5,
  },
  titleContainer: {
    justifyContent: 'center',
  },
  title: {
    padding: moderateScale(4),
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: moderateScale(10),
  },
  image: {
    width: '100%',
    height: moderateScale(200),
    marginBottom: moderateScale(10),
    borderRadius: moderateScale(10),
  },
  contentWrapper: {
    height: moderateScale(150),
    marginBottom: moderateScale(10),
  },
  content: {
    fontSize: 15,
    lineHeight: moderateScale(20),
  },
  metaData: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  metaText: {
    fontSize: 16,
    color: '#888',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});


export default App;
