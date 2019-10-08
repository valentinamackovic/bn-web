package pages.components.admin.fans.manage;

import java.time.LocalDateTime;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;

import pages.BaseComponent;
import utils.ProjectUtils;

public class FanProfileEventSummaryComponent extends BaseComponent{

	private WebElement container;
	
	private String relativeEventNameXpath = "./div/div/div/div[1]/p[1]/span";
	
	private String relativeEventVenueXpath = "./div/div/div/div[1]/p[2]";
	
	private String relativeEventStartDateAndTimeXpath = "./div/div/div/div[1]/p[3]";
	
	private String relativeShowDetailsButton = ".//div/p[contains(text(),'Show all details')]";
	
	public FanProfileEventSummaryComponent(WebDriver driver, WebElement container) {
		super(driver);
		this.container = container;
	}
	
	public String getEventName() {
		return getEventNameElement().getText();
	}
	
	public String getVenueInfo() {
		return getVenueInfoElement().getText();
	}
	
	public LocalDateTime getEventDateAndTime() {
		String text = getEventDateAndTimeInfoElement().getText();
		LocalDateTime ldt = ProjectUtils.parseDateTime(ProjectUtils.MANAGE_ORDER_HISTORY_ITEM_DATE_FORMAT, text);
		return ldt;
	}
	
	public WebElement getShowDetailsButtonElement() {
		return getAccessUtils().getChildElementFromParentLocatedBy(container, By.xpath(relativeShowDetailsButton));
	}
	
	private WebElement getEventNameElement() {
		return getAccessUtils().getChildElementFromParentLocatedBy(container, 
				By.xpath(relativeEventNameXpath));
	}
	
	private WebElement getVenueInfoElement() {
		return getAccessUtils().getChildElementFromParentLocatedBy(container, 
				By.xpath(relativeEventVenueXpath));
	}
	
	private WebElement getEventDateAndTimeInfoElement() {
		return getAccessUtils().getChildElementFromParentLocatedBy(container, 
				By.xpath(relativeEventStartDateAndTimeXpath));
	}
}
