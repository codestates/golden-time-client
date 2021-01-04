import axios from "axios";

function getLocation() {
  return navigator.geolocation.getCurrentPosition(async (position) => {
    const x = position.coords.longitude;
    const y = position.coords.latitude;
    const result = await axios.get(
      `https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${x}&y=${y}`,
      {
        headers: {
          Authorization: `KakaoAK ffb53639ffe1e1521cd3006a5a09ee3d`,
        },
      }
    );
    const currentLocation = result.data.documents[0].address.region_2depth_name;

    return currentLocation;
  });
}

export default getLocation;
