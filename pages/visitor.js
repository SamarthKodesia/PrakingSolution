import React from 'react';
import { StyleSheet, Text, View, Image,Alert, ScrollView, KeyboardAvoidingView, TextInput, TouchableOpacity, FlatList, AsyncStorage } from 'react-native';
import {
    widthPercentageToDP,
    heightPercentageToDP,
} from 'react-native-responsive-screen';
//import { SearchBar } from 'react-native-elements';
export default class events extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            dataSource: '',
            isMenuVisible: false,
            buttonsDisabled: false,

        };
    }

    componentWillMount() {
        this.setState({
            isMenuVisible: false,
            buttonsDisabled: false,
        });
        var data = [
            {
                "event_name": "Audi A8",
                "event_date": "Black",
                "club": "AP13BY6533",
                "color_label": "#4285f4"

            },

        ];
        this.setState({
            dataSource: data,
        });
    }
    selectItem = data => {

        console.log("Selected Data: " + JSON.stringify(data.item.event_name));
        const { navigate } = this.props.navigation;
        navigate("event");
    };

    componentDidMount() {
        this.setState({
            isMenuVisible: false,
            buttonsDisabled: false,
        });
    }


    changePage = (page) => {
        this.setState({
            isMenuVisible: false,
            buttonsDisabled: false
        });
        if (page == 'home') {
            AsyncStorage.setItem("LOGIN_STATUS", "logout");
        }
        this.props.navigation.navigate(page)
    }

    sideMenu() {
        if (this.state.isMenuVisible) {
            return (
                <View style={styles.sideMenu}>
          <TouchableOpacity style={{ marginBottom: 10 }} onPress={() => this.changePage('SecondPage')}>
            <Text style={styles.nameMenu}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ marginBottom: 10 }} onPress={() => this.changePage('userProfile')} >
            <Text style={styles.nameMenu}>Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ marginBottom: 10 }} onPress={() => this.changePage('parkings')}>
            <Text style={styles.nameMenu}>Parkings</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ marginBottom: 10 }} onPress={() => this.setState({isMenuVisible: false, buttonsDisabled: false})}>
            <Text style={styles.nameMenu}>Visitor</Text>
          </TouchableOpacity>
          <Text style={{color:'white'}}>___________________________</Text>
          <TouchableOpacity onPress={() => this.changePage('register')}>
            <Text style={styles.nameMenu}>Register</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.changePage('alert')}>
            <Text style={styles.nameMenu}>Alert</Text>
          </TouchableOpacity>
          <Text style={{color:'white'}}>___________________________</Text>
          <TouchableOpacity style={{ marginBottom: 10 }} onPress={() => this.changePage('FirstPage')}>
            <Text style={styles.nameMenu}>Logout</Text>
          </TouchableOpacity>
                </View>
            );
        }
        else {
            return (null);
        }
    };
    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity style={styles.menu} onPress={() => this.setState({ isMenuVisible: !this.state.isMenuVisible, buttonsDisabled: !this.state.buttonsDisabled })}>
                    <Text style={styles.nameInit}>S</Text>
                </TouchableOpacity>
                {this.titleBar()}
                {this.myInfo()}
                {/* {this.eventsList()} */}
                {this.sideMenu()}
            </View >
        );
    };

    titleBar() {
        return (
            <View style={styles.flexHead}>
                <Text style={styles.name}>Hey Mr. Samarth,</Text>
            </View>
        );
    }


    myInfo() {
        return (
            <View style={styles.data}>
                <Text style={styles.headpass}>Visitor's Pass</Text>
                <TextInput
                    style={styles.input}
                    maxLength={20}
                    placeholderTextColor={"#ffae42"}
                    placeholder="Visitor's Name"
                    underlineColorAndroid='transparent'
                    onChangeText={TextInputReg => this.setState({ TextInputReg })}
                />
                <TextInput
                    style={styles.input}
                    maxLength={20}
                    placeholderTextColor={"#ffae42"}
                    placeholder="Car No."
                    underlineColorAndroid='transparent'
                    onChangeText={TextInputPass => this.setState({ TextInputPass })}
                />
                <TextInput
                    style={styles.input}
                    maxLength={20}
                    placeholderTextColor={"#ffae42"}
                    placeholder="Date (DDMMYY)"
                    underlineColorAndroid='transparent'
                    onChangeText={TextInputPass => this.setState({ TextInputPass })}
                />
                <TouchableOpacity style={styles.submit} onPress={() => Alert.alert("Success","Alloted Parking Lot: 419")}>
                    <Text style={styles.textSubmit}>Submit</Text>
                </TouchableOpacity>
            </View>
        );
    }
    eventsList() {
        return (
            <FlatList
                style={styles.GridContainer}
                data={this.state.dataSource}
                renderItem={item => this.renderItem(item)}
                extraData={this.state}
                numColumns={1}
                backgroundColor="#fff"
                //keyExtractor={"landing_centre_ID"}
                keyExtractor={(item) => item.landing_centre_ID}
            />
        );
    }
    renderItem = data => (
        <TouchableOpacity
            style={[styles.list]}
            onPress={() => this.selectItem(data)}
            disabled={this.state.buttonsDisabled}
        >
            {this.eventData(data)}
            <View style={[styles.clubFlex, { backgroundColor: data.item.color_label }]}>
                <Text style={styles.textClub}>
                    {data.item.club}
                </Text>
            </View>
        </TouchableOpacity>
    );

    eventData(data) {
        return (
            <View style={styles.event_data}>
                <View style={styles.club_logo}>
                    {<Image
                        style={styles.clubLogo}
                        source={require("../assets/images/audi.jpg")}
                    />}
                </View>
                <View>
                    <Text style={styles.textEventName}>
                        {data.item.event_name}
                    </Text>
                    <Text style={styles.textEventDate}>
                        {data.item.event_date}
                    </Text>
                </View>
            </View>
        );
    }

}


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        //alignItems: 'center',
    },
    clubLogo: {
        height: 70,
        width: 70,
        borderRadius: 35,
    },
    flexHead: {
        height: heightPercentageToDP("14%"),
        width: widthPercentageToDP("93%"),
        marginTop: heightPercentageToDP("10%"),
        backgroundColor: "#ffae42",
        padding: 40,
        alignSelf: 'center',
        borderRadius: 40,
        elevation: 3,
        zIndex: 2,
    },
    data: {
        marginTop: 40,
        marginLeft: 40,
    },
    data_text: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    input: {
        fontSize: 18,
        marginTop: 20,
        borderBottomColor: '#bdbfdb',
        borderBottomWidth: 2,
    },
    menu: {
        position: 'absolute',
        top: 15,
        right: 20,
        justifyContent: 'center',
        alignItems: 'center',
        width: 60,
        backgroundColor: "#ffae42",
        borderRadius: 30,
        height: 60,
        zIndex: 4,
        elevation: 4
    },
    nameInit: {
        color: "#fff",
        fontWeight: "500",
        fontSize: 20,
        width: widthPercentageToDP("32%"),
        textAlign: 'center',
    },
    name: {
        color: "#fff",
        width: widthPercentageToDP("80%"),
        fontSize: 30,
        fontWeight: '800',
    },
    regNum: {
        color: "#fff",
        width: widthPercentageToDP("80%"),
        fontSize: 20,
        fontWeight: '300',
    },
    GridContainer: {
        marginTop: 40,
        marginBottom: heightPercentageToDP("10%"),
        width: widthPercentageToDP("100%"),
        height: heightPercentageToDP("60%"),
        marginLeft: widthPercentageToDP("5%"),
        marginRight: widthPercentageToDP("5%"),
    },
    list: {
        justifyContent: "center",
        flex: 1,
        alignItems: "center",
        marginLeft: widthPercentageToDP("7%"),
        height: 160,
        marginBottom: 30,
        width: widthPercentageToDP("85%"),
        borderRadius: 30,
        backgroundColor: "#fff",
        elevation: 1,
        zIndex: 1,
    },
    event_data: {
        flex: 1,
        flexDirection: 'row',
        width: widthPercentageToDP("85%"),
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        marginBottom: 50,
        alignItems: 'center',
    },
    club_logo: {
        height: 70,
        width: 70,
        borderRadius: 35,
        backgroundColor: '#fff',
        marginRight: 20,
        marginLeft: 50,
    },
    clubFlex: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        width: widthPercentageToDP("85%"),
        bottom: 0,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
    },
    textEventName: {
        width: widthPercentageToDP("50%"),
        fontWeight: '500',
        fontSize: 28,
    },
    textEventDate: {
        width: widthPercentageToDP("50%"),
        fontWeight: '400',
        fontSize: 18,
    },
    textClub: {
        color: '#fff',
        fontWeight: '500',
        fontSize: 18,
        textAlign: 'center',
        width: widthPercentageToDP("70%"),
    },
    sideMenu: {
        position: 'absolute',
        height: heightPercentageToDP("100%"),
        width: widthPercentageToDP("70%"),
        right: 0,
        backgroundColor: "rgba(255,165,100, .90)",
        zIndex: 2,
        elevation: 3,
        justifyContent: 'center',
        alignItems: 'center',

    },
    nameMenu: {
        color: "#fff",
        fontWeight: "500",
        fontSize: 24,
        width: widthPercentageToDP("32%"),
        textAlign: 'center',
    },
    input: {
        fontSize: 18,
        marginTop: 40,
        width: widthPercentageToDP("62%"),
        borderBottomColor: '#ffff00',
        borderBottomWidth: 2,
        color: "#ffae42"
    },
    headpass: {
        fontSize: 24,
        color: "#ffae42",
        fontWeight:'bold',
    },
    submit: {
        marginTop: heightPercentageToDP("10%"),
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        width: widthPercentageToDP("32%"),
        backgroundColor: "#ffae42",
        borderRadius: heightPercentageToDP("3%"),
        height: heightPercentageToDP("6%"),
    },
    textSubmit: {
        color: "#fff",
        fontWeight: "500",
        fontSize: 20,
        width: widthPercentageToDP("32%"),
        textAlign: 'center',
    }
});
