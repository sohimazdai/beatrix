import { ChartAxisType } from "../../../model/IChart"
import { Dimensions } from "react-native"
import { PolylineType } from "../../../view/chart/chart-svg/ChartPolyline";

export class ChartConfig {
    TIME_STEP_MINUTES = 5;
    BASIC_PADDING = 5;
    DOT_RADIUS = 5;
    WIDTH = Dimensions.get("screen").width * 0.85;

    getConfigs() {
        return {
            glucose: this.getGlucoseConfig(),
            breadUnits: this.getBreadUnitsConfig(),
            insulin: this.getInsulinConfig(), 
        }
    }

    getGlucoseConfig() {
        return {
            width: this.WIDTH,
            height: Dimensions.get("screen").width / 2,
            boxWidth: this.WIDTH,
            boxHeight: Dimensions.get("screen").width / 2,
            axisWidth: 2,
            axisColor: '#AAAAAA',
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
            polylineType: PolylineType.BEZIER
        }
    }
    
    getInsulinConfig() {
        return {
            width: this.WIDTH,
            height: Dimensions.get("screen").width / 5,
            boxWidth: this.WIDTH,
            boxHeight: Dimensions.get("screen").width / 5,
            axisWidth: 2,
            axisColor: '#AAAAAA',
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
            polylineType: PolylineType.REGULAR
        }
    }

    getBreadUnitsConfig() {
        return {
            width: this.WIDTH,
            height: Dimensions.get("screen").width / 5,
            boxWidth: this.WIDTH,
            boxHeight: Dimensions.get("screen").width / 5,
            axisWidth: 2,
            axisColor: '#AAAAAA',
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
            polylineType: PolylineType.REGULAR
        }
    }
}