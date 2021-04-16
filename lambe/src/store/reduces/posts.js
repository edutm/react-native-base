import { 
    SET_POSTS, 
    ADD_COMMENT,
    POST_CREATED,
    CREATING_POSTS 
} from '../actions/actionTypes'

const initialState = {
    posts: [],
    isUpload: false
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_POSTS:
            return {
                ...state,
                posts: action.payload
            }

        case CREATING_POSTS:
            return {
                ...state,
                isUpload: true
            }
        case POST_CREATED:
            return {
                ...state,
                isUpload: false
            }
        case ADD_COMMENT:
            return {
                ...state,
                posts: state.posts.map(post => {
                    if (post.id === action.payload.postId) {
                        if (post.comments) {
                            post.comments = post.comments.concat(
                                action.payload.comment
                            );
                        } else {
                            post.comments = [action.payload.comment];
                        }
                    }
                    return post;
                })
            }
    
        default:
            return state;
    }
}

export default reducer;
