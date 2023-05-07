import { createGlobalStyles, styled } from "solid-styled-components";
import Canvas from "./components/image-mask";

const App = () => {
  const imageList = [
    "https://images.wallpaperscraft.ru/image/single/luna_kratery_planeta_883188_1024x768.jpg",
    "https://images.wallpaperscraft.ru/image/single/zatmenie_luna_solntse_129559_1024x768.jpg",
    "https://images.wallpaperscraft.ru/image/single/polnolunie_luna_kratery_734769_1024x768.jpg",
  ];

  return (
    <>
      <GlobalStyle />
      <Container>
        <Canvas imageList={imageList} />
      </Container>
    </>
  );
};

export default App;

const GlobalStyle = createGlobalStyles``;

const Container = styled("div")`
  width: 100%;
  height: 100vh;
`;
