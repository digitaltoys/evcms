import { atom } from "jotai";

const selectedMarkerDetailAtom = atom(null);
const currentGpsAtom = atom({ lat: null, lng: null });
const commonCodeAtom = atom(null);

export { selectedMarkerDetailAtom, currentGpsAtom, commonCodeAtom };
