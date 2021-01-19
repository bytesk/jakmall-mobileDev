import {FETCH_LIST_DATA_HOME, FETCH_LIST_DATA_HOME_ADD_MORE, MOVE_DATA_LIST_UP} from '../constants';

export const listDataHome = (state = [], action) => {
    switch (action.type) {
        case FETCH_LIST_DATA_HOME:
            return {
                ...state,
                dataList: action.payload
            }
        case FETCH_LIST_DATA_HOME_ADD_MORE :
            return {
                ...state,
                dataList: state.dataList.concat(action.newItem)
            }

        case MOVE_DATA_LIST_UP:
            return {
                ...state,
                dataList: action.payload
            }

        default:
            return state
    }
}
