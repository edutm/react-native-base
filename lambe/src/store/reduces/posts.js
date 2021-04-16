import { ADD_POST } from '../actions/actionTypes'

const initialState = {
    posts: [{
        id: Math.random(),
        nickname: 'Eduardo TEiceira MOnteiro',
        email: 'dsffd@fsdf.com',
        image: require('../../../assets/imgs/fence.jpg'),
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
        image: require('../../../assets/imgs/bw.jpg'),
        comments: []
    }]
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST:
            return {
                ...state,
                posts: state.posts.concat({
                    ...action.payload
                })
            }
    
        default:
            return state;
    }
}

export default reducer;
