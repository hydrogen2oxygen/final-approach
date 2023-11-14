package de.pietro.lusso.territory.services;

import de.pietro.lusso.territory.exceptions.CryptographyException;
import de.pietro.lusso.territory.utils.EncryptionTool;
import org.junit.Test;
import org.junit.jupiter.api.Assertions;

public class EncryptionTest {

    private String input = "{\"JSON\":\"bla bla 123 abc\"}";
    private String password = "871a5c07-5c2d-41bd-98af-bb8cbdb06519cd185d47-bd50-4325-a599-a1a80d91924a";
    private String cipherText = "pxlPTUr6OpYqwr8+Q4y1Fdeins+5SUIaMST9R8uENAA=";
    private EncryptionTool encryptionTool = new EncryptionTool();

    @Test
    public void testEncryptionAES() throws CryptographyException {

        System.out.println("Original text = " + input);
        System.out.println("Password = " + password);

        String cipherText2 = encryptionTool.encrypt(password, input);
        System.out.println("cipherText = " + cipherText2);
        Assertions.assertEquals(cipherText, cipherText2);

        String decrypted = encryptionTool.decrypt(password, cipherText2);
        System.out.println("decrypted = " + decrypted);

        Assertions.assertEquals(input, decrypted);
    }

    @Test
    public void testDecryptionAES() {

        System.out.println("cipherText = " + cipherText);
        String decrypted = encryptionTool.decrypt(password, cipherText);
        System.out.println("decrypted = " + decrypted);
        Assertions.assertEquals(input, decrypted);
    }

    @Test
    public void testGenerateStrongSecret() {
        String strongSecret = encryptionTool.generateStrongSecret(256, true);
        System.out.println(strongSecret);
        Assertions.assertEquals(64, strongSecret.length());
    }

}
