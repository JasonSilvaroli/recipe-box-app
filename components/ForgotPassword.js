import * as React from 'react';
import { Text } from 'react-native';

export default class Password extends React.Component {
    state = {
      text: ''
    };
  
    render(){
      return (
        <Text style={{marginTop: 20, alignSelf: 'center'}}>
            Forgot Password
        </Text>
      );
    }
  }