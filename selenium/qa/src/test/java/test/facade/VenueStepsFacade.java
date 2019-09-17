package test.facade;

import org.openqa.selenium.WebDriver;

import model.Venue;
import pages.admin.venue.AdminVenuePage;
import pages.admin.venue.CreateVenuePage;
import pages.components.admin.AdminSideBar;

public class VenueStepsFacade extends BaseFacadeSteps {
	
	private AdminVenuePage venuePage;
	private CreateVenuePage createVenuePage;
	private AdminSideBar adminSideBar;

	public VenueStepsFacade(WebDriver driver) {
		super(driver);
		this.venuePage = new AdminVenuePage(driver);
		this.createVenuePage = new CreateVenuePage(driver);
		this.adminSideBar = new AdminSideBar(driver);
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
		System.out.println();		
	}
	
	public void whenUserClicksOnCreateVenue() {
		createVenuePage.clickOnCreateButton();
	}
	
	public boolean thenUserIsOnVenuesPage() {
		return venuePage.isAtPage();
	}
	
	public boolean thenUserIsOnCreateVenuePage() {
		return createVenuePage.isAtPage();
	}
	

}
