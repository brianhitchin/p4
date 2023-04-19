const initialState = {"all_topics": {}}

const ALL_TOPIC = 'topic/all'
const ADD_TOPIC = 'topic/add'
const EDIT_TOPIC = 'topic/edit'

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