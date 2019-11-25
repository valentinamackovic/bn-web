package test.facade.orders.order;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.openqa.selenium.WebDriver;

import model.Event;
import model.Purchase;
import model.TicketType;
import model.User;
import pages.admin.orders.manage.SelectedOrderPage;
import pages.components.admin.orders.manage.ActivityItem;
import pages.components.admin.orders.manage.ActivityItem.ExpandedContent;
import pages.components.admin.orders.manage.ActivityItem.NoteExpandedContent;
import pages.components.admin.orders.manage.ActivityItem.RefundedExpandedContent;
import pages.components.admin.orders.manage.tickets.TicketRow;
import pages.components.admin.orders.manage.tickets.OrderDetails.PerOrderFeeComponent;
import pages.components.dialogs.IssueRefundDialog;
import pages.components.dialogs.IssueRefundDialog.RefundReason;
import test.facade.BaseFacadeSteps;
import test.facade.FacadeProvider;
import utils.MsgConstants;
import utils.ProjectUtils;

public class OrderManageFacade extends BaseFacadeSteps{
	
	private Map<String, Object> dataMap;
	private final String SELECTED_ORDER_PAGE_KEY = "selected_order_page";
	private final String ISSUE_REFUND_DIALOG_KEY = "issue_refund_dialog";
	private final String TOTAL_REFUND_AMOUNT_KEY = "total_refund_amount";
	private final String TEMP_TOTAL_REFUND_AMOUNT_KEY = "temp_total_refund_amount";

	public OrderManageFacade(WebDriver driver) {
		super(driver);
		this.dataMap = new HashMap<String, Object>();
	}
	
	public boolean whenUserExpandOrderDetailsAndCheckIfExpanded() {
		SelectedOrderPage selectedOrderPage = (SelectedOrderPage) getData(SELECTED_ORDER_PAGE_KEY);
		selectedOrderPage.expandOrderDetails();
		return selectedOrderPage.getOrderDetails().isExpanded();
	}
	
	public void whenUserSelectsTicketForRefundAndClicksOnRefundButton() {
		whenUserSelectsPurchasedStatusTicketForRefund();
		whenUserClicksOnRefundButton();
	}

	public void whenUserClicksOnOrderFeeCheckBox() {
		SelectedOrderPage selectedOrderPage = (SelectedOrderPage) getData(SELECTED_ORDER_PAGE_KEY);
		PerOrderFeeComponent perOrderFee = selectedOrderPage.getOrderDetails().getPerOrderFee();
		perOrderFee.clickOnCheckBoxes();
		if (perOrderFee.isEntirePerOrderFeeChecked()) {
			addAmountToTotalRefundAmount(perOrderFee.getMoneyAmount());
		}
	}

	public void whenUserSelectsAllTicketsForRefund() {
		SelectedOrderPage selectedOrderPage = (SelectedOrderPage) getData(SELECTED_ORDER_PAGE_KEY);
		BigDecimal ticketsTotal = selectedOrderPage.selectAllTicketRowsForRefundGetFeeSum();
		addAmountToTotalRefundAmount(ticketsTotal);
	}

	public void whenUserSelectsRefundedStatusTicketForRefund() {
		SelectedOrderPage selectedOrderPage = (SelectedOrderPage) getData(SELECTED_ORDER_PAGE_KEY);
		TicketRow row = selectedOrderPage.findTicketRow(ticket -> ticket.isTicketRefunded());
		row.clickOnCheckoutBoxInTicket();
	}

	public void whenUserSelectsPurchasedStatusTicketForRefund() {
		SelectedOrderPage selectedOrderPage = (SelectedOrderPage) getData(SELECTED_ORDER_PAGE_KEY);
		TicketRow row = selectedOrderPage.findTicketRow(r -> r.isTicketPurchased());
		row.clickOnCheckoutBoxInTicket();
		BigDecimal totalAmount = row.getTicketTotalAmount();
		BigDecimal perTicketFee = row.getPerTicketFeeAmount();
		addAmountToTotalRefundAmount(totalAmount);
		addAmountToTotalRefundAmount(perTicketFee);
	}
	
	public void whenUserRemembersRefundTotalOfOrder() {
		SelectedOrderPage selectedOrderPage = (SelectedOrderPage) getData(SELECTED_ORDER_PAGE_KEY);
		BigDecimal refundTotal = selectedOrderPage.getOrderRefundTotalAmount();
		addAmountToTempTotalAmount(refundTotal);
	}

