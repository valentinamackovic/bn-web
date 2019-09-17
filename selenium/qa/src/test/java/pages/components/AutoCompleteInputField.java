package pages.components;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;

import pages.BaseComponent;

public class AutoCompleteInputField extends BaseComponent{
	
	private WebElement inputField;

	public AutoCompleteInputField(WebDriver driver, WebElement inputField) {
		super(driver);
		this.inputField = inputField;
	}
	
	public void selectFirstSuggestion(String value) {
		explicitWaitForVisiblity(inputField);
		waitForTime(2000);
		waitVisibilityAndSendKeysSlow(inputField, value);
		WebElement firstInList = explicitWait(15, ExpectedConditions.visibilityOfElementLocated(By.xpath(
				"//div[contains(@class,'autocomplete-dropdown-container')]/div[contains(@class,'suggestion-item')]")));
		explicitWaitForVisibilityAndClickableWithClick(firstInList);
	}

}
