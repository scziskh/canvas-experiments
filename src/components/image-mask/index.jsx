import { createEffect, createSignal, on, onMount } from "solid-js";
import { styled } from "solid-styled-components";

const ImageMask = (props) => {
  const [currentIndex, setCurrentIndex] = createSignal(0);
  const [canvasImageList, setCanvasImageList] = createSignal({});

  // refs
  let buttonNext, buttonPrev;

  const imageList = () => props.imageList || [];
  createEffect(on(imageList, () => setCurrentIndex(0)));

  // disable arrows if no data after suppose handler
  createEffect(() => {
    const numImages = imageList().length;
    buttonPrev.disabled = true;
    buttonNext.disabled = true;
    if (currentIndex() !== 0) {
      buttonPrev.disabled = false;
    }
    if (currentIndex() < numImages - 1) {
      buttonNext.disabled = false;
    }
  });

  // ref
  let canvas;

  // Canvas config
  const width = 800;
  const height = 600;

  // Canvas
  createEffect(() => {
    // properties of canvas HTML element
    canvas.width = width;
    canvas.height = height;

    console.log({ canvas });
    // Canvas Context
    const ctx = canvas.getContext("2d");
    ctx.strokeStyle = "white";
    ctx.lineCap = "round";
    ctx.lineWidth = 24;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    canvasImageList()[currentIndex()]
      ? ctx.drawImage(canvasImageList()[currentIndex()], 0, 0)
      : (ctx.fillStyle = "black");

    console.log(canvasImageList());

    let isDrawing = false;
    let lastX;
    let lastY;

    canvas.onmousedown = (event) => {
      isDrawing = true;

      // start drawing a new line
      [lastX, lastY] = [event.offsetX, event.offsetY];
    };

    canvas.onmousemove = (event) => {
      if (isDrawing) {
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(event.offsetX, event.offsetY);
        ctx.stroke();
        [lastX, lastY] = [event.offsetX, event.offsetY];
      }
    };

    canvas.onmouseup = canvas.onmouseout = () => {
      isDrawing = false;
      var image = new Image();

      image.src = canvas.toDataURL;

      setCanvasImageList((signal) => {
        signal[currentIndex()] = image;
        return signal;
      });
    };
  });

  return (
    <>
      <Wrapper width={width}>
        <Canvas ref={canvas}>Your browser is a peace of a shit</Canvas>
        <ImageHTML src={imageList()[currentIndex()]} />
        <Arrow
          type="button"
          ref={buttonPrev}
          id={"buttonPrev"}
          // eslint-disable-next-line solid/reactivity
          onClick={() => setCurrentIndex(currentIndex() - 1)}
        >
          PREV
        </Arrow>
        <Arrow
          type="button"
          ref={buttonNext}
          id={"buttonNext"}
          // eslint-disable-next-line solid/reactivity
          onClick={() => setCurrentIndex(currentIndex() + 1)}
        >
          NEXT
        </Arrow>
      </Wrapper>
    </>
  );
};

export default ImageMask;

const Wrapper = styled.div`
  width: ${(props) => `${props.width}px`};
  aspect-ratio: 4/3;
  margin: auto;
  position: relative;
`;

const ImageHTML = styled.img`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  aspect-ratio: 4/3;
  z-index: 500;
`;

const Canvas = styled.canvas`
  cursor: crosshair;
  position: absolute;
  left: 0;
  top: 0;
  outline: 1px solid #212121;
  z-index: 1000;
  opacity: 0.4;
`;

const Arrow = styled("button")`
  z-index: 1500;
  position: absolute;
  display: block;
  top: calc(50% - 30px / 2);
  width: 30px;
  height: 30px;
  padding: 0;
  align-items: center;
  justify-content: center;
  opacity: 0.5;
  transition: opacity linear 0.25s;
  background-color: var(--mainColor);
  &:not(:disabled):hover {
    opacity: 1;
  }
  &:disabled {
    visibility: hidden;
  }
  &#buttonPrev {
    left: -120px;
    img {
      transform: scaleX(-1);
    }
  }
  &#buttonNext {
    right: -120px;
  }
`;
