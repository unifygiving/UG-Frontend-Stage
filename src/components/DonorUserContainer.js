import * as React from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity } from 'react-native';
import { selectUser } from '../store/slices/userSlice';
import { useSelector } from 'react-redux';
import UserAvatar from '../../assets/User/userImage.jpg';
import {IMAGE_PREFIX} from '../constants/index.js';

import AvatarEditSvg from '../components/svgComponents/AvatarEditSvg';

import { COLOURS } from '../components/Colours';
import {useAuth} from "../hooks/useAuth.js";

const DonorUserContainer = ({ file, edit = false, onPress }) => {
  const {user} = useAuth();
  return (
    <View style={styles.userContainer}>
      {file ? (
        <Image source={{ uri: user.picture }} style={styles.avatar} />
      ) : (
        <Image source={{ uri: user.picture }} style={styles.avatar} />
      )}
      <Text style={styles.name}>{user.firstName} {user.lastName}</Text>
      {!edit && <Text style={styles.email}>{user.email}</Text>}
      {edit && (
        <TouchableOpacity onPress={onPress} style={styles.btnAvatarEdit}>
          <AvatarEditSvg />
        </TouchableOpacity>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  userContainer: {
    position: 'relative',
    alignSelf: 'center',
    paddingVertical: 20,
  },
  avatar: {
    alignSelf: 'center',
    width: 92,
    height: 92,
    marginBottom: 12,
    borderRadius: 46,
  },
  btnAvatarEdit: {
    position: 'absolute',
    right: -12,
    bottom: 56,
  },
  name: {
    marginBottom: 4,

    color: COLOURS.customText,

    fontFamily: 'Inter_600SemiBold',
    fontSize: 18,
    lineHeight: 22,
    letterSpacing: -0.41,
    textAlign: 'center',
  },

  email: {
    color: COLOURS.neutral60,

    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    lineHeight: 17.5,
    letterSpacing: -0.41,
    textAlign: 'center',
  },
});
export default DonorUserContainer;
