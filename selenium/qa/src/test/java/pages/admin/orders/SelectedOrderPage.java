package pages.admin.orders;

import java.util.List;
import java.util.Optional;
import java.util.function.Predicate;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.ui.ExpectedConditions;

import pages.BasePage;
import pages.components.admin.orders.manage.OrderHistoryActivityItem;
import pages.components.admin.orders.manage.tickets.OrderDetails;
import pages.components.admin.orders.manage.tickets.TicketRow;
import utils.Constants;

public class SelectedOrderPage extends BasePage {

	private final String orderId;
	
	private OrderDetails orderDetails;

	@FindBy(xpath = "//main//div/p[contains(text(),'Show')]")
	private WebElement showOrdersDetailsExpander;

	@FindBy(xpath = "//main//div/p[contains(text(),'Hide')]")
	private WebElement hideOrderDetailsExpander;
	
	@FindBy(xpath = "//button[@type='button' and span[contains(text(),'Refund')]]")
	private WebElement refundButton;

	public SelectedOrderPage(WebDriver driver, String orderId) {
		super(driver);
		this.orderId = orderId;
	}

	@Override
	public void presetUrl() {
	}

	@Override
	public boolean isAtPage() {
		return explicitWait(15,
				ExpectedConditions.urlMatches(Constants.getAdminEvents() + "/*.*/dashboard/orders/manage/" + orderId));
	}
	
	public void expandOrderDetails() {
		this.orderDetails = new OrderDetails(driver);
		explicitWaitForVisibilityAndClickableWithClick(showOrdersDetailsExpander);
	}
	
	public boolean closeOrderDetails() {
		explicitWaitForVisibilityAndClickableWithClick(hideOrderDetailsExpander);
		boolean retVal = orderDetails.isClosed();
		if (retVal)
			orderDetails = null;
		return retVal;
	}
	
	public void clickOnRefundButton() {
		explicitWaitForVisibilityAndClickableWithClick(refundButton);
	}
	
	public TicketRow findTicketRow(Predicate<TicketRow> predicate) {
		return this.orderDetails.findTicketRow(predicate);
	}
	
	public OrderDetails getOrderDetails() {
		return this.orderDetails;
	}
	
	public OrderHistoryActivityItem getHistoryActivityItem(Predicate<OrderHistoryActivityItem> predicate) {
		List<WebElement> historyItems = findOrderHistoryRows();
		Optional<OrderHistoryActivityItem> activityItem = historyItems.stream()
				.map(e->new OrderHistoryActivityItem(driver, e))
				.filter(predicate).findFirst();
		return activityItem.isPresent() ? activityItem.get() : null;
	}
	
	public Integer getNumberOfHistoryItemRows() {
		List<WebElement> rows = findOrderHistoryRows();
		return rows != null ? rows.size() : 0;
	}
	
	public Integer getNumberOfAllCollapsedRows() {
		List<WebElement> rows = findAllRowsThatAreCollapsed();
		return rows != null ? rows.size() : 0;
	}
	
	private List<WebElement> findOrderHistoryRows() {
		List<WebElement> rows = explicitWaitForVisiblityForAllElements(
				By.xpath("//main//p[contains(text(),'Order history')]/following-sibling::div[not(@class)]"));
		return rows;
	}
	
	private List<WebElement> findAllRowsThatAreCollapsed() {
		List<WebElement> rows = explicitWaitForVisiblityForAllElements(
				By.xpath("//main//p[contains(text(),'Order history')]/following-sibling::div[not(@class)]//p[span[contains(text(),'Show Details')]]"));
		return rows;
	}

}
