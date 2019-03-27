import { container } from "assets/jss/material-kit-react.jsx";

const explanationStyle = theme => ({
  container,
  root: {
    width: '100%',
    backgroundColor: '#cacaca',
    padding: '80px 0 20px',
    [theme.breakpoints.down("sm")]: {
      paddingTop: 30
    },
  },
  flex: {
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down("sm")]: {
      alignItems: 'flex-start',
      justifyContent: 'center',
      flexWrap: 'wrap',
    },
  },
  left: {
    padding: '0 20px',
    display: 'flex',
    flexWrap: 'wrap',
    [theme.breakpoints.down("sm")]: {
      padding: '10px 0',
      order: 2,
      justifyContent: 'center'
    }
  },
  right: {
    padding: '0 20px',
    [theme.breakpoints.down("sm")]: {
      padding: '10px 0',
      order: 1
    }
  },
  link: {
    margin: '0 10px 10px',
    cursor: 'pointer',
    textDecoration: 'none'
  },
  image: {
    width: 'auto',
    height: 60
  },
  text: {
    fontSize: 15,
    lineHeight: 1.17,
    fontWeight: 400,
    color: '#3f4956',
    [theme.breakpoints.down("sm")]: {
      textAlign: 'justify'
    }
  }
});
export default explanationStyle;