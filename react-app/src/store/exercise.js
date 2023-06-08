const initialState = {"all_exercises": {}, "single_exercise": {}}

const ALL_EXERCISE = 'exercise/all'
const GET_ONE_EXERCISE = 'exercise/one'
const ADD_EXERCISE = 'exercise/add'
const EDIT_EXERCISE = 'exercise/edit'
const DELETE_EXERCISE = 'exercise/delete'
const FILTER_EXERCISE = 'exercise/filter'
const ADD_COMMENT = 'exercise/addcomment'

export const Add_CommentE = (payload) => {
    return {
        type: ADD_COMMENT,
        payload
    }
}

export const AllExercise = (payload) => {
    return {
        type: ALL_EXERCISE,
        payload
    }
}

export const Filtered_exercise = (payload) => {
    return {
        type: FILTER_EXERCISE,
        payload
    }
}

export const OneExercise = (payload) => {
    return {
        type: GET_ONE_EXERCISE,
        payload
    }
}

export const AddExercise = (payload) => {
    return {
        type: ADD_EXERCISE,
        payload
    }
}

export const EditExercise = (payload) => {
    return {
        type: EDIT_EXERCISE,
        payload
    }
}

export const DeleteExercise = (id) => {
    return {
        type: DELETE_EXERCISE,
        id
    }
}

export const AddCommentEThunk = (id, value) => async dispatch => {
    const response = await fetch(`/api/exercise/${id}/comment`, {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(value)
    })

    if (response.ok) {
        const data = await response.json()
        dispatch(Add_CommentE(data))
    }
}

export const AllExerciseThunk = () => async dispatch => {
    const response = await fetch(`/api/exercise/`)

    if (response.ok) {
        const data = await response.json();
        dispatch(AllExercise(data));
    }
}

export const OneExerciseThunk = (id) => async dispatch => {
    const response = await fetch(`/api/exercise/${id}`)

    if (response.ok) {
        const data = await response.json();
        dispatch(OneExercise(data));
    }
}

export const AddExerciseThunk = (value) => async dispatch => {
    const response = await fetch('/api/exercise/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(value)
    })
    if (response.ok) {
        const data = await response.json()
        dispatch(AddExercise(data))
        return data.id
    }
}

export const EditExerciseThunk = (id, body) => async dispatch => {
    const response = await fetch(`/api/exercise/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })

    if (response.ok) {
        const data = await response.json();
        dispatch(EditExercise(data))
    }
}

export const DeleteExerciseThunk = (id) => async dispatch => {
    const response = await fetch(`/api/exercise/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })

    if (response.ok) {
        dispatch(DeleteExercise(id))
    }
}

export const FilterExerciseThunk = (topicId) => async dispatch => {
    const response = await fetch(`/api/topic/${topicId}/exercise`)

    if (response.ok) {
        const data = await response.json();
        dispatch(Filtered_exercise(data));
    }
}

const exerciseReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case ALL_EXERCISE:
            newState = { ...state, all_exercises: {}};
            action.payload.all_exercises.forEach((exr) => {
                newState.all_exercises[exr.id] = exr
            });
            return newState;
        case ADD_COMMENT:
            newState = {...state}
            let key = Object.keys(newState.single_exercise)
            let sstate = newState.single_exercise[key]
            let legth = sstate.comments.length
            sstate.comments.push(action.payload)
            return newState
        case FILTER_EXERCISE:
            newState = {...state, all_exercises: {}};
            action.payload.filtered_exercises.forEach((exr) => {
                newState.all_exercises[exr.id] = exr
            });
            return newState;
        case GET_ONE_EXERCISE:
            newState = { ...state, single_exercise: {}};
            action.payload.single_exercise.forEach((exr) => {
                newState.single_exercise[exr.id] = exr
            });
            return newState;
        case ADD_EXERCISE:
            newState = { ...state, single_exercise: {}};
            newState.all_exercises[action.payload.id] = action.payload;
            newState.single_exercise[action.payload.id] = action.payload;
            return newState;
        case EDIT_EXERCISE:
            newState = { ...state, single_exercise: {}};
            newState.all_exercises[action.payload.id] = action.payload;
            newState.single_exercise[action.payload.id] = action.payload;
            return newState;
        case DELETE_EXERCISE:
            newState = { ...state }
            delete newState.all_exercises[action.id];
            delete newState.single_exercise[action.id];
            return newState
        default:
            return state;
    }
}

export default exerciseReducer;