import * as React from 'react';
import { useState } from 'react';
import axios from 'axios'
import '../configure/apiKey.json'
import { View, StyleSheet, Platform, Text, Dimensions, Picker, TouchableHighlight } from 'react-native';
import { Button, TextInput, Title, Headline, Subheading, Searchbar, List, RadioButton, Chip } from 'react-native-paper';
import { useForm, Controller } from 'react-hook-form';
import Autocomplete from 'react-native-autocomplete-input';
import SafeAreaView from 'react-native-safe-area-view';

const styles = StyleSheet.create({
  label: {
    color: '#4DB6AC',
    margin: 20,
    marginLeft: 0
  },
  button: {
    marginTop: 40,
    height: 20,
    backgroundColor: '#1DE9B6',
    borderRadius: 4
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 3,
    padding: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    height: 'auto',
    minWidth: 320,
    ...Platform.select({
      ios: {
        width: "auto"
      },
      web: {
        width: ((Dimensions.get('window').width) < 500) ? ((Dimensions.get('window').width) - 50) : 600,
      },
      android: {
        width: "auto"
      },
    })
  },
  input: {
    backgroundColor: '#B2DFDB',
    borderWidth: 0,
    height: 40,
    padding: 5,
    width: "auto",
    borderRadius: 4,
    alignSelf: "stretch"
  },
  inputIngredient: {
    backgroundColor: '#B2DFDB',
    borderWidth: 0,
    height: 20,
    padding: 5,
    marginVertical: 5,
    marginHorizontal: 10,
    borderRadius: 4,
  },
});

var results = {};

