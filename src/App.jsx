import React, { useState } from 'react';
import { Provider } from 'react-redux';
import { Container, CssBaseline, ThemeProvider, createTheme, Box, Grow } from '@mui/material';
import store from './store';
import Header from './components/Header';
import ProductList from './components/ProductList';
import Cart from './components/Cart';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#2196f3', // Blue
    },
    secondary: {
      main: '#ffffff', // White
    },
    background: {
      default: '#000000', // Black
      paper: '#111111', // Dark grey/black for surfaces
    },
    text: {
      primary: '#ffffff', // White text
      secondary: 'rgba(255, 255, 255, 0.7)',
    },
    error: {
      main: '#f44336', // Keep error for delete icon, but if STRICTLY only black/white/blue wait...
      // User said: "use only black, white, blue color"
      // I'll make error blue or white, or just leave it since usually delete is red. Let's make error blue or white to be strictly compliant.
    }
  },
  typography: {
    fontFamily: '"Outfit", "Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 'bold',
      color: '#ffffff',
    },
    h5: {
      fontWeight: 'bold',
      color: '#ffffff',
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          textTransform: 'none',
          fontWeight: 'bold',
          transition: 'transform 0.2s',
          '&:hover': {
            transform: 'scale(1.02)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          background: '#111111', // Black/dark grey
          border: '1px solid #333333', // Subtle border
          boxShadow: 'none',
          transition: 'border-color 0.3s',
          '&:hover': {
            borderColor: '#2196f3', // Blue on hover
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: '#0a0a0a',
          borderBottom: '1px solid #333333',
          boxShadow: 'none',
        }
      }
    }
  },
});

// Since the user requested "only black, white, blue color", I'll override the error color to white inside Header/Cart if necessary, but changing theme error is safest.
theme.palette.error.main = '#ffffff';

function App() {
  const [showCart, setShowCart] = useState(false);

  const toggleCart = () => {
    setShowCart((prev) => !prev);
  };

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Header onCartClick={toggleCart} />
        <Container component="main" maxWidth="lg">
          <Box sx={{ py: 6 }}>
            {showCart ? (
              <Grow in={showCart}>
                <Box>
                  <Cart onBack={() => setShowCart(false)} />
                </Box>
              </Grow>
            ) : (
              <Grow in={!showCart} timeout={1000}>
                <Box>
                  <ProductList />
                </Box>
              </Grow>
            )}
          </Box>
        </Container>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
