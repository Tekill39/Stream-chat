import { useNavigation } from "@react-navigation/native";
import React, { useContext } from "react";
import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import { useChatContext } from "stream-chat-expo";
import AuthContext from "../context/Authefication";

const UserListItem = ({ user }) => {
  const { client } = useChatContext();
  const { userId } = useContext(AuthContext);
  const navigation = useNavigation();
  const handlerUser = async () => {
    const channel = client.channel("messaging", { members: [user.id, userId] });
    await channel.watch();
    navigation.navigate("Channel", { channel });
  };
  return (
    <Pressable onPress={handlerUser}>
      <View style={styles.root}>
        <Image style={styles.image} source={{ uri: user.image }} />
        <Text style={styles.text}>{user.name}</Text>
      </View>
    </Pressable>
  );
};
const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    margin: 10,
    flexDirection: "row",
  },
  text: {
    flexDirection: "row",
    justifyContent: "center",
    color: "blue",
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: "grey",
    marginRight: 10,
  },
});
export default UserListItem;
