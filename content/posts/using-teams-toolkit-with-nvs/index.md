---
title: "Using Teams Toolkit with NVS"

date: 2023-11-22T10:07:47+06:00

# post thumb

image: "posts/using-teams-toolkit-with-nvs/featured-image.png"

# meta description

summary: "NVS is great when you need to switch between different versions of Node.js within a VSCode project. But Teams Toolkit needs a default version of Node.js installed -- before you start your project. Here is how I fix it."

# taxonomies
- "Copilot"
tags:
- VSCode
- TeamsToolkit
- Node.js
- nvs
- NoteToSelf
---

## Introduction

I use [NVS](https://github.com/jasongin/nvs) to switch between different versions of Node.js on my development workstation. It is a great tool, and I have been using it for a while now. But recently, I ran into an issue using [Teams Toolkit](https://aka.ms/teams-toolkit) to build a Copilot plugin.

The toolkit requires Node.js to be installed on the workstation. But I had not installed any version of Node.js on my workstation. I had only installed NVS. So, I was getting an error when I tried to create a new project using the toolkit, saying that Node.js was not a valid command.

NVS works great when you launch a terminal from within VSCode, or when you launch an instance of the command prompt / Windows Terminal. When you launch VSCode, however, it does not have the context of the latest version of Node.js you used with NVS. When you launch Teams Toolkit (which needs Node.js), it does not have the context of the latest version of Node.js you used with NVS either.

## The Fix

I had to install Node.js using NVS. I did that by running the following command in the terminal:

```bash
nvs link [version]
```

...where `[version]` is the version of Node.js you want to install. For example, I ran the following command to install Node.js version 18.18.0:

```bash
nvs link 18.18.0
```

This will set up the 'default' version of Node.js to be used by NVS.

Now, when I launch VSCode, it will have the context of the latest version of Node.js I used with NVS. When I launch Visual Studio Code -- with Teams Toolkit within it -- it will have a default version of Node.js.


## Photo Credit

Image by [Eva Michalkova](https://pixabay.com/users/evamichalkova-1091520/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=8368181) from Pixabay
