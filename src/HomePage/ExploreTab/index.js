import React, { Component } from 'react';
import { View } from 'native-base';
import { FlatList, StyleSheet } from 'react-native';
import { accessKey } from '../../../config'
import ImageItem from './image';


const styles = StyleSheet.create({


    MainContainer: {
        justifyContent: 'center',
        flex: 1,
    },


});
class ExploreTab extends Component {

    state = {
        images: [],
        isLoading: true,
        isRefreshing: false,
        page: 1
    }

    componentDidMount() {
        console.log('dddd')
        this.loadData(1);
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.query !== this.props.query) {
            this.loadData(1);
        }
    }
    loadData = async (page) => {
        this.setState({
            isLoading: true
        });
        const query = this.props.query;
        this.props.setExploreLoader(true);


        const response = await fetch(`https://api.unsplash.com/search/photos?client_id=${accessKey}&page=${page}&query=${query ? query : 'wallpaper'}`);

        const data = await response.json();
        const newImages = data.results.map(i => ({
            id: i.id,
            url: i.urls.small,
            description: i.description,
            isFavorite: false
        }));

        this.setState(state => ({
            images: page === 1 ? newImages : [...state.images, ...newImages],
            page,
            isLoading: false,
            isRefreshing: false
        }));
        this.props.setExploreLoader(false);
    }

    onRefresh = () => {
        this.setState({
            images: [],
            isRefreshing: true
        }, () => this.loadData(1));
    }
    renderRow = ({ item }) => {


        return <ImageItem addToFavorites={this.props.addToFavorites} item={item} />
    }

    render() {

        return (
            <View style={styles.MainContainer} >

                <FlatList
                    data={this.state.images}
                    renderItem={this.renderRow}
                    numColumns={3}
                    keyExtractor={(i) => i.id}
                    onEndReachedThreshold={0.5}
                    onEndReached={() => !this.state.isLoading && this.loadData(this.state.page + 1)}
                    onRefresh={() => this.onRefresh()}
                    refreshing={this.state.isRefreshing}
                />
            </View>
        );
    }
}

export default ExploreTab;