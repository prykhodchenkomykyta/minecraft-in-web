import { useKeyboard } from "../hooks/useKeyboard";
import { useStore } from "../hooks/useStore";
import { useState, useEffect } from "react";
import { dirtImg, grassImg, glassImg, logImg, woodImg } from "../images/images";

const images = {
  dirt: dirtImg,
  grass: grassImg,
  glass: glassImg,
  wood: woodImg,
  log: logImg,
};

export const TextureSelector = () => {
  const [visible, setVisible] = useState(false);
  const [activeTexture, setTexture] = useStore((store) => [
    state.texture,
    state.setTexture,
  ]);
  const { dirt, glass, grass, wood, log } = useKeyboard();

  useEffect(() => {
    const textures = { dirt, glass, grass, wood, log };
    const pressedTexture = Object.entries(textures).find(([k, v]) => v);
    if (pressedTexture) {
      setTexture(pressedTexture[0]);
    }
  }, [dirt, glass, grass, wood, log]);

  useEffect(() => {
    const visibilityTimeout = setTimeout(() => {
      setVisible(false);
    }, 2000);
    setVisible(true);
    return () => {
      clearTimeout(visibilityTimeout);
    };
  }, [activeTexture]);

  return (
    visible && (
      <div className="absolute centered texture-selector">
        {Object.entries(images).map(([k, src]) => {
          return (
            <img
              key={k}
              src={src}
              alt={k}
              className={`${k === activeTexture ? "active" : "nothing"}`}
            />
          );
        })}
      </div>
    )
  );
};
