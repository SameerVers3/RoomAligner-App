import { StatusBar } from 'expo-status-bar';
import SplashScreen from './SplashScreen'; // Import the new SplashScreen
import OnBoarding from './OnBoarding';


export default function App() {
  return (
    <>
      <StatusBar backgroundColor="#2A2C38" style="light" />
      <SplashScreen />
    </>
  );
}
