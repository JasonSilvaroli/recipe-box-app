import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, Platform, Text, Dimensions, ScrollView, SafeAreaView } from 'react-native';
import axios from 'axios'
import '../configure/apiKey.json'
import RecipeCards from '../components/RecipeCards';
import { PulseIndicator } from 'react-native-indicators';
import ViewRecipe from './ViewRecipe';
import { Button, Title } from 'react-native-paper';


const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    backgroundColor: '#69F0AE',
    ...Platform.select({
      ios: {
        width: "auto"
      },
      web: {
        width: ((Dimensions.get('window').width) < 500) ? ((Dimensions.get('window').width) - 50) : 800,
      },
      android: {
        width: "auto"
      },
    }),
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    padding: 10,

  },


  loader: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})




function SearchResults({ navigation, ingredQuery }) {



  const [items, setItems] = useState([{}]); //useState is initial state to manage items being updated.
  const [itemCount, setItemCount] = useState(0);
  const [loading, setLoading] = useState(true);
  let counter = 0;
  let numOfItemsViewed = 0;
  let resultsPerPage = 10;
  var queryLength = 0;

  var results = JSON.parse(navigation.state.params.results);
  var query = "";
  function getQuery() {

    if (results.query != "") {

      queryLength++;
      query += "&query=" + results.query;

    }

    if (results.cuisine != "") {

      queryLength++;
      query += "&cuisine=" + results.cuisine;

    }

    if (results.intolerances != "") {

      queryLength++;
      query += "&intolerances=" + results.intolerances;

    }

    if (results.includeIngredients != "") {

      queryLength++;
      query += "&includeIngredients=" + results.includeIngredients;

    }
    let apiKey = require('../configure/apiKey.json');
    query = 'https://api.spoonacular.com/recipes/complexSearch?apiKey=' + apiKey.key + query + '&addRecipeInformation=true&number=20';

    console.log(query)

    return query;
  }

  useEffect(() => {

    var url = getQuery();
    axios.get(url)
      .then(res => {
        const items = res.data.results;
        setItems(items);
        setItemCount(items.length);
        setLoading(false);
      })



  }, []);


  /*
  useEffect(()=>{},[]); means "Run only once, like componentDidMount"
  useEffect(()=>{},[count]); means "Run this effect if count is changed, like componentDidUpdate"
  useEffect(()=>{}); means "Run every render componentDidUpdate"
  */

  // async function getReceipeData (endpoint) {

  //   const res = await fetch(endpoint);
  //   return await res.json();
  // }
  if (loading) {
    return (
      <SafeAreaView style={{ flex: 3 }}>


        <PulseIndicator style={{ position: "relative" }} animating={true} size={180} color='#69F0AE' />

      </SafeAreaView>
    )
  } else if (items.length > 0) {
    return (
      <SafeAreaView>

        <FlatList
          style={styles.container}

          snapToAlignment={"center"}
          data={items}
          ListHeaderComponent={<Title style={{ marginBottom: 4, alignSelf: "center" }}> Found {itemCount} results</Title>}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => <RecipeCards navigation={navigation} oneitem={item} />}

        //renderItem={({item}) => <ViewRecipe item={item}/>}
        />

      </SafeAreaView>


    );
  }
  else if (items.length == 0) {
    return (
      <SafeAreaView>
        <Title>No results found for your search</Title>
      </SafeAreaView>

    );
  }
}
export default SearchResults;