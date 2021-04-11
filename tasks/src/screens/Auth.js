import React,  { Component } from 'react'
import { 
    Text, 
    ImageBackground, 
    StyleSheet, 
    View, 
    TouchableOpacity,
    Alert
} from 'react-native'

import backGroungImage from '../../assets/imgs/login.jpg'
import commonsStyles from '../commonsStyles.js'
import AuthInput from '../components/AuthInput'
import {server, showError, showSuccess} from '../common.js'

import AsyncStorage from '@react-native-community/async-storage'
import axios from 'axios'

const initialSate = {
    email: '',
    password: '',
    name: '',
    confirmPassword: '',
    stageNew: false,
}

export default class Auth extends Component {

    state = {
        ...initialSate
    }

    siginOrSignup = () => {
        if (this.state.stageNew) {
            this.signup();
        } else {
            this.signin()
        }
    }

    signup = async () => {
        try {
            await axios.post(`${server}/signup`, {
                email: this.state.email,
                password: this.state.password,
                name: this.state.name,
                confirmPassword: this.state.confirmPassword,
            });

            showSuccess('Usuário cadastrado!');
            this.setState({...initialSate});

        } catch (e) {
            showError(e);
        }
    }

    signin = async () => {
        try {
            const res = await axios.post(`${server}/signin`, {
                email: this.state.email,
                password: this.state.password,
            });

            AsyncStorage.setItem('userData', JSON.stringify(res.data));
            axios.defaults.headers.common['Authorization'] = `bearer ${res.data.token}`;
            this.props.navigation.navigate('Home', res.data);
        } catch (e) {
            showError(e);
        }
    }

    render() {

        const validations = [];
        validations.push(this.state.email && this.state.email.includes('@'));
        validations.push(this.state.password && this.state.password.length >= 6);

        if (this.state.stageNew) {
            validations.push(this.state.name && this.state.name.trim().length >= 3);
            validations.push(this.state.password === this.state.confirmPassword);
        }

        const validForm = validations.reduce((t, a) => t && a);

        return (
            <ImageBackground style={styles.background} source={backGroungImage}>
                <Text style={styles.title}>Tasks</Text>
                <View style={styles.formContainer}>
                    <Text style={styles.subTitle}>
                        {this.state.stageNew ? 'Crie a sua conta' : 'Informe seus dados'}
                    </Text>
                    {this.state.stageNew &&
                         <AuthInput
                            icon='user' 
                            placeholder='Nome' 
                            value={this.state.name}
                            style={styles.input}
                            onChangeText={name => this.setState({name})}/>
                    }
                    <AuthInput
                        icon='at' 
                        placeholder='E-mail' 
                        value={this.state.email}
                        style={styles.input}
                        onChangeText={email => this.setState({email})}/>
                    <AuthInput 
                        icon='lock'
                        placeholder='Senha' 
                        value={this.state.password}
                        style={styles.input}
                        onChangeText={password => this.setState({password})}
                        secureTextEntry={true}/>
                    {this.state.stageNew &&
                         <AuthInput
                            icon='asterisk' 
                            placeholder='Confirmação de Senha' 
                            value={this.state.confirmPassword}
                            style={styles.input}
                            onChangeText={confirmPassword => this.setState({confirmPassword})}
                            secureTextEntry={true}/>
                    }
                    <TouchableOpacity onPress={this.siginOrSignup}
                        disabled={!validForm}>
                        <View style={[styles.button, validForm ? {} : {backgroundColor: '#AAA'}]}>
                            <Text style={styles.buttonText}>
                                {this.state.stageNew ? 'Registrar' : 'Entrar'}
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={{ padding: 10 }}
                        onPress={() => this.setState({ stageNew: !this.state.stageNew })
                        }>
                        <Text style={styles.buttonText}>
                            {this.state.stageNew ? 'Já possui conta?' : 'Ainda não possui conta?'}
                        </Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        )
    }
}


const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontFamily: commonsStyles.fontFamily,
        color: commonsStyles.colors.secondary,
        fontSize: 70,
        marginBottom: 10
    },
    subTitle: {
        fontFamily: commonsStyles.fontFamily,
        color: 'white',
        textAlign: 'center',
        fontSize: 20,
        marginBottom: 10
    },
    formContainer: {
        backgroundColor: 'rgba(0,0,0, 0.8)',
        padding: 20,
        width: '90%'
    },
    input: {
        marginTop: 10,
        backgroundColor: 'white',
       
    },
    button: {
        backgroundColor: '#080',
        marginTop: 10,
        padding: 10,
        alignItems: 'center',
        borderRadius: 7

    },
    buttonText: {
        fontFamily: commonsStyles.fontFamily,
        color: 'white',
        fontSize: 20
    },
});