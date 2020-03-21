import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { useSelector, useDispatch } from 'react-redux';
import { useDrag } from 'react-dnd';
import ItemTypes from './ItemTypes';
import Icon from '../../Icon';
import IconSet from '../../../constants/icon-set';
import { networkActions } from '../../../redux/actions';

const Player = ({ id, left, top, hideSourceOnDrag }) => {
  const theme = useSelector(state => state.network.theme);
  const useStyles = makeStyles({
    player: {
      width: '200px',
      height: '50px',
      border: `1px solid ${theme.text}`,
      backgroundColor: theme.background,
      position: 'absolute',
      zIndex: '9999',
      pointerEvents: 'auto'
    },
    button: {
      width: '50px',
      height: '48px',
      backgroundColor: theme.background,
      border: 'none',
      outline: 'none',
      padding: '0px',
      boxSizing: 'border-box',
      '&:hover': {
        opacity: '0.4'
      }
    },
    playIcon: {
      width: '15px',
      height: '15px'
    },
    stopIcon: {
      width: '15px',
      height: '15px'
    }
  });
  const classes = useStyles();
  const dispatch = useDispatch();

  const [{ isDragging }, drag] = useDrag({
    item: { id, left, top, type: ItemTypes.PLAYER },
    collect: monitor => ({
      isDragging: monitor.isDragging()
    })
  });
  if (isDragging && hideSourceOnDrag) {
    return <div ref={drag} />;
  }
  return (
    <div ref={drag} className={classes.player} style={{ left, top }}>
      <button className={classes.button} onClick={() => dispatch(networkActions.play())}>
        <Icon className={classes.playIcon} fill={theme.text} viewBox='0 0 300 300' path={IconSet.play} />
      </button>
      <button className={classes.button} onClick={() => dispatch(networkActions.stop())}>
        <Icon className={classes.stopIcon} fill={theme.text} viewBox='0 0 300 300' path={IconSet.stop} />
      </button>
    </div>
  );
};

export default Player;
