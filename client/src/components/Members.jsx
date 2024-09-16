import {useState,useEffect} from "react";
import {useNavigate} from "react-router-dom"
import io from 'socket.io-client'
import welcomeImg from '../images/GM.png'
const Members=()=>{
    const [socket,setSocket]=useState(null);
    const navigateTo = useNavigate();

    useEffect(()=>{
      const socketInstance = io('http://localhost:3000');
      setSocket(socketInstance);

      return()=>{
        socketInstance.disconnect()
      }
    },[])

    useEffect(()=>{
      if(socket){
        socket.on('nftsUpdated',(data)=>{
          if(data.userNFTs<1){
             navigateTo('/')
             alert("You've been logged out because you no longer hold any NFTs in collection with address 0xd618581402226c92b14c9f4870799b3000ac4c77")
          }
        })
      }
    },[socket])

    return<>
      <p>Thank you for being a holder of my NFT collection, here's your message:</p>
      <img src={welcomeImg}></img>
    </>
 }
 export default Members;