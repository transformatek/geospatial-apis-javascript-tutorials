# ORS Isochrones Example

This project is a Next.js application that demonstrates how to use the OpenRouteService (ORS) API to display isochrones on a map. Isochrones are areas that can be reached within a certain amount of time or distance from a given point.

## Features

-   Displays isochrones on a Leaflet map.
-   Allows users to click on the map to generate isochrones from that location.
-   Uses the OpenRouteService API to calculate isochrones.
-   Includes a UI to set parameters like transport mode, range type (distance/time), range value and interval value.
-   Reverse geocoding to display city and country information for a clicked location.

## Technologies Used

-   [Next.js](https://nextjs.org/) - A React framework for building web applications.
-   [OpenRouteService API](https://openrouteservice.org/) - An open-source routing service API.
-   [Leaflet](https://leafletjs.com/) - A JavaScript library for creating interactive maps.
-   [React Leaflet](https://react-leaflet.js.org/) - React components for Leaflet maps.
-   [Ant Design](https://ant.design/) - A UI library for React.
-   [Axios](https://axios-http.com/docs/intro) - Promise based HTTP client for the browser and node.js

## Prerequisites

-   Node.js (version 18 or later)
-   npm or yarn
-   An OpenRouteService API key (You can get one for free at [OpenRouteService](https://openrouteservice.org/))

## Getting Started

1.  Clone the repository:

    ```bash
    git clone https://github.com/YOUR_GITHUB_USERNAME/geospatial-apis-javascript-tutorials.git
    cd geospatial-apis-javascript-tutorials/ors-isochrones
    ```

2.  Install the dependencies:

    ```bash
    npm install
    # or
    yarn install
    ```

3.  Set up your environment variables:

    -   Create a `.env` file in the root directory of the project.
    -   Add your OpenRouteService API key to the `.env` file:

        ```
        NEXT_PUBLIC_ORS_API_KEY=YOUR_ORS_API_KEY
        ```

4.  Run the development server:

    ```bash
    npm run dev
    # or
    yarn dev
    ```

    Open your browser and navigate to `http://localhost:3000` to see the application running.

## Usage

1.  Click on the map to set a location.
2.  The application will display isochrones for the selected location, based on the default parameters.
3.  Use the controls in the left panel to adjust the parameters:
    -   **Transport Mode:** Currently set to "Car".
    -   **Range Type:** Choose between "Distance" and "Time".
    -   **Unity:** Select the unit for distance ("Kilometers", "Meters") or time ("minutes").
    -   **Range Value:** Set the maximum range value using the slider or the input number.
    -   **Interval Value:** Set the interval between isochrones using the slider or the input number.
4.  The isochrones will update automatically based on the selected parameters.

## API Endpoints

-   `/api/isochrones`: This endpoint is used to fetch isochrones from the OpenRouteService API. It accepts a POST request with the following parameters in the body:
    -   `lng`: Longitude of the location.
    -   `lat`: Latitude of the location.
    -   `isochronesParam`: An object containing the following properties:
        -   `profile`: Transport mode (e.g., "driving-car").
        -   `rangeType`: "distance" or "time".
        -   `unity`: Unit of the range value (e.g., "km", "m", "min").
        -   `rangeValue`: The maximum range value.
        -   `intervalValue`: The interval between isochrones.

## Project Structure
