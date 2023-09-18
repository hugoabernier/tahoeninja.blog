---
title: "SPFx, Semantic versioning, and CHANGELOG.md"
aliases:
  - /2018/04/16/spfx-semantic-versioning-and-changelog-md

date: 2018-04-16T10:07:47+06:00

# post thumb
image: posts/spfx-semantic-versioning-and-changelog-md/featured-image.webp

# meta description
summary: This article is a great example of that mentality. I’m really standing on the shoulder of giants and combining a few links and re-using someone else’s code (with credit, _of course_) to document what my approach to versioning SPFx packages is, with the hope that it helps someone else.

# taxonomies
categories:
  - SPFx
---
As the _World’s Laziest Developer_, I don’t like to invent anything new if I can find something that already exists (and meets my needs).

This article is a great example of that mentality. I’m really standing on the shoulder of giants and combining a few links and re-using someone else’s code (with credit, _of course_) to document what my approach to versioning SPFx packages is, with the hope that it helps someone else.

## The problem with change logs

There are a few ways to communicate changes when working on a project: you can use your commit log diffs, [GitHub Releases](https://help.github.com/articles/creating-releases/), use your own log, or any other standard out there.

The problem with commit log diffs is that, while comprehensive, they are an automated log of changes that include every-single-change. Log diffs are great for documenting code changes, but if you have a team of developers merging multiple commits every day between versions, they aren’t great at summarizing the noteworthy differences.

GitHub Releases solves a part of this problem by making it easy to manually (or automatically) creating release notes with git tags. (f you haven’t looked into GitHub Releases, it is awesome —  [take a look](https://help.github.com/articles/creating-releases/)!.

However, GitHub Releases is still not very user-friendly (or manager-friendly).

You can always write your own change log format, but why not adopt a format and structure that you can use consistently across projects & teams?

## CHANGELOG.md

This is where CHANGELOGs come in. According to [Olivier Lacan](https://olivierlacan.com/) at [KeepAChangeLog.com](https://keepachangelog.com/en/1.0.0/), a changelog is…

> “a file which contains a curated, chronologically ordered list of notable changes for each version of a project.”

Changelogs use the markdown syntax to make it easy to maintain. They follow a few principles (again, credit to [KeepAChangeLog.com](https://keepachangelog.com/en/1.0.0/)):

- **They are for _humans_ not machines:** they should be easy to read and quickly make sense of relevant changes.
- **There should be an entry on every single version:**
  - **Latest version comes first:** List versions in reverse-chronological order, makes it easier to see what matters.
  - **Release date of each version is displayed:** use a consistent ISO standard date format (e.g.: 2018-04-16).
  - **Versions should be linkable:** becomes handy when you have a giant changelog. Just wrap your version number with \[\] (e.g.: \[0.0.1\]).
  - **Changes should be grouped by type of change:** group you changes into _Added, Changed, Deprecated, Removed, Fixed,_ and _Security._ Only include the groups of change types you have (no need to have a _Deprecated_ section if you don’t have any deprecated-type changes).
- **Mention whether you follow [Semantic Versioning](http://semver.org/):** You should, by the way.

## How to use CHANGELOG.md in your SPFx project

1. Add a new file in your project — wherever you put your README.md) and call it **CHANGELOG.md**.  
    (Sure, you can name your changelog whatever you want, but the _whole point_ of a changelog is to make it easy to find the changes on any projects, consistently. Just name it CHANGELOG.md. Trust me.)
2. Paste this template in the new file you created:

```markdown
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [Unreleased]
### Added

- (List new added features)

### Changed

- (List changes to existing functionality)

### Deprecated

- (List soon-to-be removed features)

### Removed

- (List features removed in this version)

### Fixed

- (List bugs fixed in this version)

### Security

- (List vulnerabilities that were fixed in this version)
```

3. As you work, keep a log of your changes in the **Unreleased** section, making sure to put the changes under their respective change types. If you want, you can even link to commits, but I don’t.
4. When you change your solution version, create a new section version entry below the **Unreleased** section. For example, for version **0.0.1** created **April 16, 2018**, insert the following text below the unreleased version:

```markdown

## [0.0.1] - 2018-04-16
```

Remember that not everyone is an American-born, native English speaker. Use the [ISO Standard](http://www.iso.org/iso/home/standards/iso8601.htm) format for dates. The French-Canadian in me thanks you.

5. Copy all the changes from **Unreleased** to your new version section, making sure to remove any empty change type sections. For example, if you don’t have any deprecated changes, remove the **\### Deprecated** section.
6. This is what the final version of your CHANGELOG.md would look like:

```markdown
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.0.1] - 2018-04-16

### Added
- (List new added features)

### Changed
- (List changes to existing functionality)

### Removed
- (List features removed in this version)

### Fixed
- (List bugs fixed in this version)

### Security
- (List vulnerabilities that were fixed in this version)
```

7. Copy back the section templates to the **Unreleased** section and continue steps 3-7 with every new version.

## Semantic versioning

I have worked with Microsoft technologies as long as I can remember, so it is ingrained in me that every version number should consist of 4 parts: Major, Minor, Build, Revision. For example, 1.0.0.0.

When you package an SPFx solution, the solution version always starts with version 1.0.0.0, and you can’t make it lower than that. (Well, you can, but SharePoint will ignore it and it will become version 1.0.0.0).

Imagine my horror when, one day, I was trying to change the version number of a solution and searched for 1.0.0 and found that the NodeJS package also has _its own version_, stored in a file called **package.json**. What’s worse, it didn’t even have 4 parts!

The heresy!

After my initial indignation, I decided to research this and found that the versioning schema is called [Semantic Versioning](https://semver.org/) (or sem-ver for short). It consists of three mandatory parts: Major, Minor, Patch, plus an optional label for pre-release and build metadata. For example, you could have a version 1.0.0-rc for a release candidate version.

Hmmm, makes it easier to keep track of versions. And it is more human-readable, which is always good.

To keep things even more confusing, each web part can have its own version number. While there are valid reasons why you would want to keep the package version, the solution version and the web part versions separate, it quickly becomes impossible to keep track of versions.

To keep things clean, it makes sense to keep version numbers in sync.

## npm version

Luckily, makes it easy to update your _package.json_ version by simply calling:

```powershell
npm version <major|minor|patch>
```

Where you specify to increase either the major, minor, or patch version.

For example, if you start with a package.json version 0.0.3 and want to increase the major version, you’d call:

```powershell
npm version major
```

Which would produce _v1.0.0_.

If only there was a way to make it this easy to synchronize the _package.json_ version to the _package-solution.json_ version.

If only someone _way_ smarter than I had thought of this…

## Sync npm version with package-solution.json

It turns out there is such a person: [Stefan Bauer](https://n8d.at/blog/)!

In his [blog post](https://n8d.at/blog/how-to-version-new-sharepoint-framework-projects/), he shares a way to add a Gulp function that automatically syncs the _package.json_ version with the _package-solution.json_.

(Thanks Stefan for being awesome!)

To add this Gulp function, do the following steps:

1. In your SPFx project, open **gulpfile.js**
2. Before **build.initialize(gulp);** add my slightly modified version of [Stefan](https://n8d.at/blog/how-to-version-new-sharepoint-framework-projects/)‘s code. If it works, credit goes to Stefan. If it fails, it was my changes.

    ```javascript
    let syncVersionsSubtask = build.subTask('version-sync', function (gulp, buildOptions, done) {
      this.log('Synching versions');
    
      // import gulp utilits to write error messages
      const gutil = require('gulp-util');
    
      // import file system utilities form nodeJS
      const fs = require('fs');
    
      // read package.json
      var pkgConfig = require('./package.json');
    
      // read configuration of web part solution file
      var pkgSolution = require('./config/package-solution.json');
    
      // log old version
      this.log('package-solution.json version:\t' + pkgSolution.solution.version);
    
      // Generate new MS compliant version number
      var newVersionNumber = pkgConfig.version.split('-')[0] + '.0';
    
      if (pkgSolution.solution.version !== newVersionNumber) {
        // assign newly generated version number to web part version
        pkgSolution.solution.version = newVersionNumber;
    
        // log new version
        this.log('New package-solution.json version:\t' + pkgSolution.solution.version);
    
        // write changed package-solution file
        fs.writeFile('./config/package-solution.json', JSON.stringify(pkgSolution, null, 4));
      }
      else {
        this.log('package-solution.json version is up-to-date');
      }
      done();
    });
    
    let syncVersionTask = build.task('version-sync', syncVersionsSubtask);
    
    build.rig.addPreBuildTask(syncVersionTask);
    ```

3. Save your file

The final _gulpfile.js_ should look like this:

```javascript
'use strict';

const gulp = require('gulp');
const build = require('@microsoft/sp-build-web');

build.addSuppression(`Warning - [sass] The local CSS class 'ms-Grid' is not camelCase and will not be type-safe.`);

//BEGIN: Added code for version-sync
let syncVersionsSubtask = build.subTask('version-sync', function (gulp, buildOptions, done) {
  this.log('Synching versions');

  // import gulp utilits to write error messages
  const gutil = require('gulp-util');

  // import file system utilities form nodeJS
  const fs = require('fs');

  // read package.json
  var pkgConfig = require('./package.json');

  // read configuration of web part solution file
  var pkgSolution = require('./config/package-solution.json');

  // log old version
  this.log('package-solution.json version:\t' + pkgSolution.solution.version);

  // Generate new MS compliant version number
  var newVersionNumber = pkgConfig.version.split('-')[0] + '.0';

  if (pkgSolution.solution.version !== newVersionNumber) {
    // assign newly generated version number to web part version
    pkgSolution.solution.version = newVersionNumber;

    // log new version
    this.log('New package-solution.json version:\t' + pkgSolution.solution.version);

    // write changed package-solution file
    fs.writeFile('./config/package-solution.json', JSON.stringify(pkgSolution, null, 4));
  }
  else {
    this.log('package-solution.json version is up-to-date');
  }
  done();
});

let syncVersionTask = build.task('version-sync', syncVersionsSubtask);

build.rig.addPreBuildTask(syncVersionTask);
//END: Added code for version-sync

build.initialize(gulp);
```

Next time you build your package, the Gulp task _version-sync_ will grab the _package.json_ version (which you updated using _npm version_, right?) and will update _package-solution.json_, adding an extra zero at the end of the version number to _Microsoftify_ the version.

When you get the version number, go update your _CHANGELOG.md_ file by moving the changes from _\[unreleased\]_ to a new section with the new version number you just created.

## Sync package-solution.json version with webpart.manifest.json version

So far, we have done the following:

- Created a _CHANGELOG.md_ of unreleased changes
- Maintained version number using _npm version_
- Synchronized _package.json_ versions with _package-solution.json_ versions
- Updated your _CHANGELOG.md_ to describe the changes you made

But there is still a little annoying thing: the web part versions (stored in _webpart.manifest.json_,  where _webpart_ is the name of your web part) can be different than the _package.json_ and _package-solution.json_.

Turns out that it is pretty easy to fix:

1. In your SPFx solution, open **webpart.manifest.json** where _webpart_ is the name of your web part. For example, **HelloWorldWebPart.manifest.json** for **HelloWorldWebPart**.
2. Find the **“version”** line and replace whatever version you have in there for **“\*”**, making it:

```json
"version": "*",
```

Doing so will cause the version of the _webpart.manifest.json_ to match the _package-solution.json_ version.

(Turns out that the latest version of SPFx documents this by adding the following comment on the line above _“version”: “\*”_.

```json
// The "*" signifies that the version should be taken from the package.json
"version": "*",
```

How cool is that?!

## Conclusion

By using _CHANGELOG.md_ to keep track of changes between versions, and using _semantic versioning_ for your versions, you can make it pretty easy to document your changes across versions.

By using _npm version_, you can easily maintain the semantic version of your _package.json._

By using Stefan’s cool _version-sync_ Gulp command, you can easily sync your _package.json_ version and your _package-solution.json_.

By using _“version”: “\*”_, you can synchronize your _package-solution.json_ and your _webpart.manifest.json_ versions.

Finally, by not reinventing the wheel and by leveraging the hard-work of other people, you can do it all with very little effort!

I hope this helps you?!
