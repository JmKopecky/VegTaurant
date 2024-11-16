package dev.prognitio.vegtaurant.data_storage;

import jakarta.persistence.*;

import javax.naming.TimeLimitExceededException;
import java.util.UUID;

@Entity
public class AuthTokens {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;
    private String token;
    private String ipAddress;
    @OneToOne
    private Account account;


    public static Account retrieveWithSessionToken(AuthTokensRepository repository, String sessionToken) throws Exception {
        for (AuthTokens pToken : repository.findAll()) {
            if (pToken.getToken().equals(sessionToken)) {
                return pToken.getAccount();
            }
        }
        throw new Exception("no_token");
    }


    public static String generateUniqueToken(AuthTokensRepository repository) throws TimeLimitExceededException {
        int runs = 0;
        int maxRuns = 9999;
        while (runs < maxRuns) {
            String token = UUID.randomUUID().toString();

            boolean duplicate = false;
            for (AuthTokens pToken : repository.findAll()) {
                System.out.println(pToken.getToken() + " " + token);
                if (pToken.getToken().equals(token)) {
                    duplicate = true;
                    break;
                }
            }
            if (!duplicate) {
                System.out.println(token);
                return token;
            }
            runs++;
        }
        throw new TimeLimitExceededException("Time limit exceeded to find unique UUID for AuthToken");
    }


    public static boolean deleteSessionToken(AuthTokensRepository repository, String sessionToken) {
        for (AuthTokens pToken : repository.findAll()) {
            if (pToken.getToken().equals(sessionToken)) {
                repository.delete(pToken);
                return true;
            }
        }
        return false;
    }


    public static int deleteByAccount(AuthTokensRepository repository, Account acc) {
        int removed = 0;
        for (AuthTokens pToken : repository.findAll()) {
            if (pToken.getAccount().equals(acc)) {
                repository.delete(pToken);
                removed++;
            }
        }
        return removed;
    }


    public static AuthTokens getBySessionToken(AuthTokensRepository repository, String sessionToken) {
        for (AuthTokens pToken : repository.findAll()) {
            if (pToken.getToken().equals(sessionToken)) {
                return pToken;
            }
        }
        return null;
    }


    public Integer getId() {
        return id;
    }
    public void setId(Integer id) {
        this.id = id;
    }
    public String getToken() {
        return token;
    }
    public void setToken(String token) {
        this.token = token;
    }
    public String getIpAddress() {
        return ipAddress;
    }
    public void setIpAddress(String ipAddress) {
        this.ipAddress = ipAddress;
    }
    public Account getAccount() {
        return account;
    }
    public void setAccount(Account account) {
        this.account = account;
    }
}
