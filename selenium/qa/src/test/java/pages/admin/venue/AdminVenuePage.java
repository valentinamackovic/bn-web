package pages.admin.venue;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;

import pages.BasePage;
import utils.Constants;

public class AdminVenuePage extends BasePage {
	
	@FindBy(xpath = "//a[@href='/admin/venues/create']/button[span[text()='Create venue']]")
	private WebElement createVenueButton;

	public AdminVenuePage(WebDriver driver) {
		super(driver);
	}

	@Override
	public void presetUrl() {
		setUrl(Constants.getAdminVenues());
	}
	
	public void clickOnCreateVenueButton() {
		explicitWaitForVisibilityAndClickableWithClick(createVenueButton);
	}
	
	
	

}
