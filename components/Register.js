import * as React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { Button } from 'react-native-paper';
import Email from './Email';
import Password from './Password';
import { View, Text } from 'react-native'

export default class Register extends React.Component {
    
    render(){
      return (
        <PaperProvider >

            <View style={{marginTop: 100}}>
                <Text style={{alignSelf: 'center', fontSize:50, marginBottom: 20}}>
                      Register
                </Text>
                <Email msg='Email'/>
                <Email msg='Confirm Email'/>
                <Password msg='Password'/>
                <Password msg='Confirm Password'/>
                <Button style={{marginHorizontal: 100, marginTop: 20}} mode="contained" onPress={() => console.log('next page')}>
                    Continue
                </Button>
                <Text style={{marginTop: 20, alignSelf: 'center'}}>
                    Already Have an Account?
                </Text>
                
                
            </View>
        </PaperProvider>
      );
    }
  }