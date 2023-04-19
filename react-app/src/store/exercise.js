const initialState = {"all_exercises": {}, "single_exercise": {}}

const ALL_EXERCISE = 'exercise/all'
const GET_ONE_EXERCISE = 'exercise/user'
const ADD_EXERCISE = 'exercise/add'
const EDIT_EXERCISE = 'exercise/edit'
const DELETE_EXERCISE = 'exercise/delete'

export const AllExercise = (payload) => {
    return {
        type: ALL_EXERCISE,
        payload
    }
}

export const ONEExercise = (payload) => {
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

export const AllExerciseThunk = () => async dispatch => {
    const response = await fetch(`/api/exercise/`)

    if (response.ok) {
        const data = await response.json();
        dispatch(AllExercise(data));
    }
}