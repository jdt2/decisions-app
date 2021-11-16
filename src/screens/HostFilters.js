import React from 'react';
import { StyleSheet, View, ScrollView, Image, LayoutAnimation } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { Button, TextInput, Text, Subheading, Headline, IconButton, List, Switch, RadioButton, Checkbox } from 'react-native-paper';
import ContainedButton from '../components/ContainedButton';
import Header from '../components/Header';
import MultiSlider from '@ptomasroos/react-native-multi-slider';

export default function HostFilters({ navigation, route }) {

    const [expanded, setExpanded] = React.useState([false, false, false, false, false, false, false]);
    const [ageRestrict, setAgeRestrict] = React.useState(new Set());
    const [dateRange, setDateRange] = React.useState([1950, new Date().getFullYear()]);
    const [ratingRange, setRatingRange] = React.useState([1, 10]);

    const startRoom = () => {
        navigation.navigate("Room", { ...route.params, filter: { ageRestrict: Array.from(ageRestrict), dateRange, ratingRange }, host: true });
    }

    const toggleExpand = (i) => {
        LayoutAnimation.configureNext(LayoutAnimation.create(300, 'easeInEaseOut', 'opacity'));
        let newExpanded = [...expanded];
        newExpanded[i] = !newExpanded[i];
        setExpanded(newExpanded);
    }

    const toggleAgeRestrict = (rating) => {
        let newAgeRestrict = new Set(ageRestrict);
        if (newAgeRestrict.has(rating)) {
            newAgeRestrict.delete(rating);
        } else {
            newAgeRestrict.add(rating);
        }
        setAgeRestrict(newAgeRestrict);
    }

    return (
        <ScrollView style={{ flex: 1, backgroundColor: '#fff' }} contentContainerStyle={{ flexGrow: 1 }} alwaysBounceVertical={false} keyboardShouldPersistTaps="never">
            <View style={styles.container}>
                <View style={styles.filter}>
                    <View style={styles.option}>
                        <Header style={styles.optionContent} fontSize={24}>Age Restriction</Header>
                        <Switch onValueChange={() => toggleExpand(0)} value={expanded[0]} />
                    </View>
                    {expanded[0] && <View style={styles.expanded}>
                        <Checkbox.Item label="G - For all audiences" onPress={() => toggleAgeRestrict("G")} status={ageRestrict.has("G") ? "checked" : "unchecked"} mode="android" position="leading" labelStyle={[styles.checkboxLabel, ageRestrict.has("G") && styles.checkedLabel]} />
                        <Checkbox.Item label="PG - Parental Guidance Suggested" onPress={() => toggleAgeRestrict("PG")} status={ageRestrict.has("PG") ? "checked" : "unchecked"} mode="android" position="leading" labelStyle={[styles.checkboxLabel, ageRestrict.has("PG") && styles.checkedLabel]} />
                        <Checkbox.Item label="PG-13 - Parental Guidance Suggested for children under 13" onPress={() => toggleAgeRestrict("PG-13")} status={ageRestrict.has("PG-13") ? "checked" : "unchecked"} mode="android" position="leading" labelStyle={[styles.checkboxLabel, ageRestrict.has("PG-13") && styles.checkedLabel]} />
                        <Checkbox.Item label="R - Under 17 not admitted without parent or guardian" onPress={() => toggleAgeRestrict("R")} status={ageRestrict.has("R") ? "checked" : "unchecked"} mode="android" position="leading" labelStyle={[styles.checkboxLabel, ageRestrict.has("R") && styles.checkedLabel]} />
                        <Checkbox.Item label="NC-17 - Under 17 not admitted" onPress={() => toggleAgeRestrict("NC-17")} status={ageRestrict.has("NC-17") ? "checked" : "unchecked"} mode="android" position="leading" labelStyle={[styles.checkboxLabel, ageRestrict.has("NC-17") && styles.checkedLabel]} />
                    </View>}
                </View>
                <View style={styles.filter}>
                    <View style={styles.option}>
                        <Header style={styles.optionContent} fontSize={24}>Date</Header>
                        <Switch onValueChange={() => toggleExpand(1)} value={expanded[1]} />
                    </View>
                    {expanded[1] && <View style={[styles.expanded, { paddingHorizontal: 24, }]}>
                        <Text style={styles.sliderLabel}>{dateRange[0]}-{dateRange[1]}</Text>
                        <MultiSlider
                            values={dateRange}
                            onValuesChange={values => setDateRange(values)}
                            min={1950}
                            max={new Date().getFullYear()}
                            selectedStyle={{
                                backgroundColor: '#263238',
                            }}
                        />
                    </View>}
                </View>
                <View style={styles.filter}>
                    <View style={styles.option}>
                        <Header style={styles.optionContent} fontSize={24}>Rating</Header>
                        <Switch onValueChange={() => toggleExpand(2)} value={expanded[2]} />
                    </View>
                    {expanded[2] && <View style={[styles.expanded, { paddingHorizontal: 24, }]}>
                        <Text style={styles.sliderLabel}>★ {ratingRange[0]}-{ratingRange[1]}</Text>
                        <MultiSlider
                            values={ratingRange}
                            onValuesChange={values => setRatingRange(values)}
                            min={1}
                            max={10}
                            selectedStyle={{
                                backgroundColor: '#263238',
                            }}
                        />
                    </View>}
                </View>
                <View style={styles.filter}>
                    <View style={styles.option}>
                        <Header style={styles.optionContent} fontSize={24}>Director</Header>
                        <Switch />
                    </View>
                </View>
                <View style={styles.filter}>
                    <View style={styles.option}>
                        <Header style={styles.optionContent} fontSize={24}>Actor</Header>
                        <Switch />
                    </View>
                </View>
                <View style={styles.filter}>
                    <View style={styles.option}>
                        <Header style={styles.optionContent} fontSize={24}>Awards</Header>
                        <Switch />
                    </View>
                </View>
                <View style={styles.filter}>
                    <View style={styles.option}>
                        <Header style={styles.optionContent} fontSize={24}>Keywords</Header>
                        <Switch />
                    </View>
                </View>
                <ContainedButton style={styles.nextButton} onPress={startRoom}>Next</ContainedButton>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        paddingTop: 11,
        paddingBottom: 36,
        paddingHorizontal: 24,
    },
    nextButton: {
        flexGrow: 1,
        marginTop: 44,
    },
    option: {
        backgroundColor: "#263238",
        flexGrow: 1,
        borderRadius: 12,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 24,
    },
    optionContent: {
        flexGrow: 1,
        color: '#fff',
    },
    filter: {
        marginTop: 24,
        backgroundColor: 'rgba(38, 50, 56, 0.75);',
        borderRadius: 12,
    },
    expanded: {
        padding: 16,
    },
    checkboxLabel: {
        textAlign: 'left',
        color: 'white',
        marginLeft: 16,
        fontSize: 16,
        lineHeight: 24,
    },
    checkedLabel: {
        color: 'rgba(196, 196, 196, 1);'
    },
    sliderLabel: {
        color: 'white',
        fontSize: 16,
        lineHeight: 20,
        fontFamily: 'Inter_600SemiBold',
        marginBottom: 20,
    },
});
