import { View, Text, ScrollView, Image } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link, useRouter } from 'expo-router';
import { useSetRecoilState } from 'recoil';
import { userState } from '../../atoms/userAtom';
import { images } from '../../constants';
import FormField from '../../components/FormField';
import CustomButton from '../../components/CustomButton';
import { signIn } from '../../services/firebase'; 

const SignIn = () => {
  const setUser = useSetRecoilState(userState);
  const router = useRouter();
  const [form, setForm] = useState({
    email: '',
    password: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false); 

  const submit = async () => {
    setIsSubmitting(true); // Start loading state
    console.log("Logging in:", form.email);

    try {
      // Sign in the user
      const userCredential = await signIn(form.email, form.password);
      console.log("Login successful");
      console.log("User:", userCredential.user);
      console.log("User:", userCredential.user.uid);
      // Update the user state in Recoil
      setUser({
        uid: userCredential.user.uid,
        email: userCredential.user.email,
      });

      // Handle successful login (e.g., navigate to home)
      router.replace('/home');
    } catch (error) {
      console.error("Login error:", error);
      // Handle error (e.g., show a message to the user)
    } finally {
      setIsSubmitting(false); // End loading state
    }
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
            Log in to Room Aligner
          </Text>

          <FormField
            title="Email"
            value={form.email} // Use form state
            handleChangeText={(e) => setForm({ ...form, email: e })} // Update form state correctly
            otherStyles="mt-7"
            keyboardType="email-address"
          />

          <FormField
            title="Password"
            value={form.password} // Use form state
            handleChangeText={(e) => setForm({ ...form, password: e })} // Update form state correctly
            otherStyles="mt-7"
          />

          <View className="mt-7">
            <CustomButton
              title="Sign In"
              handlePress={submit}
              containerStyles="mt-7"
              isLoading={isSubmitting}
            />
          </View>

          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular"> Don't have an Account? </Text>
            <Link href="/sign-up"
              className="text-lg text-secondary-200 font-psemibold"
            >Sign Up</Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
