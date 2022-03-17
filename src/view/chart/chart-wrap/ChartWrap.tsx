import React from 'react';
import { IChartConfiguration, ChartValueType, IChartDot, ChartPeriodType, ChartDotsData } from '../../../model/IChart';
import { StyleSheet, View, Text } from 'react-native';
import { ChartBox } from '../chart-svg/ChartBox';
import { ChartNet } from '../chart-svg/ChartNet';
import { ChartHighlightNet } from '../chart-svg/ChartHighlightNet';
import { ChartPolyline, PolylineType } from '../chart-svg/ChartPolyline';
import { InsulinTextRotated } from '../../../component/icon/InsulinTextRotated';
import { BreadUnitsTextRotated } from '../../../component/icon/BreadUnitsTextRotated';
import { GlucoseTextRotated } from '../../../component/icon/GlucoseTextRotated';
import { INoteList, INoteListByDay } from '../../../model/INoteList';
import { ChartDot } from '../chart-dot/ChartDot';
import { COLOR } from '../../../constant/Color';
import { calculateDayChartDots, calculateMonthChartDots, calculateThreeMonthChartDots } from '../../../calculation-services/chart-calculation-services/ChartCalculationService';
import { initialPadding } from '../../../calculation-services/chart-calculation-services/ChartCalculationHelper';
import { ChartAxisPair } from '../chart-svg/ChartAxisPair';
import { connect } from 'react-redux';
import { IStorage } from '../../../model/IStorage';
import { ShortInsulinType } from '../../../model/IUserDiabetesProperties';

export interface ChartWrapProps {
    isAlone?: boolean
    config: IChartConfiguration
    type: ChartValueType
    selectedPeriod: ChartPeriodType
    selectedDotId: number
    currentDate?: Date
    noteList?: INoteList
    noteListByDay?: INoteListByDay
    minCritical: number
    maxCritical: number
    shortInsulinType: ShortInsulinType
    onDotPress?: (id: string) => void
}

export function Comp(props: ChartWrapProps) {
    const {
        type,
        selectedPeriod,
        currentDate,
        noteList,
        config,
    } = props;

    let basicDotsData: ChartDotsData = React.useMemo(
        () => basicDotsCalculator(),
        [currentDate, noteList, selectedPeriod]
    );
    let polylineDotsData: ChartDotsData = React.useMemo(
        () => polylineCalculator(),
        [currentDate, noteList, selectedPeriod]
    )

    function basicDotsCalculator() {
        switch (selectedPeriod) {
            case ChartPeriodType.DAY:
                return calculateDayChartDots(Object.assign({ ...props }, { type: ChartValueType.GLUCOSE }))
            case ChartPeriodType.MONTH:
                return calculateMonthChartDots(props)
            case ChartPeriodType.THREE_MONTH:
                return calculateThreeMonthChartDots(props)
        }
    }

    function polylineCalculator() {
        switch (selectedPeriod) {
            case ChartPeriodType.DAY:
                switch (type) {
                    case ChartValueType.GLUCOSE:
                        return basicDotsData;
                    case ChartValueType.INSULIN:
                        return calculateDayChartDots(props);
                    case ChartValueType.BREAD_UNITS:
                        return calculateDayChartDots(props);
                }
            case ChartPeriodType.MONTH:
                return basicDotsData;
            case ChartPeriodType.THREE_MONTH:
                return basicDotsData;
        }
    }

    const highlights: IChartDot[] = [
        ...basicDotsData.events,
        ...basicDotsData.dots
    ];

    return (
        <View style={styles.chartWrap}>
            <ChartBox config={config}>
                <ChartNet
                    maxValue={polylineDotsData.maxValue}
                    minValue={polylineDotsData.minValue}
                    cfg={config}
                    type={props.type}
                    periodType={selectedPeriod}
                    paddingTop={config.paddingTop}
                    paddingBottom={config.paddingBottom}
                    renderCritical={type === ChartValueType.GLUCOSE}
                    selectedPeriod={selectedPeriod}
                    currentDate={currentDate}
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
                    polylineType={props.selectedPeriod === ChartPeriodType.DAY ? config.polylineType : PolylineType.REGULAR}
                    dots={polylineDotsData.dots}
                    chartPeriodType={props.selectedPeriod}
                    polylineColor={props.config.polylineColor}
                    initGradientColor={isGradientNeeded() && config.initGradientColor}
                    stopGradientColor={isGradientNeeded() && config.stopGradientColor}
                />
                <ChartAxisPair config={config} />
                {clickableDotsAvailable() && basicDotsData.dots.map(item => {
                    return <ChartDot
                        config={config}
                        dotData={item}
                        key={`${item.noteId}-dots`}
                        type={props.type}
                    />
                })}
                {!config.isAlone && clickableDotsAvailable() && basicDotsData.events.map(item => {
                    return <ChartDot
                        config={config}
                        dotData={item}
                        key={`${item.noteId}-events`}
                        type={props.type}
                    />
                })}
            </ChartBox>
            {netYTitles(polylineDotsData.maxValue, polylineDotsData.minValue)}
            {!config.isAlone && yAxisTitle(type)}
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
            flexDirection: config.reversedY ? 'column' : 'column-reverse'
        }}>
            {toRender.map((step, index) => (
                <Text
                    key={index}
                    style={{
                        ...styles.yNetTitlesText,
                        color: props.config.yNetTitlesColor || styles.yNetTitlesText.color,
                    }}
                >
                    {Math.round(step * 10) / 10 || ''}
                </Text>
            ))}
        </View>
    }

    function clickableDotsAvailable(): boolean {
        return type === ChartValueType.GLUCOSE || props.selectedPeriod !== ChartPeriodType.DAY;
    }

    function isGradientNeeded(): boolean {
        return props.selectedPeriod === ChartPeriodType.DAY;
    }
}

export const ChartWrap = connect(
    (state: IStorage) => ({
        selectedDotId: state.interactive.selectedDotId,
        selectedPeriod: state.interactive.selectedChartPeriod || ChartPeriodType.DAY,
        shortInsulinType: state.userDiabetesProperties.shortInsulinType || ShortInsulinType.ULTRA_SHORT,
    })
)(Comp)

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
        alignItems: 'center',
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
        width: 30,
        left: -30,
        display: 'flex',
        flexDirection: 'column-reverse',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
    },
    yNetTitlesText: {
        paddingRight: 3,
        fontSize: 12,
        textAlign: 'center',
        color: COLOR.TEXT_DARK_GRAY,
    },
})
