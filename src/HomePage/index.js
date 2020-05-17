import { ActivityIndicator } from "react-native";
import React, { Component } from 'react';
import { Container, Header, Tab, Tabs, TabHeading, Left, Body, Right, Text, Title, Button, Icon, Input, Item } from 'native-base';
import CommunityTab from './CommunityTab'
import ExploreTab from './ExploreTab'
import FavoritesTab from './FavoritesTab'
class HomePage extends Component {


    state = {
        favorites: [],
        isExploreLoading: false,
        searchBar: false,
        query: ''
    }

    addToFavorites = (item, cb) => {
        const favorites = Object.assign([], this.state.favorites);
        const index = favorites.findIndex(f => f.id === item.id);

        if (index === -1) {
            favorites.push(item);

        } else {
            favorites.splice(index, 1);

        }
        this.setState({
            favorites
        });

    }


    setExploreLoader = (isExploreLoading) => {
        this.setState({
            isExploreLoading
        })
    }

    onSearchClick = () => {
        this.setState(state => ({ searchBar: !state.searchBar, query: '' }))
    }

    onQueryChange = (query) => {
        this.setState({ query })
    }
    render() {

        return (
            <Container>
                <Header hasTabs searchBar={this.state.searchBar} >
                    {this.state.searchBar ?
                        <>
                            <Item>
                                <Icon name="ios-search" />
                                <Input placeholder="Search" onChangeText={this.onQueryChange} />
                                <Button transparent onPress={() => this.onSearchClick()}>
                                    <Icon name="close" />
                                </Button>
                            </Item>
                            <Button transparent>
                                <Text>Search</Text>
                            </Button>

                        </> :
                        <>
                            <Left>
                                <Button transparent onPress={() => this.props.openDrawer()}>
                                    <Icon name='menu' />
                                </Button>
                            </Left>
                            <Body>
                                <Title>My Wallpaper App</Title>

                            </Body>
                            <Right>

                                <Button transparent onPress={() => this.onSearchClick()}>

                                    <Icon name='search' />
                                </Button>
                            </Right>
                        </>
                    }

                </Header>
                <Tabs >

                    <Tab heading={<TabHeading><Text>Community</Text></TabHeading>}>
                        <CommunityTab query={this.state.query} />
                    </Tab>
                    <Tab heading={<TabHeading>
                        <Text>Explore</Text>
                        {this.state.isExploreLoading && <ActivityIndicator size='small' />}

                    </TabHeading>}>
                        <ExploreTab query={this.state.query} setExploreLoader={this.setExploreLoader} addToFavorites={this.addToFavorites} />
                    </Tab>
                    <Tab heading={<TabHeading><Text>Favorites</Text></TabHeading>}>
                        <FavoritesTab favorites={this.state.favorites} />
                    </Tab>
                </Tabs>
            </Container >
        );
    }
}

export default HomePage;