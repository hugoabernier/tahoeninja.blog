---
title: "Saving files from a SharePoint document library to a local folder using CSOM"
aliases:

- /2018/03/28/saving-files-from-a-sharepoint-document-library-to-a-local-folder-using-csom

date: 2018-03-28T10:07:47+06:00

# post thumb

image: "posts/saving-files-from-a-sharepoint-document-library-to-a-local-folder-using-csom/featured-image.webp"

# meta description

summary: "I was trying to write a little app to programmatically download files from a SharePoint instance on Office 365 to a local folder on my hard-drive/network file share — something I’ve probably done a thousand times"

# taxonomies

categories:

- "SharePoint"
tags:
- "CSOM"
---
### The Problem

I was trying to write a little app to programmatically download files from a SharePoint instance on Office 365 to a local folder on my hard-drive/network file share — something I’ve probably done a thousand times — using this code:

```csharp
/*
* This code assumes you already have filled the following variables
* earlier in the code
* Code has been simplified for 
*/
var webUrl = "https://yourtenantgoeshere.sharepoint.com/site/yoursitename";
var username = "yourusernamegoeshere@yourtenantgoeshere.com";
var password = "pleasedonteverwriteyourpasswordincode";
var listTitle = "yourdocumentlibrarytitle";
var destinationFolder = @"C:temp";

var securePassword = new SecureString();
//Convert string to secure string
foreach (char c in password) {
    securePassword.AppendChar(c);
}
securePassword.MakeReadOnly();

using (var context = new ClientContext(webUrl))
{
    // Connect using credentials -- use the approach that suits you
    context.Credentials = new SharePointOnlineCredentials(userName, securePassword);

    // Get a reference to the SharePoint site
    var web = context.Web;

    // Get a reference to the document library
    var list = context.Web.Lists.GetByTitle(listTitle);

    // Get the list of files you want to export. I'm using a query
    // to find all files where the "Status" column is marked as "Approved"
    var camlQuery = new CamlQuery
    {
        ViewXml = @"
            Approved
            1000
        "
    };

    // Retrieve the items matching the query
    var items = list.GetItems(camlQuery);

    // Make sure to load the File in the context otherwise you won't go far
    context.Load(items, items2 => items2.IncludeWithDefaultProperties
        (item => item.DisplayName, item => item.File));

    // Execute the query and actually populate the results
    context.ExecuteQuery();

    // Iterate through every file returned and save them
    foreach (var item in items)
    {
        // THIS IS THE LINE THAT CAUSES ISSUES!!!!!!!!
        using (FileInformation fileInfo = Microsoft.SharePoint.Client.File.OpenBinaryDirect(context, item.File.ServerRelativeUrl))
        {
     // Combine destination folder with filename -- don't concatenate
            // it's just wrong!
            var filePath = Path.Combine(destinationFolder, item.File.Name);

            // Erase existing files, cause that's how I roll
            if (System.IO.File.Exists(filePath))
            {
                System.IO.File.Delete(filePath);
            }

            // Create the file
            using (var fileStream = System.IO.File.Create(filePath))
            {
                fileInfo.Stream.CopyTo(fileStream);
            }
        }
    }
}
```

The “usings” at the top of the file were:

```csharp
using System;
using System.Collections.Generic;
using System.Security;
using Microsoft.SharePoint.Client;
using System.IO;
```

And every time I ran the code, I’d get a really annoying error on the **OpenBinaryDirect** method:

> this property cannot be set after writing has started.

If I wasn’t already bald, I would be after searching everywhere how to solve it.

### The Solution

As it turns out, when I created my console application, I followed these steps:

1. Launch Visual Studio
2. **File | New Project… | Console Application** and saved the project
3. On the newly created project, added Microsoft.SharePoint.Client references by right-clicking on the project’s **References** and selecting **Manage Nuget Packages** and selecting the first nuget reference that had **Microsoft.SharePoint.Client** that looked semi-official — you know, the one that says “by Microsoft”

Wrote the code and quickly ran into the aforementioned error.

As it turns out, I needed to use the Nuget package that said **Microsoft.SharePointOnline.CSOM** (also by Microsoft).

I removed the **Microsoft.SharePoint.Client** Nuget package and added **Microsoft.SharePointOnline.CSOM** instead. It automatically included the right **Microsoft.SharePoint.Client** and **Microsoft.SharePoint.Client.RunTime** dependencies it needed.

After recompiling, it worked perfectly.

The way it should have done several hours ago.

After a lot of cursing, mostly directed at myself, I decided to write this down as a #NoteToSelf. Next time I run into this issue, at least I’ll find a blog entry describing the solution.

My own.
