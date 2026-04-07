import React, { useState, useEffect } from 'react';
import { Container, CssBaseline, ThemeProvider, createTheme, Box, Grow, Snackbar, Alert } from '@mui/material';
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
      main: '#ffffff', 
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

function App() {
  const [showCart, setShowCart] = useState(false);
  const [wsMessage, setWsMessage] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const toggleCart = () => {
    setShowCart((prev) => !prev);
  };

  // WebSocket Simulation
  useEffect(() => {
    // Simulating a WebSocket connection
    const interval = setInterval(() => {
      const messages = [
        "Special offer: 10% off on Smartphones!",
        "Flash sale: Gaming Consoles at $399!",
        "New arrival: Wireless Headphones Pro!",
        "Someone just bought a Smart Watch in New York!"
      ];
      const randomMessage = messages[Math.floor(Math.random() * messages.length)];
      setWsMessage(randomMessage);
      setOpenSnackbar(true);
    }, 15000); // Send message every 15 seconds

    return () => clearInterval(interval);
  }, []);

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
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
      <Snackbar 
        open={openSnackbar} 
        autoHideDuration={4000} 
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="info" sx={{ width: '100%', backgroundColor: '#2196f3', color: '#ffffff' }}>
          {wsMessage}
        </Alert>
      </Snackbar>
    </ThemeProvider>
  );
}

export default App;

