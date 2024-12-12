import { createRoot, createSignal } from "solid-js";

function createSavedPosition() {
  const [top, setTop] = createSignal(0);
  const updateTop = (top: number) => {
    setTop(top);
  };
  return {
    top,
    updateTop,
  };
}

export default createRoot(createSavedPosition);
