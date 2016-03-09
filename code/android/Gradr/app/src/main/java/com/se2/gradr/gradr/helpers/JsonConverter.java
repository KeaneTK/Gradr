package com.se2.gradr.gradr.helpers;

import com.se2.gradr.gradr.User;

import org.json.JSONException;
import org.json.JSONObject;

/**
 * Created by steve on 08/03/16.
 */
public class JsonConverter {
    // So apparently, if we do json.getString(fieldname) on a field that doesn't
    // exist, it throws an exception instead of just returning null. So we'll have to go
    // through and get each field individually...
    public static User userFromJson(JSONObject json) throws JSONException {
        if (!json.has("username") || !json.has("id")) {
            System.out.println("ERROR - Potential match doesn't have username/userID");
            return null;
        }

        String firstname = "";
        if (json.has("firstname")) {
            firstname = json.getString("firstname");
        }
        String lastname = "";
        if (json.has("lastname")) {
            firstname = json.getString("lastname");
        }
        String city = "";
        if (json.has("city")) {
            firstname = json.getString("city");
        }
        String country = "";
        if (json.has("country")) {
            firstname = json.getString("country");
        }
        String school = "";
        if (json.has("school")) {
            firstname = json.getString("school");
        }
        String courses = "";
        if (json.has("courses")) {
            firstname = json.getString("courses");
        }
        String generalDescription = "";
        if (json.has("generalDescription")) {
            firstname = json.getString("generalDescription");
        }
        String helpDescription = "";
        if (json.has("helpDescription")) {
            firstname = json.getString("helpDescription");
        }

        User user = new User(json.getString("username"),
                json.getInt("id"), firstname, lastname, city,
                country, school, courses, generalDescription, helpDescription);
        return user;
    }
}
