import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { Container, Content, ListItem, Text, Icon, Left, Body } from 'native-base';

const styles = StyleSheet.create({
    box: {
        height: 200,
        alignItems: 'flex-end',
        backgroundColor: '#202991',
        padding: 20,
        marginBottom: 30
    },
    appName: {
        color: 'white',
        fontSize: 25
    },
    text: {
        color: 'black'
    },

});


export default class SideBar extends Component {
    render() {
        return <Container>
            <Grid >
                <Row style={styles.box} >
                    <Text style={styles.appName}>My Wallpaper App</Text>
                </Row>
                <Row>
                    <Content>
                        <ListItem icon>
                            <Left>
                                <Icon active name="ios-arrow-dropright" />

                            </Left>
                            <Body>
                                <Text style={styles.text}>Home Page</Text>
                            </Body>
                        </ListItem>
                        <ListItem icon>
                            <Left>
                                <Icon active name="ios-arrow-dropright" />

                            </Left>
                            <Body>
                                <Text style={styles.text}>Contact Us</Text>
                            </Body>
                        </ListItem>
                        <ListItem icon>
                            <Left>
                                <Icon active name="ios-arrow-dropright" />

                            </Left>
                            <Body>
                                <Text style={styles.text}>More Apps</Text>
                            </Body>
                        </ListItem>
                    </Content>
                </Row>






            </Grid>
        </Container>

    }
}