import * as React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { Button } from 'react-native-paper';
import Email from './Email';
import Password from './Password';
import ForgotPassword from './ForgotPassword';
import { View,Text } from 'react-native'

export default class Login extends React.Component {
    
    render(){
      return (
        <PaperProvider >

            <View style={{marginTop: 150}}>
                <Text style={{alignSelf: 'center', fontSize:50, marginBottom: 20}}>
                  Login
                </Text>
                <Email msg='Email'/>
                <Password msg='Password'/>

                <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                <Button style={{marginHorizontal: 10, marginTop: 20}} mode="contained" onPress={() => console.log('logged in')}>
                    Log in
                </Button>
                <Button style={{marginHorizontal: 10, marginTop: 20, backgroundColor: 'grey'}} mode="contained" onPress={() => console.log('to register')}>
                    Register
                </Button>
                </View>
                <ForgotPassword />
            </View>
        </PaperProvider>
      );
    }
  }