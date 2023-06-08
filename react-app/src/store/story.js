const initialState = {"all_stories": {}, "my_stories": {}, "single_story": {}}

const ALL_STORIES = 'story/all'
const USER_STORIES = 'story/mine'
const GET_ONE_STORY = 'story/getone'
const ADD_STORY = 'story/add'
const EDIT_STORY = 'story/edit'
const DELETE_STORY = 'story/delete'
const FILTER_STORY = 'story/filter'
const ADD_COMMENT = 'story/addcomment'

export const Add_Comment = (payload) => {
    return {
        type: ADD_COMMENT,
        payload
    }
}

export const All_story = (payload) => {
    return {
        type: ALL_STORIES,
        payload
    }
}

export const Filtered_story = (payload) => {
    return {
        type: FILTER_STORY,
        payload
    }
}

export const User_story = (payload) => {
    return {
        type: USER_STORIES,
        payload
    }
}

export const One_story = (payload) => {
    return {
        type: GET_ONE_STORY,
        payload
    }
}

export const AddStory = (payload) => {
    return {
        type: ADD_STORY,
        payload
    }
}

export const EditStory = (payload) => {
    return {
        type: EDIT_STORY,
        payload
    }
}

export const DeleteStory = (id) => {
    return {
        type: DELETE_STORY,
        id
    }
}

export const AddCommentThunk = (id, body) => async dispatch => {
    const response = await fetch(`/api/story/${id}/comment`, {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })

    if (response.ok) {
        const data = await response.json()
        dispatch(Add_Comment(data))
    }
}

export const AllStoryThunk = () => async dispatch => {
    const response = await fetch(`/api/story/`)

    if (response.ok) {
        const data = await response.json();
        dispatch(All_story(data));
    }
}

export const UserStoryThunk = () => async dispatch => {
    const response = await fetch(`/api/story/mine`)

    if (response.ok) {
        const data = await response.json();
        dispatch(User_story(data));
    }
}

export const OneStoryThunk = (id) => async dispatch => {
    const response = await fetch(`/api/story/${id}`)

    if (response.ok) {
        const data = await response.json();
        dispatch(One_story(data));
    }
}

export const AddStoryThunk = (body) => async dispatch => {
    const response = await fetch('/api/story/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body) 
    })

    if (response.ok) {
        const data = await response.json();
        dispatch(AddStory(data));
        return data.id
    }
}

export const DeleteStoryThunk = (id) => async dispatch => {
    const response = await fetch(`/api/story/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })

    if (response.ok) {
        dispatch(DeleteStory(id))
    }
}

export const EditStoryThunk = (id, body) => async dispatch => {
    const response = await fetch(`/api/story/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })

    if (response.ok) {
        const data = await response.json();
        dispatch(EditStory(data))
    }
}

export const FilterStoryThunk = (topicId) => async dispatch => {
    const response = await fetch(`/api/topic/${topicId}/story`)

    if (response.ok) {
        const data = await response.json();
        dispatch(Filtered_story(data));
    }
}

const storyReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case ALL_STORIES:
            newState = {...state, all_stories: {}};
            action.payload.all_stories.forEach((story) => {
                newState.all_stories[story.id] = story
            });
            return newState;
        case ADD_COMMENT:
            newState = {...state}
            let key = Object.keys(newState.single_story)
            let sstate = newState.single_story[key]
            let legth = sstate.comments.length
            sstate.comments.push(action.payload)
            return newState
        case FILTER_STORY:
            newState = {...state, all_stories: {}};
            action.payload.filtered_stories.forEach((story) => {
                newState.all_stories[story.id] = story
            });
            return newState;
        case USER_STORIES:
            newState = {...state, my_stories: {}}
            action.payload.my_stories.forEach((story) => {
                newState.my_stories[story.id] = story
            });
            return newState;
        case GET_ONE_STORY:
            newState = {...state, single_story: {}}
            action.payload.single_story.forEach((story) => {
                newState.single_story[story.id] = story
            });
            //const storyid = action.payload.single_story[0].id
            //newState.single_story[storyid] = action.payload.single_story
            return newState
        case ADD_STORY:
            newState = {...state, single_story: {}}
            newState.all_stories[action.payload.id] = action.payload;
            newState.my_stories[action.payload.id] = action.payload;
            newState.single_story[action.payload.id] = action.payload;
            return newState;
        case EDIT_STORY:
            newState = {...state, single_story: {}}
            newState.all_stories[action.payload.id] = action.payload;
            newState.my_stories[action.payload.id] = action.payload;
            newState.single_story[action.payload.id] = action.payload;
            return newState;
        case DELETE_STORY:
            newState = { ...state }
            delete newState.all_stories[action.id];
            //delete newState.my_stories[action.id];
            delete newState.single_story[action.id];
            return newState 
        default:
            return state;
    }
}

export default storyReducer;