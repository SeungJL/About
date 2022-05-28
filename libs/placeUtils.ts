import { Colors } from "./colors"

const placeToColor = {
  '커피빈': Colors.coffeebin,
  '아티제': Colors.artisee,
  '': Colors.yellow ,
}

const placeToColorScheme = {
  '커피빈': 'purple',
  '아티제': 'blue',
  '': 'yellow' ,
}

export const getPlaces = () => {
  return Object.keys(placeToColorScheme)
    .filter((p) => p !== '')
}

export const getPlaceColor = (place: string) => {
  if (place in placeToColorScheme)
    return placeToColorScheme[place]
  
  return placeToColorScheme['']
}