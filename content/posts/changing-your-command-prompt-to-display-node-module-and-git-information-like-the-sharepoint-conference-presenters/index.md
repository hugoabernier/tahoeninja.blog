---
title: "Changing your command prompt to display node module and Git information like the SharePoint Conference presenters"
aliases:

- /2018/05/27/changing-your-command-prompt-to-display-node-module-and-git-information-like-the-sharepoint-conference-presenters


date: 2018-05-27T10:07:47+06:00

# post thumb

image: "posts/changing-your-command-prompt-to-display-node-module-and-git-information-like-the-sharepoint-conference-presenters/featured-image.webp"

# meta description

summary: "This article will show you how you too can install and configure this command line interface."

# taxonomies

categories:

- "Coding"
tags:
- "Command prompt"
---
## Introduction

Last week, I attended the [SharePoint 2018 Conference](https://sharepointna.com/#!/) in Las Vegas. There were a lot of cool announcements and demos. The SharePoint team rocks!

One of the cool things that I noticed which has nothing to do with SharePoint was that a lot of presenters who showed code had a really cool command prompt that showed the node module they were in, and their Git branch status in a pretty “boat chart”.

![Console showing node module version and git branching information](cmder-sample-1-4021486213-1527447022940.png)

I had seen this many times before, but never realized how much easier it was to get a sense of what’s going on until I was watching someone else code on a big screen.

Of course, I set out to find and configure this awesome command-line on my workstation.

This article will show you how you too can install and configure this command line interface.

## Cmder

During [Vesa](https://twitter.com/vesajuvonen?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor)‘s awesome session, I paid close attention to the title of his command line window. It said **Cmder**.

I had seen Cmder before; the article [Set up your SPFx development environment](https://docs.microsoft.com/sharepoint/dev/spfx/set-up-your-development-environment) mentions Cmder in the **Optional Tools** section.

But the version of Cmder I had installed didn’t have the fancy “boat chart” at the top that got my attention.

As it turns out, you need to download another custom prompt for Cmder that adds the **Powerline** (that’s the real name for the “boat chart”) at the top.

Here is how to install and configure Cmder with the Powerline command prompt:

## Installing Cmder

1. Go to [http://cmder.net/](http://cmder.net/) and download either the **Mini** pack or the **Full** pack.
2. Unzip the package. Cmder is designed to be portable and to require no administrative privileges to run, so their instructions tell you to **not** install it in the **Program Files** folder (where you’ll need administrative privileges). I placed it in **C:\\Users\\\[myusername\]\\AppData\\Local\\cmder**.
3. Open a command prompt in **Administrative** mode from the folder where you copied the **Cmder** files
4. From the command-prompt, type:

    cmder /REGISTER ALL

5. If you get an **Access Denied** error, you probably forgot to run the command in Administrative mode. If you don’t know how to do that, type **cmd** from your **Start** menu, and right-click on **Command Prompt** and select **Run as administrator**.
6. Cmder should be installed. You can verify by opening a new **File Explorer** window and right-clicking on a folder. You should get a **Cmder Here** option.  
    ![Cmder Here](Cmder-Here-4191342560-1527448870266.png)

Unfortunately, if you open Cmder with that command line, you don’t get the fancy Powerline.

Let’s fix that!

## Installing Cmder Powerline custom prompt

The [Cmder Powerline](https://github.com/AmrEldib/cmder-powerline-prompt) custom prompt changes the Cmder prompt to include the following modifications:

- The folder portion of the prompt is displayed in blue. The user’s home folder is also replaced with a tilde (~).
- If the current folder is an npm package, the prompt will display the package package name and version number in teal.
- If the current folder is a Git repository, the prompt will display the branch name with a green colour if the branch is unchanged, or yellow if changes are found.

To install the Cmder Powerline custom prompt:

1. Download the [AnonymousPro font](https://github.com/powerline/fonts/tree/master/AnonymousPro). You can do so by clicking on each **TTF** file in GitHub and selecting **View Raw**. For your convenience, here are the links to the raw files:  
    [Anonymice Powerline Bold Italic.ttf](https://github.com/powerline/fonts/blob/master/AnonymousPro/Anonymice%20Powerline%20Bold%20Italic.ttf?raw=true)  
    [Anonymice Powerline Bold.ttf](https://github.com/powerline/fonts/blob/master/AnonymousPro/Anonymice%20Powerline%20Bold.ttf?raw=true)  
    [Anonymice Powerline Italic.ttf](https://github.com/powerline/fonts/blob/master/AnonymousPro/Anonymice%20Powerline%20Italic.ttf?raw=true)  
    [Anonymice Powerline.ttf](https://github.com/powerline/fonts/blob/master/AnonymousPro/Anonymice%20Powerline.ttf)
2. Once dowloaded each font, install them by double-clicking them and selecting **Install** on each one of them.
3. Copy all the **.lua** files from the [Cmder Powerline](https://github.com/AmrEldib/cmder-powerline-prompt) source and place them in the **config** folder under the Cmder install folder.
4. If you haven’t done so yet, launch a Cmder window by going to the folder where you installed in and double-clicking on **Cmder.exe**
5. From the Cmder window, open the Settings by hitting **Windows-Alt-P**.
6. From the **Main** settings area, select **Anonymice Powerline** font from the **Alternative font (pseudographics, CJK, etc.)** drop-down.
7. In the **Unicode ranges** combo box, type **E0A0-E0B0** and select **Apply.**
8. Select **Save settings** to save your settings and return to the command prompt in **Cmder**.

![CmderSettings](CmderSettings.png)

That’s all you need to do.

## Cmder with Visual Studio Code

If you want Cmder to show up in Visual Studio Code, follow these steps:

1. Launch **Visual Studio Code**.
2. From the **File** menu, select **Preferences | Settings** or use **Ctrl-,** (Control and comma). This will open your settings editor.
3. In the right-pane of the settings editor (the one that’s actually editable), insert the following JSON, just before the last **}** , making sure to replace the path to **Cmder** with the path where you installed it.

    ```
    "terminal.external.windowsExec": "C:\\Users\\[myusername]\\AppData\\Local\\cmder\\Cmder.exe",
    "terminal.integrated.shell.windows": "cmd.exe",
    "terminal.integrated.shellArgs.windows" : [
    "/K",
    "C:\\Users\\[myusername]\\AppData\\Local\\cmder\\vendor\\init.bat"
    ],
    ```

That’s all!

## Conclusion

I hope that you’ll find Cmder and the custom Cmder Powerline command-prompt useful in your SPFx development endeavors.

I know I did!

## For More Information

[Cmder.net](http://cmder.net/) lists more information about Cmder, including the super-powerful shortcut keys.

[Amr Eldib](https://github.com/AmrEldib/cmder-powerline-prompt) is the brilliant mind behind the Cmder Powerline command-prompt.

[Sahil Malik](https://winsmarts.com/using-cmder-as-integrated-shell-in-vscode-c3340714fe3c) has detailed instructions (and a video!) to to integrate with Cmder Visual Studio Code.

# Update

In the previous revision of this article, I had forgotten to include the steps to copy the .lua files to the config folder. It works much better when you include _all_ the steps, it turns out 🙂
