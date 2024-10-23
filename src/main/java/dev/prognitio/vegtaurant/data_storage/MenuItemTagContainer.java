package dev.prognitio.vegtaurant.data_storage;

import java.util.ArrayList;

public class MenuItemTagContainer {

    private ArrayList<MenuItem> menuItems;
    private String tagName;
    private String category;

    public MenuItemTagContainer(ArrayList<MenuItem> menuItems, String tagName, String category) {
        this.menuItems = menuItems;
        this.tagName = tagName;
        this.category = category;
    }





    public ArrayList<MenuItem> getMenuItems() {
        return menuItems;
    }
    public void setMenuItems(ArrayList<MenuItem> menuItems) {
        this.menuItems = menuItems;
    }
    public String getTagName() {
        return tagName;
    }
    public void setTagName(String tagName) {
        this.tagName = tagName;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }
}
