---
title: "Summarized GitHub cheat sheet for PnP contributions"
aliases:
  - /2020/03/31/summarized-github-cheat-sheet-for-pnp-contributions

date: 2021-02-07T10:07:47+06:00

# post thumb
image: posts/summarized-github-cheat-sheet-for-pnp-contributions/banner-1711944_1920.jpg

# meta description
summary: This is an interactive post that you can customize to get a personalized list
  of commands you'll need when contributing to a PnP repository on GitHub.

# taxonomies
categories:
  - GitHub
tags:
  - PnP
  - GitHub
script: posts/summarized-github-cheat-sheet-for-pnp-contributions/script.js
interactive: true
---
Introduction
------------

I apologize: when I write blog posts, I like to be very detailed. I tend to be very verbose.

This is a summary of my much longer [GitHub cheat sheet for PnP contributions](/2019/08/18/my-github-cheat-sheet-for-pnp-contributions-an-interactive-cheat-sheet), but without all the explanations.

If you need help to get started, I suggest you read the [full article](/2019/08/18/my-github-cheat-sheet-for-pnp-contributions-an-interactive-cheat-sheet).

Otherwise, enter your information below and we’ll automatically generate all the GitHub commands you need to get started on a PnP contribution.

<div class="interactive">

Customize this article
----------------------

This article will automatically change the instructions to reflect the parameters you enter below.

Variable|Value
---|---
Original Repository<br/>(Upstream)| <input id="txtRepo" value="https://github.com/pnp/sp-dev-fx-webparts">
Your GitHub username| <input id="txtOwner" value="[your_github_username]">
Start branch name<br/>(default is `main`)| <input id="txtBaseBranch" value="main">
Branch name| <input id="txtBranch" value="my-feature">
</div>

Step 1: Fork repository
-----------------------

