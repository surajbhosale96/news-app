import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import {Avatar, Button, Card, Title, Paragraph} from 'react-native-paper';
function Home({navigation}) {
  const [newsHeadlines, setNewsHeadlines] = useState([]);
  console.log(newsHeadlines);
  useEffect(() => {
    fetch(
      'https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=d29d58aab88d4ea0b04ddb245a230068',
    )
      .then(response => response.json())
      .then(data => setNewsHeadlines(data.articles));
  }, []);
  return (
    <View style={{flex: 1, backgroundColor: '#FFFAFA'}}>
      <View style={{paddingHorizontal: 15}}>
        <ScrollView>
          {newsHeadlines.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => {
                navigation.navigate('News', {
                  content: item.content,
                  description: item.description,
                  url: item.url,
                  image: item.urlToImage,
                  author: item.author,
                  time: item.publishedAt,
                });
              }}
              style={{paddingBottom: 20}}>
              <Card>
                <Card.Content></Card.Content>
                <Card.Cover source={{uri: item.urlToImage}} />
                <Title
                  style={{
                    textAlign: 'center',
                    paddingTop: 10,
                    paddingBottom: 5,
                  }}>
                  {item.title}
                </Title>
              </Card>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

export default Home;
