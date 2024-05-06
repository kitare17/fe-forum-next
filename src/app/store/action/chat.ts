import * as Types from "../../constant/ActionType"
import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from "axios";

import {MessageEnglish} from "@/app/interface/ChatInterface";


export const chatEnglish = createAsyncThunk(
    Types.CHAT_CONSERVATION_ENGLISH,
    async (messageData: MessageEnglish) => {
        try {
            const thread_id = "thread_kcNduPOOrDuTIne7cw6KV41k";
            const assistant_id = "asst_07klGU08QE89p3dtNBOGswsS"

            const messageDataDetail: string = messageData.text;
            const headers = {
                'Authorization': 'Bearer sk-proj-JopMVzpkJno9HrWS6kJMT3BlbkFJCMyYUdHopZ9xSK0YINJ0',
                'OpenAI-Beta': 'assistants=v1'
            };

            var run_id = ""
            var dataChatResponse: MessageEnglish = {
                id: "ts",
                role: true,
                text: "Đây chỉ là một phiên bản test " + Math.floor(Math.random() * 20) + 1
            }

            //Set message
            await axios.post
            (`https://api.openai.com/v1/threads/${thread_id}/messages`,
                {
                    "role": "user",
                    "content": messageDataDetail
                },
                {headers}
            )
                .then(response => {
                    console.log("Set message successfull")
                })
                .catch(error => {
                    console.error('Error set message');
                });


            //Run thread
            await axios.post
            (`https://api.openai.com/v1/threads/${thread_id}/runs`,
                {
                    "assistant_id": assistant_id
                },
                {headers}
            )
                .then(response => {
                    console.log("Run thread successfull")
                    run_id = response.data.id;
                })
                .catch(error => {
                    console.error('Error Run thread');
                });

            var check = true
            //Run thread status
            while (check){
                await new Promise(resolve => setTimeout(resolve, 3000));


                await axios.get(`https://api.openai.com/v1/threads/${thread_id}/runs/${run_id}`, {
                    headers:headers,
                    timeout:3000
                })
                    .then(response => {
                        console.log("Run thread status successfull "+response.data.status )

                       if(response.data.status=="completed") check=false;

                    })
                    .catch(error => {
                        console.error('Error Run thread status');
                    });

           }

            //Get message
            await axios.get(`https://api.openai.com/v1/threads/${thread_id}/messages`, {
                headers: {
                    'OpenAI-Beta': 'assistants=v1',
                    'Authorization': 'Bearer sk-proj-JopMVzpkJno9HrWS6kJMT3BlbkFJCMyYUdHopZ9xSK0YINJ0',
                }
            })
                .then(response => {
                    console.log("Get message successfull")
                    console.log(response.data.data[0]);

                    var botMessage = response.data.data[0];
                    dataChatResponse = {
                        id: botMessage.id,
                        role: true,
                        text: botMessage.content[0].text.value
                    }
                })
                .catch(error => {
                    console.error('Error Get message');
                    console.error({error});

                });
            return [messageData, dataChatResponse];
        } catch (error) {
            console.log("Error: " + Types.CHAT_CONSERVATION_ENGLISH);

        }
    }
);