1. In your browser go to [the repository where you want to contribute](https://github.com/pnp/sp-dev-fx-webparts) ([https://github.com/pnp/sp-dev-fx-webparts](https://github.com/pnp/sp-dev-fx-webparts)).
2. In the upper right corner, select the **Fork** button  
    ![The Fork button in GitHub](../../images/post/uploads/2019/08/image-1566184830443.png)
3. GitHub will automatically begin the forking process. You get a cute little animation showing that it is "copying" the repository, and you end up in your _own_ copy of the repository.  
    ![The Forking has begun](../../images/post/uploads/2019/08/forkingrepo.gif)
4. You’ll know that you’re in a fork because the owner will have changed to you, and it should say "forked from …"  
    ![hugoabernier/sp-dev-fx-webparts forked from pnp/sp-dev-fx-webparts](../../images/post/uploads/2019/08/image-1566184956226.png)

Step 2: Clone repository
------------------------

1. From your computer, launch whatever tool you like to run Git commands. Some people like **Git Bash**, but I prefer [**Cmder**](https://cmder.net/) or the **Node.js command prompt**.
2. Make sure that your command prompt is in the directory where you’ll want to create your local repositories. I like to use `c:\github`. You can do so by typing:

        cd \github

3. The repository you will clone will be created a directory within your current directory. To clone the repository, type the following:

    <pre><code data-template="`git clone ${originUrl}.git`" class="interactive-template">git clone https://github.com/[your_github_username]/sp-dev-fx-webparts.git</code></pre>

    It should create a directory with the same name as your repo, then should download all the files locally to that directory.

4. Once your local repo is created, change to the new directory by typing:

    <pre><code data-template="`cd ${repoName}`" class="interactive-template">cd sp-dev-fx-webparts</code></pre>

5. To link your local repo with the original upstream repo, you’ll type the following:

   <pre><code data-template="`git remote add upstream ${upstreamRepo}.git`" class="interactive-template">git remote add upstream https://github.com/pnp/sp-dev-fx-webparts.git</code></pre>

6. Before you start making changes, you should make sure that you have the latest version from the original upstream repository by typing:

        git fetch upstream

Step 3: Create a branch
-----------------------

To create your branch, follow these steps:

1. Update your local repository with the latest changes from the upstream repository by typing the following:

    <pre><code data-template="`git pull upstream ${baseBranch}:${branchName}`" class="interactive-template">git pull upstream main:my-feature</code></pre>

2. Now we’ll let your forked origin repo know about the new branch you’ve created by typing:

    <pre><code data-template="`git push origin ${branchName}`" class="interactive-template">git push origin my-feature</code></pre>

3. Switch to the new branch you’ve created by typing the following:

    <pre><code data-template="`git checkout ${branchName}`" class="interactive-template">git checkout my-feature</code></pre>

Now you’re ready to contribute!

### Summary of commands — steps 2-4

Here are all the commands from steps 2-4. You can just copy and paste all the lines below and run them all at once.

<pre><code data-template="`git clone ${originUrl}.git
cd ${repoName}
git remote add upstream ${upstreamRepo}.git
git pull upstream ${baseBranch}:${branchName}
git checkout ${branchName}
`" class="interactive-template">git clone https://github.com/hugoabernier/sp-dev-fx-webparts.git
cd sp-dev-fx-webparts
git remote add upstream https://github.com/pnp/sp-dev-fx-webparts.git
git pull upstream main:my-feature
</code></pre>

Step 4: Contribute
------------------

Now that you have your own branch, you can make the changes you need. Please make sure you follow the [Microsoft Open Source code of conduct](https://opensource.microsoft.com/codeofconduct/).

If you aren’t sure about the code of conduct, you can also check out the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/).

Once you’re done making your changes, you’ll want to push your contributions.

Step 5: Push your changes
-------------------------

You can do so by following these steps:

1. From the local branch folder, type:

        git add .

2. Commit your changes by typing:

        git commit -v -a -m "Initial commit"

3. Push your changes to your origin repository, as follows:

    <pre><code data-template="`git push origin ${branchName}`" class="interactive-template">git push origin my-feature</code></pre>

### Summary of commands — step 5

Here are all the commands from this step . You can just copy and paste all the lines below and run them all at once.

<pre><code data-template='`git add .
git commit -v -a -m "Initial commit"
git push origin ${branchName}`' class="interactive-template">git add .
git commit -v -a -m "Initial commit"
git push origin my-feature
</code></pre>

Step 6: Submit a pull request
-----------------------------

When you’re ready, open your pull request by following these steps:

1. Use your browser to go to: **<a class="interactive-link-template" data-template="`https://github.com/${originOwner}/${repoName}/pull/new/${branchName}`" href="https://github.com/hugoabernier/sp-dev-fx-webparts/pull/new/coolerest-feature"></a>**.  
    ![New pull request](../../images/post/uploads/2019/08/image-1566178591746.png)
2. You’ll be prompted to confirm the branches you want to merge, with an arrow going from one branch to another. Make sure that the arrow is pointing from your branch on your forked repo to the branch on the remote repo. If you follow all the steps above, you should also see **Able to merge**.  
    ![New pull request](../../images/post/uploads/2019/08/image-1566181527316.png)
3. Provide a descriptive title for your pull request. For example, **My feature**
4. Most PnP repositories have a pull request template. Please be courteous and **follow the template instructions**. Follow the prompts and answer as much as possible. If there are sections that say `> _(DELETE THIS PARAGRAPH AFTER READING)_`, delete them.
5. When you have filled the template, click **Create pull request**.

> Remember that the people who review — and ultimately approve or reject — your pull request are often volunteers who are most likely bombarded with notifications from GitHub on top of their every-day jobs. Filling the template will make it easier for them to process your pull request faster.

After you’ve completed your pull request, you’ll see that its status is marked as **Open**

![New open pull request](../../images/post/uploads/2019/08/image-1566182308167.png)

All you have to do now is to wait for your pull request to be merged.

It can take a few days, sometimes weeks before your pull request is approved. Please be patient; Most reviewers are volunteers and have a day-to-day job.

While you’re waiting, you can start a new contribution!

Step 7: Repeat
--------------

If you want to continue making contributions, you simply create a new branch from the original base branch. For example, if you were created the second update to your <code>my-feature</code>, you could call your next branch `my-next-feature`.

<div class="interactive">

Customize this article
----------------------

Enter the name of the next branch you want to create, and we’ll update the instructions for you:

Variable|Value
---|---
Next branch name|<input id="txtNextBranch" value="my-next-feature">
</div>

To create your next branch, follow these steps:

1. Type the following:

    <pre><code data-template="`git pull upstream ${baseBranch}:${nextBranch}`" class="interactive-template">git pull upstream main:my-next-feature</code></pre>

2. Push your new branch by typing:

    <pre><code data-template="`git push origin ${nextBranch}`" class="interactive-template">git push origin my-next-feature</code></pre>

3. Finally, switch to your new branch by calling:

   <pre><code data-template="`git checkout ${nextBranch}`" class="interactive-template">git checkout my-next-feature</code></pre>

Once your next branch is created, continue contributing as you did before (contribute, push your changes, submit a pull request).

### Summary of commands — step 7

Here are all the commands from this step . You can just copy and paste all the lines below and run them all at once.

<pre><code data-template="`git pull upstream ${baseBranch}:${nextBranch}
git push origin ${nextBranch}
git checkout ${nextBranch}`" class="interactive-template">git pull upstream main:my-next-feature
git push origin my-next-feature
git checkout my-next-feature
</code></pre>

Deleting your branch
--------------------

Once your pull request has been approved and merged to the <code data-template="`${branchName}`" class="interactive-template">main</code>, you can delete your branch. **Do not** delete your branch before it has been approved — just in case you need to make a change to your pull request before it has been approved.

Trust me on this one.

Conclusion
----------

I hope that this article will make it easier for you to contribute to PnP repositories.

Updates
-------

* July 2, 2022: Updated default branch to `main`
* April 26, 2021: Updated to use PnP instead of SharePoint GitHub organization
* April 21, 2020: Thanks to [Daniel Westerdale](https://twitter.com/westerdaled?s=20) for pointing out that I had made a mistake in my code.

Photo credits
-------------

Image by [Pete Linforth](https://pixabay.com/users/TheDigitalArtist-202249/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=1711944) from [Pixabay](https://pixabay.com/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=1711944)
