package com.samsung.android.example.gparkprovider.service;

import android.content.Context;
import android.location.Criteria;
import android.location.Location;
import android.location.LocationManager;
import android.widget.Toast;

public class CurrentLocationService {
	LocationManager locationManager;
	Context ctx;
	Double lat, lon;
	public CurrentLocationService (Context ctx) {
		this.ctx = ctx;
		locationManager = (LocationManager) ctx.getSystemService(Context.LOCATION_SERVICE);
		
	}
	
	public String getCurrentLocation() {
		String latLng = null;
		if (checkGPSEnabled()) {
			// Define the criteria how to select the locatioin provider -> use
		    // default
		    Criteria criteria = new Criteria();
		    String provider = locationManager.getBestProvider(criteria, false);
		    Location location = locationManager.getLastKnownLocation(provider);

		    // Initialize the location fields
		    if (location != null) {
		    	double lat = (double) (location.getLatitude());
		        double lng = (double) (location.getLongitude());
		        setLat(lat);
		        setLon(lng);		        
		        latLng = Double.toString(lat) + " " + Double.toString(lng);
		    } else {
		    	setLat(60.1806310);
		    	setLon(24.8312830);
		    	latLng = Double.toString(60.1806310) + " " + Double.toString(24.8312830);
		    	Toast.makeText(ctx, "Current Location couldnot be found", Toast.LENGTH_SHORT).show();
		    }
			
		} else {
			Toast.makeText(ctx, "GPS not enabled", Toast.LENGTH_SHORT).show();
		}
		return latLng;
	}

	private boolean checkGPSEnabled() {		
		boolean enabled = locationManager
		  .isProviderEnabled(LocationManager.GPS_PROVIDER);
		return enabled;
		
	}
	public Double getLat() {
		return lat;
	}

	public void setLat(Double lat) {
		this.lat = lat;
	}

	public Double getLon() {
		return lon;
	}

	public void setLon(Double lon) {
		this.lon = lon;
	}

}
