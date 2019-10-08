const reducer = (state, action) => {
    switch(action.type){
      case "ADD_CRYPTO_NAME":
        return {...state, cryptoName: action.payload};
      default:{}
    }
    return state;
}

export default reducer;
