import * as React from 'react';
import { TextInput } from 'react-native-paper';

export default class Email extends React.Component {
    state = {
      text: '',
      msg: this.props.msg
    };
  
    render(){
      return (
        <TextInput
          style={{marginHorizontal: 20, marginVertical: 10}}
          label={this.state.msg}
          keyboardType='email-address'
          value={this.state.text}
          onChangeText={text => this.setState({ text })}
        />
      );
    }
  }