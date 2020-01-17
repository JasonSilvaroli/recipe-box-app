import * as React from 'react';
import { TextInput, Button } from 'react-native-paper';
import { View, Text } from 'react-native';

export default class SecurityQuestions extends React.Component {
    state = {
      text: '',
    };
  
    render(){
      return (
          <View style={{marginTop: 200}}>
              <Text style={{alignSelf: 'center', fontSize:40, marginBottom: 20}}>
                      Security Question
                </Text>
            <TextInput
                style={{marginHorizontal: 20, marginVertical: 10}}
                label='Security Question'
                keyboardType='default'
                value={this.state.text}
                onChangeText={text => this.setState({ text })}
            />
            <TextInput
                style={{marginHorizontal: 20, marginVertical: 10}}
                label='Answer'
                keyboardType='default'
                value={this.state.text}
                onChangeText={text => this.setState({ text })}
            />
            <Button style={{marginHorizontal: 20, marginTop: 20,}} mode="contained" onPress={() => console.log('submitted')}>
                Submit
            </Button>
            </View>
      );
    }
}