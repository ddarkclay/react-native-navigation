import React from 'react';
import { View, StyleSheet } from 'react-native';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import {
    useTheme,
    Avatar,
    Title,
    Caption,
    Paragraph,
    Drawer,
    Text,
    TouchableRipple,
    Switch
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import { AuthContext } from '../components/Context'

const DrawerContent = (props) => {

    const paperTheme = useTheme()

    const { signOut, toggleTheme } = React.useContext(AuthContext)

    return (
        <View style={{ flex: 1 }}>
            <DrawerContentScrollView {...props}>
                <View style={styles.DrawerContent}>
                    <View style={styles.userInfoSection}>
                        <View style={{ flexDirection: 'row', marginTop: 15 }}>
                            <Avatar.Image
                                source={{
                                    uri: 'https://instagram.fpnq7-1.fna.fbcdn.net/v/t51.2885-19/s320x320/84538372_171986357437913_6460489274067255296_n.jpg?_nc_ht=instagram.fpnq7-1.fna.fbcdn.net&_nc_ohc=ui8bGf9ulbAAX-qUB51&oh=6c9e69d24ab9f44e1f3106bc950d6502&oe=5F1142A6'
                                }}
                                size={50}
                            />
                            <View style={{ marginLeft: 15 }}>
                                <Title style={styles.title}>Vaibhav Chaudhari</Title>
                                <Caption style={styles.caption}>@vaibhav</Caption>
                            </View>
                        </View>

                        <View style={styles.row}>
                            <View style={styles.section}>
                                <Paragraph style={[styles.paragraph, styles.caption]}>91</Paragraph>
                                <Caption style={styles.caption}>Following</Caption>
                            </View>
                            <View style={styles.section}>
                                <Paragraph style={[styles.paragraph, styles.caption]}>104</Paragraph>
                                <Caption style={styles.caption}>Follower</Caption>
                            </View>
                        </View>
                    </View>

                    <Drawer.Section style={styles.drawerSection}>
                        <DrawerItem
                            icon={({ color, size }) => (
                                <Icon name="home-outline" color={color} size={size} />
                            )}
                            label="Home"
                            onPress={() => { props.navigation.navigate('Home') }}
                        />
                        <DrawerItem
                            icon={({ color, size }) => (
                                <Icon name="account-outline" color={color} size={size} />
                            )}
                            label="Profile"
                            onPress={() => { props.navigation.navigate('Profile') }}
                        />
                        <DrawerItem
                            icon={({ color, size }) => (
                                <Icon name="bookmark-outline" color={color} size={size} />
                            )}
                            label="Bookmarks"
                            onPress={() => { props.navigation.navigate('BookmarksScreen') }}
                        />
                        <DrawerItem
                            icon={({ color, size }) => (
                                <Icon name="settings-outline" color={color} size={size} />
                            )}
                            label="Settings"
                            onPress={() => { props.navigation.navigate('SettingScreen') }}
                        />
                        <DrawerItem
                            icon={({ color, size }) => (
                                <Icon name="account-check-outline" color={color} size={size} />
                            )}
                            label="Support"
                            onPress={() => { props.navigation.navigate('SupportScreen') }}
                        />
                    </Drawer.Section>
                    <Drawer.Section title="Preferences">
                        <TouchableRipple onPress={() => { toggleTheme() }}>
                            <View style={styles.prefence}>
                                <Text>Dark Theme</Text>
                                <View pointerEvents="none">
                                    <Switch value={paperTheme.dark} />
                                </View>
                            </View>
                        </TouchableRipple>
                    </Drawer.Section>
                </View>
            </DrawerContentScrollView>
            <Drawer.Section style={styles.bottomDrawerSection}>
                <DrawerItem
                    icon={({ color, size }) => (
                        <Icon name="exit-to-app" color={color} size={size} />
                    )}
                    label="Sign Out"
                    onPress={() => { signOut() }}
                />
            </Drawer.Section>
        </View>
    )
}

const styles = StyleSheet.create({
    DrawerContent: {
        flex: 1,
    },
    userInfoSection: {
        paddingLeft: 20,
    },
    title: {
        fontSize: 16,
        marginTop: 3,
        fontWeight: 'bold',
    },
    caption: {
        fontSize: 14,
        lineHeight: 14,
    },
    row: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    section: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15,
    },
    paragraph: {
        fontWeight: 'bold',
        marginRight: 3,
    },
    drawerSection: {
        marginTop: 15,
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1
    },
    prefence: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 16,
    }
})

export default DrawerContent
