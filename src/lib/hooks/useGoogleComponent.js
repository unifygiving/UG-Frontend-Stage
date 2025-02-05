import React, { useState, useEffect } from 'react';
import { View, Image, Text } from 'react-native';
import { useDispatch } from 'react-redux';
import { setUser } from '../../store/slices/userSlice';

import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { loginGoogleUser, signUpGoogleUser } from '../../services/auth';
import { useNavigation } from '@react-navigation/native';

WebBrowser.maybeCompleteAuthSession();

export const useGoogleComponent = () => {
  const [accessToken, setAccessToken] = useState(null);
  const dispatch = useDispatch();
  const [user, setUserResponse] = useState(null);
  const [isAuthSessionActive, setIsAuthSessionActive] = useState(false);
  const navigation = useNavigation();
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId: '609991093478-0s4qnfpj6krsa4qjm9d1f20tcuvqge56.apps.googleusercontent.com',
    iosClientId: '609991093478-k7jbk6saop1dm45um9b4lf3j7hi8hs3a.apps.googleusercontent.com',
    androidClientId: '609991093478-90kgasrqp2qlu0n1rhaethdukksbe0hg.apps.googleusercontent.com'
  });

  const handleUserAuthentication = async (userInfo) => {
    try {
      const response = await loginGoogleUser({ email: userInfo.email, google_id: userInfo.id });
      dispatch(
        setUser({
          id: response.data.id,
          google_id: userInfo.id,
          token: response.data.token,
          firstName: response.data.firstName,
          lastName: response.data.lastName,
          avatar: response.data.picture,
          email: userInfo.email,
          role: response.data.role,
          charity_id_admin: response.data.charity_id_admin,
          charity_id_recipient: response.data.charity_id_recipient,
          location: response.data.location
        })
      );
      navigation.navigate('Donor Home');
    } catch (error) {
      if (error.status === 400) {
        try {
          const signUpResponse = await signUpGoogleUser({
            google_id: userInfo.id,
            firstName: userInfo.given_name,
            lastName: userInfo.family_name,
            email: userInfo.email,
            agreeToTerms: true,
            role: 'donor',
            picture: userInfo.picture,
          });
          dispatch(
            setUser({
              id: signUpResponse.data.id,
              google_id: userInfo.id,
              token: signUpResponse.data.token,
              firstName: signUpResponse.data.firstName,
              lastName: signUpResponse.data.lastName,
              avatar: signUpResponse.data.picture,
              email: userInfo.email,
              role: signUpResponse.data.role,
              charity_id_admin: signUpResponse.data.charity_id_admin,
              charity_id_recipient: signUpResponse.data.charity_id_recipient,
              location: signUpResponse.data.location
            })
          );
          navigation.navigate('Donor Home');
        } catch (signUpError) {
          console.error('Erro', signUpError);
        }
      } else {
        console.error('Erro', error);
      }
    }
  };

  useEffect(() => {
    if (response?.type === 'success') {
      const token = response.authentication.accessToken;
      setAccessToken(token);
      fetchUserInfo(token);
    }
    setIsAuthSessionActive(false);
  }, [response]);

  async function fetchUserInfo(token) {
    try {
      const res = await fetch('https://www.googleapis.com/userinfo/v2/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const userInfo = await res.json();
      handleUserAuthentication(userInfo);
    } catch (error) {
      console.error('Error:', error);
    }
  }

  const ShowUserInfo = () => {
    if (user) {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ fontSize: 35, fontWeight: 'bold', marginBottom: 20 }}>
            Welcome
          </Text>
          <Image
            source={{ uri: user.picture }}
            style={{ width: 100, height: 100, borderRadius: 50 }}
          />
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{user.name}</Text>
        </View>
      );
    } else {
      return null;
    }
  };

  const handlePromptAsync = async () => {
    if (!isAuthSessionActive) {
      setIsAuthSessionActive(true);
      await promptAsync();
    }
  };

  return [user, ShowUserInfo, handlePromptAsync];
};
