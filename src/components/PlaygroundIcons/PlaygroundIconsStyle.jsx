const PlaygroundIconsStyle = theme => ({
    icon: {
      textDecoration: 'none',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      color: 'inherit',
      padding: '0 10px',
      maxWidth: 120,
      margin: '0 0 10px',
    },
    iconBgImage: {
      width: 120,
      height: 120,
      borderRadius: '50%',
      border: '10px solid #FFF',
      backgroundSize: 'cover',
      backgroundPosition: '50% 50%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 10,
      transition: 'all .2s ease',
      transformOrigin: '50% 50%',
    },
    active: {
      transform: 'scale(1.05)',
    },
    iconImage: {
      width: 55,
      height: 55,
      backgroundSize: 'contain',
      backgroundPosition: '50% 50%',
      backgroundRepeat: 'no-repeat'
    },
    iconTitle: {
      fontFamily: "'dk_black_bamboo-webfont'",
      fontSize: 26,
      fontWeight: 900,
      fontStyle: 'normal',
      fontStretch: 'normal',
      lineHeight: 'normal',
      letterSpacing: 'normal',
      textAlign: 'center',
      color: '#626262',
      margin: '0 0 5px'
    },
    iconText: {
      fontSize: 16,
      fontWeight: 'normal',
      fontStyle: 'normal',
      fontStretch: 'normal',
      lineHeight: 1.1,
      letterSpacing: 'normal',
      textAlign: 'center',
      color: '#085ca6',
      margin: '0',
    }
  });
  export default PlaygroundIconsStyle;