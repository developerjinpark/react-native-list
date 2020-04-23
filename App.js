import React from 'react'
import { StyleSheet, Text, View, Button, ScrollView, FlatList,SectionList } from 'react-native'
import Constants from 'expo-constants'

import contacts, {compareNames} from './contacts'
import Row from './Row'
import ContactsList from './ContactsList'
import AddContactForm from './AppContactForm'

export default class App extends React.Component {
  state = {
    showContacts: false,
    showForm: false,
    contacts: contacts
  }

  addContact = newContact => {
    this.setState(prevState => ({showFrom: false, contact: [...prevState.contacts, newContact]}))
  }

  toggleContacts = () => {
    this.setState(prevState => ({
      showContacts: !prevState.showContacts
    }))
  }

  toggleForm = () => {
    this.setState(prevState => ({
      showForm: !prevState.showForm
    }))
  }
  sort = () => {
    this.setState(prevState => ({
      contacts:  [...prevState.contacts].sort(compareNames)
    }))
  }

  // key is automatically generated
  // item: { name: String, phone: String, key: number }
  // renderItem = obj => <Row name={obj.item.name} phone={obj.item.phone} key={obj.item.key} />
  // renderItem = obj => <Row {...(obj.item)} />

  // renderItem = ({item}) => <Row {...item} />
  // renderSectionHeader = obj => <Text>{obj.section.title}</Text>

  render() {
    if (this.state.showForm) return <AddContactForm onSubmit={this.addContact} />
    return (
      <View style={styles.container}>
        <Button title="toggle contacts" onPress={this.toggleContacts} />
        {/* <Button title="sort" onPress={this.sort} /> */}
        <Button title="Add Contact" onPress={this.toggleForm} />
        {this.state.showContacts && 
          // using ScrollView
          // <ScrollView>
          //   {contacts.map(contact => 
          //     // <Row key={c.key} name={c.name} phone={c.phone} />
          //     <Row {...contact} />
          //   )} 
          // </ScrollView>

          // using FlatList
          // <FlatList
          //   renderItem={this.renderItem}
          //   data={this.state.contacts}
          // />

          // using SectionList
          // <SectionList
          //   renderItem={this.renderItem}
          //   renderSectionHeader={this.renderSectionHeader}
          //   sections={[{
          //     title: 'A',
          //     data: this.state.contacts
          //   }]}
          // />
          <ContactsList
            // moving it to ContactsList.js
            // renderItem={this.renderItem}
            // renderSectionHeader={this.renderSectionHeader}
            contacts={this.state.contacts}
          />
        }
        
      </View>
    );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: Constants.statusBarHeight,
  },
});
