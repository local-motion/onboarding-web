import {
  container
} from "assets/jss/material-kit-react.jsx";

const footerStyle = theme => ({
  container,
  root: {
    width: '100%',
    backgroundColor: '#2D519A',
    padding: '80px 0 20px',
    [theme.breakpoints.down("sm")]: {
      paddingTop: 30
    },
  },
  flex: {
    display: 'flex',
    [theme.breakpoints.down("sm")]: {
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
    }
  },
  right: {
    padding: '0 20px',
    [theme.breakpoints.down("sm")]: {
      padding: '10px 0',
      order: 1
    }
  },
  image: {
    width: 'auto',
    margin: '0 10px 10px',
  },
  text: {
    fontSize: 16,
    lineHeight: 1.17,
    color: '#fff'
  }
});
export default footerStyle;