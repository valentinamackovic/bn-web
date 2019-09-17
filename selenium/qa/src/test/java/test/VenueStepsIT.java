package test;

import org.testng.annotations.DataProvider;
import org.testng.annotations.Test;

import model.User;
import model.Venue;
import test.facade.LoginStepsFacade;
import test.facade.VenueStepsFacade;

public class VenueStepsIT extends BaseSteps {
	
	
	@Test(dataProvider = "create_venue_data")
	public void createVenue(Venue venue, User superuser) {
		LoginStepsFacade loginFacade = new LoginStepsFacade(driver);
		VenueStepsFacade venueStepsFacade = new VenueStepsFacade(driver);
		maximizeWindow();
		
		loginFacade.givenAdminUserIsLogedIn(superuser);
		venueStepsFacade.givenUserIsOnVenuesPage();
		venueStepsFacade.givenUserIsOnCreateVenuePage();
		
		venueStepsFacade.whenUserFillsOutVenueInfo(venue);
		
		loginFacade.logOut();
	}
	
	@DataProvider(name = "create_venue_data")
	private static Object[][] createVenueData(){
		Venue venue = new Venue();
		venue.setImageName("lorem_ipsum_img_101.jpg");
		venue.setName("venueName2");
		venue.setOrganization("Auto Test12");
		venue.setTimezone("Africa/Johannesburg");
		venue.setRegion("No Region");
		venue.setPhoneNumber("11111111111");
		venue.setLocation("Opera, Douglas Drive, Douglasdale, Johannesburg, South Africa");
		
		User superuser = User.generateSuperUser();
		return new Object[][] {
			{venue, superuser}
		};

	}

}
