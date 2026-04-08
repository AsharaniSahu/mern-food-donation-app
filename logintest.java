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

        // YOUR APP URL
        driver.get("http://localhost:8081");

        // CHANGE THESE BASED ON YOUR HTML
        driver.findElement(By.id("username")).sendKeys("testuser");
        driver.findElement(By.id("password")).sendKeys("test123");
        driver.findElement(By.id("submit")).click();

        // Example validation (change accordingly)
        String pageText = driver.getPageSource();

        Assert.assertTrue(pageText.contains("Welcome"));

        driver.quit();
    }
}
