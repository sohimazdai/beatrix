import React, { useState, useEffect, ReactNode } from 'react';
import { Text, View, StyleSheet, Alert } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import * as Permissions from 'expo-permissions';
import { i18nGet } from '../../localisation/Translate';
import { COLOR } from '../../constant/Color';
import { NavigationScreenProp, NavigationState, NavigationParams } from 'react-navigation';
import { NavigatorEntities } from '../../navigator/modules/NavigatorEntities';
import { connect } from 'react-redux';
import { createFetchProductByBarcodeAction } from '../../store/service/food/FetchBarcodeProductSaga';
import { StyledButton, StyledButtonType } from '../../component/button/StyledButton';
import { FoodApi } from '../../api/FoodApi';
import { FoodSection } from '../../store/modules/food/food';
import { BlockHat } from '../../component/hat/BlockHat';
import { IFoodListItem } from '../../model/IFood';
import { createAddProductAction } from '../../store/service/food/AddProductSaga';
import { createChangeInteractive } from '../../store/modules/interactive/interactive';
import { appAnalytics } from '../../app/Analytics';
import { selectFoodWithBarcode } from '../../view/food/selectors/select-food-with-barcode';
import { IStorage } from '../../model/IStorage';

interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
  fetchProductData: (id: string) => void;
  autoAddToDb: (foodItem: IFoodListItem) => void;
  selectCardFoodId: (foodId: string) => void;
  selectBarcodeFood: (barcode: string) => IFoodListItem;
}

export function BarcodeScanningScreenComponent(props: Props) {
  const { navigation, autoAddToDb, selectBarcodeFood } = props;

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

    appAnalytics.sendEvent(appAnalytics.events.FOOD_BARCODE_SCREEN_SEEN);
  }, []);

  const handleBarCodeScanned = async (barcodeData) => {
    if (scanned) return;

    const { navigation } = props;

    appAnalytics.sendEvent(appAnalytics.events.FOOD_BARCODE_START_SCANING);

    await setScanned(true);

    let foodItem = selectBarcodeFood(barcodeData);

    if (!foodItem) {
      foodItem = await FoodApi.getOFFProductByBarcode(barcodeData);
    }

    if (!foodItem) {
      foodItem = await FoodApi.getByBarcodeFromLocalDB(barcodeData);
    }

    if (foodItem) {
      autoAddToDb(foodItem);

      navigation.navigate(NavigatorEntities.FOOD_CARD, {
        foodItem
      });

      appAnalytics.sendEvent(appAnalytics.events.FOOD_BARCODE_SUCCESS_SCANING);
    } else execAlert(barcodeData);
  };

  const execAlert = (barcodeData) => {
    Alert.alert(
      i18nGet('scan_failed'),
      i18nGet('what_you_want_to_do_later'),
      [
        {
          text: i18nGet('add_food_handly'),
          style: 'default',
          onPress: () => navigation.navigate(NavigatorEntities.FOOD_CARD_CREATION, {
            barcode: barcodeData,
            backPage: NavigatorEntities.BARCODE_SCANNING,
          })
        },
        {
          text: i18nGet('search_food'),
          style: 'default',
          onPress: () => navigation.navigate(NavigatorEntities.FOOD_PAGE, {
            selectedFoodPage: FoodSection.SEARCH,
            backPage: NavigatorEntities.BARCODE_SCANNING,
          })
        },
        {
          text: i18nGet('scan_try_again'),
          style: 'cancel',
        },
      ]
    )
  }

  const onBackPress = () => {
    const backPage = navigation?.state?.params?.backPage || NavigatorEntities.FOOD_PAGE;

    navigation.navigate(backPage);
  }

  return (
    <View style={styles.view}>
      <BlockHat onBackPress={onBackPress} title={i18nGet('product_scanning')} />
      <View style={styles.content}>
        {hasPermission && !scanned && (
          <>
            <BarCodeScanner
              onBarCodeScanned={handleBarCodeScanned}
              style={styles.barcodeScaner}
              barCodeTypes={[
                // BarCodeScanner.Constants.BarCodeType.qr,
                BarCodeScanner.Constants.BarCodeType.code39,
                BarCodeScanner.Constants.BarCodeType.code93,
                BarCodeScanner.Constants.BarCodeType.code128,
                BarCodeScanner.Constants.BarCodeType.ean13,
                BarCodeScanner.Constants.BarCodeType.ean8,
              ]}
            />
            <Text style={styles.text}>{i18nGet('scanning_hint')}</Text>
          </>
        )}
        <View style={styles.bottom}>
          {hasPermission === null && (
            <Text style={styles.text}>{i18nGet('requesting_for_camera_permissions')}</Text>
          )}
          {!hasPermission && (
            <Text style={styles.text}>{i18nGet('we_have_no_access')}</Text>
          )}
          {scanned && (
            <View style={styles.buttonWrap}>
              <StyledButton
                fluid
                style={StyledButtonType.PRIMARY}
                label={i18nGet('scan_again')}
                onPress={() => setScanned(false)}
              />
            </View>
          )}
          {scanned && <View style={styles.buttonWrap}>
            <StyledButton
              fluid
              style={StyledButtonType.PRIMARY}
              label={i18nGet('add_food')}
              onPress={() => navigation.navigate(NavigatorEntities.FOOD_CARD_CREATION, {
                backPage: NavigatorEntities.BARCODE_SCANNING,
              })}
            />
          </View>}
        </View>
      </View >
    </View >
  );
}

export const BarcodeScanningScreen = connect(
  (state: IStorage) => ({
    selectBarcodeFood: (barcode) => selectFoodWithBarcode(state, barcode),
  }),
  (dispatch) => ({
    fetchProductData: (id: string) => dispatch(createFetchProductByBarcodeAction(id)),
    autoAddToDb: (foodItem: IFoodListItem) => dispatch(createAddProductAction(foodItem, { auto: true })),
    selectCardFoodId: (foodId: string) => dispatch(createChangeInteractive({ cardFoodId: foodId }))
  })
)(BarcodeScanningScreenComponent)

const styles = StyleSheet.create({
  view: {
    position: 'relative',
    flexGrow: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  content: {
    flexGrow: 1,
    padding: 16,
  },
  barcodeScaner: {
    backgroundColor: COLOR.TEXT_BLACK,
    width: '100%',
    height: 300,
    borderRadius: 10,
  },
  bottom: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    width: '100%',
  },
  text: {
    marginTop: 8,
    fontSize: 16,
    color: COLOR.TEXT_DARK_GRAY,
    backgroundColor: COLOR.BLUE_BASE,
    borderRadius: 10,
    padding: 16,
  },
  buttonWrap: {
    marginTop: 16,
  }
})
