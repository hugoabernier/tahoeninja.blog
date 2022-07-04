$(document).ready(function () {
    $('#txtOwner, #txtRepo, #txtBranch, #txtBaseBranch, #txtNextBranch').change(() => {
        let upstreamRepo = $('#txtRepo').val();
        if (upstreamRepo.endsWith(".git")) {
            upstreamRepo = upstreamRepo.slice(0, -4);
        }
        // console.log("Upstream repo", upstreamRepo);
        // console.log("Upstream repo", upstreamRepo);

        const originOwner = $('#txtOwner').val();
        // console.log("Origin owner", originOwner);

        const branchName = $('#txtBranch').val().replace(/ /gi, '-');
        // console.log("Branch name", branchName);

        const baseBranch = $('#txtBaseBranch').val();
        // console.log("Base Branch name", baseBranch);

        const nextBranch = $('#txtNextBranch').val().replace(/ /gi, '-');
        // console.log("Next Branch name", nextBranch);

        const isItGitHub = upstreamRepo.toLowerCase().substring(0, 19) === 'http://web.archive.org/web/20210623213007/https://github.com/';
        // console.log("IsItGitHub", isItGitHub);

        const ownerAndRepo = upstreamRepo.substring(19);
        // console.log("ownerAndRepo", ownerAndRepo);

        const repoParts = ownerAndRepo.split('/');
        // console.log("repoParts", repoParts);

        const upstreamOwner = repoParts[0];
        // console.log("upstreamOwner", upstreamOwner);

        const repoName = repoParts[1];
        // console.log("repoName", repoName);

        const originUrl = `https://github.com/${originOwner}/${repoName}`;
        // console.log("originUrl", originUrl);

        // var text = `git clone ${originUrl}.git`;
        // $('.originOwner').text(originOwner);
        // $('.upstreamOwner').text(upstreamOwner);
        // $('.lnkOrigin').text(originUrl);
        // $('.lnkUpstream').text(upstreamRepo);
        // $('.lnkUpstream2').attr("href", upstreamRepo);
        // $('.lnkUpstream').click(() => {
        //     window.open(upstreamRepo, '_blank')
        // });

        $('.interactive-template').each(function (index, value) {
            const template = $(this).attr('data-template');
            // console.log(`${index}: ${$(this).attr('data-template')}`);
            $(this).text(eval(template));
        });

        $('.interactive-link-template').each(function (index, value) {
            const template = $(this).attr('data-template');
            // console.log(`${index}: ${$(this).attr('data-template')}`);
            $(this).text(eval(template)).attr("href", eval(template));
        });

        // $('#step1').text(text);
        // $('#step2').text(`cd ${repoName}`);
        // $('#step3').text(`git remote add upstream ${upstreamRepo}.git`);
        // $('#step4').text(`git pull upstream ${baseBranch}:${branchName}`);
        // $('#step5').text(`git push origin ${branchName}`);
        // $('#step6').text(`git checkout ${branchName}`);
        // $('#step7').text(`git push origin ${branchName}`);
        // $('.lnkPullRequest').text(`https://github.com/${originOwner}/${repoName}/pull/new/${branchName}`)

        // // Next branch
        // $('#step8').text(`git pull upstream ${baseBranch}:${nextBranch}`);
        // $('#step9').text(`git push origin ${nextBranch}`);
        // $('#step10').text(`git checkout ${nextBranch}`);

        // // Combine all the steps
        // const crlf = '\n';
        // const part1 = $('#step1').text() + crlf + $('#step2').text() + crlf + $('#step3').text() + crlf + $('#step4').text();
        // $('#part1').text(part1);

        // const part2 = 'git add .\ngit commit -v -a -m "Initial commit"\n' + $('#step5').text();
        // $('#part2').text(part2);

        // const part3 = $('#step8').text() + crlf + $('#step9').text() + crlf + $('#step10').text();
        // $('#part3').text(part3);
    });
});