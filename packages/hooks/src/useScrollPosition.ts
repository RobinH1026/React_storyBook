import { DependencyList, MutableRefObject, useEffect, useRef } from 'react';

const isBrowser = typeof document !== 'undefined';
type Element =
  | ((instance: any) => void)
  | MutableRefObject<HTMLElement | null>
  | null;

function getTarget(element?: Element) {
  if (element && typeof element !== 'function' && element.current) {
    return element.current;
  }
  return document.body;
}

/**
 * Compute getBoundingClientRect() without considering transforms
 * https://stackoverflow.com/questions/27745438/how-to-compute-getboundingclientrect-without-considering-transforms
 */
function getScrollPosition(element?: Element) {
  if (!isBrowser) return { x: 0, y: 0 };
  let target: HTMLElement | null = getTarget(element);
  let offsetLeft = 0;
  let offsetTop = 0;
  while (target) {
    offsetLeft += target.offsetLeft;
    offsetTop += target.offsetTop;
    target = target.offsetParent as HTMLElement;
  }
  return { x: offsetLeft - window.pageXOffset, y: offsetTop - window.pageYOffset };
}

type Store = {
  throttleTimeout: null | NodeJS.Timeout;
};

type Position = {
  x: number;
  y: number;
};
type EffectArgs = {
  prevPos: Position;
  currPos: Position;
};
export type Effect = ({ prevPos, currPos }: EffectArgs) => void;
/**
 * https://dev.to/n8tb1t/tracking-scroll-position-with-react-hooks-3bbj?signin=true
 */
export default function useScrollPosition(
  effect: Effect,
  deps?: DependencyList,
  element?: Element,
  wait?: number
) {
  const position = useRef(getScrollPosition());
  const { current: store } = useRef<Store>({
    throttleTimeout: null,
  });

  const callBack = () => {
    const currPos = getScrollPosition(element);
    effect({ prevPos: position.current, currPos });
    position.current = currPos;
    store.throttleTimeout = null;
  };

  useEffect(() => {
    const handleScroll = () => {
      if (wait) {
        if (store.throttleTimeout === null) {
          store.throttleTimeout = setTimeout(callBack, wait);
        }
      } else {
        callBack();
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (store.throttleTimeout) {
        clearTimeout(store.throttleTimeout);
      }
    };
  }, deps);

  // excute callBack first when layout done
  useEffect(() => {
    callBack();
  }, []);
}
