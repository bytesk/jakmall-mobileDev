import React, { Component } from 'react'
import { connect } from 'react-redux'

import { View, Text, StyleSheet, FlatList, SafeAreaView, ScrollView, RefreshControl, Image,
    TouchableOpacity, Alert, ActivityIndicator, Platform
} from 'react-native'
import {fetchListDataHome, fetchListDataHomeAddMore, arrMoveData } from '../action/listDataHome';


class HomeScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount() {
        this.fetchStart()
    }

    fetchStart() {
        this.props.fetchListDataHome()
    }

    rollUpButton = (fromIndex) => {
        this.props.arrMoveData(this.props.listDataHome, fromIndex, 0)
    }


    alertRow() {
        Alert.alert(
            'Hello World',
            'JakMall Message',
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel'
                },
                { text: 'Hello too!', onPress: () => console.log('OK Pressed') }
            ],
            { cancelable: false }
        );
    }

    _onRefresh = () => {
        this.fetchStart()
    }

    addMoreData() {
        this.props.fetchListDataHomeAddMore()
    }

    render() {

        return (
            <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={this.props.loading.condition}
                        onRefresh={this._onRefresh}
                    />
                }
                style={styles.container}>
                <View style={{alignItems:"center",
                    marginTop: 20,}}>
                    {
                        this.props.loading.condition ? null :
                            <Text style={styles.txtTop}>
                                Who's on Top?
                            </Text>
                    }

                </View>


                    {
                        this.props.loading.condition ? null :
                        this.props.listDataHome != undefined ?
                        this.props.listDataHome.map((res,index) => {
                            // console.log("res listdatahome " + JSON.stringify(res))
                            return (
                                <View
                                    key={index}
                                    style={styles.chartListDataHome}>
                                    <TouchableOpacity
                                        style={{flex: 1, flexDirection:"row"}}
                                        onPress={() => this.alertRow()}
                                    >
                                        <Text style={{marginLeft: 20}}>
                                            {res.id}
                                        </Text>

                                        <View style={styles.jokeView}>
                                            <Text>
                                                {res.joke.substring(0, 25)}
                                            </Text>
                                        </View>


                                        <TouchableOpacity
                                            onPress={() => this.rollUpButton(index)}
                                        >
                                            {
                                                index == 0 ?
                                                    <Text style={{
                                                        marginRight: 20,
                                                        color: index == 0 ? "green" : "black"
                                                    }}>
                                                        We're on top
                                                    </Text> :

                                                    <View style={{
                                                        marginRight: 20,
                                                    }}>
                                                        <Image
                                                            style={styles.imageArrowUp}
                                                            source={require("../assets/images/arrowUp.png")}
                                                        />
                                                    </View>

                                            }

                                        </TouchableOpacity>
                                    </TouchableOpacity>
                                </View>
                            )
                        }) : null
                    }

                {
                    this.props.loading.condition ? null :
                    this.props.listDataHome != undefined ?
                        this.props.listDataHome.length < 5 ?
                            <View style={{alignItems: "center"}}>
                                <TouchableOpacity
                                    onPress={() => this.addMoreData()}
                                >
                                    <Text style={{color: "blue"}}>+ Add More Data</Text>
                                </TouchableOpacity>
                            </View> : null : null
                }


            </ScrollView>
        )
    }
}

const mapStateToProps = state => {
    return {
        listDataHome: state.listDataHome.dataList,
        loading: state.loading,
    }
}

const mapDispatchToProps = dispatch => ({
    fetchListDataHome: () => dispatch(fetchListDataHome()),
    fetchListDataHomeAddMore: () => dispatch(fetchListDataHomeAddMore()),
    arrMoveData: (arr, fromIndex, toIndex) => dispatch(arrMoveData(arr, fromIndex, toIndex)),
})


const styles = StyleSheet.create({
    container: {
        marginTop: Platform.OS === "ios" ? 35 : 0,
        flex: 1,
        backgroundColor:"#f4f4f4",
    },
    txtTop: {
        marginBottom: 30,
        fontWeight: "bold",
        fontSize: 30,
    },
    chartListDataHome: {
        borderRadius: 30,
        marginBottom: 20,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#ffffff",
        width: "90%",
        marginHorizontal: 20,
        height: 70,
    },
    jokeView: {
        alignItems: "center",
        justifyContent:"center",
        flexDirection:'row',
        flex: 1,
        flexWrap: 'wrap'
    },
    imageArrowUp: {
        width: 30, height: 35, resizeMode: "stretch"
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)
