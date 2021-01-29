import React, { Component } from "react";
import { GoogleMap, withScriptjs, withGoogleMap, Marker } from "react-google-maps";

class Map extends Component {

  render() {
    return (
      <GoogleMap
        defaultZoom={15}
        defaultCenter={{ lat: 40.742396, lng: 30.325244 }}
        onClick={this.props.handleMapClick}
      >
      {this.props.isMarker && <Marker position={{lat: this.props.lat, lng: this.props.lng}}/>}
          
      </GoogleMap>
    );
  }
}

const WrappedMap = withScriptjs(withGoogleMap(Map));

export default WrappedMap;
