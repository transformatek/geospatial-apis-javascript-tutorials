"use client";

import {
  MapContainer,
  TileLayer,
  Polygon,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import { fetchIsochrones } from "@/lib/ors";
import { reverseGeocode } from "@/lib/geocoding";
import L from "leaflet";
import { Col, InputNumber, InputNumberProps, Row, Select, Slider } from 'antd';

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

function LocationSetter({ isochronesParam, setIsochrones, setLocationInfo }: any) {


  useMapEvents({
    click: async (e) => {
      const { lat, lng } = e.latlng;
      console.log("Clicked location:", lat, lng);

      const { city, country } = await reverseGeocode(lat, lng);
      setLocationInfo({ lat, lng, city, country });

      // Fetch ORS isochrones
      const features = await fetchIsochrones(lng, lat, isochronesParam);

      setIsochrones(features);
    },
  });
  return null;
}


export default function Map() {
  const [isochrones, setIsochrones] = useState<any[]>([]);
  const [profile, setProfile] = useState("driving-car");
  const [locationInfo, setLocationInfo] = useState<any>(null);
  const [rangeType, setRangeType] = useState("distance");
  const [unity, setUnity] = useState("km");
  const [rangeValue, setRangeValue] = useState(0);
  const [intervalValue, setIntervalValue] = useState(0);
  const colors = ["blue","#4F97C1", "#A7C7E7"]
  const onChangeRangeValue: InputNumberProps['onChange'] = (value) => {
    if (Number.isNaN(value)) {
      return;
    }
    setRangeValue(value as number);
  };
  const handleChangeUnity = (value: string) => {
    setUnity(value);
  };

  const onChangeIntervalValue: InputNumberProps['onChange'] = (value) => {
    if (Number.isNaN(value)) {
      return;
    }
    setIntervalValue(value as number);
  };
  const handleChangeRangeType = (value: string) => {
    if (value === "distance") {
      setRangeType(value);
      setUnity("km");
    }
    else if (value === "time") {
      setRangeType(value);
      setUnity("m");
    }
  };

  return (
    <>
      <div style={{ display: 'flex', height: '100vh' }}>
        <div style={{ width: '25%', padding: '1rem', background: '#f5f5f5' }}>
          <div style={{ marginBottom: "10px" }}>
            <label style={{ marginRight: "10px", fontWeight: "bold" }}> Transport Mode:</label>
            <label style={{ marginRight: "10px" }}> Car </label>

          </div>

          {locationInfo && (
            <>
              <div style={{ marginBottom: "10px" }}>
                <b>Location:</b> {locationInfo.lat.toFixed(4)},{" "}
                {locationInfo.lng.toFixed(4)}
              </div>
              <div style={{ marginBottom: "10px" }}>
                <b> City:</b> {locationInfo.city}, {locationInfo.country}
              </div>
            </>
          )}
          <div style={{ marginBottom: "10px" }}>
            <label style={{ marginRight: "10px", marginBottom: "5px", fontWeight: "bold" }}> Isochrone method</label>
            <Select
              defaultValue="distance"
              style={{ width: "100%" }}
              onChange={handleChangeRangeType}
              options={[
                { value: 'distance', label: 'Distance' },
                { value: 'time', label: 'Time' },
              ]}
            />
          </div>
          {rangeType === "distance" && (
            <div style={{ marginBottom: "10px" }}>
              <label style={{ marginRight: "10px", marginBottom: "5px", fontWeight: "bold" }}> Unity</label>
              <Select
                defaultValue="km"
                style={{ width: "100%" }}
                onChange={handleChangeUnity}
                options={[
                  { value: 'km', label: 'Kilometers' },
                  { value: 'm', label: 'Meters' },
                ]}
              />
            </div>
          )}
          <div style={{ marginTop: "10px" }}>
            <label style={{ marginRight: "10px", marginBottom: "5px", fontWeight: "bold" }}>Range</label>
            <Row align="middle">
              <Col span={16}>
                <Slider
                  min={1}
                  max={20}
                  onChange={onChangeRangeValue}
                  value={typeof rangeValue === 'number' ? rangeValue : 0}
                />
              </Col>
              <Col span={8} style={{ display: 'flex', alignItems: 'center' }}>
                <InputNumber
                  min={1}
                  max={20}
                  style={{ marginRight: 8, width: 100 }}
                  value={rangeValue}
                  onChange={onChangeRangeValue}
                />
                <span>{rangeType == "distance" ? unity : "min"}</span>
              </Col>
            </Row>
          </div>
          <div style={{ marginTop: "10px" }}>
            <label style={{ marginRight: "10px", marginBottom: "5px", fontWeight: "bold" }}>Interval</label>
            <Row align="middle">
              <Col span={16}>
                <Slider
                  min={1}
                  max={20}
                  onChange={onChangeIntervalValue}
                  value={typeof intervalValue === 'number' ? intervalValue : 0}
                />
              </Col>
              <Col span={8} style={{ display: 'flex', alignItems: 'center' }}>
                <InputNumber
                  min={1}
                  max={20}
                  style={{ marginRight: 8, width: 100 }}
                  value={intervalValue}
                  onChange={onChangeIntervalValue}
                />
                <span>  {rangeType == "distance" ? unity : "min"}</span>
              </Col>
            </Row>
          </div>
        </div>
        <div style={{ flex: 1 }}>
          <MapContainer
            center={[36.75, 3.06]}
            zoom={13}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              attribution="&copy; OpenStreetMap contributors"
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <LocationSetter
              isochronesParam={
                {
                  profile: profile,
                  rangeType: rangeType,
                  unity: unity,
                  rangeValue: rangeValue,
                  intervalValue: intervalValue
                }}
              setIsochrones={setIsochrones}
              setLocationInfo={setLocationInfo}
            />

            {locationInfo && (
              <Marker position={[locationInfo.lat, locationInfo.lng]}>
                <Popup>
                  {locationInfo.city}, {locationInfo.country}
                </Popup>
              </Marker>
            )}

            {Array.isArray(isochrones) &&
              isochrones.map((feature, idx) => (
                <Polygon
                  key={idx}
                  positions={feature.geometry.coordinates[0].map(
                    ([lng, lat]: [number, number]) => [lat, lng]
                  )}
                  pathOptions={{
                    color: colors[idx % colors.length],
                    fillColor: colors[idx % colors.length],
                    weight: 1,
                    fillOpacity: 0.2 + idx * 0.1,
                  }}
                />
              ))}
          </MapContainer>
        </div>
      </div>
    </>
  );
}
