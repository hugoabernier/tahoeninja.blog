---
title: Associate Node.js version with your SPFx solutions
date: 2023-09-13T10:07:47+06:00

# post thumb
image: posts/associate-node-version-with-spfx-solution/texture-2945315_1280.jpg
# meta description
summary: "If you use a node version manager like nvm or nvs, wouldn't you like to automatically load the right version of Node.js when you open an SPFx solution in VSCode? I know I do. Because I am _lazy_."

# taxonomies
categories:
- "SPFx"
tags:
- VSCode
- Node.js
- nvm
- nvs
- NoteToSelf
---


## Introduction

Here the deal: I am lazy. I don't want to have to remember to switch to the right version of Node.js every time I open an SPFx solution in VSCode. I want it to be automatic. I want it to be _lazy_. 

This solution works in Windows, but I am sure you can adapt it to other platforms.

## The problem

When you open an SPFx solution in VSCode, you need to make sure you are using the right version of Node.js. If you don't, you will get a nasty error message.

And every version of SPFx potentially requires a different version of Node.js. If you manage multiple SPFx solutions, you may need to switch between different versions of Node.js several times a day.

Sure, you can look up the appropriate version of Node.js for every version of SPFx, and load it when you open a solution (and there is a [great resource](https://aka.ms/spfx-matrix) to do so). But that is a lot of work. And it is _boring_. And I am _lazy_.

And even if you are not as lazy as I am, it takes extra time, and potentially leads to errors.

And, technically, you can only have one version of Node.js installed at once. So you need to uninstall the current version, and install the new version. 

## The solution

### Use a node version manager

The solution is to use a node version manager. A node version manager allows you to switch back and forth between versions of Node.js without uninstalling and re-installing.

There are several options, but the two most popular ones are [nvm](https://github.com/coreybutler/nvm-windows), [nvs](https://github.com/jasongin/nvs) and [Volta](https://github.com/volta-cli/volta#installing-volta).

I use nvs (I'll explain why in a second), but the instructions below should work with the other version managers as well.

nvs is a cross-platform version manager, and it is easy to install. The best part, however, is that you don't need to have administrator access to your workstation to install it, and you don't need to have administrator access to install new versions of Node.js. This is important if you are working in a corporate environment where you don't have administrator access to your workstation.

The only downside is that nvs forgets what version of Node.js you're using every time you open a new command prompt. But that's kinda the point, isn't it?

But again, feel free to use whatever version manager you want. I'm not judging.

### Associate a version of Node.js with a solution

The next step is to remember which version of Node.js you need for each solution. You can do this by creating a `.nvmrc` file in the root folder of your solution. The `.nvmrc` file is a simple text file that contains the version of Node.js you want to use for that solution. Most version managers understand how to use this file.

To generate the `.nvmrc` file, you can use the following command:

```powershell
node -v > .nvmrc
```

This will create a `.nvmrc` file in the root folder of your solution, containing the version of Node.js you are currently using. 

It looks a little bit like this:

```text
v20.6.0
```

You can also write `20.6.0` without the `v`` letter, it'll will work just fine.

Once your `.nvmrc` file is created, you can use the following command to load the right version of Node.js:

```powershell
nvs use
```

For nvm, you'd use the following command:

```powershell
nvm use
```

It'll magically look up the version of Node.js you need, and load it for you.

> #### Note to Windows and nvs users
>
> if you get an error message saying that your version string is invalid, it may be due to the way that Windows encodes files. Use the following command to fix the file encoding:
>
> ```powershell
> [string]::Join( "`n", (gc .nvmrc)) | sc .nvmrc 
> ```

### Automatically load the right version of Node.js when you open a solution

Now that you have a version manager installed, and you have associated a version of Node.js with your solution, you need to make sure that the right version of Node.js is loaded when you open a solution in VSCode.

To do this, I prefer to use solution settings in VSCode. Solution settings are stored in a `.vscode` folder in the root folder of your solution. You can create a `settings.json` file in that folder, and add the following setting for PowerShell and nvs:

```json
{
    "terminal.integrated.profiles.windows": {
        "PowerShell": {
            "source": "PowerShell",
            "icon": "terminal-powershell",
            "args": [
                "-NoExit",
                "-Command",
                "nvs use"
            ]
        }
    }
}
```

Feel free to update the command to use the version manager of your choice.

The `.vscode` file is usually ignored by GitHub, so you'll have to look for it in the `.gitignore` file, and remove it.

> If you use nvm, you can use the [VSCode extension](https://marketplace.visualstudio.com/items?itemName=zqy233.vscode-nvmrc) that automatically loads the right version of Node.js when you open a solution.

## Conclusion

There you go. Now you can be as lazy as I am, and automatically load the right version of Node.js when you open an SPFx solution in VSCode.

Could I have use other approaches? Sure. But this one works for me.

What about you? How do you manage multiple versions of Node.js? Let me know in the comments.

## Photo Credit

Photo by [G.C.](https://pixabay.com/users/garten-gg-201217/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=2945315) from [Pixabay](https://pixabay.com/)