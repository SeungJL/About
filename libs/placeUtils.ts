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

const placeToImg = {
  '커피빈': 'https://play-lh.googleusercontent.com/VJUZEoZtShO4aTHR4xSfLLGlYwP5fys_tU5qEsMoW1pIpo9FRZo90AMUzlEaOOcN3zHR=w480-h960-rw',
  '아티제': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3Bs1bVw29kO7DfbwiJ-IeXe2JJBwkxnnKC6Ta_zprJmRPiHsmrB-_zMuQMMqbxepYWIo&usqp=CAU'
}

export const getPlaces = () => {
  return Object.keys(placeToColorScheme)
    .filter((p) => p !== '')
}

export const getPlaceColor = (place: string) => {
  if (place in placeToColor)
    return placeToColor[place]
  
  return placeToColor['']
}

export const getPlaceImg = (place: string) => {
  if (place in placeToImg)
    return placeToImg[place]
  
  return ''
}