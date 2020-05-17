import React, { Component } from 'react';
import { Container, Header, Content, List, ListItem, Thumbnail, Text, Left, Body, Right, Button, View } from 'native-base';
import { FlatList, StyleSheet, Animated, Easing, TouchableWithoutFeedback } from 'react-native';
import { accessKey } from '../../../config'


const styles = StyleSheet.create({


    MainContainer: {
        justifyContent: 'center',
        flex: 1,
    },

    imageThumbnail: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: 200,
        borderRadius: 0
    },

    imageOverlay: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.1)'
    },

    imageOverlayText: {
        color: 'white',
        textAlign: 'center',
        padding: 4,
        width: '100%',
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 10,
        borderRadius: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.75)',

    }
});

class CommunityTab extends Component {


    constructor(props) {
        super(props);

        this.state = {
            users: [],
            isLoading: true,
            page: 1

        }


    }

    async componentDidMount() {

        await this.loadData(1);


    }

    loadData = async (page) => {
        this.setState({
            isLoading: true
        });

        const response = await fetch(`https://api.unsplash.com/search/users?client_id=${accessKey}&page=${page}&query=community`);

        const data = await response.json();

        this.setState(state => ({
            users: [...state.users, ...data.results.map(i => ({
                id: i.id,
                name: i.first_name,
                avatar: i.profile_image?.medium,
                bio: i.bio
            }))],
            page,
            isLoading: false
        }));
    }

    renderRow = ({ item }) => {

        return <ListItem thumbnail>
            <Left>
                <Thumbnail square source={{ uri: item.avatar }} />
            </Left>
            <Body>
                <Text>{item.name}</Text>
                <Text note numberOfLines={1}>{item.bio}</Text>
            </Body>
            <Right>
                <Button transparent>
                    <Text>View</Text>
                </Button>
            </Right>
        </ListItem>
    }

    render() {

        return (
            <View style={styles.MainContainer} >

                <FlatList
                    data={this.state.users}
                    renderItem={this.renderRow}
                    keyExtractor={(i) => i.id}
                    onEndReachedThreshold={0.5}
                    onEndReached={() => !this.state.isLoading && this.loadData(this.state.page + 1)}

                />
            </View>
        );
    }
}

export default CommunityTab;