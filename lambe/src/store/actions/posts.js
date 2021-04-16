import { 
    SET_POSTS
    , ADD_COMMENT
    , CREATING_POSTS
    , POST_CREATED 
} from './actionTypes'
import axios from 'axios'
import { setMessage } from './message'

export const addPost = post => {
   
    return dispatch => {
        dispatch(creatingPost());
        axios.post('/posts.json', { ...post })
            .catch(err => console.log(err))
            .then(res => {
                dispatch(getPosts());
                dispatch(postCreated());

                dispatch(setMessage({
                    title: 'Sucesso',
                    text: 'Salvo com sucesso!'
                }))
            });
    }

}

export const addComment = payload => {
    return dispatch => {
        console.log(payload)
        axios.get(`/posts/${payload.postId}.json`)
            .catch(err => console.log(err))
            .then(res => {
                const comments = res.data.comments || [];
                comments.push(payload.comment);
                axios.patch(`/posts/${payload.postId}.json`, { comments })
                    .catch(err => console.log(err))
                    .then(res => {
                        dispatch(getPosts());
                    });
            });
    }
}

export const setPosts = posts => {
    return {
        type: SET_POSTS,
        payload: posts
    }
}

export const getPosts = () => {
    return dispatch => {
        axios.get('/posts.json')
            .catch(err => console.log(err))
            .then(res => {
                const rawPosts = res.data;
                const posts = []
                for (let key in rawPosts) {
                    posts.push({
                        ...rawPosts[key],
                        id: key,
                    });
                }
                dispatch(setPosts(posts.reverse()));
            });

    }
}

export const creatingPost = () => {
    return {
        type: CREATING_POSTS
    }
}

export const postCreated = () => {
    return {
        type: POST_CREATED
    }
}