	public void whenUserClicksOnRefundButton() {
		SelectedOrderPage selectedOrderPage = (SelectedOrderPage) getData(SELECTED_ORDER_PAGE_KEY);
		selectedOrderPage.clickOnRefundButton();
	}

	public boolean thenRefundButtonShouldBeVisible() {
		SelectedOrderPage selectedOrderPage = (SelectedOrderPage) getData(SELECTED_ORDER_PAGE_KEY);
		return selectedOrderPage.isRefundButtonVisible();
	}
	
	private void addAmountToTempTotalAmount(BigDecimal amount) {
		addAmountToTotalAmount(amount, TEMP_TOTAL_REFUND_AMOUNT_KEY);
	}

	private void addAmountToTotalRefundAmount(BigDecimal amount) {
		addAmountToTotalAmount(amount, TOTAL_REFUND_AMOUNT_KEY);
	}
	
	private void addAmountToTotalAmount(BigDecimal amount, String key) {
		BigDecimal totalAmount =  (BigDecimal) getData(key);
		if (totalAmount == null) {
			totalAmount = new BigDecimal(0);
		}
		totalAmount = totalAmount.add(amount);
		setData(key, totalAmount);
	}

	public boolean thenTotalOrderRefundShouldBeCorrect() {
		SelectedOrderPage selectedOrderPage = (SelectedOrderPage) getData(SELECTED_ORDER_PAGE_KEY);
		BigDecimal totalOrderRefund = selectedOrderPage.getOrderRefundTotalAmount();
		BigDecimal tempTotalRefund = (BigDecimal) getData(TEMP_TOTAL_REFUND_AMOUNT_KEY);
		BigDecimal sumOfRefunds = (BigDecimal) getData(TOTAL_REFUND_AMOUNT_KEY);
		if (tempTotalRefund != null) {
			sumOfRefunds = sumOfRefunds.add(tempTotalRefund);
		}
		return totalOrderRefund.compareTo(sumOfRefunds) == 0;
	}

	public boolean thenStatusOnAllTicketShouldBeRefunded() {
		SelectedOrderPage selectedOrderPage = (SelectedOrderPage) getData(SELECTED_ORDER_PAGE_KEY);
		List<TicketRow> allTickets = selectedOrderPage.getOrderDetails().findAllTicketRows();
		return allTickets.stream().allMatch(ticket -> ticket.isTicketRefunded());
	}

	public boolean thenRefundDialogShouldBeVisible() {
		IssueRefundDialog refundDialog = new IssueRefundDialog(driver);
		setData(ISSUE_REFUND_DIALOG_KEY, refundDialog);
		return refundDialog.isVisible();
	}

	public boolean thenRefundButtonAmountShouldBeCorrect() {
		SelectedOrderPage selectedOrderPage = (SelectedOrderPage) getData(SELECTED_ORDER_PAGE_KEY);
		BigDecimal totalAmount = (BigDecimal) getData(TOTAL_REFUND_AMOUNT_KEY);
		BigDecimal refundButtonAmount = selectedOrderPage.getRefundButtonMoneyAmount();
		return totalAmount.compareTo(refundButtonAmount) == 0;
	}
	public boolean thenRefundTotalOnRefundDialogShouldBeCorrect() {
		IssueRefundDialog refundDialog = (IssueRefundDialog) getData(ISSUE_REFUND_DIALOG_KEY);
		BigDecimal totalAmount = (BigDecimal) getData(TOTAL_REFUND_AMOUNT_KEY);
		BigDecimal refundDialogTotal = refundDialog.getRefundTotalAmount();
		return totalAmount.compareTo(refundDialogTotal) == 0;

	}

	public void whenUserSelectRefundReasonAndClicksOnConfirmButton(RefundReason refundReason) {
		IssueRefundDialog refundDialog = (IssueRefundDialog) getData(ISSUE_REFUND_DIALOG_KEY);
		refundDialog.selectRefundReason(refundReason);
		refundDialog.clickOnContinue();
	}

	public void whenUserClicksOnGotItButtonOnRefundSuccessDialog() {
		IssueRefundDialog refundDialog = (IssueRefundDialog) getData(ISSUE_REFUND_DIALOG_KEY);
		refundDialog.isVisible();
		refundDialog.clickOnGotItButton();
	}
	
	public void refundSteps(RefundReason refundReason) {
		whenUserExpandOrderDetailsAndCheckIfExpanded();
		whenUserSelectsTicketForRefundAndClicksOnRefundButton();
		thenRefundDialogShouldBeVisible();
		whenUserSelectRefundReasonAndClicksOnConfirmButton(RefundReason.OTHER);
		thenRefundDialogShouldBeVisible();
		whenUserClicksOnGotItButtonOnRefundSuccessDialog();
	}
	
