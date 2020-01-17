import React from 'react';

import { Provider as PaperProvider } from 'react-native-paper';

import Login from '../components/Login';
import Register from '../components/Register';

export default function LoginScreen() {
  return (
    <PaperProvider >
      
      <Register />

    </PaperProvider>
  
  )
}
LoginScreen.navigationOptions = {
    header: null,
  };

  