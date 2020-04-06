import React from 'react';
import { StyleSheet, Text, View, Image, KeyboardAvoidingView, TextInput, TouchableOpacity, AsyncStorage } from 'react-native';
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from 'react-native-responsive-screen';

export default class forecast extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      TextInputReg:'',
      TextInputPass:'',
    };
  }

  async componentWillMount() {
    var isLoggedIn = "";
    try {
      isLoggedIn = await AsyncStorage.getItem("LOGIN_STATUS");
    } catch (error) {
      // Error retrieving data
      console.log(error);
    }
    if (isLoggedIn == "LoggedIn") {
      this.props.navigation.navigate('main');
    }
  }

  authenticate = () => {
    const { navigate } = this.props.navigation;
    var login = "LoggedIn";
    AsyncStorage.setItem("LOGIN_STATUS", login);
    navigate("main");
  }
  render() {
    return (
      <View  style={styles.container}>
        { <Image
          style={styles.headerLogo}
          source={require("../../assets/images/logo.png")}
        /> }
        {this.loginPage()}
      </View >
    );
  };

  loginPage() {
    return (
      <KeyboardAvoidingView style={styles.flexLogin}>
        <Text style={styles.headHey}>Hey.</Text>
        <Text style={styles.headText}>Login to your account to continue.</Text>
        <TextInput
          style={styles.input}
          maxLength={20}
          placeholderTextColor={"#ffae42"}
          placeholder="Registration No."
          underlineColorAndroid='transparent'
          onChangeText={TextInputReg => this.setState({TextInputReg})}
        />
        <TextInput
          style={styles.input}
          maxLength={20}
          placeholderTextColor={"#ffae42"}
          secureTextEntry={true}
          placeholder="Password"
          underlineColorAndroid='transparent'
          onChangeText={TextInputPass => this.setState({ TextInputPass })}
        />
      <TouchableOpacity style={styles.submit} onPress={() => this.authenticate()}>
        <Text style={styles.textSubmit}>Submit</Text>
      </TouchableOpacity>
      </KeyboardAvoidingView>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  headerLogo: {
    height: 106,
    width: 274,
    marginTop: heightPercentageToDP("10%"),
  },
  flexLogin: {
    flex: 1,
    height: heightPercentageToDP("60%"),
    width: widthPercentageToDP("88%"),
    marginTop: heightPercentageToDP("10%"),
    backgroundColor: "#fff",
    marginBottom: heightPercentageToDP("20%"),
    padding: 40,
    borderRadius: 40,
    elevation: 3
  },
  headHey: {
    fontWeight: '500',
    fontSize: 36,
    color: "#ffae42",
    marginBottom: 10,
  },
  headText: {
    fontWeight: '300',
    fontSize: 18,
    color: "#ffae42",
    width: widthPercentageToDP("80%"),
  },
  input: {
    fontSize: 18,
    marginTop: 40,
    borderBottomColor: '#bdbfdb',
    borderBottomWidth: 2,
    color:"#ffae42"
  },
  submit:{
    marginTop:heightPercentageToDP("5%"),
    justifyContent:'center',
    alignItems:'center',
    alignSelf:'center',
    width: widthPercentageToDP("32%"),
    backgroundColor:"#ffae42",
    borderRadius:heightPercentageToDP("3%"),
    height: heightPercentageToDP("6%"),
  },
  textSubmit:{
    color:"#fff",
    fontWeight:"500",
    fontSize:20,
    width: widthPercentageToDP("32%"),
    textAlign: 'center',
  }
});
