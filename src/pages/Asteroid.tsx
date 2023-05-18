import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "../components/Layout";

const Asteroid = () => {
  let { id } = useParams();
  const [asteroidDetails, setAsteroidDetails] = useState<any>();
  const [loading, setLoading] = useState(false);

  const loadAsteroidDetails = async (id: string) => {
    try {
      setLoading(true);
      const apiKey = "y4qAb8iN0zd1h4ABdGiSLqA9vyk6K45Ci5fwGQKY";
      const {data} = await axios.get(
        `https://api.nasa.gov/neo/rest/v1/neo/${id}?api_key=${apiKey}`
      );
      setAsteroidDetails(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      loadAsteroidDetails(id);
    }
  }, [id]);

  return (
    <Layout>
      {loading ? (
        <h1>Loading Details</h1>
      ) : asteroidDetails ? (
        <div className="flex flex-col items-start">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Asteroid ID
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            {asteroidDetails.id}
          </p>
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Name
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            {asteroidDetails.name}
          </p>
          <div className="border-b border-gray-400 w-full my-8" />
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Desgination
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            {asteroidDetails.designation}
          </p>
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Absolute Magnitude
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            {asteroidDetails.absolute_magnitude_h}
          </p>
          <div className="border-b border-gray-400 w-full my-8" />
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Diameter <span className="text-sm text-gray-400">(min/max)</span>
          </h2>
          <div className="flex items-center justify-between gap-4">
            <div className="flex flex-col">
              <h2 className="text-sm font-semibold leading-7 text-gray-900">
                Kilometers
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                {
                  asteroidDetails.estimated_diameter.kilometers
                    .estimated_diameter_min
                }{" "}
                /{" "}
                {
                  asteroidDetails.estimated_diameter.kilometers
                    .estimated_diameter_max
                }
              </p>
            </div>
            <div className="flex flex-col">
              <h2 className="text-sm font-semibold leading-7 text-gray-900">
                Meters
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                {
                  asteroidDetails.estimated_diameter.meters
                    .estimated_diameter_min
                }{" "}
                /{" "}
                {
                  asteroidDetails.estimated_diameter.meters
                    .estimated_diameter_max
                }
              </p>
            </div>
            <div className="flex flex-col">
              <h2 className="text-sm font-semibold leading-7 text-gray-900">
                Miles
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                {
                  asteroidDetails.estimated_diameter.miles
                    .estimated_diameter_min
                }{" "}
                /{" "}
                {
                  asteroidDetails.estimated_diameter.miles
                    .estimated_diameter_max
                }
              </p>
            </div>
            <div className="flex flex-col">
              <h2 className="text-sm font-semibold leading-7 text-gray-900">
                Feet
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                {asteroidDetails.estimated_diameter.feet.estimated_diameter_min}{" "}
                /{" "}
                {asteroidDetails.estimated_diameter.feet.estimated_diameter_max}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <h1>No Details</h1>
      )}
    </Layout>
  );
};

export default Asteroid;
