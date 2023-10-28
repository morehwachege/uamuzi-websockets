import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function App() {
  const [notifications, setNotifications] = useState([]);
  const token = 'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo1MX0.4XmiZemd6JhEkl3qzs-LgrW_LkrAwfPRRHEbObUOQ0E';
  const socket = new WebSocket(`ws://localhost:3000/cable?token=${token}`)
  socket.addEventListener('open',(event) => {
    socket.send(JSON.stringify({ command: 'subscribe', identifier: JSON.stringify({ channel: 'NotificationChannel' }) }));
  })

  useEffect(() => {
    socket.addEventListener('message', (event) => {
      let data = JSON.parse(event.data);
      if (data.type == 'ping'){
  
      }else{
        let msg= data.message.message;
        setNotifications(previousNotifications => [ ...previousNotifications, msg])
      }
    })
  }, [])

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      { 
        notifications.map(noti => {
          return <Text>{noti.alert}. {noti.preview}</Text>
        })
      }
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
