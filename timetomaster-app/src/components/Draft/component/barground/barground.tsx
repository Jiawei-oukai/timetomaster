import Image from "next/image";
import bargroundImage from "../../images/barground/barground.jpg"

export default function Background() {
  return (
    <Image
      alt="Mountains"
      src={bargroundImage}
      placeholder="blur"
      quality={100}
      fill
      sizes="100vw"
      style={{
        objectFit: "cover",
          zIndex: -1,
      }}
    />
  );
}
