import React from 'react';

import { Provider as PaperProvider } from 'react-native-paper';

import Register from '../components/Register';
import SecurityQuestions from '../components/SecurityQuestions';

export default function RegisterScreen() {
  return (
    <PaperProvider >
      
      <SecurityQuestions />

    </PaperProvider>
  
  )
}
RegisterScreen.navigationOptions = {
    header: null,
  };

  