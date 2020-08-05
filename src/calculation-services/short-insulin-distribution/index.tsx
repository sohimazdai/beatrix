import { ShortInsulinType } from '../../model/IUserDiabetesProperties';

const shortInsulinDistributionStep = {
  [ShortInsulinType.ULTRA_SHORT]: 5,
  [ShortInsulinType.SHORT]: 30,
};

export const shortInsulinDistributionStepNumber = {
  [ShortInsulinType.ULTRA_SHORT]: 48,
  [ShortInsulinType.SHORT]: 102,
};

export const getShortInsulinDistributionValueByTimeStep = (
  stepFromStart: number, type: ShortInsulinType
): number => {
  switch (type) {
    case ShortInsulinType.ULTRA_SHORT:
      return getUltraShortInsulinDistributionValueChange(stepFromStart);
    case ShortInsulinType.SHORT:
      return getSHORTShortInsulinDistributionValue(stepFromStart);
  }
};

function getUltraShortInsulinDistributionValueChange(stepFromStart: number) {
  const distribution = shortInsulinDistribution[ShortInsulinType.ULTRA_SHORT];

  return distribution[stepFromStart] - distribution[stepFromStart - 1];
}


function getSHORTShortInsulinDistributionValue(stepFromStart: number) {
  const timeStep = shortInsulinDistributionStep[ShortInsulinType.SHORT];
  const nearestFloorArrayIndex = Math.floor(stepFromStart * 5 / timeStep);
  const nearestCeilArrayIndex = nearestFloorArrayIndex + 1;
  const distribution = shortInsulinDistribution[ShortInsulinType.SHORT];

  const range: number =
    distribution[nearestCeilArrayIndex] - distribution[nearestFloorArrayIndex];
  const stepTimeValue: number
    = range / timeStep / 5;
  const periodPart: number = (stepFromStart / timeStep) - Math.floor(stepFromStart / timeStep);
  const currentValue: number =
    distribution[nearestFloorArrayIndex] + periodPart * stepTimeValue;

  return currentValue;
}

export const shortInsulinDistribution = {
  [ShortInsulinType.ULTRA_SHORT]: [ //step by 5 minutes; 4 hours
    0, //0
    39 / 159, //5
    75 / 159, //10
    108 / 159, //15
    137 / 159, //20
    153 / 159, //25
    1, //30
    1, //35
    156 / 159, //40
    149 / 159, //45
    142 / 159, //50
    134 / 159, //55
    127 / 159, //60
    120 / 159, //65
    113 / 159, //70
    107 / 159, //80
    102 / 159, //85
    97 / 159, //90
    92 / 159, //95
    87 / 159, //100
    //30 min = -24 === 4 for 5 min
    83 / 159, //105
    79 / 159, //110
    75 / 159, //115
    71 / 159, //120
    67 / 159, //125
    63 / 159, //130
    //30 min = -23 === 5(4 for 5 min) and 1(3 for 5 min)
    59 / 159, //135
    55 / 159, //140
    51 / 159, //145
    47 / 159, //150
    44 / 159, //155
    //30 min = -19 === 1(4 for 5min) and 5(3 for 5min)
    40 / 159, //160
    37 / 159, //165
    34 / 159, //170
    31 / 159, //180
    28 / 159, //185
    25 / 159, //190
    //30 min = -16 === 4(3 for 5 min) and 3(2 for 5min)
    22 / 159, //195
    18 / 159, //200
    15 / 159, //205
    12 / 159, //210
    10 / 159, //215
    8 / 159, //220
    //20 min = -8 === 2 for 5 min
    6 / 159, //225
    4 / 159, //230
    2 / 159, //235
    0, //240
  ],
  [ShortInsulinType.SHORT]: [ //step by 30 minutes; 8,5 hours
    0, //0
    7 / 104, //30
    33 / 104, //60
    64 / 104, //90,
    91 / 104, //120,
    1, //150,
    102 / 104, //180,
    90 / 104, //210,
    69 / 104, //240,
    51 / 104, //270
    39 / 104, //300,
    30 / 104, //330,
    22 / 104, //360
    15 / 104, //390,
    11 / 104, //420,
    7 / 104, //450
    4 / 104, //480
    0, //510
  ]
}