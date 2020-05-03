import { makeStyles } from '@material-ui/styles';
import { sizeConstants } from '../../config';

const LabStyles = makeStyles({
  lab: {
    position: 'absolute',
    alignItems: 'center',
    display: 'flex',
    flexWrap: 'wrap',
    boxSizing: 'border-box',
    right: props => (props.labVisible ? '0px' : '-6px'),
    width: props => (props.labVisible ? sizeConstants.SIDE_MENU_SIZE + 'px' : '0px'),
    height: '100%',
    bottom: '0px',
    borderLeft: props => props.theme && `3px solid ${props.theme.text}`,
    borderTop: props => props.theme && `3px solid ${props.theme.text}`,
    margin: '0px',
    transition: 'width 0.5s, height 0.5s',
    backgroundColor: props => props.theme && props.theme.secondaryBackground,
    zIndex: 8001,
    overflowY: 'scroll',
    overflowX: 'hidden',
    boxShadow: props => props.labVisible && props.theme && `-10px 0px 10px ${props.theme.boxShadowColor}`
  },
  labMobile: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    flexWrap: 'wrap',
    left: '0px',
    boxSizing: 'border-box',
    bottom: props => (props.labVisible ? '0px' : '-6px'),
    width: '100%',
    height: props => (props.labVisible ? sizeConstants.BOTTOM_MENU_SIZE + 'px' : '0px'),
    borderTop: props => props.theme && `3px solid ${props.theme.text}`,
    margin: '0px',
    transition: 'width 0.5s, height 0.5s',
    backgroundColor: props => props.theme && props.theme.secondaryBackground,
    zIndex: 8001,
    overflowY: 'scroll',
    overflowX: 'hidden'
  },
  effectsContainer: {
    display: 'flex',
    overflowX: 'scroll',
    overflowY: 'hidden',
    padding: '10px',
    height: '505px',
    border: props => `3px solid ${props.theme && props.theme.text}`,
    boxShadow: props => props.theme && props.theme.boxShadow
  },
  content: {
    margin: '15px',
    padding: '15px',
    position: 'relative',
    display: 'flex',
    alignContent: 'center',
    width: '100%',
    height: props => (props.screenInfo.isMobile ? '400px' : '400px'),
    backgroundColor: props => props.theme && props.theme.background,
    overflow: 'scroll',
    opacity: '1',
    zIndex: '9999',
    fontSize: '1.2em',
    border: props => `3px solid ${props.theme && props.theme.text}`,
    boxShadow: props => props.theme && props.theme.boxShadow
  },
  title: {
    color: props => props.theme && props.theme.text,
    padding: '5px'
  },
  text: {
    height: '50px',
    backgroundColor: 'transparent',
    color: props => props.theme && props.theme.text
  },
  buttonContainer: {
    position: 'absolute',
    bottom: '5px',
    right: '5px'
  },
  button: {
    width: '60px',
    height: '30px',
    border: props => `1.5px solid ${props.theme && props.theme.text}`,
    color: props => props.theme && props.theme.text,
    fontFamily: 'Inconsolata',
    '&:hover': {
      opacity: '0.4'
    }
  },
  confirmButton: {
    marginLeft: '20px',
    fontWeight: '700',
    backgroundColor: props => props.theme && props.theme.background
  },
  cancelButton: {
    fontWeight: '400',
    backgroundColor: props => props.theme && props.theme.secondary
  }
});

export default LabStyles;