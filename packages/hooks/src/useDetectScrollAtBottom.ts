import { useRef, useCallback, useEffect } from "react";

export type OnScrollAtBottom = () => void;

const isBrowser = typeof window !== "undefined";

export default function useDetectScrollAtBottom(
  onScrollAtBottom: OnScrollAtBottom
) {
  const ref = useRef(null);

  const handleScroll = useCallback(() => {
    if (!isBrowser) return;
    if (
      Math.round(window.scrollY + window.innerHeight) >=
      Math.round(window.document.body.scrollHeight)
    ) {
      onScrollAtBottom();
    }
  }, [onScrollAtBottom]);

  useEffect(() => {
    if (!ref.current) {
      window.addEventListener("scroll", handleScroll);
    }
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  const onScroll = useCallback(() => {
    if (ref.current) {
      const { scrollTop, scrollHeight, clientHeight } = ref.current;
      if (scrollTop + clientHeight === scrollHeight) {
        onScrollAtBottom();
      }
    }
  }, [onScrollAtBottom]);

  return {
    ref,
    onScroll,
  };
}
