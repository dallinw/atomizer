/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";

/**
 * Hook that alerts clicks outside of the passed ref
 */
function useOutsideAlerter(ref, handler) {
  /**
   * Alert if clicked on outside of element
   */
  function handleClickOutside(event) {
    if (ref.current && !ref.current.contains(event.target)) {
      handler();
    }
  }

  useEffect(() => {
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });
}

function useNetworkHotkeys(setCtrl) {

  const _onKeyDown = (e) => {
    if(e.ctrlKey || e.key==="Meta"){
      setCtrl(true);
    }
  }

  const _onKeyUp = (e) => {
    if(e.ctrlKey || e.key==="Meta"){
      setCtrl(false);
    }
  }

  useEffect(() => {
    // Bind the event listener
    document.addEventListener("keydown", _onKeyDown);
    document.addEventListener("keyup", _onKeyUp);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("keydown", _onKeyDown);
      document.removeEventListener("keyup", _onKeyUp);
    };
  });
}

function useResizer(setWindowSize) {

  const _onResize = (e) => {
    setWindowSize({width: window.innerWidth, height: window.innerHeight})
  }

  useEffect(() => {
    window.addEventListener("resize", _onResize);
    return () => {
      window.removeEventListener("resize", _onResize);
    }
  })
}

function useMenuHandler(visibleProps, setVisibleProps, screenSize, screenBreakpoint){
  const {textVisible, menuVisible, sideMenuVisible, nodeDetailVisible} = visibleProps;
  const {setTextVisible, setMenuVisible, setSideMenuVisible, setNodeDetailVisible} = setVisibleProps;

  const closeOtherMenus = (_openMenu, setOpenMenu) => {
    Object.keys(setVisibleProps).forEach(set => {
      if(setVisibleProps[set] !== setOpenMenu) {
        setVisibleProps[set](false);
      }
    })
  }
  // useEffects can't be iterated unfortunately
  useEffect(() => {
    if(screenSize.width < screenBreakpoint && textVisible)
    {
      closeOtherMenus(textVisible, setTextVisible)
    }
  }, [setTextVisible, textVisible])

  useEffect(() => {
    if(screenSize.width < screenBreakpoint && menuVisible)
    {
      closeOtherMenus(menuVisible, setMenuVisible)
    }
  }, [menuVisible, setMenuVisible])

  useEffect(() => {
    if(screenSize.width < screenBreakpoint && sideMenuVisible)
    {
      closeOtherMenus(sideMenuVisible, setSideMenuVisible)
    }
  }, [setSideMenuVisible, sideMenuVisible])

  useEffect(() => {
    if(screenSize.width < screenBreakpoint && nodeDetailVisible)
    {
      closeOtherMenus(nodeDetailVisible, setNodeDetailVisible)
    }
  }, [nodeDetailVisible, setNodeDetailVisible])
}

export { useOutsideAlerter, useNetworkHotkeys, useResizer, useMenuHandler }