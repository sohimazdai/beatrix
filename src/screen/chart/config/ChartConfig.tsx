import { ChartAxisType, IChartConfiguration } from "../../../model/IChart"
import { Dimensions } from "react-native"
import { PolylineType } from "../../../view/chart/chart-svg/ChartPolyline";
import { COLOR } from '../../../constant/Color';

export class ChartConfig {
    TIME_STEP_MINUTES = 5;
    BASIC_PADDING = 5;
    DOT_RADIUS = 5;
    WIDTH = Dimensions.get("screen").width * 0.85 - 10;

    getConfigs() {
        return {
            glucose: this.getGlucoseConfig(),
            glucosePreview: this.getGlucosePreviewConfig(),
            breadUnits: this.getBreadUnitsConfig(),
            insulin: this.getInsulinConfig(),
            activeInsulin: this.getActiveInsulinConfig(),
        }
    }

    getGlucoseConfig() {
        return {
            width: this.WIDTH,
            height: Dimensions.get("screen").width / 2,
            boxWidth: this.WIDTH,
            boxHeight: Dimensions.get("screen").width / 2,
            axisWidth: 2,
            basicPadding: this.BASIC_PADDING,
            yPadding: 1,
            dotRadius: this.DOT_RADIUS,
            reversedY: false,
            timeStepMinutes: this.TIME_STEP_MINUTES,
            horizontalLineNumber: 6,
            axisTypes: [
                ChartAxisType.OX,
                ChartAxisType.OY
            ],
            polylineType: PolylineType.BEZIER,
            axisColor: COLOR.TEXT_DARK_GRAY,
            netColor: COLOR.GRAY,
            yNetTitlesColor: COLOR.BLACK,
            polylineColor: COLOR.PRIMARY_LIGHT,
            dotStrokeColor: COLOR.PRIMARY_LIGHT,
            dotFillColor: COLOR.RED_LIGHT,
            dotStrokeColorActive: COLOR.RED,
        };
    }

    getGlucosePreviewConfig(): IChartConfiguration {
        return {
            isAlone: true,
            width: this.WIDTH - 30,
            height: Dimensions.get("screen").width / 3,
            boxWidth: this.WIDTH - 30,
            boxHeight: Dimensions.get("screen").width / 3,
            axisWidth: 2,
            axisColor: COLOR.TEXT_DARK_GRAY,
            netColor: '#999999',
            yNetTitlesColor: COLOR.BLACK,
            polylineColor: COLOR.PRIMARY_LIGHT,
            dotStrokeColor: COLOR.PRIMARY_LIGHT,
            dotFillColor: COLOR.RED_LIGHT,
            paddingTop: true,
            paddingBottom: true,
            basicPadding: this.BASIC_PADDING,
            yPadding: 1,
            dotRadius: this.DOT_RADIUS,
            reversedY: false,
            timeStepMinutes: this.TIME_STEP_MINUTES,
            horizontalLineNumber: 6,
            axisTypes: [
                ChartAxisType.OX,
                ChartAxisType.OY
            ],
            polylineType: PolylineType.BEZIER,
        };
    }

    getInsulinConfig() {
        return {
            width: this.WIDTH,
            height: Dimensions.get("screen").width / 5,
            boxWidth: this.WIDTH,
            boxHeight: Dimensions.get("screen").width / 5,
            axisWidth: 2,
            basicPadding: this.BASIC_PADDING,
            yPadding: 1,
            dotRadius: this.DOT_RADIUS,
            reversedY: true,
            increaseTime: 30,
            flatTime: 30,
            decreaseTime: 180,
            timeStepMinutes: this.TIME_STEP_MINUTES,
            horizontalLineNumber: 3,
            initGradientColor: '#7C89FF',
            stopGradientColor: '#7C3869',
            axisTypes: [
                ChartAxisType.OX_UPSIDE,
                ChartAxisType.OY_REVERSE,
            ],
            paddingTop: true,
            polylineType: PolylineType.REGULAR,
            axisColor: COLOR.TEXT_DARK_GRAY,
            netColor: COLOR.GRAY,
            yNetTitlesColor: COLOR.BLACK,
            polylineColor: COLOR.PRIMARY_LIGHT,
            dotStrokeColor: COLOR.PRIMARY_LIGHT,
            dotFillColor: COLOR.RED_LIGHT,
            dotStrokeColorActive: COLOR.BLUE,
        }
    }

    getActiveInsulinConfig(): IChartConfiguration {
        return {
            width: this.WIDTH,
            height: Dimensions.get("screen").width / 5,
            boxWidth: this.WIDTH,
            boxHeight: Dimensions.get("screen").width / 5,
            axisWidth: 2,
            dotRadius: this.DOT_RADIUS,
            reversedY: false,
            timeStepMinutes: this.TIME_STEP_MINUTES,
            horizontalLineNumber: 1,
            initGradientColor: '#7C3869',
            stopGradientColor: '#7C89FF',
            axisTypes: [
                ChartAxisType.OX,
                ChartAxisType.OY,
            ],
            basicPadding: this.BASIC_PADDING,
            yPadding: 1,
            paddingBottom: false,
            paddingTop: true,
            polylineType: PolylineType.REGULAR,
            axisColor: COLOR.TEXT_DARK_GRAY,
            netColor: COLOR.GRAY,
            yNetTitlesColor: COLOR.BLACK,
            polylineColor: COLOR.PRIMARY_LIGHT,
            dotStrokeColor: COLOR.PRIMARY_LIGHT,
            dotFillColor: COLOR.RED_LIGHT,
        }
    }

    getBreadUnitsConfig() {
        return {
            width: this.WIDTH,
            height: Dimensions.get("screen").width / 5,
            boxWidth: this.WIDTH,
            boxHeight: Dimensions.get("screen").width / 5,
            axisWidth: 2,
            basicPadding: this.BASIC_PADDING,
            yPadding: 1,
            dotRadius: this.DOT_RADIUS,
            reversedY: false,
            increaseTime: 15,
            flatTime: 15,
            decreaseTime: 90,
            timeStepMinutes: this.TIME_STEP_MINUTES,
            horizontalLineNumber: 3,
            initGradientColor: '#FF4D00',
            stopGradientColor: '#F0EC91',
            axisTypes: [
                ChartAxisType.OX,
                ChartAxisType.OY
            ],
            paddingBottom: true,
            polylineType: PolylineType.REGULAR,
            axisColor: COLOR.TEXT_DARK_GRAY,
            netColor: COLOR.GRAY,
            yNetTitlesColor: COLOR.BLACK,
            polylineColor: COLOR.PRIMARY_LIGHT,
            dotStrokeColor: COLOR.PRIMARY_LIGHT,
            dotFillColor: COLOR.RED_LIGHT,
            dotStrokeColorActive: COLOR.ORANGE,
        }
    }
}
