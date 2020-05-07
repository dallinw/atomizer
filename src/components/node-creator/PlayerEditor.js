import React, { useState, useEffect } from 'react';
import ModeSelector from '../ModeSelector';
import { useSelector } from 'react-redux';
import Select from 'react-select';
import useForceUpdate from '../../utils/useForceUpdate';
import { makeStyles } from '@material-ui/styles';
import elements from '../../constants/elements';
import { parseToRgba } from '../../utils/color-utils';

const octaves = [
  { id: 0, label: '0', value: 0 },
  { id: 1, label: '1', value: 1 },
  { id: 2, label: '2', value: 2 },
  { id: 3, label: '3', value: 3 },
  { id: 4, label: '4', value: 4 },
  { id: 5, label: '5', value: 5 },
  { id: 6, label: '6', value: 6 }
];

const useStyles = makeStyles({
  row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'nowrap',
    width: '98%'
  },
  child: {
    display: 'flex',
    flexWrap: 'nowrap',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  label: {
    marginRight: '5px',
    '&:hover': {
      opacity: '1.0'
    }
  },
  octaveDropdown: {
    maxWidth: '70px',
    backgroundColor: 'inherit !important',
    color: 'inherit !important',
    fontFamily: 'Inconsolata',
    fontWeight: '800',
    border: 'none !important',
    '& div': {
      boxShadow: 'none'
    },
    '&__menu': {
      boxShadow: props => props.theme && `${props.theme.boxShadow} !important`
    },
    '&__menu-list': {
      backgroundColor: props => props.theme && `${props.theme.secondaryBackgroundSolid} !important`
    },
    '&__indicator-separator': {
      display: 'none !important'
    },
    '&__option': {
      color: props => props.theme && `${props.theme.text} !important`,
      '&--is-focused': {
        backgroundColor: props => `${parseToRgba(props.nodeColor, 0.3)} !important`
      },
      '&--is-selected': {
        backgroundColor: props => `${props.nodeColor} !important`
      }
    }
  }
});

const PlayerEditor = () => {
  const theme = useSelector(state => state.network.theme);
  const elementIndex = useSelector(state => state.network.elementIndex);
  const node = useSelector(state => state.network.audio.nodeData && state.network.audio.nodeData[elementIndex]);
  const [elementList] = useState(elements(theme));
  const [element, setElement] = useState(elementList[elementIndex - 1]);
  const classes = useStyles({ theme: theme, nodeColor: element && element.color });

  useEffect(() => {
    setElement(elementList[elementIndex - 1]);
  }, [element, elementIndex, elementList]);

  const forceUpdateMode = useForceUpdate('mode');
  const forceUpdateOctave = useForceUpdate('octave');

  const _onChange = e => {
    node.setOctave(e.value);
    forceUpdateOctave();
  };

  return (
    <div className={classes.row}>
      {node && (
        <>
          <div className={classes.child}>
            <ModeSelector mode={node.mode} audioNode={node} updateParent={forceUpdateMode} />
          </div>
          <div className={classes.child} style={{ marginTop: '5px' }}>
            <h4 className={classes.label}>octave: </h4>
            <Select
              className={classes.octaveDropdown}
              classNamePrefix={classes.octaveDropdown}
              key={forceUpdateOctave}
              options={octaves}
              onChange={_onChange}
              value={[{ label: node.octave, value: node.octave }]}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default PlayerEditor;
