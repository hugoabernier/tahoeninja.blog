---
title: Working as multiple Office 365 users using user profiles in Edge Chromium
aliases:
  - /2019/12/12/working-as-multiple-office-365-users-using-user-profiles-in-edge-chromium

date: 2019-12-12T10:07:47+06:00

# post thumb
image: posts/working-as-multiple-office-365-users-using-user-profiles-in-edge-chromium/Switching-Profiles-scaled.gif

# meta description
summary: "Using Edge Chromium, you can open multiple browser windows as multiple Office 365 users. Here's how to do it."

# taxonomies
categories:
  - Productivity
keywords:
  - Microsoft 365
  - Microsoft Edge
---
## Introduction

Until today, I assumed everyone knew about this.

I was speaking to a co-worker –someone I respect and always assumed he knows way more than I do– when he talked about how frustrated he was with having to log-in and out of Office 365 when working on multiple tenants, or when working as more than one user.

"Don’t you have user profiles in Edge Chromium or Chrome?" I asked.

"No… what’s that?"

So I used Microsoft Teams to demo him how to leverage user profiles in Edge Chromium (which solved the issues he was complaining about).

I often choose not to blog about things because I assume that they’re just too obvious and that someone is going to call me out for writing about something that everybody knows.

But I figured that if _he_ didn’t know about browser user profiles, maybe there’s someone else out there who can benefit from learning about this.

If you already know about browser user profiles, this article isn’t for you.

But if you haven’t heard about them, you’re in for a treat!

## What are profiles

_User profiles_ have been available in Chrome for a little while now, but they recently started appearing in Microsoft new [Edge Chromium browser](http://web.archive.org/web/20210623200021/https://www.microsoftedgeinsider.com/).

They allow you to create different sets of browser favorites, history, passwords, and various other settings.

For example, you may want to keep your personal settings separate from your work settings.

When you switch between your browser user profiles, all those profile settings change.

You can log-in to Office 365 as one user, open a whole bunch of tabs, then switch to another user profile to log-in as another Office 365 user and open another whole new set of tabs.

When you switch back and forth, your browser remembers who you’re logged in as, what tabs you had open, and everything else — like cookies, history, etc.

In the following animation, you can see how switching between profiles shows two different Office 365 tenants and browser tabs.

![Switching between profiles](../../images/post/uploads/2019/12/Switching-Profiles-scaled.gif)

You can even open multiple browser windows with a different user profile in each window!

## Creating user profiles in Edge Chromium

To create a new user profile on the Chromium version of Microsoft Edge, follow these steps:

1. Open Microsoft Edge Chromium
2. From the upper-right corner, tap the elipsis (the three dots) and select **Settings**  
    ![Settings menu](../../images/post/uploads/2019/12/image-1576127625483-scaled.png)
3. From the **Settings** navigation list, select **Profiles**.  
    ![Profiles](../../images/post/uploads/2019/12/image-1576127722068-scaled.png)
4. From the **Your profile** tab, select **\+ Add profile**  
    ![Add profile](../../images/post/uploads/2019/12/Add-Profile-scaled.png)
5. On the **Add profile** dialog, select **Add**  
    ![Add](../../images/post/uploads/2019/12/Add-Profile-2-1-scaled.png)
6. Edge will open a new browser window prompting you to sign-in. Select **Sign in to sync data**.  
    ![New window](../../images/post/uploads/2019/12/Add-Profile-3-scaled.png)
7. Log-in using your first set of Office 365 credentials by selecting existing credentials or by selecting **Work or school account**.  
    ![Work or school](../../images/post/uploads/2019/12/Add-Profile-4-scaled.png)
8. Once logged in, if you get prompted to **Use your account everywhere on your device**, uncheck **Allow my organization to manage my device** and select **This app only** instead of the _Yes_ button.  
    ![Don't say yes](../../images/post/uploads/2019/12/Add-Profile-5-scaled.png)

Once you complete the steps, the new profile will open as a whole different process.

Repeat the steps above to create additional profiles.

## How to customize your profile

When you create a new profile, the profile usually gets a default name — something like **Profile 2**.

If you have a lot of profiles, it may be easier to rename them so that you can tell them apart.

To do so, follow these steps:

1. From Edge Chromium, tap the profile icon in the upper-right corner then select **Manage profile settings**  
    ![Profile switching](../../images/post/uploads/2019/12/Profiles-Switching.gif)
2. From the **Your profile** window, select the ellipsis then **Edit**  
    ![Edit Profile](../../images/post/uploads/2019/12/Edit-Profile.gif)
3. In the **Edit profile** dialog, change the name of the profile to whatever you’d like, then select **Update**

## Setting your new tab experience

Did you know that, in Edge Chromium, you can show your latest Office 365 files when you open a new browser tab?

It’s easy!

All you have to do is follow these steps:

1. From a new browser tab, select the settings icon in the upper-right corner  
    ![New Tab](../../images/post/uploads/2019/12/New-Tab.gif)
2. Select **Office 365**
3. You’ll probably get prompted to log-in. Once you do, the you’ll get your Office 365 start page.

## Conclusion

The concept of user profiles in your browser isn’t new, but it is new to Edge Chromium. It allows you to work as multiple users across multiple browser windows without having to use the **Private** mode.

If you use Chrome, I encourage you to find instructions to create new profiles. If you use Edge Chromium, I hope you’ll find the above steps useful!
