import React from 'react';
import { IChartConfiguration, ChartValueType, IChartDot, ChartPeriodType, ChartDotsData } from '../../../model/IChart';
import { StyleSheet, View, Text } from 'react-native';
import { ChartBox } from '../chart-svg/ChartBox';
import { ChartNet } from '../chart-svg/ChartNet';
import { ChartHighlightNet } from '../chart-svg/ChartHighlightNet';
import { ChartPolyline } from '../chart-svg/ChartPolyline';
import { InsulinTextRotated } from '../../../component/icon/InsulinTextRotated';
import { BreadUnitsTextRotated } from '../../../component/icon/BreadUnitsTextRotated';
import { GlucoseTextRotated } from '../../../component/icon/GlucoseTextRotated';
import { INoteList, INoteListByDay } from '../../../model/INoteList';
import { ChartDot } from '../chart-svg/ChartDot';
import { ThemeColor } from '../../../constant/ThemeColor';
import { calculateChartDots } from '../../../calculation-services/chart-calculation-services/ChartCalculationService';
import { initialPadding, isBreadUnitsType } from '../../../calculation-services/chart-calculation-services/ChartCalculationHelper';

export interface ChartWrapProps {
    config: IChartConfiguration
    type: ChartValueType
    selectedPeriod: ChartPeriodType
    selectedDotId?: number
    currentDate?: Date
    noteList?: INoteList
    noteListByDay?: INoteListByDay
    onDotPress?: (id: number) => void
}

export function ChartWrap(props: ChartWrapProps) {
    const {
        type,
        selectedPeriod,
        currentDate,
        noteList,
        selectedDotId,
        config
    } = props;
    const basicDotsData: ChartDotsData = React.useMemo(
        () => calculateChartDots(Object.assign({...props}, {type: ChartValueType.GLUCOSE})),
        [currentDate, noteList, selectedPeriod]
    )
    let polylineDotsData: ChartDotsData = React.useMemo(
        () => polylineCalculator(),
        [currentDate, noteList, selectedPeriod]
    )
    const highlights: IChartDot[] = [...basicDotsData.events, ...basicDotsData.dots]
    function polylineCalculator() {
        let polylineDotsData: ChartDotsData = {};
        switch (selectedPeriod) {
            case ChartPeriodType.DAY:
                switch (type) {
                    case ChartValueType.GLUCOSE:
                        polylineDotsData = basicDotsData;
                        break;
                    case ChartValueType.INSULIN:
                    case ChartValueType.BREAD_UNITS:
                        polylineDotsData = calculateChartDots(props)
                        break;
                }
            case ChartPeriodType.MONTH:
                switch (type) {
                    case ChartValueType.GLUCOSE:
                    case ChartValueType.INSULIN:
                    case ChartValueType.BREAD_UNITS:
                }
            case ChartPeriodType.THREE_MONTH:
                switch (type) {
                    case ChartValueType.GLUCOSE:
                    case ChartValueType.INSULIN:
                    case ChartValueType.BREAD_UNITS:
                }
        }
        return polylineDotsData;
    }

    return (
        <View style={styles.chartWrap}>
            <ChartBox
                config={config}
                axisTypes={config.axisTypes}
            >
                <ChartNet
                    maxValue={polylineDotsData.maxValue}
                    minValue={polylineDotsData.minValue}
                    cfg={config}
                    type={props.type}
                    periodType={selectedPeriod}
                    paddingTop={config.paddingTop}
                    paddingBottom={config.paddingBottom}
                    renderCritical={type === ChartValueType.GLUCOSE}
                />
                <ChartHighlightNet
                    dots={highlights}
                    cfg={config}
                    type={selectedPeriod}
                    paddingTop={config.paddingTop}
                    paddingBottom={config.paddingBottom}
                    selectedDotId={props.selectedDotId}
                />
                <ChartPolyline
                    polylineType={config.polylineType}
                    dots={polylineDotsData.dots}
                    initGradientColor={config.initGradientColor}
                    stopGradientColor={config.stopGradientColor}
                />
                {clickableDotsAvailable() && basicDotsData.dots.map(item => {
                    return <ChartDot
                        key={item.id}
                        id={item.id}
                        r={config.dotRadius}
                        onPress={props.onDotPress}
                        x={item.x}
                        y={item.y}
                        fill={ThemeColor.BRIGHT_RED}
                        stroke={ThemeColor.WHITE}
                        selectedDotId={selectedDotId}
                    />
                })}
                {clickableDotsAvailable() && basicDotsData.events.map(item => {
                    return <ChartDot
                        key={item.id}
                        id={item.id}
                        r={config.dotRadius}
                        onPress={props.onDotPress}
                        x={item.x}
                        y={item.y}
                        fill={ThemeColor.WHITE}
                        stroke={ThemeColor.INDIAN_RED}
                        selectedDotId={selectedDotId}
                    />
                })}
            </ChartBox>
            {netYTitles(polylineDotsData.maxValue, polylineDotsData.minValue)}
            {yAxisTitle(type)}
        </View>
    )

    function netYTitles(max: number, min: number) {
        let range = type === ChartValueType.GLUCOSE ? max - min : max;
        let start = type === ChartValueType.GLUCOSE ? min : 0;
        let step = range / config.horizontalLineNumber;
        let toRender = [];
        for (let i = 0; i <= config.horizontalLineNumber; i++) {
            toRender.push(start + i * step);
        }
        return <View style={{
            ...styles.yNetTitlesView,
            height: config.boxHeight,
            paddingTop: config.reversedY ? 0 : initialPadding(props),
            paddingBottom: config.reversedY ? initialPadding(props) : 0,

            // top: config.reversedY ? -9 : 9,
            flexDirection: config.reversedY ? 'column' : 'column-reverse'
        }}>
            {toRender.map((step, index) => <Text
                key={index}
                style={styles.yNetTitlesText}
            >
                {
                    // index !== 0 && 
                    Math.round(step * 10) / 10 || ''
                }
            </Text>)}
        </View>
    }

    function clickableDotsAvailable(): boolean {
        return type === ChartValueType.GLUCOSE
    }
}

function yAxisTitle(type: ChartValueType) {
    switch (type) {
        case ChartValueType.BREAD_UNITS:
            return <BreadUnitsTextRotated style={styles.yAxisTitleIcon} />
        case ChartValueType.GLUCOSE:
            return <GlucoseTextRotated style={styles.yAxisTitleIcon} />
        case ChartValueType.INSULIN:
            return <InsulinTextRotated style={styles.yAxisTitleIcon} />
    }
}

const styles = StyleSheet.create({
    chartWrap: {
        position: 'relative',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    yAxisTitleIcon: {
        position: 'absolute',
        right: -10,
        display: 'flex',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    yNetTitlesView: {
        position: 'absolute',
        width: 20,
        left: -20,
        display: 'flex',
        flexDirection: 'column-reverse',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
    },
    yNetTitlesText: {
        paddingRight: 3,
        fontSize: 12,
        textAlign: 'center',
        color: '#CCCCCC',
    },
})
