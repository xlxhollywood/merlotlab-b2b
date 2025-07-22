'use client'

import { useEffect, useRef } from 'react'

// 타입 안전성을 위해 any 사용

interface KakaoMapProps {
  lat: number;
  lng: number;
  level?: number;
  width?: string;
  height?: string;
  className?: string;
}

export default function KakaoMap({ 
  lat, 
  lng, 
  level = 3, 
  width = '100%', 
  height = '400px',
  className = ''
}: KakaoMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<any>(null)

  useEffect(() => {
    const loadKakaoMap = () => {
      // 카카오맵 API가 이미 로드되었는지 확인
      if ((window as any).kakao && (window as any).kakao.maps && (window as any).kakao.maps.load) {
        (window as any).kakao.maps.load(() => {
          setTimeout(() => {
            initializeMap();
          }, 100);
        });
        return;
      }

      // 카카오맵 API 스크립트 로드
      const script = document.createElement('script');
      script.src = '//dapi.kakao.com/v2/maps/sdk.js?appkey=1313667718e71688de2635cab0cf7ef7&autoload=false';
      script.async = true;
      
      script.onload = () => {
        if ((window as any).kakao?.maps && (window as any).kakao.maps.load) {
          (window as any).kakao.maps.load(() => {
            setTimeout(() => {
              initializeMap();
            }, 100);
          });
        }
      };

      document.head.appendChild(script);
    };

    // DOM이 완전히 로드된 후 실행
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', loadKakaoMap);
    } else {
      loadKakaoMap();
    }

    return () => {
      // 컴포넌트 언마운트 시 스크립트 제거
      const existingScript = document.querySelector('script[src*="dapi.kakao.com"]');
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, [lat, lng, level]);

  const initializeMap = () => {
    if (!mapRef.current) {
      console.error('지도 컨테이너를 찾을 수 없습니다.');
      return;
    }

    if (!(window as any).kakao?.maps) {
      console.error('카카오맵 API가 로드되지 않았습니다.');
      return;
    }

    if (!(window as any).kakao.maps.LatLng || !(window as any).kakao.maps.Map || !(window as any).kakao.maps.Marker) {
      console.error('카카오맵 API 클래스가 준비되지 않았습니다.');
      return;
    }

    try {
      const mapOption = {
        center: new (window as any).kakao.maps.LatLng(lat, lng),
        level: level
      };

      const map = new (window as any).kakao.maps.Map(mapRef.current, mapOption);
      mapInstanceRef.current = map;
      
      // 마커 생성
      const markerPosition = new (window as any).kakao.maps.LatLng(lat, lng);
      const marker = new (window as any).kakao.maps.Marker({
        position: markerPosition
      });

      marker.setMap(map);
      console.log('카카오맵 초기화 성공!');
    } catch (error) {
      console.error('카카오맵 초기화 오류:', error);
      console.log('kakao 객체:', (window as any).kakao);
      console.log('kakao.maps 객체:', (window as any).kakao?.maps);
    }
  };

  return (
    <div 
      ref={mapRef}
      style={{ width, height }}
      className={className}
    />
  );
} 