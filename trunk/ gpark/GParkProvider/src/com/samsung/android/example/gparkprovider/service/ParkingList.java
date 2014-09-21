package com.samsung.android.example.gparkprovider.service;

public class ParkingList {
	private String Name;
	private String Address;
    private String Latitude;
    private String Longitude;
    private String Price;
	private Double Distance;
    
    public ParkingList(){
    	
    }
 public ParkingList(String name, String address, String lat, String lon, Double dist){
	 super();
	 this.Name = name;
	 this.Address = address;
	 this.Latitude = lat;
	 this.Longitude = lon;
	 this.Distance = dist;
    }
    public String getName() {
		return Name;
	}
	public void setName(String name) {
		Name = name;
	}
	public String getAddress() {
		return Address;
	}
	public void setAddress(String address) {
		Address = address;
	}
	public String getLatitude() {
		return Latitude;
	}
	public void setLatitude(String latitude) {
		Latitude = latitude;
	}
	public String getLongitude() {
		return Longitude;
	}
	public void setLongitude(String longitude) {
		Longitude = longitude;
	}
	public String getPrice() {
		return Price;
	}
	public void setPrice(String price) {
		Price = price;
	}
	 public Double getDistance() {
	        return Distance;
	    }
	    public void setDistance(Double distance) {
	        Distance = distance;
	    }
	@Override
	public String toString() {
		return "{\"Name\":\"" + Name + "\", \"Address\":\"" + Address
				+ "\", \"Latitude\":\"" + Latitude + "\", \"Longitude\":\"" + Longitude
				+ "\", \"Price\":\"" + Price + "\", \"Distance\":\"" + Distance + "\"}";
	}

}
