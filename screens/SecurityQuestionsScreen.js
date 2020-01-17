import React from 'react';

import { Provider as PaperProvider } from 'react-native-paper';

import SecurityQuestions from '../components/SecurityQuestions';

export default function SecurityQuestionsScreen() {
  return (
    <PaperProvider >
      
      <SecurityQuestions />
      <SecurityAnswers />

    </PaperProvider>
  
  )
}
SecurityQuestionsScreen.navigationOptions = {
    header: null,
  };
