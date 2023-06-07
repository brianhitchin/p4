const initialState = { "all_groups": {} }

const ALL_GROUP = 'group/all'

export const AllGroup = (payload) => {
    return {
        type: ALL_GROUP,
        payload
    }
}

export const AllGroupThunk = () => async dispatch => {
    const response = await fetch(`/api/group/`)

    if (response.ok) {
        const data = await response.json();
        dispatch(AllGroup(data));
    }
}

const groupReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case ALL_GROUP:
            newState = { ...state, all_groups: {}};
            action.payload.all_groups.forEach((group) => {
                newState.all_groups[group.id] = group
            });
            return newState;
        default:
            return state;
    }
}

export default groupReducer;