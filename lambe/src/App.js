import React, {Component} from 'react'
import { Alert } from 'react-native'
import { connect } from 'react-redux'
import Navigator from './navigator'
import { setMessage } from './store/actions/message'

class App extends Component {

    componentDidUpdate = () => {
        if (this.props.text && this.props.text.trim()) {
            Alert.alert(this.props.title || 'Mensagem', this.props.text);
            this.props.clearMessage();
        }
    }

    render() {
        return (
            <Navigator />
        )
    }
}

const mapStateToProps = ({ message }) => {
    return {
        title: message.title,
        text: message.text
    }
}

const mpaDispatchToProps = dispatch => {
    return {
        clearMessage: () => dispatch(setMessage({title: '', text: ''}))
    }
}
export default connect(mapStateToProps, mpaDispatchToProps)(App)
