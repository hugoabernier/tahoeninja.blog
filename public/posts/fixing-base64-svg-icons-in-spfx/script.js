$(document).ready(function () {

    function getTextAreaSelection(textarea) {
        var start = textarea.selectionStart, end = textarea.selectionEnd;
        return {
            start: start,
            end: end,
            length: end - start,
            text: textarea.value.slice(start, end)
        };
    }

    function detectPaste(textarea, callback) {
        textarea.onpaste = function () {
            var sel = getTextAreaSelection(textarea);
            var initialLength = textarea.value.length;
            window.setTimeout(function () {
                var val = textarea.value;
                var pastedTextLength = val.length - (initialLength - sel.length);
                var end = sel.start + pastedTextLength;
                callback({
                    start: sel.start,
                    end: end,
                    length: pastedTextLength,
                    text: val.slice(sel.start, end)
                });
            }, 1);
        };
    }

    var textarea = document.getElementById("txtSVG");
    var txtSVGEncoded = document.getElementById("txtSVGEncoded");
    detectPaste(textarea, function (svg) {


        txt = svg.text
            .replace('<svg', (~svg.text.indexOf('xmlns') ? '<svg' : '<svg xmlns="http://www.w3.org/2000/svg"'))

            //
            //   Encode (may need a few extra replacements)
            //
            .replace(/"/g, '\'')
            .replace(/%/g, '%25')
            .replace(/#/g, '%23')
            .replace(/{/g, '%7B')
            .replace(/}/g, '%7D')
            .replace(/</g, '%3C')
            .replace(/>/g, '%3E')

            .replace(/\s+/g, ' ')
        // 
        //    The maybe list (add on documented fail)
        // 
        //  .replace(/&/g, '%26')
        //  .replace('|', '%7C')
        //  .replace('[', '%5B')
        //  .replace(']', '%5D')
        //  .replace('^', '%5E')
        //  .replace('`', '%60')
        //  .replace(';', '%3B')
        //  .replace('?', '%3F')
        //  .replace(':', '%3A')
        //  .replace('@', '%40')
        //  .replace('=', '%3D')          

        $("#txtSVGEncoded").val(`"iconImageUrl": "data:image/svg+xml,${txt}",`);
    });
    $('#btnCopy').click(() => {
        console.log("Copying");
        var $temp = $("<textarea>");
        $("body").append($temp);
        console.log($("#txtSVGEncoded").val());
        $temp.val($('#txtSVGEncoded').val()).select();
        document.execCommand("copy");
        $temp.remove();
        console.log("Copied");
    });
});