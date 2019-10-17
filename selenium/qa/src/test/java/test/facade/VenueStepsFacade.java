package test.facade;

import java.util.HashMap;
import java.util.Map;

import org.junit.Assert;
import org.openqa.selenium.WebDriver;

import model.Venue;
import pages.admin.venue.AdminVenuePage;
import pages.admin.venue.CreateVenuePage;
import pages.components.ManualAddressEntryComponent;
import pages.components.admin.AdminSideBar;
import pages.components.admin.venues.AdminVenueComponent;
import utils.MsgConstants;
import utils.ProjectUtils;

public class VenueStepsFacade extends BaseFacadeSteps {
	
	private AdminVenuePage venuePage;
	private CreateVenuePage createVenuePage;
	private AdminSideBar adminSideBar;
	private Map<String, Object> dataMap;
	
	private final String VENUE_NAME_KEY = "venue_name_key";

	public VenueStepsFacade(WebDriver driver) {
		super(driver);
		this.venuePage = new AdminVenuePage(driver);
		this.createVenuePage = new CreateVenuePage(driver);
		this.adminSideBar = new AdminSideBar(driver);
		this.dataMap = new HashMap<String, Object>();
	}
	
	public void givenUserIsOnVenuesPage() {
		adminSideBar.clickOnVenues();
		thenUserIsOnVenuesPage();
	}
	
	public void givenUserIsOnCreateVenuePage() {
		venuePage.clickOnCreateVenueButton();
		thenUserIsOnCreateVenuePage();
	}
	
	public void whenUserFillsOutVenueInfo(Venue venue) {
		createVenuePage.uploadImageUsingFilePath(venue.getImageName());
		createVenuePage.enterVenueName(venue.getName());
		createVenuePage.enterOrganization(venue.getOrganization());
		createVenuePage.enterTimezone(venue.getTimezone());
		createVenuePage.enterRegion(venue.getRegion());
		createVenuePage.enterPhoneNumber(venue.getPhoneNumber());
		createVenuePage.enterVenueLocation(venue.getLocation());
	}
	
	public void whenUserClicksOnCreateVenue() {
		createVenuePage.clickOnCreateButton();
	}
	
	public void whenUserClicksOnEditButtonOfSelectedVenue(String venueName) {
		AdminVenueComponent selectedVenue = venuePage.findVenueByName(venueName);
		String vName = selectedVenue.getVenueName();
		setData(VENUE_NAME_KEY, vName);
		selectedVenue.clickOnEditButton();
	}
	
	public void whenUserUpdatesVenue(Venue venue) {
		String venueName = (String) getData(VENUE_NAME_KEY);
		String updatedName = ProjectUtils.setSuffixDateOfText(venueName);
		createVenuePage.enterVenueName(updatedName);
		createVenuePage.enterPhoneNumber(venue.getPhoneNumber());
		createVenuePage.enterVenueLocation(venue.getLocation());
	}
	
	public boolean thenCoordinatesShouldBeFilled() {
		return createVenuePage.checkIfCoordinatesArePresent();
	}
	
	public void whenUserClickOnUpdateButtonOnEditPage() {
		createVenuePage.clickOnUpdateButton();
	}
	
	public boolean thenNotificationVenueCreatedShouldBeVisible() {
		return venuePage.isNotificationDisplayedWithMessage(MsgConstants.VENUE_CREATED_SUCCESS);
	}
	
	public boolean thenNotificationVenueUpdatedShoudBeVisible() {
		return venuePage.isNotificationDisplayedWithMessage(MsgConstants.VENUE_UPDATED_SUCCESS);
	}
	
	public boolean thenUserIsOnVenuesPage() {
		return venuePage.isAtPage();
	}
	
	public boolean thenUserIsOnCreateVenuePage() {
		return createVenuePage.isAtPage();
	}

	@Override
	protected void setData(String key, Object value) {
		this.dataMap.put(key, value);
	}

	@Override
	protected Object getData(String key) {
		return this.dataMap.get(key);
	}

}