	public boolean thenUserIsOnSelectedManageOrderPage(SelectedOrderPage selectedOrderPage) {
		boolean retVal = selectedOrderPage.isAtPage();
		if (retVal) {
			setData(SELECTED_ORDER_PAGE_KEY, selectedOrderPage);
			return retVal;
		} 
		return retVal;
	}
	
	public void setSelectedOrderPage(String orderId) {
		SelectedOrderPage selectedOrderPage = new SelectedOrderPage(driver, orderId);
		boolean isAtPage = selectedOrderPage.isAtPage();
		setData(SELECTED_ORDER_PAGE_KEY, selectedOrderPage);
	}
	
	public boolean thenThereShouldBeItemsInOrderHistory(int number) {
		SelectedOrderPage selectedOrderPage = (SelectedOrderPage) getData(SELECTED_ORDER_PAGE_KEY);
		Integer rows = selectedOrderPage.getNumberOfHistoryItemRows();
		return rows.equals(number);
	}

	public boolean thenAllItemsShouldBeClosed() {
		SelectedOrderPage selectedOrderPage = (SelectedOrderPage) getData(SELECTED_ORDER_PAGE_KEY);
		Integer totalNumberOfHistoryRows = selectedOrderPage.getNumberOfHistoryItemRows();
		Integer totalNumberOfColapsedRows = selectedOrderPage.getNumberOfAllCollapsedRows();
		return totalNumberOfColapsedRows.equals(totalNumberOfHistoryRows);
	}

	public boolean thenThereShouldBePurchasedHistoryItem(User user, Purchase purchase) {
		SelectedOrderPage selectedOrderPage = (SelectedOrderPage) getData(SELECTED_ORDER_PAGE_KEY);
		String userName = user.getFirstName() + " " + user.getLastName();
		ActivityItem activityItem = selectedOrderPage
				.getHistoryActivityItem(aitem -> aitem.isPruchased() && aitem.getUserName().contains(userName)
						&& aitem.getEventName().contains(purchase.getEvent().getEventName()));
		return activityItem != null ? true : false;

	}

	public boolean thenThereShouldBePurchasedHistoryItemWithNumberOfPurchases(User user, Purchase purchase,
			int numberOfPurchases) {
		SelectedOrderPage selectedOrderPage = (SelectedOrderPage) getData(SELECTED_ORDER_PAGE_KEY);
		String userName = user.getFirstName() + " " + user.getLastName();
		ActivityItem activityItem = selectedOrderPage.getHistoryActivityItem(aitem -> aitem.isPruchased()
				&& aitem.getUserName().contains(userName) && aitem.getNumberOfPurchases().equals(numberOfPurchases)
				&& aitem.getEventName().contains(purchase.getEvent().getEventName()));
		return activityItem != null ? true : false;
	}

	public boolean whenUserExpandsActivityItemAndChecksValidityOfData(Purchase purchase, Integer quantity,
			TicketType ticketType) {
		SelectedOrderPage selectedOrderPage = (SelectedOrderPage) getData(SELECTED_ORDER_PAGE_KEY);
		Event event = purchase.getEvent();
		ActivityItem activityItem = selectedOrderPage.getHistoryActivityItem(
				aitem -> aitem.isPruchased() && aitem.getEventName().contains(event.getEventName()));
		if (activityItem != null) {
			activityItem.clickOnShowDetailsLink();
			String location = event.getVenue().getLocation();
			LocalDateTime eventStartDateTime = ProjectUtils.getLocalDateTime(ProjectUtils.DATE_FORMAT,
					event.getStartDate(), ProjectUtils.TIME_FORMAT, event.getStartTime());

			BigDecimal totalTicketMoney = new BigDecimal(quantity.intValue() * Integer.parseInt(ticketType.getPrice()));
			BigDecimal totalWithFees = purchase.getEvent().getOrganization().getOtherFees().getTotalWithFees(totalTicketMoney);
			totalWithFees = ProjectUtils.roundUp(totalWithFees, 3);
			
			ExpandedContent expandedContent = activityItem.getExpandedContent();
			LocalDateTime itemDate = ProjectUtils.parseDateTime(ProjectUtils.MANAGE_ORDER_HISTORY_ITEM_DATE_FORMAT,
					expandedContent.getEventDateAndTime());
			boolean retVal = true;
			retVal = retVal && eventStartDateTime.equals(itemDate);
			retVal = retVal && location.equals(expandedContent.getVenueLocation());
			retVal = retVal && quantity.equals(expandedContent.getQuantity());
			retVal = retVal && totalWithFees.equals(expandedContent.getTotalMoneyAmount());
			return retVal;
		} else {
			return false;
		}
	}
	
