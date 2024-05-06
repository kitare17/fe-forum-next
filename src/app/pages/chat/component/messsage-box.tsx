import { TextMessage} from "inconnect-chat-ui";
import React from "react";
import 'react-chat-elements/dist/main.css'
// @ts-ignore
export const UserMesssage=({text})=>{
    return(
        <TextMessage
            avatar="https://i.pinimg.com/564x/b4/3b/ba/b43bba3de986fb97865ed342435c4ae5.jpg"
            className=""
            consumer="user"
            msgStatus="failed"


            showPreview={true}
            showRepliedBy={false}
            style={{}}
            text={text}
            userType="user"
        />
    )
}
// @ts-ignore
export const BotMessage=({text})=>{
    return(
        <TextMessage
            avatar="https://static.vecteezy.com/system/resources/thumbnails/007/225/199/small/robot-chat-bot-concept-illustration-vector.jpg"
            className=""
            consumer="user"
            msgStatus="failed"

            showPreview={true}
            showRepliedBy={false}
            elementStyle={{backgroundColor:'#86aff0',width:'80%'}}
            text={text}
            userType="admin"
        />
    )
}