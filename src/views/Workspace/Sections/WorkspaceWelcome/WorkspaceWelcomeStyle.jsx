import { container } from "assets/jss/material-kit-react.jsx";

const WorkspaceWelcomeStyle = theme => ({
  container,
  workspaceWelcomeContent: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  mainImage: {
    '& img': {
      width: '100%',
    },
  },
  statistics: {

  },
  title: {
    fontFamily: "'dk_black_bamboo-webfont'",
    fontSize: 40,
    fontWeight: 900,
    fontStyle: 'normal',
    fontStretch: 'normal',
    lineHeight: 'normal',
    letterSpacing: 'normal',
    textAlign: 'center',
    color: '#01579b',
    margin: '0 0 24px'
  },
  descr: {
    fontSize: 16,
    fontWeight: 'normal',
    fontStyle: 'normal',
    fontStretch: 'normal',
    lineHeight: 1.5,
    letterSpacing: 'normal',
    textAlign: 'center',
    color: '#626262',
    margin: '0 0 46px'
  },
  icons: {
    display: 'flex',
    justifyContent: 'center',
    margin: '-60px 0 30px',
    [theme.breakpoints.down("sm")]: {
      flexWrap: 'wrap',
    },
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 50
  },
  button: {
    maxWidth: '100%',
    width: 280,
    height: 50,
    display: 'inline-block',
    cursor: 'pointer',
    borderRadius: 5,
    backgroundColor: '#eb621b',
    fontSize: 16,
    fontWeight: 'bold',
    fontStyle: 'normal',
    fontStretch: 'normal',
    lineHeight: '50px',
    letterSpacing: 'normal',
    textAlign: 'center',
    color: '#ffffff',
    transition: 'all .2s ease',
    outline: 'none',
    border: 0,
    boxShadow: 'none',
    appearance: 'none',
    '&:hover': {
      color: '#f1f1f1'
    },
    '&:active': {
      transform: 'translateY(1px)'
    }
  },
  passive: {
    backgroundColor: '#adabab'
  },
});
export default WorkspaceWelcomeStyle;