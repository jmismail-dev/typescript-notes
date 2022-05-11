

export type Note = {
    id: number,
    title: string,
    body: string,
    createdOn: string,
    updatedOn: string
}

const initValue = {
    notes: [] as Note[],
    isLoading: false as Boolean,
    error: '',
    isError: false,
    note: '',
    history : []
}


export default function (state = initValue, action: any) {
    const { type, payload } = action;
    switch (type) {
        case 'FETCH_ALL_USER_NOTES':
            return {
                ...state,
                isLoading: true,
                history : []
            }

        case 'FETCH_USER_NOTES_SUCCESS':
            return {
                ...state,
                isLoading: false,
                notes: payload,
                isError: false,
            }

        case 'FETCH_SINGLE_USER_NOTE_SUCCESS':
            return {
                ...state,
                isLoading: false,
                note: payload,
                isError: false,
                // history : []
            }

        case 'FETCH_USER_NOTES_FAILURE':
        case 'FETCH_SINGLE_USER_NOTE_FAILURE':
            return {
                ...state,
                error: payload,
                isError: true,
                isLoading: false,
            }


        case 'DELETE_NOTE_SUCCESS':
            return {
                ...state,
                notes: [...state.notes.filter(o => o.id !== payload)]
            }

        case 'GET_NOTE_HISTORY_SUCCESS':
            return {
                ...state,
                history: payload,
            }

        default: return state;
    }

}