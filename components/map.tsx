import { Box, ChakraProps, position } from "@chakra-ui/react";
import axios, { AxiosError } from "axios";
import { FC, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { IPlace, Place } from "../models/place";

const Map: FC<{
  selectedPlace, IPlace,
  places: IPlace[],
} &
ChakraProps> = ({ selectedPlace, places, ...props }) => {
  useEffect(() => {
    const mapOptions = {
      center: new naver.maps.LatLng(37.2845789, 127.0443293),
      zoom: 14,
    };
    const container = document.getElementById('map')
    const map = new naver.maps.Map(container, mapOptions)

    const markers = places.map(place => {
      new naver.maps.Marker({
        position: new naver.maps.LatLng(place.latitude, place.longitude),
        map: map,
        icon: place._id === selectedPlace?._id ? {
          url: '/marker_highlight.png',
          size: new naver.maps.Size(44, 46),
          scaledSize: new naver.maps.Size(44, 46),
        } : undefined,
      })
    })
  }, [selectedPlace])

  return (
    <Box id='map' {...props} />
  )
}

export default Map
