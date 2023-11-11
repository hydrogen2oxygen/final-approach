package de.pietro.lusso.territory.utils;

import de.pietro.lusso.territory.exceptions.CryptographyException;
import de.pietro.lusso.territory.services.DatabaseService;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import javax.crypto.Cipher;
import javax.crypto.SecretKey;
import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.PBEKeySpec;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.security.spec.InvalidKeySpecException;
import java.security.spec.KeySpec;
import java.util.Base64;

public class EncryptionTool {

    private static final Logger logger = LogManager.getLogger(EncryptionTool.class);

    private SecretKeyFactory factory;
    private IvParameterSpec ivspec;

    public EncryptionTool() {
        init();
    }

    private void init() {

        try {
            factory = SecretKeyFactory.getInstance("PBKDF2WithHmacSHA256");
            byte[] iv = {0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0};
            ivspec = new IvParameterSpec(iv);
        } catch (NoSuchAlgorithmException e) {
            logger.error(e);
        }
    }

    public String encrypt(String password, String strToEncrypt) throws CryptographyException {
        try {
            SecretKeySpec secretKeySpec = getSecretKeySpecFromPassword(password);
            Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5Padding");
            cipher.init(Cipher.ENCRYPT_MODE, secretKeySpec, ivspec);
            return Base64.getEncoder()
                    .encodeToString(cipher.doFinal(strToEncrypt.getBytes(StandardCharsets.UTF_8)));
        } catch (Exception e) {
            logger.error("Error while encrypting: " , e);
            throw new CryptographyException("Error while encrypting", e);
        }
    }

    public String decrypt(String password, String strToDecrypt) {
        try {
            SecretKeySpec secretKeySpec = getSecretKeySpecFromPassword(password);
            Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5PADDING");
            cipher.init(Cipher.DECRYPT_MODE, secretKeySpec, ivspec);
            return new String(cipher.doFinal(Base64.getDecoder().decode(strToDecrypt)));
        } catch (Exception e) {
            logger.error("Error while decrypting: " ,e);
        }
        return null;
    }

    private SecretKeySpec getSecretKeySpecFromPassword(String password) throws InvalidKeySpecException {
        KeySpec spec = getKeySpecFromPassword(password);
        SecretKey tmp = factory.generateSecret(spec);
        return new SecretKeySpec(tmp.getEncoded(), "AES");
    }

    private KeySpec getKeySpecFromPassword(String password) {
        String passwordParts[] = splitPassword(password);
        return new PBEKeySpec(passwordParts[0].toCharArray(), passwordParts[1].getBytes(), 65536, 256);
    }

    private static String[] splitPassword(String password) {
        if (password.length() != 72) {
            System.err.println("Password length needs to be 72 characters long!");
        }
        String secretKey = password.substring(0,password.length() / 2);
        String salt = password.substring(password.length() / 2);
        return new String[]{secretKey,salt};
    }

    public String generateStrongSecret(int keyLength, boolean encodeInHex) {
        try {
            SecureRandom secureRandom = new SecureRandom();
            byte[] secretBytes = new byte[keyLength / 8];
            secureRandom.nextBytes(secretBytes);

            if (encodeInHex) {
                return bytesToHex(secretBytes);
            } else {
                return new String(secretBytes);
            }
        } catch (Exception e) {
            logger.error(e);
            return null;
        }
    }

    private static String bytesToHex(byte[] bytes) {
        StringBuilder sb = new StringBuilder();
        for (byte b : bytes) {
            sb.append(String.format("%02x", b));
        }
        return sb.toString();
    }
}
