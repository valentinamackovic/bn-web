package test.facade;

import org.openqa.selenium.WebDriver;

public abstract class BaseFacadeSteps {

	protected WebDriver driver;

	public BaseFacadeSteps(WebDriver driver) {
		this.driver = driver;
	}

	protected abstract void setData(String key, Object value);

	protected abstract Object getData(String key);

}
