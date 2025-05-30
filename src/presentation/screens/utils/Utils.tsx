import { Platform } from "react-native";
import { requestMultiple, PERMISSIONS, RESULTS, openSettings } from 'react-native-permissions';

export const requestAllPermissions = async () => {
  const permissions = Platform.select({
    ios: [
      PERMISSIONS.IOS.CAMERA,
      PERMISSIONS.IOS.PHOTO_LIBRARY,
      PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
    ],
    android: [
      PERMISSIONS.ANDROID.CAMERA,
      PERMISSIONS.ANDROID.READ_MEDIA_IMAGES,
      PERMISSIONS.ANDROID.READ_MEDIA_VIDEO,
      //PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
    ],
  });

  if (!permissions) return;

  const statuses = await requestMultiple(permissions);

  console.log('Permisos solicitados:', statuses);

  if (
    statuses[PERMISSIONS.ANDROID.CAMERA] === RESULTS.GRANTED &&
    statuses[PERMISSIONS.ANDROID.READ_MEDIA_IMAGES] === RESULTS.GRANTED
    //statuses[PERMISSIONS.ANDROID.READ_MEDIA_VIDEO] === RESULTS.GRANTED &&
    //statuses[PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION] === RESULTS.GRANTED
  ) {
    console.log('Todo bien, todos los permisos otorgados');
  } else {

    /*if (statuses[PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION] === 'blocked') {
      handleBlockedLocationPermission();
    }*/
    console.log('Algunos permisos fueron denegados');
  }
};