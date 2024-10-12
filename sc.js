const image = document.getElementById("clickableImage");
const sound = document.getElementById("sound");

const originalSrc = image.src;
const newSrc = "src/RikaOG_(4).webp";

image.addEventListener("click", () => {
  sound.play();
  image.src = newSrc;

  sound.onended = () => {
    image.src = originalSrc;
  };
});