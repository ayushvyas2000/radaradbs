import { useContext } from "react";
import { useState } from "react";
import { createContext } from "react";

const DEFAULT_RADAR_DURATION = 1000;
const DEFAULT_ADBS_DURATION = 4000
export const SCREEN_1 = 'screen1'
export const SCREEN_2 = 'screen2'
const AuthContext = createContext();

export const RadarProvider = ({ children }) => {
    const [currentScreen, setCurrentScreen] = useState(SCREEN_1)
    const [simpleRadarData, setSimpleRadarData] = useState([])
    const [adbsRadarData, setAdbsRadarData] = useState([])
    const [radarPlayDuration, setRadarPlayDuration] = useState(DEFAULT_RADAR_DURATION)
    const [adbsPlayDuration, setAdbsPlayDuration] = useState(DEFAULT_ADBS_DURATION)
    const [pivotVariableName, setPivotVariableName] = useState('')
    const [speed, setSpeed] = useState(1000)

    const resetState = () => {
      setSpeed(1000)
      setPivotVariableName('')
      setAdbsPlayDuration(DEFAULT_ADBS_DURATION)
      setRadarPlayDuration(DEFAULT_RADAR_DURATION)
      setAdbsRadarData([])
      setSimpleRadarData([])
      setCurrentScreen(SCREEN_1)
    }

  return (
    <AuthContext.Provider value={{
      currentScreen, setCurrentScreen, simpleRadarData, setSimpleRadarData, adbsRadarData, setAdbsRadarData, radarPlayDuration, setRadarPlayDuration, pivotVariableName, setPivotVariableName, adbsPlayDuration, setAdbsPlayDuration, speed, setSpeed, resetState }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useRadarContext = () => {
  return useContext(AuthContext);
};