package pages.components.admin;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.remote.LocalFileDetector;
import org.openqa.selenium.remote.RemoteWebDriver;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.ui.ExpectedConditions;

import pages.BaseComponent;
import utils.ProjectUtils;
import utils.SeleniumUtils;

public class UploadImageComponent extends BaseComponent {

	@FindBy(xpath = "//body[@id='cloudinary-overlay']//div[@id='cloudinary-navbar']//ul//li[@data-source='local']/span[contains(text(),'My files')]")
	private WebElement myFilesLink;

	@FindBy(xpath = "//div/a[text()='Select File']/following-sibling::input")
	private WebElement selectFileInputField;

	@FindBy(xpath = "//body[@id='cloudinary-overlay']//div[@id='cloudinary-navbar']//ul//li[@data-source='url']/span[contains(text(),'Web Address')]")
	private WebElement webAddressLink;

	@FindBy(xpath = "//iframe[contains(@src,'widget.cloudinary.com') and contains(@style,'display: block')]")
	private WebElement imageUploadIframe;

	@FindBy(id = "remote_url")
	private WebElement remoteImageUrlField;

	@FindBy(xpath = "//div[@class='form']//a[contains(text(),'Upload')]")
	private WebElement uploadButton;

	@FindBy(xpath = "//div[@class='upload_cropped_holder']//a[@title='Upload']")
	private WebElement uploadCroppedButton;

	public UploadImageComponent(WebDriver driver) {
		super(driver);
	}

	public void uploadImageViaExternalLink(String imageLink, WebElement activateUploadButton) {
		explicitWaitForVisibilityAndClickableWithClick(activateUploadButton);
		explicitWait(15, ExpectedConditions.frameToBeAvailableAndSwitchToIt(imageUploadIframe));
		explicitWaitForVisibilityAndClickableWithClick(webAddressLink);
		waitVisibilityAndSendKeys(remoteImageUrlField, imageLink);
		waitForTime(1100);
		explicitWaitForVisibilityAndClickableWithClick(uploadButton);
		waitForTime(1100);
		explicitWaitForVisibilityAndClickableWithClick(uploadCroppedButton);
		driver.switchTo().parentFrame();
		waitForTime(1000);
		while (isExplicitlyWaitVisible(2, imageUploadIframe)) {
			waitForTime(1000);
			System.out.println("Iteration: ");
		}
	}

	public void uploadImageFromResources(String imageName, WebElement activateUploadButton) {
		String filePath = ProjectUtils.getImageAbsolutePath(imageName);
		if (filePath != null && !filePath.isEmpty()) {
			// this is for setting up LocalFileDetector when doing execution on selenium
			// grid
			// since passed file path makes no sense on selenium's grid node.
			if (isRemote()) {
				((RemoteWebDriver) driver).setFileDetector(new LocalFileDetector());
			}
			explicitWaitForVisibilityAndClickableWithClick(activateUploadButton);
			explicitWait(15, ExpectedConditions.frameToBeAvailableAndSwitchToIt(imageUploadIframe));
			explicitWaitForVisibilityAndClickableWithClick(myFilesLink);
			waitForTime(1000);
			SeleniumUtils.jsSetStyleAttr(selectFileInputField, "opacity: 1", driver);
			explicitWait(5, ExpectedConditions.attributeContains(selectFileInputField, "style", "opacity: 1"));
			waitForTime(3000);
			waitVisibilityAndSendKeys(selectFileInputField, filePath);
			waitForTime(1500);
			explicitWaitForVisibilityAndClickableWithClick(uploadCroppedButton);
			driver.switchTo().parentFrame();
			waitForTime(1000);
			while (isExplicitlyWaitVisible(2, imageUploadIframe)) {
				waitForTime(1000);

			}
		}
	}

}
