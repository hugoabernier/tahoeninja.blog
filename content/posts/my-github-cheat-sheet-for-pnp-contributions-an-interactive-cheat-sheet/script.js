jQuery(function($){
    $('#txtOwner, #txtRepo, #txtBranch, #txtBaseBranch, #txtNextBranch').change(() => {
       
        let upstreamRepo = $('#txtRepo').val();
        if (upstreamRepo?.endsWith(".git")) {
            upstreamRepo = upstreamRepo.slice(0, -4);
        }
        console.log("Upstream repo", upstreamRepo);

        const originOwner = $('#txtOwner').val();
        console.log("Origin owner", originOwner);

        const branchName = $('#txtBranch').val()?.replace(/ /gi, '-');
        console.log("Branch name", branchName);

        const baseBranch = $('#txtBaseBranch').val();
        console.log("Base Branch name", baseBranch);

        const nextBranch = $('#txtNextBranch').val()?.replace(/ /gi, '-');
        console.log("Next Branch name", nextBranch);

        const isItGitHub = upstreamRepo?.toLowerCase().substring(0, 19) === 'https://github.com/';
        console.log("IsItGitHub", isItGitHub);

        const ownerAndRepo = upstreamRepo?.substring(19);
        console.log("ownerAndRepo", ownerAndRepo);

        const repoParts = ownerAndRepo?.split('/');
        console.log("repoParts", repoParts);

        const upstreamOwner = repoParts[0];
        console.log("upstreamOwner", upstreamOwner);

        const repoName = repoParts[1];
        console.log("repoName", repoName);

        const originUrl = `https://github.com/${originOwner}/${repoName}`;
        console.log("originUrl", originUrl);

        var text = `git clone ${originUrl}.git`;
        $('.originOwner').text(originOwner);
        $('.upstreamOwner').text(upstreamOwner);
        $('.lnkOrigin').text(originUrl);
        $('.lnkUpstream').text(upstreamRepo);
        $('#step1').text(text);
        $('#step2').text(`cd ${repoName}`);
        $('#step3').text(`git remote add upstream ${upstreamRepo}.git`);
        $('#step4').text(`git pull upstream ${baseBranch}:${branchName}`);
        $('#step5').text(`git push origin ${branchName}`);
        $('#step6').text(`git checkout ${branchName}`);
        $('#step7').text(`git push origin ${branchName}`);
        $('.lnkPullRequest').html(`<a href="https://github.com/${originOwner}/${repoName}/pull/new/${branchName}">https://github.com/${originOwner}/${repoName}/pull/new/${branchName}</a>`)
        $('.lnkForked').html(`<a href="https://github.com/${originOwner}/${repoName}">https://github.com/${originOwner}/${repoName}</a>`)

        
        // Next branch
        $('#step8').text(`git pull upstream ${baseBranch}:${nextBranch}`);
        $('#step9').text(`git push origin ${nextBranch}`);
        $('#step10').text(`git checkout ${nextBranch}`);

        $('.originOwner').addClass('blink-interactive');
        $('.upstreamOwner').addClass('blink-interactive');
        $('.lnkOrigin').addClass('blink-interactive');
        $('.lnkUpstream').addClass('blink-interactive');
        $('.lnkForked').addClass('blink-interactive');
        $('#step1').addClass('blink-interactive');
        $('#step2').addClass('blink-interactive');
        $('#step3').addClass('blink-interactive');
        $('#step4').addClass('blink-interactive');
        $('#step5').addClass('blink-interactive');
        $('#step6').addClass('blink-interactive');
        $('#step7').addClass('blink-interactive');
        $('.lnkPullRequest').addClass('blink-interactive');
        $('#step8').addClass('blink-interactive');
        $('#step9').addClass('blink-interactive');
        $('#step10').addClass('blink-interactive');

        setTimeout(function () {
            $('.blink-interactive').removeClass('blink-interactive');
        }, 500);
    });
});