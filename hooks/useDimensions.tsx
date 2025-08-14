import { useEffect, useState } from "react";
import { Dimensions, ScaledSize } from "react-native";

export enum Orientation {
  Portrait = "PORTRAIT",
  Landscape = "LANDSCAPE",
}

export default function useDimensions() {
  const { height, width } = Dimensions.get("window");

  const getOrientation = (width: number, height: number) => {
    return height > width ? Orientation.Portrait : Orientation.Landscape;
  };

  const [orientation, setOrientation] = useState(() => {
    return getOrientation(width, height);
  });

  useEffect(() => {
    const subscription = Dimensions.addEventListener(
      "change",
      ({ window }: { window: ScaledSize }) => {
        setOrientation(getOrientation(window.width, window.height));
      }
    );

    return () => {
      subscription?.remove();
    };
  }, []);

  return { orientation, height, width };
}
