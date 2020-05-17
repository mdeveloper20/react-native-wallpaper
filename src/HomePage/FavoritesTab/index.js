import React, { Component } from 'react';
import { Text, Grid, Thumbnail, View, Icon } from 'native-base';
import { FlatList, StyleSheet, Animated, Easing, TouchableWithoutFeedback } from 'react-native';


const styles = StyleSheet.create({


    MainContainer: {
        justifyContent: 'center',
        flex: 1,
    },

    imageThumbnail: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: 600,
        borderRadius: 0
    },
    emptyList: {
        marginTop: 100,
        justifyContent: 'center',
        alignItems: 'center'
    }


});

class FavoritesTab extends Component {

    renderEmptyContainer = () => {
        return <View style={styles.emptyList} ><Text>The list is empty</Text></View>
    }
    renderRow = ({ item }) => {

        return <View style={{ flex: 1, flexDirection: 'column', margin: 1 }}>
            <Thumbnail style={styles.imageThumbnail} source={{ uri: item.url }} />


        </View >
    }

    render() {

        return (
            <View style={styles.MainContainer} >

                <FlatList
                    data={this.props.favorites}
                    renderItem={this.renderRow}
                    keyExtractor={(i) => i.id}
                    ListEmptyComponent={this.renderEmptyContainer()}

                />
            </View>
        );
    }
}

export default FavoritesTab;