import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from "react";
import { Text } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StreamChat } from "stream-chat";
import {
  OverlayProvider,
  Chat,
  ChannelList,
  Channel,
  MessageList,
  MessageInput,
} from "stream-chat-expo";

import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";
import AuthContext from "./context/Authefication";

const API_KEY = "cv3p2ug4jk5z";
//const API_KEY = "tv74m6jjsanv";
const client = StreamChat.getInstance(`${API_KEY}`);

export default function ApphandelPressedChannel() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  const [selectedChannel, setSelectedChannel] = useState<any>(false);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    return () => {
      client.disconnectUser();
    };
  }, []);

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <AuthContext.Provider value={{ userId, setUserId }}>
          <OverlayProvider>
            <Chat client={client}>
              <Navigation colorScheme="light" />
            </Chat>
            {/* <Chat client={client}>
            {selectedChannel ? (
              <Channel channel={selectedChannel}>
                Message={(message)=>{return <Text>{message.message.text}</Text>}}
                <MessageList />
                <MessageInput />
                <Text
                  style={{ marginTop: 50 }}
                  onPress={() => setSelectedChannel(null)}
                >
                  Go back
                </Text>
              </Channel>
            ) : (
              <ChannelList onSelect={handelPressedChannel} />
            )}
          </Chat> */}
          </OverlayProvider>
          <StatusBar />
        </AuthContext.Provider>
      </SafeAreaProvider>
    );
  }
}
