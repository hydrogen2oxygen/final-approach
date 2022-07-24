package de.pietro.lusso.territory;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.security.Security;

@SpringBootApplication
public class TerritoryApplication {

	public static void main(String[] args) {
		Security.setProperty("crypto.policy", "unlimited");
		SpringApplication.run(TerritoryApplication.class, args);
	}
}
