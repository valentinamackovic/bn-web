package test;

import org.testng.Assert;
import org.testng.annotations.DataProvider;
import org.testng.annotations.Test;


import model.User;
import model.Venue;
import test.facade.LoginStepsFacade;
import test.facade.VenueStepsFacade;

public class VenueStepsIT extends BaseSteps {
	
	
	@Test(dataProvider = "create_venue_data", priority = 20, retryAnalyzer = utils.RetryAnalizer.class)
	public void createVenue(Venue venue, User superuser) {
		LoginStepsFacade loginFacade = new LoginStepsFacade(driver);
		VenueStepsFacade venueStepsFacade = new VenueStepsFacade(driver);
		maximizeWindow();
				
		loginFacade.givenAdminUserIsLogedIn(superuser);
		venueStepsFacade.givenUserIsOnVenuesPage();
		venueStepsFacade.givenUserIsOnCreateVenuePage();
		
		venueStepsFacade.whenUserFillsOutVenueInfo(venue);
		venueStepsFacade.whenUserClicksOnCreateVenue();
		
		boolean isNotificationVisible = venueStepsFacade.thenNotificationVenueCreatedShouldBeVissible();
		Assert.assertTrue(isNotificationVisible);
		
		loginFacade.logOut();
	}
	
	@DataProvider(name = "create_venue_data")
	private static Object[][] createVenueData(){
		Venue venue = new Venue();
		venue.setImageName("lorem_ipsum_img_101.jpg");
//		venue.setImageName("https://picsum.photos/id/101/1600/900");
		venue.setName("venueName2");
		venue.setOrganization("Auto Test12");
		venue.setTimezone("Africa/Johannesburg");
		venue.setRegion("No Region");
		venue.setPhoneNumber("123456789012");
		venue.setLocation("Opera, Douglas Drive, Douglasdale, Johannesburg, South Africa");
		
		User superuser = User.generateSuperUser();
		return new Object[][] {
			{venue, superuser}
		};

	}

}
