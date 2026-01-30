import { mapLocationResponseToLocation } from "../../mappers/location.mapper";
import { request } from "../../request";
import { LocationResponse } from "../../responses/location.response";

export const fetchLocation = async () => {
  const response = await request.get<{
    data: LocationResponse[];
  }>("/api/v1/locations");

  return response.data.data.map((location) =>
    mapLocationResponseToLocation(location),
  );
};
