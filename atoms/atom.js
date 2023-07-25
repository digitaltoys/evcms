import { atom } from "jotai";

const commonCodeAtom = atom(null);

// map component
const currentGpsAtom = atom({ lat: null, lng: null });
const selectedMarkerDetailAtom = atom(null);

//sidebar component
const searchPlaceListAtom = atom(null);

export {
  commonCodeAtom,
  currentGpsAtom,
  selectedMarkerDetailAtom,
  searchPlaceListAtom,
};
