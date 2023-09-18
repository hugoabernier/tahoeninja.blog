---
title: "Create a Link to a Delve Profile"
aliases:

- /2019/08/19/create-a-link-to-a-delve-profile/


date: 2019-08-19T10:07:47+06:00

# post thumb

image: "posts/create-a-link-to-a-delve-profile/featured-image.webp"

# meta description
interactive: true
summary: "Sometimes, you just want to create a link to someone’s Delve profile in SharePoint Online."

# taxonomies

categories:

- "SharePoint"
tags:
- Interactive
- Delve
script: posts/create-a-link-to-a-delve-profile/script.js
---
## Introduction

Sometimes, you just want to create a link to someone’s Delve profile in SharePoint Online.

Thanks to [an article from The Baretta](https://thebaretta.blogspot.com/2017/12/office-365-how-to-link-directly-to.html), we know how to formulate the link.

However, since I started doing interactive blog posts, I thought I’d create one which automatically generates the URL for you.

## To create a link to a Delve profile

To create a link to someone’s Delve profile:

1. Take your tenant name, and add `-my.sharepoint.com/PersonImmersive.aspx?accountname=i%3A0%23%2Ef%7Cmembership%7C` to the end of it.
2. Append the person’s email address at the end of what you got in step 1.

<div class="interactive">

## Generate a link now

Enter the your tenant name (the part before **.sharepoint.com** and without **https://**) and the email address of the person for whom you want to create a profile below, and the URL will automatically be created for you. Click **Copy to clipboard** to send it to your clipboard.

Don’t worry, we don’t store any information you enter.

| Variable | Value |
| --- | --- |
| SharePoint Online tenant name | <input id="txtTenant" value="mytenant"> |
| User’s email address | <input id="txtEmail" value="someuser_mytenant.com" type="email"> |

</div>

Your URL:

<pre><code id="lnkDelveProfile">https://mytenant-my.sharepoint.com/PersonImmersive.aspx?accountname=i%3A0%23%2Ef%7Cmembership%7Csomeuser@mytenant.com</code></pre>

<button id="btnCopy" class="btn-primary">Copy to clipboard</button>


## Conclusion

That’s all there is to it. I really just wanted to create another interactive blog post, because they are fun to create!

Thanks to [The Baretta](https://thebaretta.blogspot.com/2017/12/office-365-how-to-link-directly-to.html) for posting this information in the first place.
