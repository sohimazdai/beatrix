import React from 'react'
import { connect } from 'react-redux';
import { AppState } from '../../model/AppState';
import { Dispatch, Action } from 'redux';
import { StyleSheet, View, Text, Alert, Dimensions } from 'react-native';
import { INoteList } from '../../model/INoteList';
import { LinearGradient } from 'expo-linear-gradient';
import { ChartBox } from '../../view/chart/ChartBox';
import { ChartDot } from '../../view/chart/ChartDot';
import { ThemeColor } from '../../constant/ThemeColor';
import { shadowOptions } from '../../constant/shadowOptions';

export interface NoteChartProps {
    noteList: INoteList
}

const chartConfig = {
    width: Dimensions.get("screen").width,
    height: Dimensions.get("screen").width,
    boxWidth: 1000,
    boxHeight: 1000,
}

class NoteChart extends React.PureComponent<NoteChartProps> {
    render() {
        return (
            <View style={styles.view}>
                <View style={styles.statusBar} />
                <LinearGradient
                    colors={['#FFF2CF', '#4249FF']}
                    style={styles.viewGradient}
                />
                <View
                    style={styles.chartWithSettingsView}
                >
                    <LinearGradient
                        colors={['#163B50', '#3E2626']}
                        style={styles.chartGradient}
                    >
                        <View style={styles.chartView}>
                            <Text>
                                Chart is here
                        </Text>
                            <ChartBox
                                {...chartConfig}
                            >
                                <ChartDot
                                    onPress={() => Alert.alert('Clicked! Huray!1')}
                                    r={10}
                                    x={20}
                                    y={55}
                                />
                            </ChartBox>
                        </View>
                    </LinearGradient>
                    <View style={styles.settingsView}>
                        <Text>
                            Settings are here
                        </Text>
                    </View>
                </View>
                <View style={styles.statisticsView}>
                    <Text>
                        Statisctics are here
                    </Text>
                </View>
            </View>
        )
    }
}

export const NoteChartConnect = connect(
    (state: AppState) => ({
        noteList: state.noteList
    }),
    (dispatch: Dispatch<Action>) => ({ dispatch })
)(NoteChart)

const styles = StyleSheet.create({
    view: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    statusBar: {
        height: 24,
        width: '100%',
        backgroundColor: ThemeColor.WHITE,
    },
    viewGradient: {
        position: 'absolute',

        left: 0,
        top: 0,

        height: '100%',
        width: '100%',
    },
    chartWithSettingsView: {
        width: '100%',

        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: ThemeColor.LIGHT_BLUE,
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25,
    },
    chartView: {
        width: '100%',

        justifyContent: 'center',
        alignItems: 'center',
        elevation: 4,
        ...shadowOptions,
    },
    chartGradient: {
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25,
    },
    settingsView: {
        padding: 20,

        elevation: 4,
        ...shadowOptions,
    },
    statisticsView: {
    }
})
