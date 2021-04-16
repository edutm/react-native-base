import React, { Component } from 'react'
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TextInput
} from 'react-native'
import { connect } from 'react-redux'
import { login } from '../store/actions/user'

class Login extends Component {

    state = {
        name: 'Eduardo',
        email: 'sdfsdf@sddfs.com',
        password: '123456'
    }

    login = () => {
        this.props.onLogin({ ...this.state });
        this.props.navigation.navigate('Profile');
    }

    render() {
        return (
            <View sytle={styles.container}>
                <TextInput placeholder='Email'
                    style={styles.input}
                    autoFocus={true} 
                    keyboardType='email-address'
                    value={this.state.email}
                    onChangeText={email => this.setState({ email })}/>
                <TextInput placeholder='Senha'
                    style={styles.input}
                    secureTextEntry={true}
                    value={this.state.password}
                    onChangeText={password => this.setState({ password })}/>

                <TouchableOpacity onPress={this.login} style={styles.buttom}>
                    <Text  style={styles.buttomText}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() =>{
                    this.props.navigation.navigate('Register');
                }} style={styles.buttom}>
                    <Text  style={styles.buttomText}>Criar nova conta...</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttom: {
        marginTop: 30,
        padding: 10,
        backgroundColor: '#4286f4'
    },
    buttomText: {
        fontSize: 20,
        color: 'white'
    },
    input: {
        marginTop: 20, 
        width: '90%',
        backgroundColor: '#EEE',
        height: 40,
        borderWidth: 1,
        borderColor: '#333'
    }
});


const mapDispatchToProps = dispatch => {
    return {
        onLogin: user => dispatch(login(user))
    }
}

export default connect(null, mapDispatchToProps)(Login);