import React from 'react';
import { View, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useGoogleComponent } from '../lib/hooks/useGoogleComponent';

import GoogleSvg from './svgComponents/GoogleSvg';

//Add back after MVP
//import FacebookSvg from './svgComponents/FacebookSvg';

const SocialContainer = () => {
  const [user, ShowUserInfo, handlePromptAsync] = useGoogleComponent();
  
  return (
    <View style={styles.socialContainer}>
      {user ? (
        <ShowUserInfo />
      ) : (
        <TouchableOpacity
          style={styles.google}
          activeOpacity={0.7}
          onPress={() => {
            handlePromptAsync();
          }}
        >
          <GoogleSvg />
        </TouchableOpacity>
          )}
          {/*Add back after MVP*/}
      {/*<TouchableOpacity*/}
      {/*  style={styles.facebook}*/}
      {/*  activeOpacity={0.7}*/}
      {/*  onPress={() => Alert.alert('You pressed the facebook button')}*/}
      {/*    >*/}
      {/*  <FacebookSvg />*/}
      {/*</TouchableOpacity>*/}
    </View>
  );
};

const styles = StyleSheet.create({
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  google: {
    width: 40,
    height: 40,
      //marginRight: 28, //Add back after MVP when Facebook added
    
    },

    //Add back after MVP when Facebook added
  //facebook: {
  //  width: 40,
  //  height: 40,
  //},
});

export default SocialContainer;
