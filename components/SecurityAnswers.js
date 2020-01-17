import * as React from 'react';
import { TextInput } from 'react-native-paper';

export default class SecurityAnswers extends React.Component {
    state = {
      text: '',
    };
  
    render(){
      return (
        <TextInput
          style={{marginHorizontal: 20, marginVertical: 10}}
          label='Answer'
          keyboardType='default'
          value={this.state.text}
          onChangeText={text => this.setState({ text })}
        />
        
        <Button style={{marginHorizontal: 10, marginTop: 20, backgroundColor: 'grey'}} mode="contained" onPress={() => console.log('logged in')}>
            Submit
        </Button>
      );
    }
  