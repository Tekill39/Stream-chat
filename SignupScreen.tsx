import React, { useContext, useState } from "react";
import { View, Text, StyleSheet, TextInput, Pressable } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useChatContext } from "stream-chat-expo";
import AuthContext from "./context/Authefication";

const SignupScreen = () => {
  const [username, setUsername] = useState("");
  const [fullname, setFullname] = useState("");
  const { client } = useChatContext();
  const { setUserId } = useContext(AuthContext);

  const connectUser = async (username: string, fullname: string) => {
    await client.connectUser(
      {
        id: username,
        name: fullname,
      },
      client.devToken(username)
    );
    // const channel = client.channel("messaging", "test", {
    //   name: "Test room",
    // });
    // await channel.watch();
    setUserId(username);
  };

  const signup = () => {
    connectUser(username, fullname);
  };
  return (
    <SafeAreaProvider style={styles.root}>
      <View style={styles.inputContainer}>
        <TextInput
          value={username}
          onChangeText={setUsername}
          placeholder="user name"
          style={styles.input}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          value={fullname}
          onChangeText={setFullname}
          placeholder="fullname"
          style={styles.input}
        />
      </View>
      <Pressable onPress={signup} style={styles.button}>
        <Text>Sign up</Text>
      </Pressable>
    </SafeAreaProvider>
  );
};
const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: "center",
    margin: 10,
  },
  inputContainer: {},
  input: {
    backgroundColor: "grey",
    //opacity: 0.1,
    marginVertical: 10,
    padding: 10,
    color: "black",
  },
  button: {
    backgroundColor: "purple",
    padding: 15,
    alignItems: "center",
  },
});
export default SignupScreen;
