import * as Types from "../../constant/ActionType"

var chatGPTResponse:any=[]


interface Action{
    type:string
    payload:object
}
const chatgpt=(state=chatGPTResponse,   action:Action)=>{
    switch(action.type){
        case Types.GET_RESPONSE_CHAT_GPT:
            return [...state, action.payload];
        default: return [...state]
    }
}