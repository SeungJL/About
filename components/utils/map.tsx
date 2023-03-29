import { Box, ChakraProps, position } from "@chakra-ui/react";
import axios, { AxiosError } from "axios";
import { FC, useEffect, useState } from "react";
import { useQuery } from "react-query";

const Map = () => {
  useEffect(() => {
    const lat = 37.2845789;
    const lng = 127.0443293;

    const mapOptions = {
      center: new naver.maps.LatLng(lat, lng),
      zoom: 14,
    };
    const container = document.getElementById("map");
    const map = new naver.maps.Map(container, mapOptions);

    // const markers = places.map((place) => {
    //   new naver.maps.Marker({
    //     position: new naver.maps.LatLng(place.latitude, place.longitude),
    //     map: map,
    //     icon:
    //       place._id === selectedPlace?._id
    //         ? {
    //             url: "/marker_highlight.png",
    //             size: new naver.maps.Size(44, 46),
    //             scaledSize: new naver.maps.Size(44, 46),
    //           }
    //         : undefined,
    //   });
  }, []);

  return <Box id="map"  />;
};

export default Map;
