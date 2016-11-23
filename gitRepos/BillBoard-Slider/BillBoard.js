 (function () {
    $.fn.billboard = function (options) {
        var options = $.extend({
                    colWidth: 30, // For Speed and optimizations ** set '100%' to make it as one cube.
                    transitionSpeed: 1, // Accepts decimal numbers and int Numbers
                    transitionDelayMultiplier: .1, // Delay between columns to show the BillBoard Effect , set to 0 to Disable it.
                    optimizeOutput: true, // to Remove repating columns background , set to false if you want to show the columns
                    dimensionalOutput: 'cube', // accepts string 'cube' or 'flat' ; flat will only show the first two images one for each of the flat columns
                    billCallBack: function () { }// Call back function runs right after plugin's functionallty finishes

                }, options);

        var billboard = $(this),
        billboardUl = billboard.find('ul'),
        billboardLi = billboardUl.find('li'),
        billboardLiCount = billboardLi.length,
        billboardImgs = billboardLi.find('img'),
        billboardImgWidth = billboardImgs[0].naturalWidth,
        counter = 1;
        options.colWidth == '100%' ? options.colWidth = billboardImgWidth : options.colWidth = options.colWidth;
        var numberOfColumns = parseInt(billboardImgWidth / options.colWidth),
        translateWidth = options.colWidth / 2;

        if (!options.optimizeOutput) { 
            if (billboardImgWidth % options.colWidth) {
                numberOfColumns++;
            }
        }
        cubeContainerRepresentation = options.dimensionalOutput;
        billboard.addClass(cubeContainerRepresentation);
        billboard.attr('active', 1);
        billboardUl.remove();
        var containerHtml;
        containerHtml = $('<ul>', {
            class: 'billContainer '
        });
        backgroundPositionX = billboardImgWidth;
        for (i = 1; i <= numberOfColumns; i++) {
            var colHtml,
            cubeContainer,
            speed = options.transitionSpeed,
            delay = options.transitionDelayMultiplier;
            cubeContainer = $('<ul>', {
                class: "cubeContainer"
            }).css({
                'width': options.colWidth,
                'transition': 'all ' + speed + 's ' + i * delay + 's '
            });

            for (z = 0; z < billboardLiCount; z++) {
                cssProp = {
                    width: options.colWidth,
                    backgroundImage: 'url(' + billboardImgs[z].src + ')',
                    backgroundPosition: backgroundPositionX + 'px 0'
                }
                if (cubeContainerRepresentation == 'cube') {
                            if (z == 0) {//front Face
                                cssProp['transform'] = 'translateZ(' + translateWidth + 'px)';
                            }
                            if (z == 1) {//right Face
                                cssProp['transform'] = 'translateX(' + translateWidth + 'px) rotateY(90deg)';
                            }
                            if (z == 2) {//back Face
                                cssProp['transform'] = 'translateZ(-' + translateWidth + 'px) rotateY(180deg)';
                            }
                            if (z == 3) {//back Face
                                cssProp['transform'] = 'translateX(-' + translateWidth + 'px) rotateY(270deg)';
                            }
                        }
                        else if (cubeContainerRepresentation == 'flat') {
                            if (z == 0) {//front Face
                                cssProp['transform'] = 'rotateY(0deg)';
                            }
                            if (z == 1) {//right Face
                                cssProp['transform'] = 'rotateY(180deg) ';
                            }
                            if (z == 2) { break; }
                        }
                        colHtml = $('<li>', {
                            class: 'col'
                        }).css(cssProp).appendTo(cubeContainer);
                    }
                    cubeContainer.appendTo(containerHtml);
                    backgroundPositionX = backgroundPositionX - options.colWidth;
                    containerHtml.appendTo(billboard);
                }
                function billCallBack() {
                    options.billCallBack.call(this);

                }
                billCallBack();
            }
            
            
        })(jQuery)