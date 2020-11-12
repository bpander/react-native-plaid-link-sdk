import React from 'react';
import {
    Text,
    View,
    StyleSheet,
} from 'react-native';
import { PlaidLink, usePlaidEmitter } from 'react-native-plaid-link-sdk/PlaidLink';
import { useNavigation } from '@react-navigation/native';
import { LinkEvent, LinkExit, LinkSuccess } from "react-native-plaid-link-sdk/types/Types";

const AppButton = (props: any) => {
    return <View style={styles.appButtonContainer}>
        <Text style={styles.appButtonText}>{props.title}</Text>
    </View>
};

const PlaidComponent = (props: any) => {
    const navigation = useNavigation();
    usePlaidEmitter((event: LinkEvent) => {
        console.log(event);
    });
    return (
        <PlaidLink
            tokenConfig={{
                token: props.token,
            }}
            onSuccess={(success: LinkSuccess) => {
                navigation.navigate('Success', { onsuccess: success })
                console.log(success)
            }}
            onExit={(exit: LinkExit) => {
                navigation.navigate('Exit', { onerror: exit })
                console.log(exit)
            }}
        >
            <AppButton title="Open Link" />
        </PlaidLink>
    );
};

const styles = StyleSheet.create({
    // ...
    appButtonContainer: {
        elevation: 4,
        backgroundColor: '#000',
        width: '100%',
        paddingVertical: 16,
        paddingHorizontal: 16,
    },
    appButtonText: {
        fontSize: 18,
        color: '#fff',
        fontWeight: 'bold',
        alignSelf: 'center',
        textTransform: 'uppercase',
    },
});

export default PlaidComponent;
