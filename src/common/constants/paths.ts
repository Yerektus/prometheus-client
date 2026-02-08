export const paths = {
  getSignInPath: () => "/auth/sign-in",
  getHomePath: () => "/dashboard/home",
  getSensorsPath: () => "/dashboard/sensors",
  getDetailSensorPath: (sensorId: string) => `/dashboard/sensors/${sensorId}`,
  getUsersPath: () => "/dashboard/users",
  getSensorReadingsPath: () => "/dashboard/sensor-readings",
  getDetailSensorReadingPath: (sensorId: string) =>
    `/dashboard/sensor-readings/${sensorId}`,
};
