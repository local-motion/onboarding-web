import {
  container,
  primaryColor,
  mobileMedia,
  tabletPortraitMedia,
  tabletLandscapeMedia,
  desktopMedia
} from "assets/jss/material-kit-react.jsx";

const footerStyle = {
  block: {
    color: "inherit",
    padding: "0.9375rem",
    fontWeight: "500",
    fontSize: "12px",
    textTransform: "uppercase",
    borderRadius: "3px",
    textDecoration: "none",
    position: "relative",
    display: "block"
  },
  left: {
    float: "left!important",
    display: "block"
  },
  hide: {
    position: 'absolute',
    visibility: 'hidden',
    pointerEvents: 'none'
  },
  fullWidth: {
    width: '100%',
    justifyContent: 'center',
  },
  right: {
    padding: "15px 0",
    margin: "0",
    float: "right!important"
  },
  footer: {
    padding: "0.9375rem 0",
    textAlign: "center",
    display: "flex",
    zIndex: "2",
    position: "relative"
  },
  a: {
    color: primaryColor,
    textDecoration: "none",
    backgroundColor: "transparent"
  },
  footerWhiteFont: {
    "&,&:hover,&:focus": {
      color: "#FFFFFF"
    }
  },
  container,
  list: {
    marginBottom: "0",
    padding: "0",
    marginTop: "0",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    [tabletPortraitMedia]: {
    }
  },
  inlineBlock: {
    display: "block",
    padding: "0px",
    width: "auto",
    textAlign: "center",
    flexBasis: "100%",
    [tabletPortraitMedia]: {
      flexBasis: "auto",
    }
  },
  logo: {
    display: "inline-block",
    padding: "0.9375rem",
    width: "auto"
  },
  icon: {
    width: "18px",
    height: "18px",
    position: "relative",
    top: "3px"
  }
};
export default footerStyle;
