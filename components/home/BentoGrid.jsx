import { View, Text, Image } from 'react-native';
import { images } from '../../constants';

const BentoGrid = ({ floorplans, suggestions, favorites }) => {
  return (
    <View className="flex-row p-4">
      {/* Bottom Block */}
      <View className="bg-slate-800 flex-1 m-1 p-4 rounded-lg mt-2">

        <Text className="text-white text-center">Scanned Floorplans</Text>
        <Text className="text-white text-center text-purple-300 text-3xl w-38 mt-8 font-bold">{floorplans}</Text>
      </View>

      <View className="flex-col">
        {/* Large Left Block */}
        <View className="bg-slate-800 flex-2 m-1 p-1 rounded-lg">
          <Text className="text-white text-center">Generated Suggestions</Text>
          <Text className="text-white text-center text-purple-300  text-3xl mt-1 font-bold">{suggestions}</Text>
        </View>

        {/* Smaller Right Block */}
        <View className="bg-slate-800 flex-1 m-1 p-1 rounded-lg">
          <Text className="text-white text-center">Number of Favorites</Text>
          <Text className="text-white text-center text-purple-300  text-3xl mt-1 font-bold">{favorites}</Text>
        </View>
      </View>
    </View>
  );
};

export default BentoGrid;
