---
title: "Change default project folder in Visual Studio 2017 to a OneDrive folder"
aliases:

- /2018/11/17/change-default-project-folder-in-visual-studio-2017-to-a-onedrive-folder


date: 2018-11-17T10:07:47+06:00

# post thumb

image: "posts/change-default-project-folder-in-visual-studio-2017-to-a-onedrive-folder/featured-image.webp"

# meta description

summary: "This article will show you how you too can install and configure this command line interface."

# taxonomies

categories:

- "Coding"
tags:
- "OneDrive"
- "Visual Studio"
---
## Introduction

Today, I was moving my files to my new [Surface Studio 2](https://www.microsoft.com/p/surface-studio-2/8SBJXM0M58T4) (which is an awesome development machine!); All my personal files are synched to OneDrive, except for my Visual Studio and GitHub project files which are — by default — stored in **c:\\users\[myuseraccount\]\\source\\repos**.

Synching your personal files to OneDrive makes it really easy to work on multiple devices or making sure that you have a backup in case your workstation is stolen, lost, self-destroyed, or abducted by aliens.

Making sure that your project files are also synched ensures that all those prototypes, proofs of concepts, and other code snippets that you never bothered adding to source control are also safe.

This article describes the steps to move your default project location to a folder that can be stored in OneDrive.

> Let’s make one thing clear: synching your project files to OneDrive _does not_ replace using source control; if you have any production code in your project files, please use source control.

## Change the default project directory

1. In Visual Studio 2017, select the **Tools** menu, then **Options**.
2. In the **Options** dialog select the **Projects and Solutions** category, then **Locations**.
3. In the **Projects location** type (or browse to) a folder on your OneDrive where you want your new projects to be created.
4. Click **OK**.![Project location in Visual Studio 2017](FolerLocation-960884705-1542472385304.png)

## Changing the default GitHub repo location in Visual Studio

1. In Visual Studio, make sure you’re connected to GitHub.
2. From the **Team Explorer** pane, go to **Settings**.
3. In the **Settings** pane, select **Global Settings**.
4. In the **Global Settings** pane, type (or browse to) the folder you want to use in the **Default Repository Location**.
5. Click **Update**.![GitHub Settings](GitHubSettings.jpg)

## Conclusion

The instructions above will default your new Visual Studio projects and repos in a OneDrive folder; they’ll get synchronized with OneDrive.

Thanks to Daniel Zikmund for the [detailed steps](http://zikmund.me/blog/changing-default-project-directory-visual-studio-2017/) on how to set up the folder in Visual Studio.  Also, Andrew Grant has a [great video](https://www.youtube.com/watch?v=sDLhi4P5kuE) showing how to do the above steps.

I hope this helps!?

UPDATE: I apologize to Daniel Zikmund, I gave your brother Martin credits. Thanks Martin for letting me know.
