import { createTheme } from '@mui/material';
import { grey, red } from '@mui/material/colors';

export const lightTheme = createTheme({
    palette: {
      mode: 'light',
      background: {
        default: /*grey[300]*/ 'white'
      },
      primary: {
        main: '#7B8FA1',
        light: '#6B7280',
      },
      secondary: {
        main: '#19857n'
      },
      error: {
        main: red.A400
      }
    },
    components: {
      MuiAppBar: {
        defaultProps: {},
        styleOverrides: {
          root: {
            backgroundColor: '#567189',
          }
        }
      },
      MuiIcon: {
        defaultProps: {},
        styleOverrides: {
          root: {
            color: '#4a148c',
            backgroundColor: '#4a148c'
          }
        }
      },

      MuiTypography: {
        styleOverrides: {
          h1: {
            fontSize: 30,
            fontWeight: 600
          },
          h2: {
            fontSize: 20,
            fontWeight: 400
          },
          subtitle1: {
            fontSize: 16,
            fontWeight: 600
          },
        }
      },
  
  
      MuiButton: {
        defaultProps: {
          variant: 'contained',
          size: 'small',
          disableElevation: true,
          color: 'primary'
        },
        styleOverrides: {
          root: {
            textTransform: 'none',
            boxShadow: 'none',
            borderRadius: '0.4rem',
            ":hover": {
              backgroundColor: '#FB8B24',
              transition: 'all 0.3s ease-in-out'
            }
          }
        }
      },
  
  
      // MuiCard: {
      //   defaultProps: {
      //     elevation: 0
      //   },
      //   styleOverrides: {
      //     root: {
      //       boxShadow: '0px 5px 5px rgba(0,0,0,0.05)',
      //       borderRadius: '10px',
      //     }
      //   }
      // }
    }
  });
  