function SearchForm({ props }) {

  const [autoComplete, setAutoComplete] = useState([])
  const [selectedCuisine, setSelectedCuisine] = useState('None');
  const [text, setText] = useState("");
  const [selectedDietary, setSelectedDietary] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [chips, setChips] = useState([]);
  const cuisine = ['None', 'African', 'British', 'Cajun', 'Caribbean', 'Chinese', 'Eastern European', 'European', 'French', 'German', 'Greek', 'Indian', 'Irish', 'Italian', 'Japanese', 'Jewish', 'Korean', 'Latin American', 'Mediterranean', 'Mexican', 'Middle Eastern', 'Nordic', 'Southern', 'Vietnamese', 'Thai', 'Spanish'];
  const dietary = ['None', 'Dairy', 'Egg', 'Gluten', 'Grain', 'Peanut', 'Seafood', 'Sesame', 'Shellfish', 'Soy', 'Sulfite', 'Tree Nut', 'Wheat'];
  const { control, handleSubmit, errors, setError } = useForm({ mode: 'onChange' });
  const _showModal = () => { setVisibleModal(true) };
  const _hideModal = () => { setVisibleModal(false) };


  const onSubmit = data => {

    results.includeIngredients = "";
    results.cuisine = "";
    results.query = "";
    results.intolerances = "";  
    
    var num = 0;

    for (var i in chips) {

      num++;
      if (i > 0 && chips[i].name.name != "") {

        results.includeIngredients += ',';

      }
      if (chips[i].name.name != '') {

        results.includeIngredients += chips[i].name.name;
      }
    }

    if (selectedCuisine != "None") {
      num++;
      results.cuisine = selectedCuisine;

    }

    if (data.query != undefined) {
      num++;
      results.query = data.query;

    }

    if(selectedDietary != "None") {
      num++;
      results.intolerances = selectedDietary;

    }
    
    const result = JSON.stringify(results);

    if (num > 0) {

      props.navigate("Results", { results: result });

    } else {

      setError("search", 'search', "Invalid User Details");

    }
  }
  const onChange = args => {
    return {
      value: args[0].nativeEvent.text,
    };
  };

  const setCuisine = (c) => {

    setSelectedCuisine(c);

  }



  const showChip = chips.map((c, i) => {

    return (

      <Chip onClose={() => removeChip(i)} key={i} style={{ margin: 5, alignSelf: 'baseline' }}>{c.name.name.toString()}</Chip>

    );

  });

  const updateIngredient = (name, i) => {

    let temp = [...ingredients];
    let item = { ...temp[i] };
    item.name = name;
    temp[i] = item;
    setIngredients(temp);
    updateChips(name);

  }

  const updateChips = (name, i) => {

    var good = true;
    for (var j in chips) {

      if (name == chips[j].name.name) {

        good = false;

      }

    }
    if (good) {
      i = chips.length;
      let temp = [...chips];
      let item = { ...temp[i] };
      item.name = name;
      temp[i] = item;

      setChips(temp);
    }

  }

  const showCuisinePicker = cuisine.map((c, i) => {

    var key = 'cuisine' + i.toString();

    return (

      <Picker.Item key={key} label={c} value={c} />

    );

  });

  const showDietPicker = dietary.map((c, i) => {

    var key = 'diet' + i.toString();

    return (

      <Picker.Item key={key} label={c} value={c} />

    );

  });

  const removeChip = (i) => {

    var temp = new Array;
    temp = chips;
    temp.splice(i, 1);
    setChips(temp);
    updateAutoComplete("")

  }

  const updateAutoComplete = (text) => {

    var arr;
    let apiKey = require('../configure/apiKey.json');
    axios.get("https://api.spoonacular.com/food/ingredients/autocomplete?apiKey=" + apiKey.key + "&query=" + text + "&number=5")
      .then(res => {

        setAutoComplete(res.data);

      })

    return arr;
  };




  return (

    <SafeAreaView style={styles.container}>

      <View style={{ marginBottom: 10, marginHorizontal: 15 }}>



        <View style={{ margin: 5, padding: 4, borderRadius: 10 }}>
          <Title style={{ color: '#4DB6AC', fontSize: 30, marginTop: 30, alignSelf: 'center' }}>Search</Title>
          <Controller
            as={<Searchbar returnKeyType="search" onSubmitEditing={handleSubmit(onSubmit)} placeholder="Searching For..." style={styles.input} />}
            name="query"
            control={control}
            onChange={onChange}
            defaultValue=""
          />
          <View style={{ alignSelf: 'center', marginBottom: 3 }}>
            {errors.search && <Subheading style={{ color: '#BF360C', fontSize: 15, fontWeight: '300' }}>Invalid Search.</Subheading>}
            <Button color='#FFFFFF' style={{ backgroundColor: '#388E3C', marginTop: 20 }} onPress={handleSubmit(onSubmit)}>
              Search

        </Button>
          </View>
          <View style={{ flex: 1, margin: 5, padding: 4, backgroundColor: '#37474F', borderRadius: 10 }}>
            <Title style={{ marginHorizontal: 15, marginTop: 15, color: '#EC407A', alignSelf: "center", fontSize: 20 }}>Filter By</Title>
            <Title style={{ marginHorizontal: 15, marginTop: 15, color: '#EEEEEE', alignSelf: "center", fontSize: 16 }}>Include Ingredients</Title>
            <View style={{ flexDirection: "row", flexWrap: 'wrap' }}>
              {showChip}
            </View>
            <Autocomplete
              style={{ borderRadius: 4, backgroundColor: '#FFFFFF', height: 40 }}
              placeholder=' Enter an ingredient name'
              value={text}
              data={autoComplete}

              onChangeText={(i) => { updateAutoComplete(i); setText(i) }}
              renderItem={({ item, i }) => (

                <TouchableHighlight style={{ backgroundColor: "#66BB6A", padding: 4 }} key={i} onPress={() => { updateIngredient(item); setText(""); updateAutoComplete("") }}><Text style={{ fontSize: 19, color: '#FFFFFF' }}>{item.name}</Text></TouchableHighlight>

              )}></Autocomplete>

            <Title style={{ marginHorizontal: 15, marginTop: 15, color: '#EEEEEE', alignSelf: "center", fontSize: 16 }}>Cuisine</Title>
            <Picker style={{ backgroundColor: "#4DB6AC", borderRadius: 5, borderColor: "#CCCCCC" }} selectedValue={selectedCuisine} onValueChange={(value) => { setCuisine(value) }}>

              {showCuisinePicker}

            </Picker>

            <Subheading style={{ marginHorizontal: 15, marginTop: 15, color: '#EEEEEE', alignSelf: "center", fontSize: 16 }}>Dietary Restrictions</Subheading>
            <Picker style={{ backgroundColor: "#FFD54F", borderRadius: 5, borderColor: "#CCCCCC" }} selectedValue={selectedDietary} onValueChange={(value) => { setSelectedDietary(value) }}>
              {showDietPicker}
            </Picker>

          </View>
        </View>

      </View>
    </SafeAreaView >
  );
}
export default SearchForm;
