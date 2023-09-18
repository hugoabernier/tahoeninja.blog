---
title: "Uploading High Resolution User Profile Pictures to Office 365 Using PowerShell"
aliases:

- /2015/04/10/uploading-high-resolution-user-profile-pictures-to-office-365-using-powershell


date: 2015-04-10T10:07:47+06:00

# post thumb

image: "posts/uploading-high-resolution-user-profile-pictures-to-office-365-using-powershell/featured-image.webp"

# meta description
summary: "Although you can use the web-based GUI to update profile pictures on Office 365, sometimes you need to upload many pictures at once."

# taxonomies

categories:

- "Microsoft 365"
tags:
- PowerShell
---
Although you can [use the web-based GUI to update profile pictures on Office 365](/2015/04/10/uploading-user-profile-pictures-using-the-web-based-gui/ "Uploading User Profile Pictures using the Web-Based GUI"), sometimes you need to upload many pictures at once.

This is where PowerShell comes in handy. Here are the instructions to upload high resolution user profile pictures to Office 365 using PowerShell commands:

1. 1. Launch the **PowerShell** console using **Run as Administrator**  
        [![image](image_thumb.png "image")](image.png)
2. In the PowerShell console, provide your Office 365 credentials by typing the following command and hitting **Enter**:

        ```powershell
        $Creds = Get-Credential
        ```

3. You’ll be prompted to enter your credentials. Go ahead, I’ll wait.
4. Create a PowerShell remote session to Office 365/Exchange by entering the following command and hitting **Enter**:

        ```powershell
                 $RemoteSession = New-PSSession -ConfigurationName Microsoft.Exchange
        -ConnectionUri https://outlook.office365.com/powershell-liveid/?proxymethod=rps -Credential $Creds -Authentication Basic
        -AllowRedirection
        ```

5. Initialize the remote session by entering:  
         **Import-PSSession $RemoteSession**
6. Doing so will import all the required Cmdlets to manage Exchange – this is why you don’t need to install any Exchange PowerShell modules or anything like that.
7. If you get an error at this time telling you something about script execution not being enabled (or something like that, I never read the actual error message). Enter the following command to enable remotely signed commands:

        ```powershell
        Set-ExecutionPolicy RemoteSigned
        ```

        The above command is only required if you got an error. Some articles may say that you need to set the execution policy to Unrestricted, but – being paranoid – I prefer to limit the policy to remote signed commands. If you got an error while trying to set the execution policy, it is most likely because you forgot to **Run as Administrator** as indicated in step 1 above. Tsk tsk, pay attention!  
        Once you set the execution policy without an error, try **step 5** again.

8. Once the session has been imported, you’ll have new Cmdlets available. The most important one being **Set-UserPhoto**. But before you need to call Set-UserPhoto, you need to load the photo you want to use. To do so, call:

        ```powershell
        $photo = "pathofyourphoto.jpg"
        ```

        Making sure to replace **pathofyourphoto** with the file name for the picture you wish to upload

9. Now you can set the user’s photo by using the following command:

        ```powershell
        Set-UserPhoto -Identity "testuser@xyz.com" -PictureData ([System.IO.File]::ReadAllBytes($photo)) -Confirm:$false
        ```

        Making sure to replace **<testuser@xyz.com>** with the user id of the profile you wish to change.

10. Repeat steps 8-9 until all your pictures have been uploaded. One of these days, I’ll write a script to iterate through all the pictures. Let me know in comments below if you need that script.
11. When done, call

        ```powershell
        Remove-PSSession $RemoteSession
        ```

For your convenience, here is the whole PowerShell script:

```powershell
$Creds = Get-Credential
$RemoteSession = New-PSSession -ConfigurationName Microsoft.Exchange -ConnectionUri https://outlook.office365.com/powershell-liveid/?proxymethod=rps -Credential $Creds -Authentication Basic –AllowRedirection
Import-PSSession $RemoteSession
$photo = “pathofyourphoto.jpg”
Set-UserPhoto -Identity “testuser@xyz.com” -PictureData ([System.IO.File]::ReadAllBytes($photo)) -Confirm:$false
Remove-PSSession $RemoteSession
```

If you used the PowerShell script above, you’ll be able to upload 648×648 pixel photos without any issues for you and other users. If you didn’t use this script, but you get the following error:

```powershell
The remote server returned an error: (413) Request Entity Too Large
```

…it is most likely because you connected to your remote PowerShell session without setting the proxy method.  Compare the two PowerShell commands:

<table border="0" width="1189" cellspacing="0" cellpadding="2"><tbody><tr><td valign="top" width="200"><strong>Works Only with Photos 10Kb or Below</strong></td><td valign="top" width="987"><pre class=" language-powershell"><code class=" language-powershell"><span class="token variable">$RemoteSession</span> = <span class="token function">New-PSSession</span> <span class="token operator">-</span>ConfigurationName Microsoft<span class="token punctuation">.</span>Exchange <span class="token operator">-</span>ConnectionUri https:<span class="token operator">/</span><span class="token operator">/</span>outlook<span class="token punctuation">.</span>office365<span class="token punctuation">.</span>com<span class="token operator">/</span>powershell<span class="token operator">-</span>liveid<span class="token operator">/</span> <span class="token operator">-</span>Credential <span class="token variable">$Creds</span> <span class="token operator">-</span>Authentication Basic –AllowRedirection</code><button class="copy-button">Copy</button></pre></td></tr><tr><td valign="top" width="200"><strong>Works with Photos Greater than 10Kb</strong></td><td valign="top" width="987"><pre class=" language-powershell"><code class=" language-powershell"><span class="token variable">$RemoteSession</span> = <span class="token function">New-PSSession</span> <span class="token operator">-</span>ConfigurationName Microsoft<span class="token punctuation">.</span>Exchange <span class="token operator">-</span>ConnectionUri https:<span class="token operator">/</span><span class="token operator">/</span>outlook<span class="token punctuation">.</span>office365<span class="token punctuation">.</span>com<span class="token operator">/</span>powershell<span class="token operator">-</span>liveid<span class="token operator">/</span>?proxymethod=rps <span class="token operator">-</span>Credential <span class="token variable">$Creds</span> <span class="token operator">-</span>Authentication Basic –AllowRedirection</code><button class="copy-button">Copy</button></pre></td></tr></tbody></table>

I hope the information above helped?

# For more information

Set-UserPhoto CmdLet  
[http://technet.microsoft.com/en-us/library/jj218694.aspx](http://technet.microsoft.com/en-us/library/jj218694.aspx)

Configuring the use of high-resolution photos in Microsoft Lync Server 2013  
[https://technet.microsoft.com/en-us/library/jj688150.aspx](https://technet.microsoft.com/en-us/library/jj688150.aspx "https://technet.microsoft.com/en-us/library/jj688150.aspx")
