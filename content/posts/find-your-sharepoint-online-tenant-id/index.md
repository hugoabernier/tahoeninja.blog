---
title: Find Your SharePoint Online Tenant ID without tools or code
aliases:
  - /2020/03/01/find-your-sharepoint-online-tenant-id

date: 2020-03-01T10:07:47+06:00

# post thumb
image: "posts/find-your-sharepoint-online-tenant-id/boxes-1834406_1920.jpg"

# meta description
summary: Sometimes you just need to find your SharePoint Online tenant ID and you don’t have access to the Azure Admin center.

# taxonomies
categories:
  - Microsoft 365
keywords:
  - Tenant ID
---
Introduction
------------

I was installing the latest version (2.7) of the [Office 365 CLI](https://pnp.github.io/office365-cli/) — if you haven’t tried it yet, you definitely should — and I started thinking "Hmm, I wonder if I could do a quick contribution for this?".

I absolutely love the Office 365 CLI and I think the team has done an amazing job with it. I even made a tiny contribution a while ago, but never got around to doing more.

Keep in mind that I have to study for two certification exams that I have scheduled over the next two days, I have to review my materials for [Office 365 Saturday Redmond 2020](http://www.spsevents.org/city/redmond/redmond2020), I have to prepare for the upcoming [Toronto Citizen Developer User Group meeting](https://www.meetup.com/TorontoCDUG/events/268863897/), I have a web part that I need to finish with the help of [David Warner II](https://twitter.com/DavidWarnerII), and I need to finish adding Graph integration to my PnP Calendar Control…

… but _other than that_, I have some spare time. I took a look at the list of [Office 365 CLI issues](https://github.com/pnp/office365-cli/issues) to look for inspiration and found a request for a new command called [get ID of the current tenant](https://github.com/pnp/office365-cli/issues/1378).

Wait a minute, I know how to get the tenant ID! I use this trick all the time. And it doesn’t require any code or any tools to be installed.

So I thought I should at least share my trick for finding the tenant ID, and if I’m a good boy and do all my work today maybe I’ll treat myself and do a contribution to the Office 365 CLI.

Getting the Tenant ID
---------------------

I found this trick over 3 years ago in a [Stack Overflow discussion](https://stackoverflow.com/questions/38097668/how-do-i-find-the-tenant-id-of-my-sharepoint-online-account) and, but it took a little playing around to get it working.

To get your tenant id, follow these steps:

1. Start with your original **tenant name**. It should be in the form of **\[yourtenant\].onmicrosoft.com**. Do not use your custom domain name, use your original tenant name. If in doubt, use whatever comes before **.sharepoint.com** on your SharePoint Online site.
2. Browse to **[https://login.microsoftonline.com/\[yourtenant\].onmicrosoft.com/.well-known/openid-configuration](https://login.microsoftonline.com/[yourtenant].onmicrosoft.com/.well-known/openid-configuration)**. Note that you have to replace **\[yourtenant\]** with the tenant name you obtained in step 1. Make sure to keep the **onmicrosoft.com** bit too. This URL is _not_ authenticated, so you should be able to get to it from anywhere without logging in, so you can use something list Postman if you want, but a regular browser will do.
3. You’ll get some JSON back. Don’t worry, you don’t need to speak JSONese, just look for whatever URL comes after `"token_endpoint":` . It should start with `"[https://login.microsoftonline.com/](https://login.microsoftonline.com/)`.
4. Your tenant ID is the alphanumeric value immediately after `"[https://login.microsoftonline.com/](https://login.microsoftonline.com/)` and before `/oauth2/token",`. For example, if you get this first line:

        "token_endpoint": "https://login.microsoftonline.com/ef32e188-30ce-4f80-8956-d95598788bdc/oauth2/token",

    your tenant ID will be **ef32e188-30ce-4f80-8956-d95598788bdc**

That’s it!

Conclusion
----------

I know, I know, some of you will say "You can just go to the Azure Admin center and get the directory ID" as per [Official Microsoft documentation](https://docs.microsoft.com/onedrive/find-your-office-365-tenant-id), but it assumes that you have access to the Azure Admin center.

The way described in this post works regardless of your permissions, and does not need any tools to be installed on your computer, or any code.

I hope this helps?

Photo Credit
------------

Image by [Pexels](https://pixabay.com/users/Pexels-2286921/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=1834406) from [Pixabay](https://pixabay.com/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=1834406)

Updates
-------

* March 2, 2020: [Laurent Sittler](https://twitter.com/laul0_68) has [an article](https://blog.lsonline.fr/2019/09/02/how-to-get-your-microsoft-365-tenant-id/) which shows about 17 different ways to retrieve the tenant ID. Very cool!

* March 2, 2020: [Joseph Velliah](https://twitter.com/JosephVelliah?s=20) has also [written an article](https://sprider.blog/get-office-365-tenant-id-from-domain-name) about this topic. Thanks Joseph!

* March 2, 2020: [João Ferreira](https://twitter.com/Joao12Ferreira) kindly pointed out that he has [a great article showing two more approaches](https://teams.handsontek.net/2019/04/09/how-to-get-microsoft-teams-tenant-id/) to get your tenant ID.

* March 1, 2020: Thanks to [Kevin McDonnell](https://twitter.com/kevmcdonk) for reminding me that ShareGate has a web-based tool available at [www.whatismytenantid.com](https://www.whatismytenantid.com/).

* March 1, 2020: If you want to use PowerShell to find your tenant ID, [Pen Warner](https://twitter.com/p3nf0ld) wrote in with this cool PowerShell script:

        $tenantID = (Invoke-WebRequest https://login.windows.net/<TENANT_NAME>.onmicrosoft.com/.well-known/openid-configuration|ConvertFrom-Json).token_endpoint.Split('/')[3]
