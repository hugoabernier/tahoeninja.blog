---
title: "Adding custom Edge profile images"
aliases:
- /2020/07/30/adding-custom-edge-profile-images
  
date: 2020-07-30T10:07:47+06:00

# post thumb
image: "posts/adding-custom-edge-profile-images/featured-image.jpg"

# meta description
summary: "Edge Chromium lets you use different browsing profiles, but did you know that you could have custom profile images for each one? Here' show."

# taxonomies
categories:
- "Productivity"
tags:
- "Microsoft Edge"
---
## Introduction


With Edge Chromium, you can set up multiple profiles with different credentials, history, cookies, extensions, etc.

If, like me, you work with multiple Microsoft 365 tenants, this feature can be a real time saver. I’ve already written about how to configure multiple in [a previous post](/2019/12/12/working-as-multiple-office-365-users-using-user-profiles-in-edge-chromium/), so I won’t repeat myself here.

To keep track of who you’re currently logged on as, Edge displays a profile picture on the upper-right corner.

![My Profile Picture](../../images/post/uploads/2020/07/image-1596157265339.png)

You can configure a different picture for every profile in your browser, but you’re limited to two choices:

* The profile picture associated to your Microsoft 365 tenant (if you’re signed in with a Microsoft 365 tenant); or
* One of the cute avatar images that come with Edge  
    ![Limited Avatar Choices](../../images/post/uploads/2020/07/image-1596157458760.png)

Unfortunately, there isn’t a choice for custom profile pictures.

I was collaborating with [David Warner II](https://twitter.com/davidwarnerii) this evening, solving world problems, when we suddenly got distracted with fixing an issue with one of his profiles.

In the process of fixing his browser issues, I discovered a way to change my profile images.

I searched for this and didn’t find anything, and I definitely don’t know if this is a supported feature or not, but I thought I’d share with you how I did it.

## Changing your profile picture


Here’s how to do it:

1. Using Edge Chromium, switch to the profile for which you wish to set up a custom profile image. Make sure that it already has an image (if not, click on your profile, select **Manage profile settings** | **…** | **Edit** | **Change Picture** )
2. From the address bar, type `edge://version`
3. From the **About version** page that shows up, look for **Profile path**.
4. Copy the path that’s displayed next to it (it should be something like `C:\Users\hugoa\AppData\Local\Microsoft\Edge SxS\User Data\Profile 1`)
5. Launch a file explorer and navigate to that path. (I use \[Windows\]+\[R\] to launch the **Run…** dialog and paste the path).
6. In the list of files that appear, look for one called **Edge Profile Picture.png** and make a backup copy of it.
7. Find whatever custom image that you’d like to use, resize it to 424×424 pixels, and save it as **Edge Profile Picture.png**
8. Close your browser and your new profile picture should show up  
    ![My new profile picture](../../images/post/uploads/2020/07/image-1596158266489.png)

## Conclusion

That’s it! I have now configured all my profiles to use the corporate logo of every tenant I have so that I easily tell which profile is currently in use.

Let me know if you found a better way to do this.

I hope this helps?

## Photo credit

Image by [Andre Mouton](https://pixabay.com/users/a_m_o_u_t_o_n-9408103/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=4788328) from [Pixabay](https://pixabay.com/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=4788328)
