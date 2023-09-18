---
title: "Automatically deploy SPFx extension to multiple sites using PowerShell"
aliases:
  - /2018/04/18/automatically-deploy-spfx-extension-to-multiple-sites-using-powershell

date: 2018-04-18T10:07:47+06:00

# post thumb
image: posts/automatically-deploy-spfx-extension-to-multiple-sites-using-powershell/featured-image.webp

# meta description
summary: In this article, I’ll share a PowerShell script I use to deploy to many sites at once.

# taxonomies
categories:
  - SPFx
tags:
- PowerShell
---
An awesome part of SPFx is the ability to create [SharePoint Framework Extensions](https://docs.microsoft.com/sharepoint/dev/spfx/extensions/overview-extensions). At the time of this writing, you can write three types of SPFx extensions:

- **Application customizers:** to add scripts to pages and access HTML to predefined (_well-known_) HTML elements. At the moment, there are only a few page placeholders (like headers and footers), but I’m sure the hard-working SPFx team will announce new ones soon enough. For example, you can add your own customized copyright and privacy notices at the bottom of every modern page.
- **Field customizers:** to change the way fields are rendered within a list. For example, you could render your own sparkline chart on every row in a list view.
- **Command sets:** to add commands to list view toolbars. For example, you could add a button to perform an action on a selected list item.

This articles doesn’t try to explain how to create extensions — there are many great examples on the [SharePoint Framework Extensions Samples & Tutorial Materials](https://github.com/SharePoint/sp-dev-fx-extensions) GitHub repo, and the [Overview of SharePoint Framework Extensions](https://docs.microsoft.com/sharepoint/dev/spfx/extensions/overview-extensions) tutorial is a pretty place to start if you haven’t played with extensions.

In this article, I’ll share a PowerShell script I use to deploy to many sites at once.

But first, a few things you need to know:

- To deploy an extension, you need to first deploy the solution (.sppkg) containing the extension, then add a custom user action to your site, web, or list. In other words, tell the site, web, or list to use the extension that you deployed in the solution. There are no user interfaces to add custom user actions.
- When you add a custom user action, you can pass configuration properties to your extension.
- It is possible to add a custom user action to the same site, web, or list more than once (because you _could_ pass different configuration properties every for every instance).
- You can also specify a JSON file in your solution that will automatically deploy and add the custom user action, but you can’t customize the configuration properties.

When you have a SharePoint tenant with lots and lots of sites, and you need to provide different configuration properties for each site, it can become painful to deploy an extension everywhere.

Sure, the solution deployment step is easy, just make sure that your **solution-package.json** has `"skipFeatureDeployment": true,` and SharePoint will kindly offer to automatically deploy your solution to every site for you.

But to add an extension as a custom user action and provide configuration properties, you need to call a command or use some scripts:

- You can use Vardhaman Deshpande’s [SPFx-extensions-cli](https://github.com/vman/spfx-extensions-cli) (or command-line interface).
- You can use CSOM
- You can use the [Pnp PowerShell](https://github.com/pnp/PnP-PowerShell) cmdlets
- You can use [cli-microsoft365](https://github.com/pnp/cli-microsoft365) (spo customaction add)

When I need to do just one site, I’ll often use the SPFx-extensions-cli, but when I need to do a whole bunch of sites, I like to use the PnP PowerShell cmdlets and PowerShell.

The idea came from the [RegionsFooterProvisionCustomizer.ps1](https://github.com/pnp/sp-dev-fx-extensions/blob/master/samples/react-application-regions-footer/RegionsFooterProvisionCustomizer.ps1) script on Paolo Pialorsi’s awesome [Regions Footer Application Customizer example](https://github.com/pnp/sp-dev-fx-extensions/tree/master/samples/react-application-regions-footer), which goes like this:

```powershell
$credentials = Get-Credential
Connect-PnPOnline "https://.sharepoint.com/sites/" -Credentials $credentials

$context = Get-PnPContext
$web = Get-PnPWeb
$context.Load($web)
Execute-PnPQuery

$ca = $web.UserCustomActions.Add()
$ca.ClientSideComponentId = "67fd1d01-84e8-4fbf-85bd-4b80768c6080"
$ca.ClientSideComponentProperties = "{""SourceTermSetName"":""Regions""}"
$ca.Location = "ClientSideExtension.ApplicationCustomizer"
$ca.Name = "RegionsFooterCustomAction"
$ca.Title = "RegionsFooterCustomizer"
$ca.Description = "Custom action for Regions Footer Application Customizer"
$ca.Update()

$context.Load($web.UserCustomActions)
Execute-PnPQuery
```

Now Paolo’s script will only work for his extension, but you can easily go in and change the **ClientSideComponentId**, **ClientSideComponentProperties**, **Name**, **Title** and **Description** and make it your own. And if you mistakenly re-run the script for the same site twice, the extension will appear twice.

But I wanted to repeat this for each site on one of my tenant’s bazillion sites, and provide different configuration properties — if necessary. I also wanted to be able to re-run the script as many times as I wanted. Finally, I wanted the customer to be able to simply provide a CSV with a list of sites where they wanted the extensions applied.

So I made tweaked Paolo’s code to read the list of sites from aCSV file and apply the extension to each site. I borrowed a lot of this script from another example on the [SharePoint Framework Extensions Samples & Tutorial Materials](https://github.com/pnp/sp-dev-fx-extensions) GitHub repo, but I can’t find it anymore, so I can’t tell who I should give the credit to.  Let me know in the comments if you know who deserves the credits. I’m lazy, but I’m not a thief 🙂

First, make sure that you install the [PnP PowerShell](https://github.com/pnp/PnP-PowerShell) cmdlets on your workstation.

Then create a new PowerShell file and copy this code into it:

```powershell

$credentials = Get-Credential

# Import the list of sites where we want to apply 
$sitesToProcess = import-csv "sites.csv"

# details of custom action/SPFx extension
[guid]$spfxExtId = "[extension id goes here]"
[string]$spfxExtName = "[extension name goes here]"
[string]$spfxExtTitle = "[extension title goes here]"
[string]$spfxExtGroup = "[extension group goes here]"
[string]$spfxExtDescription = "[extension description goes here]"
[string]$spfxExtLocation = "ClientSideExtension.ApplicationCustomizer"
[string]$spfxExtension_Properties = "[properties JSON goes here]"

function Add-CustomActionForSPFxExt ([string]$url, $clientContext) {
    Write-Output "-- About to add custom action to: $url"

    $rootWeb = $clientContext.Web
    $clientContext.ExecuteQuery()
    $customActions = $rootWeb.UserCustomActions
    $clientContext.Load($customActions)
    $clientContext.ExecuteQuery()

    $custAction = $customActions.Add()
    $custAction.Name = $spfxExtName
    $custAction.Title = $spfxExtTitle
    $custAction.Description = $spfxExtDescription
    $custAction.Location = $spfxExtLocation
    $custAction.ClientSideComponentId = $spfxExtId
    $custAction.ClientSideComponentProperties = $spfxExtension_Properties
    $custAction.Update()
    $clientContext.ExecuteQuery()

    Write-Output "-- Successfully added extension"  
 
    Write-Output "Processed: $url"
}
function Remove-CustomActionForSPFxExt ([string]$extensionName, [string]$url, $clientContext) {
    Write-Output "-- About to remove custom action with name '$($extensionName)' from: $url"

    $actionsToRemove = Get-PnPCustomAction -Web $clientContext.Web | Where-Object {$_.Location -eq $spfxExtLocation -and $_.Name -eq $extensionName }
    Write-Output "-- Found $($actionsToRemove.Count) extensions with name $extensionName on this web."  
    foreach ($action in $actionsToRemove) {
        Remove-PnPCustomAction -Identity $action.Id
        Write-Output "-- Successfully removed extension $extensionName from web $url."  
    }

    Write-Output "Processed: $url"
}

# -- end functions --

foreach ($site in $sitesToProcess) {
    $ctx = $null
    $url = $site.Url
    try {
        Connect-PnPOnline -Url $url -Credentials $credentials
        Write-Output ""
        Write-Output "Authenticated to: $url"
        $ctx = Get-PnPContext
    }
    catch {
        Write-Error "Failed to authenticate to $url"
        Write-Error $_.Exception
    }

 # Make sure have a context before continuing
    if ($ctx) {
  # Find out if the extension is already added
  $existingActions = Get-PnPCustomAction -Web $ctx.Web | Where-Object {$_.Location -eq $spfxExtLocation -and $_.Name -eq $spfxExtName }
  
  # Count how many existing extensions we found
  $count = $($existingActions.Count)
  
  # Don't re-install extension if it is already there
        if ($count -ge 1) {
   #This assumes that you don't want to duplicate extensions. If you do, feel free to change the logic below
            if ($count -eq 1) {
                Write-Output "Extension is already applied"
            }
            else {
                Write-Warning "Extension is duplicated!"
            }
        }
        else {
   # Add the extension
   Add-CustomActionForSPFxExt $url $ctx
   Write-Output "-- Successfully added extension $spfxExtName to web $url."
        }
  
        #Add-CustomActionForSPFxExt $url $ctx
        #Remove-CustomActionForSPFxExt $spfxExtName $site $ctx
        #Get-PnPCustomAction -Web $ctx.Web | Where-Object {$_.Location -eq "ClientSideExtension.ApplicationCustomizer" }
    }
}
```

Making sure to replace all the **\[sections in bold\]** with your own information. I get the **name** and **id** from the extension’s **manifest.json** file.

Then, create a CSV file containing all the sites you want to get the extension. It should look like this:

```csv
Url
https://yourtenantgoeshere.sharepoint.com/sites/Employee
https://yourtenantgoeshere.sharepoint.com/sites/Employee/About
https://yourtenantgoeshere.sharepoint.com/sites/Employee/Calendars
https://yourtenantgoeshere.sharepoint.com/sites/Employee/Learning
https://yourtenantgoeshere.sharepoint.com/sites/Employee/FAQs
https://yourtenantgoeshere.sharepoint.com/sites/Employee/Learning
https://yourtenantgoeshere.sharepoint.com/sites/Employee/News
https://yourtenantgoeshere.sharepoint.com/sites/Employee/InformationTechnology
https://yourtenantgoeshere.sharepoint.com/sites/Employee/MarketingAndCommunications
https://yourtenantgoeshere.sharepoint.com/sites/Employee/Security
https://yourtenantgoeshere.sharepoint.com/sites/Employee/EnvironmentalSustainability
https://yourtenantgoeshere.sharepoint.com/sites/Employee/HealthAndSafety
https://yourtenantgoeshere.sharepoint.com/sites/Employee/Fundraising
https://yourtenantgoeshere.sharepoint.com/sites/Employee/Glossary
https://yourtenantgoeshere.sharepoint.com/sites/Employee/Parking
https://yourtenantgoeshere.sharepoint.com/sites/Employee/purchasing
```

Using your own urls, and saving it as **sites.csv** in the same folder as the PowerShell script.

Then you can run the script and it’ll connect to every site and apply the extension and provide the configuration properties, but only if the extension hasn’t already been installed.

You could also tweak the script and the CSV to pass different configuration properties for each site, but I’ll reserve it for another post.

Leave me a comment if you’d like me to post it.

I hope it helps!
