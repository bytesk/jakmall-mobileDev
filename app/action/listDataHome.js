import { FETCH_LIST_DATA_HOME, FETCH_LIST_DATA_HOME_ADD_MORE, MOVE_DATA_LIST_UP } from '../constants'
import { url } from '../config/server'
import { setLoading, setSuccess, setFailed } from './processor'

export const fetchListDataHome = () => {
    return async dispatch => {
        await dispatch(setLoading(true, 'FETCH_LIST_DATA_HOME'))
        await dispatch(setFailed(false, 'FETCH_LIST_DATA_HOME'))
        try {
            const response = await fetch(`${url}/jokes/random/3`, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                }
            })
            console.log("ini resp fetchListDataHome " + JSON.stringify(response))
            const data = await response.json()
            console.log("ini resp fetchListDataHome data " + JSON.stringify(data))
            await dispatch(fetchListDataSuccess(data.value))
            await dispatch(setSuccess(false, 'FETCH_LIST_DATA_HOME'))
            await dispatch(setLoading(false, 'FETCH_LIST_DATA_HOME'))
        } catch (e) {
            dispatch(setFailed(true, 'FETCH_LIST_DATA_HOME', e))
            dispatch(setLoading(false, 'FETCH_LIST_DATA_HOME'))
        }
    }
}

export const fetchListDataHomeAddMore = () => {
    return async dispatch => {
        await dispatch(setLoading(true, 'FETCH_LIST_DATA_HOME_ADD_MORE'))
        await dispatch(setFailed(false, 'FETCH_LIST_DATA_HOME_ADD_MORE'))
        try {
            const response = await fetch(`${url}/jokes/random/1`, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                }
            })
            console.log("ini resp fetchListDataHomeAddMore " + JSON.stringify(response))
            const data = await response.json()
            console.log("ini resp fetchListDataHomeAddMore data " + JSON.stringify(data))
            await dispatch(fetchListDataSuccessAddMore(data.value))
            await dispatch(setSuccess(false, 'FETCH_LIST_DATA_HOME_ADD_MORE'))
            await dispatch(setLoading(false, 'FETCH_LIST_DATA_HOME_ADD_MORE'))
        } catch (e) {
            dispatch(setFailed(true, 'FETCH_LIST_DATA_HOME_ADD_MORE', e))
            dispatch(setLoading(false, 'FETCH_LIST_DATA_HOME_ADD_MORE'))
        }
    }
}

export const arrMoveData = (arr, fromIndex, toIndex) => {
    return async dispatch => {
        await dispatch(setLoading(true, 'MOVE_DATA_LIST_UP'))
        await dispatch(setFailed(false, 'MOVE_DATA_LIST_UP'))

        try {
            var element = arr[fromIndex];
            arr.splice(fromIndex, 1);
            arr.splice(toIndex, 0, element);

            await dispatch(moveDataList(arr))
            await dispatch(setSuccess(false, 'MOVE_DATA_LIST_UP'))
            await dispatch(setLoading(false, 'MOVE_DATA_LIST_UP'))
        } catch (e) {
            dispatch(setFailed(true, 'MOVE_DATA_LIST_UP', e))
            dispatch(setLoading(false, 'MOVE_DATA_LIST_UP'))
        }

    }
}

const fetchListDataSuccess = data => ({
    type: FETCH_LIST_DATA_HOME,
    payload: data
})

const fetchListDataSuccessAddMore = data => ({
    type: FETCH_LIST_DATA_HOME_ADD_MORE,
    newItem: data
})

const moveDataList = data => ({
    type: MOVE_DATA_LIST_UP,
    payload: data
})
