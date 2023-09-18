---
title: "Uploading User Profile Pictures using the Web-Based GUI"
aliases:

- /2015/04/10/uploading-user-profile-pictures-using-the-web-based-gui


date: 2015-04-10T10:07:47+06:00

# post thumb

image: "posts/uploading-user-profile-pictures-using-the-web-based-gui/featured-image.webp"

# meta description
summary: "In my previous article, I discuss best practices on how to choose high resolution photos to use in user profile pictures for Office 365."

# taxonomies

categories:

- "Microsoft 365"

---
In my [previous article,](/2015/04/10/uploading-high-resolution-user-profile-pictures-in-office-365/) I discuss best practices on how to choose high resolution photos to use in user profile pictures for Office 365.

You can upload user profile pictures using the Office 365 Admin Center. It may be obvious to everyone else, but I didn’t know this was possible until a very astute coop student showed me this feature (after I spent an afternoon telling him the _only way_ to do this was to use PowerShell). So, to save you the embarrassment, here is the web-based method:

1. From the **Office 365 Admin Center** ([https://portal.office.com](https://portal.office.com/)) go to **Admin** then **Exchange**.
2. In the **Exchange Admin Center** click on your profile picture and select **Another User….** from the drop-down menu that appears.  
    [![image](image_thumb2.png "image")](image2.png)
3. The system will pop-up a window listing users in your Office 365 subscription. Search for the user you wish to change and click **OK**.  
    [![image](image_thumb3.png "image")](image3.png)
4. The system will pop-up the user’s profile, indicating that you are working on behalf of the user you selected. Scroll all the way to the bottom and select **Edit Information…**  
    [![image](image_thumb4.png "image")](image4.png)  
    [![image](image_thumb5.png "image")](image5.png)
5. Another pop-up window (seriously, disable your pop-up blockers if you haven’t done so already) will the editable user profile page, starting with the **Photo** section. Click on **Change**  
    [![image](image_thumb6.png "image")](image6.png)
6. Click on **Browse…** and select the picture you wish to use.  
    [![image](image_thumb7.png "image")](image7.png)
7. Click **Save** to dismiss the window. Close all the pop-ups.

Repeat for all user profiles pictures you wish to upload. If you have Lync open, you should see the results almost immediately.

The profile picture will also be automatically synched with SharePoint user profiles (at least, that has been my experience… please feel free to comment below if you’ve had different results).

While it may be handy to do a few pictures, if you have to update hundreds of user profile pictures, you may want to use the [PowerShell method](/2015/04/10/uploading-high-resolution-user-profile-pictures-to-office-365-using-powershell/).
