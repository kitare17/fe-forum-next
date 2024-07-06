"use client"
import {ChatItem} from 'react-chat-elements';
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
    InputBase, LinearProgress, CircularProgress

} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

import {BotMessage, UserMesssage} from "@/app/pages/chat/component/messsage-box";
import {useForm} from "react-hook-form";
import {toast} from "react-toastify";

import {useDispatch, useSelector} from "react-redux";
import {chatEnglish} from "@/app/store/action/chat";
import {RootState} from "@/app/store";
import MenuIcon from '@mui/icons-material/Menu';

const drawerWidth = 300;

//interface role bot (true), user (false)
interface Message {
    id: number,
    role: boolean,
    text: string
}


const ChatEnglish = () => {
    const dipatch = useDispatch();
    const {listMessageResponse, isLoading, isError} = useSelector((state: RootState) => state.chatEnglish);


    const [open, setOpen] = React.useState(false);
    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
    };



    const handleSendMessage = (messageData: Message) => {
        if (messageData.text) {

            // @ts-ignore
            dipatch(chatEnglish(messageData));

            //listMessageResponse=[...listMessageResponse,messageData]


        } else {
            toast.error("Vui lòng nhập câu hỏi")
        }
        reset();
    }


    //form handle
    const {register, handleSubmit, reset, formState} = useForm<Message>(
        {
            defaultValues: {
                text: "",
                role: false,
                id: 1
            }
        }
    );
    const {errors} = formState;
    const RenderChat = () => {
        return (
            <>
                {listMessageResponse.map((message: Message, index) => {
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

    const DrawerList = (
        <Box sx={{ width: 300 }} role="presentation" onClick={toggleDrawer(false)}>
            <Toolbar>
                <Typography variant="h6" noWrap component="div">
                  Danh sách bot
                </Typography>
            </Toolbar>
            <Divider/>
            <List>
                {['Inbox', 'Starred', 'Drafts0', 'Send email', 'Drafts', 'Starred', 'Drafts0', 'Send email', 'Drafts'].map((text, index) => (
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

        </Box>
    );

    return (
        <div>

            <Box sx={{display: 'flex'}}>
                <CssBaseline/>
                <AppBar
                    position="fixed"
                    sx={{
                        width: {
                            lg: `calc(100% - ${drawerWidth}px)`
                        },
                        ml: {
                            lg: `${drawerWidth}px`
                        }
                    }}
                >
                    <Toolbar>

                        <MenuIcon
                        sx={{
                            display:{
                                xs:"block",
                                sm:"block",
                                md:"block",
                                lg:"none"
                            }
                        }}
                        onClick={toggleDrawer(true)}
                        />
                        <Typography variant="h6" noWrap component="div">
                            Chat bot AI
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Drawer
                    sx={{
                        display:{
                            xs:"none",
                            sm:"none",
                            md:"none",
                            lg:"block"
                        },
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
                            Danh sách bot
                        </Typography>
                    </Toolbar>
                    <Divider/>
                    <List>
                        {['Inbox'].map((text, index) => (
                            <ListItem key={text} disablePadding>
                                <ListItemButton sx={{background: "#ede7e6"}}>
                                    <ChatItem
                                        id="1"
                                        avatar={'https://static.vecteezy.com/system/resources/thumbnails/007/225/199/small/robot-chat-bot-concept-illustration-vector.jpg'}
                                        alt={'Reactjs'}
                                        title={'Chat bot dịch thuật'}
                                        subtitle={'Welcome!!!'}
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

                    sx={{flexGrow: 1, bgcolor: 'background.default', p: 3, marginTop: "60px", marginBottom: "100px"}}
                    position={"relative"}
                >


                    <RenderChat/>
                    {isLoading && <>
                        <BotMessage key="loading" text={"Dữ liệu đang xử lí bạn đợi chút nhé ..."}/>
                        <LinearProgress/>
                    </>
                    }

                    {/*box input*/}
                    <Box
                        position={"fixed"}
                        bottom={"30px"}
                        sx={{
                            width:{
                                xs:"90%",
                                sm:"90%",
                                md:"90%",
                                lg:"70%"

                            }
                        }}

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
                                required
                                {...register(
                                    'text'
                                )}
                                onKeyDown={(ev) => {


                                    if (ev.key === 'Enter') {
                                        // Do code here
                                        console.log(`Pressed keyCode ${ev.key}`);

                                        handleSendMessage(
                                            {
                                                // @ts-ignore
                                                text: ev.target.value,
                                                role: false,
                                                id: 1
                                            }
                                        )
                                        ev.preventDefault();
                                    }
                                }}

                            />

                            <Divider sx={{height: 28, m: 0.5}} orientation="vertical"/>
                            <IconButton color="primary" sx={{p: '10px'}} aria-label="directions"
                            >
                                {
                                    isLoading?
                                        <CircularProgress />
                                        :
                                        <SendIcon onClick={handleSubmit(handleSendMessage)}/>

                                }
                            </IconButton>
                        </Paper>
                    </Box>

                </Box>
            </Box>


            <Drawer open={open} onClose={toggleDrawer(false)}>
                {DrawerList}
            </Drawer>
        </div>
    )
}

export default ChatEnglish
