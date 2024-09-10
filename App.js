import { StatusBar } from "expo-status-bar";
import { useRef, useState } from "react";
import {
  Alert,
  Button,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { Checkbox } from "react-native-paper";

export default function App() {
  const [item, setItem] = useState({
    taskItem: "",
  });
  const [addList, setAddList] = useState([]);
  const [error, setError] = useState("");

  // Reusable delete item function
  function deleteListItem(deleteItem) {
    setAddList((prev) =>
      prev.map((listItem) =>
        listItem.taskItem === deleteItem.taskItem
          ? { ...listItem, delete: !listItem.delete }
          : listItem
      )
    );
    setAddList(addList.filter((item) => item.taskItem !== deleteItem.taskItem));
  }

  // Remove item form list
  function DeleteItem(deleteItem) {
    if (deleteItem.checked) {
      deleteListItem(deleteItem);
    } else {
      Alert.alert(
        "Message",
        "The task not done yet! Are you sure want to delete the task? ",
        [
          { text: "cancel", onPress: () => "" },
          { text: "ok", onPress: () => deleteListItem(deleteItem) },
        ]
      );
    }
  }

  // The Item Is Done
  function toggleCheckbox(checkItem) {
    setAddList((prev) =>
      prev.map((listItem, i) =>
        i === checkItem ? { ...listItem, checked: !listItem.checked } : listItem
      )
    );
  }

  function handleChange(text) {
    setItem({ ...item, taskItem: text });
  }

  function handlePress() {
    const regex = /^[A-Za-z\s0-9]{3,}$/;
    if (!regex.test(item.taskItem)) {
      setError("The field allow only three letters or more and spaces!");
    } else {
      setAddList((prev) => [
        ...prev,
        { ...item, checked: false, delete: false },
      ]);
      setError("");
      setItem({ taskItem: "" });
    }
  }

  // check for number of checked item
  const checkedCount = addList.filter((listItem) => listItem.checked).length;
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text style={styles.todo}>To-Do</Text>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-evenly",
          alignItems: "start",
          marginBottom: "10%",
        }}
      >
        <View style={{ width: "60%" }}>
          <TextInput
            style={styles.input}
            placeholder="Write Here..."
            value={item.taskItem}
            onChangeText={handleChange}
          />
          <Text style={{ color: "red" }}>{error}</Text>
        </View>
        <Pressable
          onPress={handlePress}
          style={({ pressed }) => [
            {
              opacity: pressed ? 0.7 : 1,
            },
            styles.button,
          ]}
        >
          <Text style={styles.buttonText}>Add</Text>
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View>
          <Text style={{ color: "#fff", fontSize: 18 }}>
            {" "}
            {addList.length == 0
              ? `Add your First Task Today...`
              : `${checkedCount} done of ${addList.length} tasks`}
          </Text>
        </View>
        {addList.map((item, index) => (
          <View style={styles.item}>
            <Text
              style={[
                styles.itemText,
                item.checked ? { textDecorationLine: "line-through" } : "",
                { fontSize: 16, marginLeft: 3 },
              ]}
            >
              {item.taskItem}
            </Text>
            <View>
              <Checkbox.Item
                position="leading"
                label="Done"
                labelStyle={{ color: "#fff" }}
                uncheckedColor="purple"
                status={item.checked ? "checked" : "unchecked"}
                onPress={(e) => toggleCheckbox(index)}
                color="#fff"
                style={{ width: "auto" }}
              />
            </View>
            <View>
              <Checkbox.Item
                position="leading"
                label="Delete"
                uncheckedColor="purple"
                labelStyle={{ color: "#fff" }}
                status={item.delete ? "checked" : "unchecked"}
                onPress={() => DeleteItem(item)}
                color="#fff"
                style={{ width: "auto" }}
              />
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === "android" ? 30 : 0,
    backgroundColor: "#2c2c2c",
    flex: 1,
  },
  todo: {
    backgroundColor: "purple",
    textAlign: "center",
    fontSize: 40,
    fontWeight: "bold",
    marginBottom: 50,
    color: "#fff",
    paddingVertical: 10,
  },
  input: {
    padding: 10,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#5f33e1",
    color: "#fff",
    // backgroundColor: "red",
  },
  button: {
    backgroundColor: "#5f33e1",
    justifyContent: "center",
    paddingHorizontal: 25,
    paddingVertical: 15,
    borderRadius: 10,
    alignSelf: "flex-start",
  },
  buttonText: {
    textAlign: "center",
    color: "#fff",
    fontSize: 16,
  },
  item: {
    backgroundColor: "#5f33e1",
    marginVertical: 5,
    borderRadius: 10,
    width: "70%",
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  itemText: {
    color: "#fff",
    flex: 1,
  },
  contentContainer: {
    alignItems: "center",
    flexGrow: 1,
  },
});