	public boolean thenOrderFeeCheckboxShouldBeChecked() {
		SelectedOrderPage selectedOrderPage = (SelectedOrderPage) getData(SELECTED_ORDER_PAGE_KEY);
		return selectedOrderPage.getOrderDetails().getPerOrderFee().isEntirePerOrderFeeChecked();
	}

	public boolean thenThereShouldBeRefundedHistoryItemWithRefundee(User refunder, User refundee) {
		SelectedOrderPage selectedOrderPage = (SelectedOrderPage) getData(SELECTED_ORDER_PAGE_KEY);
		String refunderName = refunder.getFullNameFL();
		String refundeeName = refundee.getFullNameFL();
		ActivityItem activityItem = selectedOrderPage.getHistoryActivityItem(aitem -> aitem.isRefunded()
				&& aitem.getUserName().contains(refunderName) && aitem.getRefundeeName().contains(refundeeName));
		return activityItem != null ? true : false;
	}

	public boolean whenUserExpandsRefundedHistoryItemAndChecksData(Purchase purchase, Integer quantity,
			TicketType ticketType) {
		SelectedOrderPage selectedOrderPage = (SelectedOrderPage) getData(SELECTED_ORDER_PAGE_KEY);
		ActivityItem activityItem = selectedOrderPage.getHistoryActivityItem(aitem -> aitem.isRefunded());
		if (activityItem != null) {
			activityItem.clickOnShowDetailsLink();
			RefundedExpandedContent refundedContent = activityItem.getRefundedExpandedContent();
			BigDecimal ticketPrice = new BigDecimal(ticketType.getPrice());
			BigDecimal totalMoneyAmount = ticketPrice.multiply(new BigDecimal(quantity));
			boolean retVal = true;
			retVal = retVal && ticketPrice.compareTo(refundedContent.getPerTicketFee()) == 0;
			retVal = retVal && totalMoneyAmount.compareTo(refundedContent.getTotalRefundMoneyAmount()) == 0;
			return retVal;
		} else {
			return false;
		}
	}
	
	public void whenUserAddsANote(String note) {
		SelectedOrderPage selectedOrderPage = (SelectedOrderPage) getData(SELECTED_ORDER_PAGE_KEY);
		selectedOrderPage.enterNote(note);
		selectedOrderPage.clickOnAddNoteButton();
	}

	public boolean thenNotificationNoteAddedShouldBeVisible() {
		SelectedOrderPage selectedOrderPage = (SelectedOrderPage) getData(SELECTED_ORDER_PAGE_KEY);
		return selectedOrderPage.isNotificationDisplayedWithMessage(MsgConstants.ORDER_MANANGE_ACTIVITY_ITEM_NOTE_ADDED,
				5);
	}

	public boolean thenUserShouldSeeNoteActivityItem(String note, User user) {
		SelectedOrderPage selectedOrderPage = (SelectedOrderPage) getData(SELECTED_ORDER_PAGE_KEY);
		selectedOrderPage.refreshPage();
		String userName = user.getFirstName() + " " + user.getLastName();
		ActivityItem activityItem = selectedOrderPage
				.getHistoryActivityItem(aitem -> aitem.isNoteItem() && aitem.isUserNameEqualTo(userName));
		if (activityItem == null) {
			return false;
		} else {
			activityItem.clickOnShowDetailsLink();
			NoteExpandedContent noteContent = activityItem.getNoteExpandedContent();
			String noteText = noteContent.getNoteText();
			return note.equalsIgnoreCase(noteText);
		}
	}	
	
	public boolean thenUserIsOnSelecteOrderPage() {
		return thenUserIsOnSelecteOrderPage(false);
	}

	public boolean thenUserIsOnSelecteOrderPage(boolean refresh) {
		SelectedOrderPage selectedOrderPage = (SelectedOrderPage) getData(SELECTED_ORDER_PAGE_KEY);
		if (selectedOrderPage == null) {
			return false;
		} else {
			if (refresh) {
				selectedOrderPage.refreshPage();
			}
			return selectedOrderPage.isAtPage();
		}
	}
	
	public void thenClearUpTotalAmountFromDataMap() {
		setData(TOTAL_REFUND_AMOUNT_KEY, null);
	}
	

	@Override
	protected void setData(String key, Object value) {
		dataMap.put(key, value);
		
	}

	@Override
	protected Object getData(String key) {
		return dataMap.get(key);
	}

}