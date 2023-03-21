import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
  User,
} from '@react-native-google-signin/google-signin';
import React, {useState} from 'react';
import {Text, View} from 'react-native';

GoogleSignin.configure({
  webClientId:
    '944878903590-rojd3tospms33oievrs1eo38345ge5a2.apps.googleusercontent.com',
  offlineAccess: true,
});

// Android client ID
// 728217497387-sc07qfcsl2v0fj8g4bl0da9ene2qajmg.apps.googleusercontent.com

export function GoogleButton() {
  const [userInfo, setUserInfo] = useState<User | null>(null);
  //   GoogleSignin.hasPlayServices().then(() => {
  //     GoogleSignin.signIn().then(user => {
  //       setUserInfo(user);
  //     });
  //   });

  // Somewhere in your code
  const signIn = async () => {
    try {
      console.log('signIn called');

      const playstatus = await GoogleSignin.hasPlayServices();
      await GoogleSignin.hasPlayServices();
      console.log('playstatus', playstatus);
      const googleUserInfo = await GoogleSignin.signIn();
      console.log('googleUserInfo', googleUserInfo);
      setUserInfo(googleUserInfo);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
        console.log('user cancelled the login flow');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
        console.log('operation (e.g. sign in) is in progress already');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
        console.log('play services not available or outdated');
      } else {
        // some other error happened
        console.log('some other error happened');
        console.log(error);
      }
    }
  };

  console.log(userInfo);
  return (
    <View>
      <GoogleSigninButton
        style={{width: 192, height: 48, padding: 20}}
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={signIn}
        disabled={false}
      />
      {userInfo && <Text>{userInfo.user.name}</Text>}
    </View>
  );
}
