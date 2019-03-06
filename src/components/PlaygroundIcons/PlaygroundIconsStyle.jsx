const PlaygroundIconsStyle = theme => ({
    icon: {
      textDecoration: 'none',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      color: 'inherit',
      padding: '0 10px',
      maxWidth: 320,
      margin: '0 0 20px',
      '&:hover $iconBgImage': {
        boxShadow: '0px 5px 10px 0px rgba(40, 40, 40, 0.1)',
      }
    },
    iconBgImage: {
      width: 180,
      height: 180,
      borderRadius: '50%',
      backgroundSize: 'cover',
      backgroundPosition: '50% 50%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 28,
      transition: 'all .2s ease',
      transformOrigin: '50% 50%',
    },
    active: {
      transform: 'scale(1.05)',
    },
    iconImage: {
      width: 72,
      height: 72,
      backgroundSize: 'contain',
      backgroundPosition: '50% 50%',
      backgroundRepeat: 'no-repeat'
    },
    iconTitle: {
      fontFamily: "'dk_black_bamboo-webfont'",
      fontSize: 30,
      fontWeight: 900,
      fontStyle: 'normal',
      fontStretch: 'normal',
      lineHeight: 'normal',
      letterSpacing: 'normal',
      textAlign: 'center',
      color: '#626262',
      margin: '0 0 19px'
    },
    iconText: {
      fontSize: 14,
      fontWeight: 'normal',
      fontStyle: 'normal',
      fontStretch: 'normal',
      lineHeight: 1.5,
      letterSpacing: 'normal',
      textAlign: 'center',
      color: '#626262',
      margin: '0',
    }
  });
  export default PlaygroundIconsStyle;