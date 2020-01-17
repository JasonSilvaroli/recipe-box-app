import * as React from 'react';
import { TextInput } from 'react-native-paper';

export default class Password extends React.Component {
    state = {
      text: '',
      msg: this.props.msg
    };
  
    render(){
      return (
        <TextInput
          style={{marginHorizontal: 20, marginVertical: 10}}
          label={this.state.msg}
          value={this.state.text}
          secureTextEntry = {true} 
          onChangeText={text => this.setState({ text })}
        />
      );
    }
}