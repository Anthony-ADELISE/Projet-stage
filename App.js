import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    FlatList,
} from "react-native";
import Axios from 'axios';
import { styles  } from './style.js'
import { ListItem , List } from 'native-base'


export default class App extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        isLoading: true,
        dataSource: [],
  
      }
    }

    componentDidMount () {
      
      Axios.get('https://jsonplaceholder.typicode.com/todos')
          .then ( (reponseJson) => {
          /*  console.log('recup data', reponseJson.data)*/
            this.setState ({
              isLoading: false,
              dataSource: reponseJson.data,
            })
          })
  
          .catch((error) => {
            console.log(error)
          })
    }
   

    
    renderItem = ({ item , index  }) => {
        // console.log('test item', item);
        let color = 0
       
        if( index%2 === 0 ){
          color = "#F04747"
        }else {
          color  = "blue"
        }

        return (
        <ListItem style={{backgroundColor:color,width:"100%"}}>
            <Text style={styles.userId}>
                {item.userId}
            </Text>
            <Text style={styles.id}>
                {item.id}
            </Text>
            <Text  style={styles.title}>
                {item.title}
            </Text>
        </ListItem>
            )
    }

    renderSeparator = () => {
        return (
            <View
                style={{ height: 1, width: '100%', backgroundColor:'black'}}>
            </View>
        )
    }
  

    render() {
        console.log('test render', this.state.dataSource) 
      return (
        <List style={styles.container}>
          <ListItem  itemDivider>
            <Text style={styles.userId}>
                user id 
            </Text>
            <Text style={styles.id}>
                  id 
            </Text>
            <Text  style={styles.title}>
                  titre
            </Text>
          </ListItem>
            <FlatList 
                data={this.state.dataSource}
                renderItem={this.renderItem}
                keyExtractor={(item) => item.id}
            />
        </List>
      );
    }
  
  }