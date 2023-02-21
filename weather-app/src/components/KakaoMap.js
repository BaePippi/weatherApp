import React, { useEffect, useState } from "react";

const { kakao } = window;

function Kakao() {
    useEffect(() => {
        const container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
        const options = {
          //지도를 생성할 때 필요한 기본 옵션
          center: new kakao.maps.LatLng(33.450701, 126.570667), //지도의 중심좌표.
          level: 3, //지도의 레벨(확대, 축소 정도)
        };
        const map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴
        function locationLoadSuccess(pos) {
            const currentPos = new kakao.maps.LatLng(
              pos.coords.latitude,
              pos.coords.longitude
            );
            map.panTo(currentPos);
        }
    
        window.addEventListener('load', e=> {
            navigator.geolocation.getCurrentPosition(
              locationLoadSuccess
            );
        })
    }, [])

    return (
        <div id="map" style={{width:'500px', height:'400px'}}></div>
    )
};

export default Kakao;