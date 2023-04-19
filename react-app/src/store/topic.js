const initialState = { "all_topics": {} }

const ALL_TOPIC = 'topic/all'
const ADD_TOPIC = 'topic/add'
const EDIT_TOPIC = 'topic/edit'
const DELETE_TOPIC = 'topic/delete'

export const AllTopic = (payload) => {
    return {
        type: ALL_TOPIC,
        payload
    }
}

export const AddTopic = (payload) => {
    return {
        type: ADD_TOPIC,
        payload
    }
}

export const EditTopic = (payload) => {
    return {
        type: EDIT_TOPIC,
        payload
    }
}

export const DeleteTopic = (id) => {
    return {
        type: DELETE_TOPIC,
        id
    }
}

export const AllTopicThunk = () => async dispatch => {
    const response = await fetch(`/api/topic/`)

    if (response.ok) {
        const data = await response.json();
        dispatch(AllTopic(data));
    }
}

export const AddTopicThunk = (value) => async dispatch => {
    const response = await fetch('/api/topic/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(value)
    })
    if (response.ok) {
        const data = await response.json()
        dispatch(AddChannel(data))
    }
}

export const EditTopicThunk = (id, body) => async dispatch => {
    const response = await fetch(`/api/topic/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })

    if (response.ok) {
        const data = await response.json();
        dispatch(EditTopic(data))
    }
}

export const DeleteTopicThunk = (id) => async dispatch => {
    const response = await fetch(`/api/topic/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })

    if (response.ok) {
        dispatch(DeleteTopic(id))
    }
}

const topicReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case ALL_TOPIC:
            newState = { ...state, all_topics: {} }
            action.payload.all_topics.forEach((topic) => {
                newState.all_topics[topic.id] = topic
            });
            return newState;
        case ADD_TOPIC:
            newState = { ...state, all_topics: {} }
            newState.all_topics[action.payload.id] = action.payload;
            return newState;
        case EDIT_TOPIC:
            newState = { ...state, all_topics: {} }
            newState.all_topics[action.payload.id] = action.payload;
            return newState;
        case DELETE_TOPIC:
            newState = { ...state }
            delete newState.all_topics[action.id];
            return newState;
        default:
            return state;
    }
}