import * as React from "react";
import { useParams } from "react-router";
import { Box, AppBar, Toolbar, Avatar } from "@mui/material";
import { TextField } from "@mui/material";
import MessageCart from "./MessageCart";
import { useMutation, useQuery, useSubscription } from "@apollo/client";
import { GET_MSG } from "../graphql/query";
import { Typography } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { Stack } from "@mui/system";
import { CircularProgress } from "@mui/material";
import { SEND_MSG } from "../graphql/mutation";
import { MSG_SUB } from "../graphql/subscription";


function ChatScreen ()  {

  const [message, setMessage] = React.useState();
  const [msg, sendmsg] = React.useState([]);
  const { id, name } = useParams();
  console.log(msg)
  // const {userId}=jwt_decode(localStorage.getItem("jwt"))

  // mutation for sending the messages to other user
  const [sendMsg] = useMutation(SEND_MSG, {
    onCompleted(data) {
      sendmsg((msgs)=>[...msgs,data.createMessage])
    },
  }); //SEND_MSG is operation

  const{data:subdata}=useSubscription(MSG_SUB)

  React.useEffect(()=>{
    if(subdata){
    // if (data.MessageAdded.receiverId==Number(id)&& data.MessageAdded.senderId===userId)
      sendmsg((msgs)=>[...msgs,subdata.MessageAdded])
    }
  
  },[subdata])

 
  console.log(msg)

  // query function for getting messages
  const { loading, data, error } = useQuery(GET_MSG, {
    variables: {
      receiverId: Number(id),
    },
    onCompleted(data) {
      sendmsg(data.viewMessages);
      console.log(msg);
    },
  });

  if (loading) {
    <Box>
      <CircularProgress />
      <Typography>loading....</Typography>
    </Box>;
  }

  if (data) {
    // console.log(data);
  }
  if (error) {
    console.log(error.message);
  }

  return (
    <Box flexGrow={1}>
      <Box display={"flex"}>
        <AppBar
          position="fixed"
          sx={{
            backgroundColor: "green",
            boxShadow: 0,
            minWidth:"250px",
            display: "flex",
            flexGrow: 1,
          }}
        >
          <Toolbar>
            <Avatar src={`https://api.dicebear.com/8.x/personas/svg`} />
            {name}
          </Toolbar>
        </AppBar>
      </Box>

      <Box
        backgroundColor="#f5f5f5"
        height="80vh"
        padding={"10px"}
        sx={{ overflow: "auto" }}
      >
        {loading ? (
          <Box>
            <Typography variant="h6">loading chats...</Typography>
          </Box>
        ) : (
          msg.map((item) => {
            return (
              <MessageCart
                text={item.text}
                date={item.createdAt}
                direction={item.receiverId == +id ? "end" : "start"}
              />
            );
          })
        )}
      </Box>
      <Stack direction={"row"}>
        <TextField
          placeholder="enter your message"
          variant="standard"
          fullWidth
          multiline
          rows={2}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
        />
        <SendIcon fontSize="large"  onClick={()=>{sendMsg({

          variables:{
            receiverId:Number(id),
            text:message
          }
        })}}/>
      </Stack>
    </Box>
  );
};

export default ChatScreen;
