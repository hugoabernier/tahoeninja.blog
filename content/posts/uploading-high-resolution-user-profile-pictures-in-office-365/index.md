---
title: "Uploading High Resolution User Profile Pictures in Office 365"
aliases:

- /2015/04/10/uploading-high-resolution-user-profile-pictures-in-office-365


date: 2015-04-10T10:07:47+06:00

# post thumb

image: "posts/uploading-high-resolution-user-profile-pictures-in-office-365/featured-image.webp"

# meta description
summary: "In Office 365, you can upload profile pictures for each user’s contact card. The contact card will appear in Outlook, SharePoint, Lync, Word, Excel, PowerPoint… well, in any Office product that displays contact cards "

# taxonomies

categories:

- "Microsoft 365"
---
In Office 365, you can upload profile pictures for each user’s contact card. The contact card will appear in Outlook, SharePoint, Lync, Word, Excel, PowerPoint… well, in any Office product that displays contact cards 🙂

[![Sample Contact Card in Outlook 2013](image_thumb1.png "Sample Contact Card in Outlook 2013")](image1.png)

Sample Contact Card in Outlook 2013

While this isn’t a new concept to Office 2013, and this feature is available in On Premise installations, these articles focus on Office 365.

There are two ways to achieve this:

- Via the [web-based graphical user interface](/2015/04/10/uploading-user-profile-pictures-using-the-web-based-gui/ "Uploading User Profile Pictures using the Web-Based GUI"); or
- Using [PowerShell](/2015/04/10/uploading-high-resolution-user-profile-pictures-to-office-365-using-powershell/)

You’ll find all sorts of confusing information online regarding the dimensions, file size and format restrictions. I found that either of the two methods described in this article will work with almost any file sizes and dimensions.

There are, however, some best practices.

## Choose Square Photos

Choose a square image as the source (i.e.: same width and height), otherwise the picture will be cropped when you upload and you may end up with portions of people’s faces being cropped out.

[![](image_thumb8.png "image")](image8.png)

Example of a great picture, wrong shape… (Photo Credit: rubenshito)

Will be automatically cropped to:

[![](image_thumb9.png "image")](image9.png)

Auto-cropped result.

## **Go for the Max**

Lync 2010 supported the ability to view contact photos which were stored as part of the _thumbnailPhoto_ attribute in Active Directory, meaning that pictures could only be 48×48 pixels.

However, Lync 2013 can now store photos in user’s Exchange 2013 mailbox, meaning that it supports images of up to 648×648 pixels.

When you upload a photo to Exchange 2013, it automatically creates 3 versions of the photo:

<table border="0" width="362" cellspacing="0" cellpadding="2"><tbody><tr><td valign="top" width="199"><strong>Size</strong></td><td valign="top" width="161"><strong>Used By</strong></td></tr><tr><td valign="top" width="220">48×48</td><td valign="top" width="169">Active Directory <em>thumbnailPhoto</em> attribute</td></tr><tr><td valign="top" width="225">96×96</td><td valign="top" width="172">Outlook 2013 Web App<br>Outlook 2013<br>Lync Web App<br>Lync 2013<br>SharePoint</td></tr><tr><td valign="top" width="225">648×648</td><td valign="top" width="174">Lync 2013<br>Lync Web App</td></tr></tbody></table>

If you only upload a smaller image (e.g.: 48×48), it’ll be scaled to 96×96 and 648×648, resulting in photos that look fuzzy. However, if you upload photos that are already 648×648. The system will automatically generate 48×48 and 96×96 thumbnails for you.

<table border="0" width="548" cellspacing="0" cellpadding="2"><tbody><tr><td valign="top" width="200"><strong>Original</strong></td><td valign="top" width="346"><strong>Auto-Scaled</strong></td></tr><tr><td valign="top" width="200"><a href="image10.png"><img loading="lazy" style="display:inline;border:0;" title="image" src="image_thumb10.png" alt="image" width="52" height="52" border="0"></a></td><td valign="top" width="346"><a href="image11.png"><img loading="lazy" style="display:inline;border:0;" title="image" src="image_thumb11.png" alt="image" width="100" height="100" border="0"></a> <a href="image12.png"><img loading="lazy" style="display:inline;border:0;" title="image" src="image_thumb12.png" alt="image" width="204" height="204" border="0"></a></td></tr><tr><td valign="top" width="200"><a href="image13.png"><img loading="lazy" style="display:inline;border:0;" title="image" src="image_thumb13.png" alt="image" width="204" height="204" border="0"></a></td><td valign="top" width="346"><a href="image14.png"><img loading="lazy" style="display:inline;border:0;" title="image" src="image_thumb14.png" alt="image" width="100" height="100" border="0"></a> <a href="image15.png"><img loading="lazy" style="display:inline;border:0;" title="image" src="image_thumb15.png" alt="image" width="52" height="52" border="0"></a></td></tr></tbody></table>

(Photo Credit: [rubenshito](http://www.freeimages.com/profile/rubenshito "rubenshito"))

Note that if you upload a photo to the _thumbnailPhoto_ in Active Directory, the photo will not be updated in Exchange. If you are lazy like me, you probably want to update photos only once.

My recommendation (and [Microsoft’s](https://technet.microsoft.com/en-us/library/jj688150.aspx)) is to use 648×648 pixels, 24-bit JPG images.
