import { container } from "assets/jss/material-kit-react.jsx";

const WorkspaceWelcomeStyle = theme => ({
  container,
  page: {
    padding: '100px 0 0px',
    backgroundColor: '#fff'
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
    color: '#258ecc',
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
    margin: '0 0 48px',
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
    width: 350,
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
  skip: {
    color: '#626262',
    margin: '10px 0 0',
    fontSize: 16,
    fontStyle: 'normal',
    textAlign: 'center',
    fontWeight: 'normal',
    lineHeight: 1.5,
    fontStretch: 'normal',
    letterSpacing: 'normal',
    textDecoration: 'underline',
    cursor: 'pointer',
    outline: 'none',
    border: 0,
    boxShadow: 'none',
    appearance: 'none',
    backgroundColor: 'transparent',
    '&:hover': {
      color: '#626262'
    }
  }
});
export default WorkspaceWelcomeStyle;