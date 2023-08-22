import { atom } from "jotai";
import {
  AGENCY_FILTER_DEFAULT,
  SPEED_FILTER_DEFAULT,
  TYPE_FILTER_DEFAULT,
} from "../constants";

const commonCodeAtom = atom(null);

// login
const isLoginAtom = atom(false);
const loginUserDataAtom = atom(null);

// map component
const currentGpsAtom = atom({ lat: null, lng: null });
const selectedMarkerDetailAtom = atom(null);

// sidebar component
const searchPlaceListAtom = atom(null);

// filter component
const speedFilterOptionAtom = atom(SPEED_FILTER_DEFAULT);
const typeFilterOptionAtom = atom(TYPE_FILTER_DEFAULT);
const agencyFilterOptionAtom = atom(AGENCY_FILTER_DEFAULT);

export {
  isLoginAtom,
  loginUserDataAtom,
  commonCodeAtom,
  currentGpsAtom,
  selectedMarkerDetailAtom,
  searchPlaceListAtom,
  speedFilterOptionAtom,
  typeFilterOptionAtom,
  agencyFilterOptionAtom,
};
