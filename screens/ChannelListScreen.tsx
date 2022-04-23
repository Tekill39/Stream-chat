import { useContext } from "react";
import { StyleSheet } from "react-native";
import { ChannelList } from "stream-chat-expo";
import AuthContext from "../context/Authefication";
import { RootTabScreenProps } from "../types";

export default function TabOneScreen({
  navigation,
}: RootTabScreenProps<"TabOne">) {
  const handelPressedChannel = channel => {
    navigation.navigate("Channel", { channel });
  };
  const { userId } = useContext(AuthContext);
  const filters = {
    members: {
      $in: [userId],
    },
  };
  return <ChannelList onSelect={handelPressedChannel} filters={filters} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
