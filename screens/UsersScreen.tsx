import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { useChatContext } from "stream-chat-expo";
import { FlatList } from "react-native";

import UserListItem from "../components/UserListItem";

export default function TabTwoScreen() {
  const [users, setUsers] = useState<any[]>();
  const { client } = useChatContext();
  const [isRefresh, setIsRefresh] = useState(false);

  const fetchUsers = async () => {
    const response = await client.queryUsers({});
    setUsers(response.users);
  };
  useEffect(() => {
    setIsRefresh(true);
    fetchUsers();
    setIsRefresh(false);
  }, []);
  return (
    <FlatList
      data={users}
      renderItem={({ item }) => <UserListItem user={item} />}
      onRefresh={fetchUsers}
      refreshing={isRefresh}
    />
  );
}

const styles = StyleSheet.create({
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
