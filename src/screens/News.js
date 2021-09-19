import React from 'react';
import {
  ScrollView,
  Text,
  TouchableOpacity,
  Linking,
  View,
  Image,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import Share from 'react-native-share';
import RNFetchBlob from 'rn-fetch-blob';
import Icon from 'react-native-vector-icons/FontAwesome';
import NewsStyles from '../styles/NewsStyles';
function News({route}) {
  const {content, description, url, image, author, time} = route.params;
  const share = async () => {
    const shareOptions = {
      message: 'news app',
      url: JSON.stringify(url),
    };
    try {
      const shareResponse = await Share.open(shareOptions);
    } catch (error) {
      console.log('error', error);
    }
  };
  const REMOTE_IMAGE_PATH = image;
  const checkPermission = async () => {
    // Function to check the platform
    // If iOS then start downloading
    // If Android then ask for permission

    if (Platform.OS === 'ios') {
      downloadImage();
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Storage Permission Required',
            message: 'App needs access to your storage to download Photos',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          // Once user grant the permission start downloading
          console.log('Storage Permission Granted.');
          downloadImage();
        } else {
          // If permission denied then show alert
          alert('Storage Permission Not Granted');
        }
      } catch (err) {
        // To handle permission related exception
        console.warn(err);
      }
    }
  };

  const downloadImage = () => {
    // Main function to download the image

    // To add the time suffix in filename
    let date = new Date();
    // Image URL which we want to download
    let image_URL = REMOTE_IMAGE_PATH;
    // Getting the extention of the file
    let ext = getExtention(image_URL);
    ext = '.' + ext[0];
    // Get config and fs from RNFetchBlob
    // config: To pass the downloading related options
    // fs: Directory path where we want our image to download
    const {config, fs} = RNFetchBlob;
    let PictureDir = fs.dirs.PictureDir;
    let options = {
      fileCache: true,
      addAndroidDownloads: {
        // Related to the Android only
        useDownloadManager: true,
        notification: true,
        path:
          PictureDir +
          '/image_' +
          Math.floor(date.getTime() + date.getSeconds() / 2) +
          ext,
        description: 'Image',
      },
    };
    config(options)
      .fetch('GET', image_URL)
      .then(res => {
        alert('Image saved successfully to your device.');
      });
  };

  const getExtention = filename => {
    // To get the file extension
    return /[.]/.exec(filename) ? /[^.]+$/.exec(filename) : undefined;
  };
  return (
    <View style={NewsStyles.mainContainer}>
      <ScrollView>
        <View style={NewsStyles.newsContainer}>
          <Image
            source={{uri: REMOTE_IMAGE_PATH}}
            style={NewsStyles.newsImage}
          />
          <View style={NewsStyles.saveImgBtnContainer}>
            <TouchableOpacity
              onPress={checkPermission}
              style={NewsStyles.saveImageBtn}>
              <Text style={NewsStyles.saveImageText}>Save image</Text>
            </TouchableOpacity>
          </View>

          <View style={NewsStyles.timeAndShareIconContainer}>
            <Text>{author}</Text>
            <TouchableOpacity onPress={share}>
              <Icon name="share" size={30} color="#000" />
            </TouchableOpacity>
            <Text style={NewsStyles.timeText}>{time}</Text>
          </View>
          <View style={NewsStyles.descriptionContainer}>
            <Text style={NewsStyles.descriptionText}>{description}</Text>
          </View>
          <View style={NewsStyles.newsContent}>
            <Text style={NewsStyles.contentText}>{content}</Text>
          </View>
          <View style={NewsStyles.readMoreBtnContainer}>
            <TouchableOpacity
              onPress={() => {
                Linking.openURL(url);
              }}
              style={NewsStyles.readMoreBtn}>
              <Text style={NewsStyles.readMoreText}>Read more</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

export default News;
