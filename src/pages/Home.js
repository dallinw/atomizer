/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useEffect } from 'react';
import Network from '../components/Network';
import MenuPanel from '../components/MenuPanel';
import SideMenuPanel from '../components/SideMenuPanel';
import NodeDetailPanel from '../components/NodeDetailPanel';
import Modal from '../components/Modal';
import Icon from '../components/Icon';
import IconSet from '../constants/icon-set';
import '../stylesheets/Home.scss';
import { BOTTOM_MENU_SIZE, SIDE_MENU_SIZE } from '../config/panel-size-constants';
import ColorVariables from '../stylesheets/Colors.scss';
import { useResizer, useMenuHandler, useHotkeys } from '../utils/hooks';
import { useSelector, useDispatch } from 'react-redux';
import { viewActions } from '../redux/actions';

const screenBreakpoint = 800;
const iconColor = ColorVariables.text;

const Home = () => {
  const [show, setShow] = useState(false);
  const { textVisible, menuVisible, sideMenuVisible, nodeDetailVisible } = useSelector(state => state.view);
  const [screenSize, setScreenSize] = useState({ width: window.innerWidth, height: window.innerHeight });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(viewActions.toggleTextVisible());
    setShow(true);
  }, [dispatch]);

  useHotkeys();
  useResizer(setScreenSize);
  useMenuHandler(screenSize, screenBreakpoint);

  return (
    <div className={show ? 'page show' : 'page hide'}>
      <Modal />
      <div
        className='textFlexContainer floatLeft'
        style={{ height: `${textVisible ? '100%' : '30px'}` }}
        onClick={() => {
          dispatch(viewActions.toggleTextVisible());
        }}
      >
        <p className='disappearingText' style={getTextStyle(textVisible, screenSize)}>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nam ea quas maiores adipisci doloremque impedit illum illo
          natus mollitia possimus blanditiis accusantium, ut nostrum. Voluptates modi eum maiores repellat molestias!
        </p>
        {getExpandIcon('textHideShowIcon', [0, 180], textVisible)}
      </div>

      <Network />
      <SideMenuPanel />
      <MenuPanel />
      <NodeDetailPanel breakpoint={screenBreakpoint} />

      <button
        className='sideMenuButton'
        style={{ right: `${sideMenuVisible ? SIDE_MENU_SIZE - 4 + 'px' : '-6px'}` }}
        onClick={() => dispatch(viewActions.toggleSideMenuVisible())}
      >
        {getExpandIcon('expandIcon', [90, 270], sideMenuVisible)}
      </button>
      <button
        className='menuButton'
        style={{ bottom: `${menuVisible ? BOTTOM_MENU_SIZE - 10 + 'px' : '-10px'}` }}
        onClick={() => dispatch(viewActions.toggleMenuVisible())}
      >
        {getExpandIcon('expandIcon', [180, 0], menuVisible)}
      </button>
      <button
        className='menuButton'
        style={getDetailStyle(menuVisible, sideMenuVisible)}
        onClick={() => dispatch(viewActions.toggleNodeDetailVisible())}
      >
        {getExpandIcon('expandIcon', [180, 0], nodeDetailVisible)}
      </button>
    </div>
  );
};

const getTextStyle = (textVisible, screenSize) => {
  return textVisible
    ? {
        opacity: 1.0,
        visibility: 'visible',
        height: screenSize.width < screenBreakpoint ? '120px' : '70px'
      }
    : {
        opacity: 0.0,
        visibility: 'hidden',
        height: '0px'
      };
};

const getDetailStyle = (menuVisible, sideMenuVisible) => {
  return {
    bottom: `${menuVisible ? BOTTOM_MENU_SIZE - 10 + 'px' : '-10px'}`,
    left: 'unset',
    right: `${sideMenuVisible ? SIDE_MENU_SIZE - 5 + 'px' : '40px'}`
  };
};

const getExpandIcon = (className, rotation, visible) => {
  return (
    <Icon
      className={className}
      style={{ transform: `rotate(${visible ? rotation[0] + 'deg' : rotation[1] + 'deg'})` }}
      fill={iconColor}
      viewBox='3 5 10 5'
      path={IconSet.expandArrow}
    />
  );
};

export default Home;
