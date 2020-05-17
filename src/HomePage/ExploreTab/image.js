import React, { Component } from 'react';
import { Text, Thumbnail, View, Icon } from 'native-base';
import { StyleSheet, TouchableWithoutFeedback } from 'react-native';

const styles = StyleSheet.create({

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

class ImageItem extends Component {
    state = {
        isFavorite: false
    }

    render() {
        const { item } = this.props;
        return (<TouchableWithoutFeedback onPress={() => {
            this.props.addToFavorites(item);
            this.setState({
                isFavorite: !this.state.isFavorite
            })

        }}
        >
            <View style={{ flex: 1, flexDirection: 'column', margin: 1 }}>
                <Thumbnail style={styles.imageThumbnail} source={{ uri: item.url }} />
                <View style={styles.imageOverlay}>
                    {

                        this.state.isFavorite && <Icon name='heart' style={{ fontSize: 50, color: 'red' }} />
                    }

                    {item.description && <Text numberOfLines={1} style={styles.imageOverlayText}>{item.description}</Text>}
                </View>
            </View>
        </TouchableWithoutFeedback >);
    }
}

export default ImageItem;