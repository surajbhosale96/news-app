import React from 'react';
import {StyleSheet} from 'react-native';
export default StyleSheet.create({
  readMoreText: {
    color: 'white',
    fontFamily: 'arial',
  },
  mainContainer: {
    flex: 1,
  },
  newsContainer: {
    paddingHorizontal: 10,
    paddingBottom: 50,
  },
  newsImage: {
    width: '100%',
    height: 200,
  },
  descriptionContainer: {
    paddingTop: 15,
  },
  newsContent: {
    paddingTop: 15,
  },
  timeAndShareIconContainer: {
    flexDirection: 'row',
    paddingVertical: 20,
    justifyContent: 'space-around',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  saveImageBtn: {
    backgroundColor: 'black',
    height: 40,
    width: 200,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  saveImgBtnContainer: {
    paddingTop: 20,
    alignItems: 'center',
  },
  saveImageText: {
    color: '#fff',
    fontFamily: 'arial',
    fontSize: 15,
  },
  timeText: {
    fontFamily: 'arial',
    color: 'grey',
  },
  descriptionText: {
    fontFamily: 'arial',
    fontSize: 25,
  },
  contentText: {
    fontFamily: 'arial',
    fontSize: 18,
    lineHeight: 25,
  },
  readMoreBtn: {
    backgroundColor: 'crimson',
    height: 30,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
});
