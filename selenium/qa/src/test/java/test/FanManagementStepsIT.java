package test;

import org.testng.Assert;
import org.testng.annotations.DataProvider;
import org.testng.annotations.Test;

import model.CreditCard;
import model.Event;
import model.Purchase;
import model.User;
import pages.EventsPage;
import test.facade.AdminFanManagementFacade;
import test.facade.EventStepsFacade;
import test.facade.LoginStepsFacade;
import utils.DataConstants;

public class FanManagementStepsIT extends BaseSteps {
	
	private static final String EVENT_NAME = "TestFanManagementEventName";
	private static final Integer START_DAY_OFFSET = 1;
	private static final Integer DAYS_RANGE = 2;
	private static final Integer PURCHASE_QUANTITY = 1;
	private Purchase purchase;
	
	
	@Test(dataProvider = "fan_profile_data", dependsOnMethods = {"predifinedDataUserPurchasesTickets"},
			priority = 20, retryAnalyzer = utils.RetryAnalizer.class )
	public void aviewFanProfileAndEventsFiltering(User fan, User orgAdmin, Purchase purchase) {
		LoginStepsFacade loginFacade = new LoginStepsFacade(driver);
		AdminFanManagementFacade fanManagementFacade = new AdminFanManagementFacade(driver);
		maximizeWindow();
		loginAndNavigationSteps(loginFacade, fanManagementFacade, fan, orgAdmin);
		
		boolean isFanInfoValid = fanManagementFacade.whenUserChecksValidityOfFanInformation(fan);
		Assert.assertTrue(isFanInfoValid, "Fan information on fan profile page is not valid for fan: " + fan.getEmailAddress());
		
		fanManagementFacade.whenUserChecksUpcomingEventList();
		boolean isOnPastEventsPage = fanManagementFacade.whenUserClicksOnPastEventsLink();
		Assert.assertTrue(isOnPastEventsPage, "Failed to load past event list for fan: " + fan.getEmailAddress());
		
		boolean checkIfEventsAreDifferent = fanManagementFacade.thenUserComparesUpcomingAndPastEventLists();
		Assert.assertTrue(checkIfEventsAreDifferent, "Events in upcoming and past list are not different");
		loginFacade.logOut();
	}
	
	
	@Test(dataProvider = "fan_profile_data", priority = 20, retryAnalyzer = utils.RetryAnalizer.class)
	public void bfanProfileEventSummaryCardContainsData(User fan, User orgAdmin, Purchase purchase) {
		LoginStepsFacade loginFacade = new LoginStepsFacade(driver);
		AdminFanManagementFacade fanManagementFacade = new AdminFanManagementFacade(driver);
		maximizeWindow();
		loginAndNavigationSteps(loginFacade, fanManagementFacade, fan, orgAdmin);
		
		boolean isSummaryCardDataPresent = fanManagementFacade.thenEventSummaryDataShouldBePresentAndActivitiesCollapsed();
		Assert.assertTrue(isSummaryCardDataPresent);
		
		loginFacade.logOut();
	}
	
	
	
	private void loginAndNavigationSteps(LoginStepsFacade loginFacade, AdminFanManagementFacade fanManagementFacade, User fan, User orgAdmin) {
		loginFacade.givenAdminUserIsLogedIn(orgAdmin);
		fanManagementFacade.givenUserIsOnFansPage();
		fanManagementFacade.whenUserSelectsFanFormList(fan);
	}
	
	
	@DataProvider(name = "fan_profile_data")
	public static Object[][] fanProfileData(){
		Purchase purchase = preparePurchase();
		User fan = User.generateUserFromJson(DataConstants.DISTINCT_USER_THREE_KEY);
		User orgAdmin = User.generateUserFromJson(DataConstants.ORGANIZATION_ADMIN_USER_KEY);
		return new Object[][] {{fan, orgAdmin, purchase}};
	}
	
//	@Test(dataProvider = "purchase_data", priority = 13)
	public void predifinedDataUserPurchasesTickets(User fan, Purchase purchase) throws Exception {
		maximizeWindow();
		EventStepsFacade eventsFacade = new EventStepsFacade(driver);

		// given
		eventsFacade.givenUserIsOnEventPage();

		EventsPage eventsPage = eventsFacade.givenThatEventExist(purchase.getEvent(), fan);
		// when
		eventsFacade.whenUserExecutesEventPagesStepsWithoutMapView(purchase.getEvent());

		Assert.assertTrue(eventsFacade.thenUserIsAtTicketsPage());

		eventsFacade.whenUserSelectsNumberOfTicketsAndClicksOnContinue(purchase);
		eventsFacade.whenUserLogsInOnTicketsPage(fan);
		eventsFacade.thenUserIsAtConfirmationPage();
		eventsFacade.whenUserEntersCreditCardDetailsAndClicksOnPurchase(purchase.getCreditCard());

		// then
		eventsFacade.thenUserIsAtTicketPurchaseSuccessPage();
		eventsPage.logOut();

	}

	@DataProvider(name = "purchase_data")
	public static Object[][] data() {
		Purchase purchaseOne = preparePurchase();

		User fan = User.generateUserFromJson(DataConstants.DISTINCT_USER_THREE_KEY);
		
		return new Object[][] { { fan, purchaseOne }};
	}

	private static Purchase preparePurchase() {
		Purchase purchase = Purchase.generatePurchaseFromJson(DataConstants.REGULAR_USER_PURCHASE_KEY);
		purchase.setCreditCard(CreditCard.generateCreditCard());
		purchase.setNumberOfTickets(PURCHASE_QUANTITY);
		purchase.setEvent(Event.generateEventFromJson(DataConstants.EVENT_DATA_STANARD_KEY,
				EVENT_NAME, false, START_DAY_OFFSET, DAYS_RANGE));
		return purchase;
	}


}
