---
title: "Getting rid of JSON validation errors on comments"
date: 2020-08-26T12:00:00Z
summary: "Introduction If you're an SPFx developer who uses Visual Studio Code, you may have noticed that the JSON files that the Yeoman generator creates contain comments to help you understand how to configure your manifest. The only problem is: JSON files aren't supposed to have comments."
author: "Hugo Bernier"
image: "images/post/uploads/2020/08/badschema.png"
categories:
- "VS Code"
---
## Introduction

If you’re an SPFx developer who uses Visual Studio Code, you may have noticed that the JSON files that the Yeoman generator creates contain comments to help you understand how to configure your manifest.

The only problem is: JSON files aren’t supposed to have comments. And Visual Studio Code likes to remind you of that when it sees comments in a JSON file.

For example, when you open the manifest for your brand new SPFx web part, you’ll find these nasty error messages:

![Visual Studio Code showing JSON validation errors](../../images/post/uploads/2020/08/badschema-1024x314.png)

An example of schema validation errors caused by comments

I’m one of those people who can’t stand any validation errors or warnings. I know, I know, I’m weird. But it drives me insane!!!

Luckily, [Paul Schaeflein](https://twitter.com/paulschaeflein) has a solution that he Tweeted this morning:

> Tired of the squigglies in the SPFx configuration files? Add this to your Workspace settings (.vscodesettings.json):  
>
> "files.associations": {  
> "\*.json": "jsonc"  
> }
>
> — Paul Schaeflein (@paulschaeflein) [August 12, 2020](https://twitter.com/paulschaeflein/status/1293559439195340800?ref_src=twsrc%5Etfw)

In this super-quick post, I’ll show how to configure your Visual Studio Code to stop showing validation errors for comments in JSON files.

Paul Schaeflein deserves all the credit for this. I’m just giving you step-by-step instructions.

## Configuring JSON files to accept comments


From Visual Studio Code, follow these steps:

1. From the menu, go to **File** | **Preferences** | **Settings**
2. In the **User** preferences tab, expand the **Text Editor** section and select **Files**
3. In the **Associations** setting, select **Add Item**
4. In the new row, enter the following values:
    1. Under **Key** enter **\*.json**
    2. Under **Value** enter **jsonc**
5. Select **OK** to add your entry

That’s it! Now you should be able to go to your manifest file and enjoy the squiggle-less JSON with comments!

![Wisual Studio Code showing JSON without validation errors](images/post/uploads/2020/08/goodschema-1024x289.png)

Ahhh, no more schema validation errors!

## What unholy magic is this?


Few people know that if you save your .JSON file as a .JSONC file, you won’t get validation errors. That’s because .JSONC stands for "JSON with comments".

However, you can’t rename your schema files in an SPFx solution to .JSONC because SPFx expects .JSON files — not .JSONC.

Paul’s "hack" simply associates .JSON files with the .JSONC schema. That way, Visual Studio Code treats every .JSON file as a .JSONC — regardless of the extension.

## Thank You


Thanks [Paul Schaeflein](https://twitter.com/paulschaeflein) for this tip! You may have saved my sanity!
