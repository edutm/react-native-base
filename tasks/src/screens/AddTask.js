import React, {Component} from 'react'
import {
    Text, 
    Platform,
    Modal, 
    View, 
    StyleSheet, 
    TouchableWithoutFeedback,
    TouchableOpacity,
    TextInput 
} from 'react-native'

import DateTimePicker from '@react-native-community/datetimepicker'
import moment from 'moment'

import commonsStyles from '../commonsStyles'

const intialState = { desc: '', date: new Date(), showDatePicker: false}

export default class AddTask extends Component {

    state = { 
        ...intialState
    }

    save = ()=> {
        
        const newTask = {
            desc: this.state.desc,
            date: this.state.date
        }

        this.props.onSave && this.props.onSave(newTask);
        this.setState({...intialState});
        
    }

    getDatePicker = () => {
        let datePicker = <DateTimePicker 
            value={this.state.date}
            onChange={(_, date) => this.setState({date, showDatePicker: false})}
            mode='date'/>

        const dateString = moment(this.state.date).format('ddd, D [de] MMM [de] YYYY')
        if (Platform.OS === 'android') {
            datePicker = (
                <View>
                    <TouchableOpacity onPress={() => this.setState({showDatePicker: true})}>
                        <Text style={styles.date}> 
                            {dateString}
                        </Text>
                    </TouchableOpacity>
                    {this.state.showDatePicker && datePicker}
                </View>
            )
        }

        return datePicker;
    }

    render() {
        return (
            <Modal transparent={true} 
                    visible={this.props.isVisible}
                    onRequestClose={this.props.onCancel}
                    animationType='slide'>

                <TouchableWithoutFeedback onPress={this.props.onCancel}>
                    <View style={styles.background}>

                    </View>
                </TouchableWithoutFeedback>
                <View   style={styles.container}>
                    <Text style={styles.header}>Nova Tarefa</Text>
                    <TextInput style={styles.input}
                        placceholder="Informe a Descrição..."
                        onChangeText={desc => this.setState({desc})}
                        value={this.state.desc}
                    />
                    {this.getDatePicker()}
                    <View style={styles.buttons}>
                        <TouchableOpacity onPress={this.props.onCancel}>
                            <Text style={styles.button}>Cancelar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Text style={styles.button} onPress={this.save}>Salvar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <TouchableWithoutFeedback onPress={this.props.onCancel}>
                    <View style={styles.background}>

                    </View>
                </TouchableWithoutFeedback>
                
            </Modal>
        )
    }
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
    },
    container: {
        backgroundColor: '#FFF'
    },
    header: {
        fontFamily: commonsStyles.fontFamily,
        backgroundColor: commonsStyles.colors.today,
        color: commonsStyles.colors.secondary,
        textAlign: 'center',
        padding: 15,
        fontSize: 18,

    }, 
    buttons: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    button: {
        margin: 20,
        marginRight: 30,
        color: commonsStyles.colors.today
    },
    input: {
       fontFamily: commonsStyles.fontFamily,
       height: 40,
       margin: 15,
       backgroundColor: '#FFF',
       borderWidth: 1,
       borderColor: '#E3E3E3',
       borderRadius: 6
    },
    date: {
        fontFamily: commonsStyles.fontFamily,
        fontSize: 20,
        marginLeft: 15
    }
});