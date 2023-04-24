const initialState = {"all_users": {}}

const ALL_USERS = 'users/all'

export const AllUsers = (payload) => {
    return {
        type: ALL_USERS,
        payload
    }
}

export const AllUsersThunk = () => async dispatch => {
    const response = await fetch('/api/users/')

    if (response.ok) {
        const data = await response.json()
        dispatch(AllUsers(data))
    }
}

const userReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case ALL_USERS:
            newState = {...state, all_users: {}}
            action.payload.all_users.forEach(element => {
                newState.all_users[element.id] = element
            });
            return newState;
        default:
            return state
    }
}

export default userReducer;