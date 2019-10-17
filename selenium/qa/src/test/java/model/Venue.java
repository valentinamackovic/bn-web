package model;

import java.io.Serializable;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.core.type.TypeReference;

import utils.DataReader;
import utils.ProjectUtils;


public class Venue extends Model implements Serializable {

	private static final long serialVersionUID = 7824190591509663973L;
	@JsonProperty("name")
	private String name;
	@JsonProperty("organization_name")
	private String organization;
	@JsonProperty("timezone")
	private String timezone;
	@JsonProperty("region")
	private String region;
	@JsonProperty("phone_number")
	private String phoneNumber;
	@JsonProperty("location")
	private String location;
	@JsonProperty("image_name")
	private String imageName;
	
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getOrganization() {
		return organization;
	}
	public void setOrganization(String organization) {
		this.organization = organization;
	}
	public String getTimezone() {
		return timezone;
	}
	public void setTimezone(String timezone) {
		this.timezone = timezone;
	}
	public String getRegion() {
		return region;
	}
	public void setRegion(String region) {
		this.region = region;
	}
	public String getPhoneNumber() {
		return phoneNumber;
	}
	public void setPhoneNumber(String phoneNumber) {
		this.phoneNumber = phoneNumber;
	}
	public String getLocation() {
		return location;
	}
	public void setLocation(String location) {
		this.location = location;
	}
	public String getImageName() {
		return imageName;
	}
	public void setImageName(String imageName) {
		this.imageName = imageName;
	}
	@Override
	public String toString() {
		String[] fields = {this.name, this.organization, this.imageName};
		StringBuilder sb = new StringBuilder();
		ProjectUtils.appendFields(fields, sb);
		return sb.toString();
	}
	
	public static Venue generateVenueFromJson(String key) {
		return (Venue) DataReader.getInstance().getObject(key, getTypeReference());
	}
	
	public static TypeReference<Venue> getTypeReference(){
		return new TypeReference<Venue>() {
		};
	}
}
