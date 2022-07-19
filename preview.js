const previewOption = {
    wrap: '.tree',
    el: 'a.item',
    width: 1440,
    height: 1200,
    scale: 0.5,
    frameX: 30,
    frameY: -100,
}

function preview(previewOption) {
    document.addEventListener('DOMContentLoaded', function() {
        setFramePreview(previewOption);
    });

    function setFramePreview(previewOption) {
        const wrap = document.querySelector(previewOption.wrap),
              element = document.querySelectorAll(previewOption.el),
              html = '<iframe id="popupView" frameborder="0" scrolling="no" style="position:absolute;z-index:9999;width:' + previewOption.width + 'px;height:' + previewOption.height + 'px;-webkit-transform:scale(' + previewOption.scale + ');transform: scale(' + previewOption.scale + ');-webkit-transform-origin:top left;transform-origin:top left;background:#fff;border-radius:10px;box-shadow:0 0 4px 0 rgba(0, 0, 0, 0.18), 0 4px 10px 0 rgba(0, 0, 0, 0.27), 0 16px 40px 0 rgba(85, 92, 107, 0.4)"></iframe>';
        
        for (let i = 0, len = element.length; i < len; i++) {
            if(element[i].href.includes('.html')) {
                element[i].addEventListener('mouseenter', linkOver);
                element[i].addEventListener('mouseleave', linkLeave);
            }
        }

        function appendHtml(el, str) {
            const div = document.createElement('div');
            div.innerHTML = str;
            
            while (div.children.length > 0) {
                el.appendChild(div.children[0]);
            }
        }
        
        // enter
        function linkOver(e) {
            appendHtml(wrap, html);

            const popupView = document.querySelector('#popupView'),
            url = this.getAttribute('href');
            popupView.setAttribute('src', url);

            let targetX = e.pageX + previewOption.frameX,
                targetY = e.pageY + previewOption.frameY;

            let winWid = window.innerWidth - 15 ||
                document.documentElement.clientWidth,
                winHei = window.innerHeight ||
                document.documentElement.clientHeight,
                widMouseToFrameRightEdge = previewOption.width * previewOption.scale + previewOption.frameX,
                widMouseToWindowRightEdge = winWid - e.clientX,
                heiMouseToFrameBottomEdge = previewOption.height * previewOption.scale + previewOption.frameY,
                heiMouseToWindowBottomEdge = winHei - e.clientY,
                isFrameWidInside = widMouseToWindowRightEdge + 500 > widMouseToFrameRightEdge;
                isFrameHeiInside = heiMouseToWindowBottomEdge > heiMouseToFrameBottomEdge;

            if (!(isFrameWidInside && isFrameHeiInside)) {
                if (!isFrameWidInside && !isFrameHeiInside) {
                    popupView.style.left = (e.pageX - previewOption.frameX - previewOption.width * previewOption.scale).toFixed(0) + 'px';
                    correctionHeight();
                    return;
                }
                if (!isFrameWidInside) {
                    popupView.style.left = (e.pageX - previewOption.frameX - previewOption.width * previewOption.scale).toFixed(0) + 'px';
                    popupView.style.top = targetY + 'px';
                }
                if (!isFrameHeiInside) {
                    popupView.style.left = targetX + 'px';
                    correctionHeight();
                }
            } else {
                popupView.style.left = targetX + 'px';
                popupView.style.top = targetY + 'px';
            }

            function correctionHeight() {
                if (heiMouseToFrameBottomEdge > e.clientY) {
                    popupView.style.top = (e.pageY - e.clientY + 10) + 'px';
                } else {
                    popupView.style.top = (e.pageY - previewOption.height * previewOption.scale - previewOption.frameY).toFixed(0) + 'px';
                }
            }
        }

        // leave
        function linkLeave() {
            popupView.parentNode.removeChild(popupView);
        }

    }
}

preview(previewOption);