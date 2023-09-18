jQuery(function ($) {
    $('#txtEmail').val('someuser@mytenant.com');

    $('#txtTenant, #txtEmail').change(() => {
        const tenantName = $('#txtTenant').val();

        let email = $('#txtEmail').val();

        if (tenantName !== 'mytenant' && email === 'someuser@mytenant.com') {
            email = `someuser@${tenantName}.com`;
            $('#txtEmail').val(email);
        }

        $('#lnkDelveProfile').text(`https://${$.trim(tenantName)}-my.sharepoint.com/PersonImmersive.aspx?accountname=i%3A0%23%2Ef%7Cmembership%7C${$.trim(email)}`)

        $('#lnkDelveProfile').addClass('blink-interactive');

        setTimeout(function () {
            $('.blink-interactive').removeClass('blink-interactive');
        }, 500);
    });
    $('#btnCopy').click(() => {
        var $temp = $("<input>");
        $("body").append($temp);
        $temp.val($('#lnkDelveProfile').text()).select();
        document.execCommand("copy");
        $temp.remove();
    });
});