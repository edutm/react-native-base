import React, { Component } from 'react'
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TextInput,
    Image,
    Dimensions,
    Platform,
    ScrollView,
    Alert
} from 'react-native'
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

export default class AddPhoto extends Component {

    state = {
        image: null,
        comment: '',
    }

    pickImage = () => {
        launchCamera({
            title: 'Escolha a imagem',
            maxHeight: 600,
            maxWidth: 800
        }, res => {
            if (!res.didCancel) {
                this.setState({ image: {uri: res.uri, base64: res.data }});
            }
        });
    }

    save = async () => {
        Alert.alert('Imagem adicionada!', this.state.comment);
    }

    render () {
        return (
            <ScrollView>
                <View style={styles.container}>
                    <Text style={styles.title}>Compartilhe uma imagem</Text>
                    <View style={styles.imageContainer}>
                        <Image source={this.state.image} style={styles.image} />
                    </View>
                    <TouchableOpacity onPress={this.pickImage} style={styles.button}>
                        <Text style={styles.buttonText}>Escolha a foto</Text>
                    </TouchableOpacity>
                    <TextInput placeholder="Algum comentário para foto..."
                        style={styles.input} value={this.state.commnet}
                        onChangeText={comment => this.setState({ comment })}/>
                    <TouchableOpacity onPress={this.save} style={styles.button}>
                        <Text style={styles.buttonText}>Salvar</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    }, 
    title: {
        fontSize: 20,
        marginTop: 10,
        fontWeight: 'bold'
    },
    imageContainer: {
        width: '90%',
        height: Dimensions.get("window").width / 2,
        backgroundColor: "white",
        marginTop: 10
    },
    image: {
        width: '100%',
        height: Dimensions.get("window").width / 2,
        resizeMode: 'center'
    },
    button: {
        marginTop: 30, 
        padding: 10,
        backgroundColor: '#4286f4'
    },
    buttonText: {
        fontSize: 20,
        width: '90%'
    }
});