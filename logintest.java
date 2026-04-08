import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.testng.Assert;
import org.testng.annotations.Test;

public class LoginTest {

    @Test
    public void validLoginTest() {

        WebDriver driver = new ChromeDriver();
        driver.manage().window().maximize();

        // ✅ Correct working demo website
        driver.get("https://practicetestautomation.com/practice-test-login/");

        // Enter credentials
        driver.findElement(By.id("username")).sendKeys("student");
        driver.findElement(By.id("password")).sendKeys("Password123");

        // Click login
        driver.findElement(By.id("submit")).click();

        // Wait for page to load
        try { Thread.sleep(3000); } catch (Exception e) {}

        // Validation
        String pageText = driver.getPageSource();

        Assert.assertTrue(pageText.contains("Logged In Successfully"));

        driver.quit();
    }
}
