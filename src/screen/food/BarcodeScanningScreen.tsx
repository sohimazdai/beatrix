import React, { useState, useEffect, ReactNode } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import * as Permissions from 'expo-permissions';
import { Hat } from '../../component/hat/Hat';
import { i18nGet } from '../../localisation/Translate';
import { COLOR } from '../../constant/Color';
import { NavigationScreenProp, NavigationState, NavigationParams } from 'react-navigation';
import { NavigatorEntities } from '../../navigator/modules/NavigatorEntities';
import { connect } from 'react-redux';
import { createFetchProductByBarcodeAction } from '../../store/service/food/FetchBarcodeProductSaga';
import { StyledButton, StyledButtonType } from '../../component/button/StyledButton';
import { FoodApi } from '../../api/FoodApi';

interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
  fetchProductData: (id: string) => void;
}

export function BarcodeScanningScreenComponent(props: Props) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      let cameraStatus = (await Permissions.getAsync(Permissions.CAMERA)).status;
      if (cameraStatus !== 'granted') {
        cameraStatus = (await Permissions.askAsync(Permissions.CAMERA)).status;
      }
      setHasPermission(cameraStatus === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = async (barcodeData) => {
    const { data } = barcodeData;
    const { navigation } = props;

    setScanned(true);
    const foodItem = await FoodApi.getOFFProductByBarcode(data);

    if (foodItem) {
      navigation.navigate(NavigatorEntities.FOOD_CARD, { foodItem })
    } else alert('не получилос')
  };

  const wrap = (children: ReactNode) => (
    <View style={styles.view}>
      <Hat onBackPress={onBackPress} title={i18nGet('product_scanning')} />
      {children}
    </View>
  )

  if (hasPermission === null) {
    //TODO: i18n
    return wrap(
      <Text style={styles.text}>Requesting for camera permission</Text>
    );
  }

  if (hasPermission === false) {
    //TODO: i18n
    return wrap(<Text style={styles.text}>No access to camera</Text>);
  }

  const onBackPress = () => {
    const { navigation } = props;

    const backPage = navigation?.state?.params?.backPage || NavigatorEntities.FOOD_PAGE;

    navigation.navigate(backPage);
  }

  return (
    //TODO: i18n
    wrap(
      <>
        <BarCodeScanner
          onBarCodeScanned={handleBarCodeScanned}
          style={styles.barcodeScaner}
          barCodeTypes={[
            BarCodeScanner.Constants.BarCodeType.qr,
            BarCodeScanner.Constants.BarCodeType.code39,
            BarCodeScanner.Constants.BarCodeType.code93,
            BarCodeScanner.Constants.BarCodeType.code128,
            BarCodeScanner.Constants.BarCodeType.ean13,
            BarCodeScanner.Constants.BarCodeType.ean8,
          ]}
        />
        {scanned && (
          <View style={styles.buttonWrap}>
            <StyledButton
              fluid
              style={StyledButtonType.PRIMARY}
              label={'Tap to Scan Again'}
              onPress={() => setScanned(false)}
            />
          </View>
        )}
      </>
    ));
}

export const BarcodeScanningScreen = connect(
  null,
  (dispatch) => ({
    fetchProductData: (id: string) => dispatch(createFetchProductByBarcodeAction(id))
  })
)(BarcodeScanningScreenComponent)

const styles = StyleSheet.create({
  view: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  barcodeScaner: {
    width: '100%',
    minHeight: 300,
    flexGrow: 1,
  },
  text: {
    fontSize: 19,
    color: COLOR.TEXT_DARK_GRAY
  },
  buttonWrap: {
    padding: 16,
  }
})
