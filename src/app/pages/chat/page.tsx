"use client"
import {ChatItem, MessageBox, Input, Button} from 'react-chat-elements';
import React, {useState} from "react";
import 'react-chat-elements/dist/main.css'
import {
    List,
    Box,
    ListItem,
    ListItemButton,
    Divider,
    Drawer,
    Toolbar,
    Typography,
    AppBar,
    CssBaseline,
    Paper,
    IconButton,
    InputBase

} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import {ImageMessage} from 'inconnect-chat-ui';
import {BotMessage, UserMesssage} from "@/app/pages/chat/component/messsage-box";


const drawerWidth = 300;

//interface role bot (true), user (false)
interface Message {
    id: number,
    role: boolean,
    text: string
}

const ChatEnglish = () => {

    const [listMessage, setListMessage] = useState<Message[]>([
        {
            id: 1,
            role: true,
            text: "Xin chào bạn tôi là chat bot ai dịch nghĩa từ vựng, bạn cần tôi giúp gì không?"
        },
        {
            id: 2,
            role: false,
            text: "Xin chào bạn tôi là chat bot ai dịch nghĩa từ vựng, bạn cần tôi giúp gì không?"
        }
    ]);

    const handleSendMessage = () => {
        setListMessage(
            [
                ...listMessage,
                {
                    id: 2,
                    role: false,
                    text: "Xin chào bạn tôi là chat bot ai dịch nghĩa từ vựng, bạn cần tôi giúp gì không?"
                }
            ]
        )
        console.log({listMessage})
    }
    const RenderChat = () => {
        return (
            <>
                {listMessage.map((message: Message, index) => {
                        return (
                            <div key={index}>
                                {message.role ?

                                    <BotMessage key={index} text={message.text}/>
                                    :
                                    <UserMesssage key={index} text={message.text}/>

                                }
                            </div>



                        )
                    }
                )}
            </>

        )
    }

    return (
        <div>

            <Box sx={{display: 'flex'}}>
                <CssBaseline/>
                <AppBar
                    position="fixed"
                    sx={{width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px`}}
                >
                    <Toolbar>
                        <Typography variant="h6" noWrap component="div">
                            Chat bot AI
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Drawer
                    sx={{
                        width: drawerWidth,
                        flexShrink: 0,
                        '& .MuiDrawer-paper': {
                            width: drawerWidth,
                            boxSizing: 'border-box',
                        },
                        background: "#ede7e6"
                    }}
                    variant="permanent"
                    anchor="left"
                >
                    <Toolbar>
                        <Typography variant="h6" noWrap component="div">
                            List of chat
                        </Typography>
                    </Toolbar>
                    <Divider/>
                    <List>
                        {['Inbox', 'Starred', 'Drafts0', 'Send email', 'Drafts'].map((text, index) => (
                            <ListItem key={text} disablePadding>
                                <ListItemButton sx={{background: "#ede7e6"}}>
                                    <ChatItem
                                        id="1"
                                        avatar={'https://png.pngtree.com/png-vector/20230416/ourmid/pngtree-avatar-ninja-symbol-icon-vector-png-image_6709524.png'}
                                        alt={'Reactjs'}
                                        title={'Facebook'}
                                        subtitle={'What are you doing?'}
                                        date={new Date()}
                                        unread={1}
                                    />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                    <Divider/>

                </Drawer>
                <Box

                    sx={{flexGrow: 1, bgcolor: 'background.default', p: 3, marginTop: "60px"}}
                    position={"relative"}
                >
                    <RenderChat/>


                    {/*box input*/}
                    <Box
                        position={"fixed"}
                        bottom={"30px"}
                        width={"70%"}
                    >
                        <Paper
                            component="form"
                            sx={{
                                p: '2px 4px',
                                display: 'flex',
                                alignItems: 'center',
                                width: "100%",
                                background: "#ede7e6"
                            }}
                        >

                            <InputBase
                                sx={{ml: 1, flex: 1}}
                                placeholder="Nhập câu hỏi"
                                inputProps={{'aria-label': 'search google maps'}}
                            />

                            <Divider sx={{height: 28, m: 0.5}} orientation="vertical"/>
                            <IconButton color="primary" sx={{p: '10px'}} aria-label="directions"
                                      >
                                <SendIcon   onClick={handleSendMessage}/>
                            </IconButton>
                        </Paper>
                    </Box>

                </Box>
            </Box>
        </div>
    )
}

export default ChatEnglish
