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

        // Your app
        driver.get("http://localhost:8081");

        // Enter credentials
        driver.findElement(By.id("username")).sendKeys("testuser");
        driver.findElement(By.id("password")).sendKeys("test123");

        // Click login button (using class)
        driver.findElement(By.className("login-btn")).click();

        // Wait (important for page load)
        try { Thread.sleep(3000); } catch (Exception e) {}

        // Validation (CHANGE THIS BASED ON YOUR APP)
        String pageText = driver.getPageSource();

        Assert.assertTrue(pageText.contains("Welcome"));

        driver.quit();
    }
}
