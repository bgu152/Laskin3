import { StatusBar } from 'expo-status-bar';
import React, {useState, useRef} from 'react';
import { NavigationContainer} from '@react-navigation/native';
import { createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { StyleSheet, Text, View, TextInput, Button, FlatList} from 'react-native';
import { createStackNavigator} from'@react-navigation/stack';

/*
npm install @react-navigation/native
expo install react-native-screens react-native-safe-area-context
npminstall@react-navigation/bottom-tabs
npminstall @react-navigation/stack
*/


function CalculatorScreen({navigation}) {
  
  const [result, setResult] = useState('');
  const [operand1, setOperand1] = useState('');
  const [operand2, setOperand2] = useState('');
  const [data, setData] = useState([]);
  
  const initialFocus = useRef(null);
  const calculate = operator => {
    console.log(operand1, operand2, operator);
    const [number1, number2 ] = [Number(operand1), Number(operand2)];
    let result = 0;
    switch (operator){
      case '+':
        result = number1 + number2;
        break;
      case '-':
        result = number1 - number2;
        break;    
    }
    setResult(result);
    const text = `${number1} ${operator} ${number2} = ${result}`;
    
    setData([...data, {key:text}]);

    setOperand1('');
    setOperand2('');
    initialFocus.current.focus();
  }
  return (
    <View style={styles.container}>
      <Text>Result: {result}</Text>
      <TextInput style={styles.input} ref={initialFocus}
      keyboardType='number-pad'
      onChangeText={text => setOperand1(text)}
      value={operand1}
      />
      <TextInput style={styles.input}
      keyboardType='number-pad'
      onChangeText={text => setOperand2(text)}
      value={operand2}
      />

      <View style={styles.operators}>
        <View style={styles.buttonContainer}>
          <Button title ='+' onPress = {() => calculate('+')}> </Button>
        </View>
        <View style={styles.buttonContainer}>
          <Button title ='-' onPress = {() => calculate('-')}> </Button>
        </View>
        <View style={styles.buttonContainerHistory}>
          <Button title ='History' onPress={()=>navigation.navigate('History', {data:data})}> </Button>
        </View>
      </View>
      
    </View>
  );
}

function HistoryScreen({route,navigation}) {
  const {data} = route.params;
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>History</Text>
      <FlatList
        data={data}
        renderItem={({item}) =>
        <Text>{item.key}</Text>}
      />

    </View>
  );
}


const Stack = createStackNavigator();



export default function App() {
  
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Calculator" component={CalculatorScreen} />
        <Stack.Screen name="History" component={HistoryScreen} />
      </Stack.Navigator>
      
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    borderColor:'grey',
    borderWidth:1,
    padding:5,
    margin:5,
    width:'50%'

  },
  operators:{
    width:'50%',
    flexDirection:'row',
    justifyContent: 'space-evenly'
  }, 
  buttonContainer:{
    width:'20%'
  },
  buttonContainerHistory:{
    width:'50%'
  }
});