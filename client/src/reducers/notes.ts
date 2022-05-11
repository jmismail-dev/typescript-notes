

export type Note = {
    id: number,
    title: string,
    body: string,
    createdOn: string,
    updatedOn: string
}

const initValue = {
    notes: [] as Note | unknown,
    isLoading: false as Boolean,
    error: '',
    isError: false,
    note: ''
}




export default function (state = initValue, action: any) {
    const { type, payload } = action;
    switch (type) {
        case 'FETCH_ALL_USER_NOTES':
            return {
                ...state,
                isLoading: true,
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
            }

        case 'FETCH_USER_NOTES_FAILURE':
        case 'FETCH_SINGLE_USER_NOTE_FAILURE':
            return {
                ...state,
                error: payload,
                isError: true,
                isLoading: false,
            }

        default: return state;
    }

}