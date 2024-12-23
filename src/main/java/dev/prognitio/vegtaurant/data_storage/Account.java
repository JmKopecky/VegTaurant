package dev.prognitio.vegtaurant.data_storage;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Account {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;
    private String email;
    private String password; //feature safe storage
    private Integer rewardPoints;
    private String name;
    private String address;
    private String city;
    private String state;
    private String country;
    private String zip;
    private String phone;
    private String imageUrl;
    private String cardNumber; //feature safe storage
    private String expirationDate; //feature safe storage
    private String securityCode; //feature safe storage
    private String cardUserName; //feature safe storage


    public static Account authenticate(AccountRepository repository, String email, String username, String password) throws Exception {
        Account output = null;

        for (Account acc : repository.findAll()) {
            try {
                if (acc.getEmail().equals(email) && acc.getName().equals(username)) {
                    if (acc.getPassword().equals(password)) { //feature safe storage
                        output = acc;
                        break;
                    } else {
                        throw new Exception("invalid_password");
                    }
                }
            } catch (NullPointerException _) {
            }
        }

        if (output == null) {
            throw new Exception("invalid_unrecognized");
        }

        return output;
    }


    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getZip() {
        return zip;
    }

    public void setZip(String zip) {
        this.zip = zip;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getCardNumber() {
        return cardNumber;
    }

    public void setCardNumber(String cardNumber) {
        this.cardNumber = cardNumber;
    }

    public String getExpirationDate() {
        return expirationDate;
    }

    public void setExpirationDate(String expirationDate) {
        this.expirationDate = expirationDate;
    }

    public String getSecurityCode() {
        return securityCode;
    }

    public void setSecurityCode(String securityCode) {
        this.securityCode = securityCode;
    }

    public String getCardUserName() {
        return cardUserName;
    }

    public void setCardUserName(String cardUserName) {
        this.cardUserName = cardUserName;
    }

    public Integer getRewardPoints() {
        return rewardPoints;
    }

    public void setRewardPoints(Integer rewardPoints) {
        this.rewardPoints = rewardPoints;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String toString() {
        String output = "";

        output += "id:" + id + "\n";
        output += "email:" + email + "\n";
        output += "pw:" + password + "\n";

        return output;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }
}
