import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import database from '@react-native-firebase/database';

let itemRef = database().ref('/Items');
function List() {
  const [itemArray, setItemArray] = useState([]);

  useEffect(() => {
    itemRef.on('value', snapshot => {
      let data = snapshot.val();
      const items = Object.values(data);
      console.log(items);
      setItemArray(items);
    });
  }, []);
  return (
    <View style={styles.container}>
      {itemArray.length > 0 ? (
        itemArray.map((item, index) => {
          return <Text>{item.name}</Text>;
        })
      ) : (
        <Text>No Itmes</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default List;
