import { FlatList, View } from "react-native";
import BackgroundImageItem from "../Components/BackgroundImageItem";
import {
  AbstractImages,
  FrameImages,
  GradientImages,
  LoveImages,
  NatureImages,
  SkyImages,
} from "../utils/constants";

const BackgroundImagesScreen = ({ route: { params: name } }) => {
  const handleShowImages = () => {
    switch (name.name) {
      case "Nature":
        return NatureImages;
      case "Sky":
        return SkyImages;
      case "Abstract":
        return AbstractImages;
      case "Gradients":
        return GradientImages;
      case "Frames":
        return FrameImages;
      case "Love":
        return LoveImages;
      default:
        return NatureImages;
    }
  };

  return (
    <View>
      <FlatList
        numColumns={3}
        initialNumToRender={5}
        maxToRenderPerBatch={5}
        data={handleShowImages()}
        renderItem={({ item }) => <BackgroundImageItem url={item} />}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default BackgroundImagesScreen;
