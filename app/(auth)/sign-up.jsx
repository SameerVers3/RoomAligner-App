import { View, Text, ScrollView, Image } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link } from 'expo-router';
import { useSetRecoilState } from 'recoil'; // Import the hook to set recoil state
import { userState } from '../../atoms/userAtom';
import { images } from '../../constants';
import FormField from '../../components/FormField';
import CustomButton from '../../components/CustomButton';
import { signUp, addUserData } from '../../services/firebase'; // Import your firebase functions

const SignUp = () => {
  const setUser = useSetRecoilState(userState); // Get the function to set user state

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = async () => {
    setIsSubmitting(true); // Start loading state
    console.log("submitting");
    console.log(username);
    console.log(email);
    console.log(password);

    try {
      // Sign up the user
      const userCredential = await signUp(email, password);
      console.log("done");

      // Update the user state in Recoil
      setUser({
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        username: username, // Add username
      });

      console.log("User state:", userCredential.user);

      // Optionally, add additional user data to Firestore
      await addUserData(userCredential.user.uid ,{ 
        username, 
        email,
        uid: userCredential.user.uid,
      });

      console.log("Sign up successful");

      // Handle successful sign-up (e.g., navigate to home)
    } catch (error) {
      console.error("Sign up error:", error);
      // Handle error (e.g., show a message to the user)
    } finally {
      setIsSubmitting(false); // End loading state
    }
  };

  const handleUsernameChange = (e) => {
    setUsername(e);
  };

  const handleEmailChange = (e) => {
    setEmail(e);
  };

  const handlePasswordChange = (e) => {
    setPassword(e);
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full justify-center min-h-[85vh] px-4 my-6">
          <Image
            source={images.logo}
            resizeMode='contain'
            className="w-[200px] mx-auto"
          />

          <Text className="text-2xl text-white text-semibold mt-10 front-psemibold">
            Sign up to Aora
          </Text>

          <FormField
            title="Username"
            value={username} // Use username state
            handleChangeText={handleUsernameChange}
            otherStyles="mt-7"
          />

          <FormField
            title="Email"
            value={email} // Use email state
            handleChangeText={handleEmailChange}
            otherStyles="mt-7"
            keyboardType="email-address"
          />

          <FormField
            title="Password"
            value={password} // Use password state
            handleChangeText={handlePasswordChange}
            otherStyles="mt-7"
          />

          <View className="mt-7">
            <CustomButton
              title="Sign Up" // Change title to reflect sign-up action
              handlePress={submit}
              containerStyles="mt-7"
              isLoading={isSubmitting}
            />
          </View>

          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular"> Have an Account already? </Text>
            <Link href="/sign-in"
              className="text-lg text-secondary-200 font-psemibold"
            >Sign In</Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
