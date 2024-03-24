export const reducer = (state, action) => {
    switch (action.type) {
        case "QUERY_PARAM_UPDATE":
            return {...state, queryParam : action.value};
        case "TABLE_DATA":
            return {...state, tableData : [...action.value]};
        case "TABLE_LOADING":
            return {...state, isTableLoading : action.value};
        default:
            return state;
    }
};