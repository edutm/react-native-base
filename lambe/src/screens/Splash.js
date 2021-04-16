import React, { Component } from 'react'
import {View, Text, StyleSheet, Image } from 'react-native'

export default class Splash extends Component {
    componentDidMount = () => {
        setTimeout(() => {
            console.log('PASSSSSSOU')
            this.props.navigation.navigate('App')
        }, 3000);
    }

    render() {
        return (
            <View style={styles.contianer}>
                <Image source={require('../../assets/imgs/icon.png')}
                    style={styles.image}/>
                <Text style={styles.header}>Lambe-Lambe</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    contianer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    image: {
        height: 200,
        width: 200,
        resizeMode: 'contain'
    }, 
    header: {
        fontSize: 50,
        fontWeight: 'bold'
    }
})
