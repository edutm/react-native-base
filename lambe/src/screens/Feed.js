import React, { Component } from 'react'
import {
    StyleSheet,
    FlatList,
    View
} from 'react-native'

import Header from '../components/Header'
import Post from '../components/Post'

export default class Feed extends Component {

    state = {
        posts: [{
            id: Math.random(),
            nickname: 'Eduardo TEiceira MOnteiro',
            email: 'dsffd@fsdf.com',
            image: require('../../assets/imgs/fence.jpg'),
            comments: [{
                nickname: 'Paula Torredo',
                comment: 'Olha la'
            }, {
                nickname: 'Torredo Dominic',
                comment: 'sou foda maeu'
            }]

        },
        {
            id: Math.random(),
            nickname: 'Ellen Lala',
            email: 'dsffdsf sdfd@fsdf.com',
            image: require('../../assets/imgs/bw.jpg'),
            comments: []
        }]
    }

    render () {
        return (
            <View style={styles.container}>
                <Header />
                <FlatList 
                    data={this.state.posts}
                    keyExtractor={item => `${item.id}`}
                    renderItem={({ item }) => 
                        <Post key={item.id} {...item} />}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF'
    }
})