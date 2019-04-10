import { container } from "assets/jss/material-kit-react.jsx";

const explanationStyle = theme => ({
  container,
  root: {
    width: '100%',
    backgroundColor: '#cacaca',
    padding: '80px 0 20px',
    paddingTop: 30
  },
  flex: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  left: {
    display: 'flex',
    flexWrap: 'wrap',
    padding: '10px 0',
    order: 2,
    justifyContent: 'center'
  },
  right: {
    padding: '10px 0',
    order: 1
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
    textAlign: 'justify',
  }
});
export default explanationStyle;