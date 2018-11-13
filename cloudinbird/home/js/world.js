    (
        function($, undefined) {
            $.ui.slider.prototype.options =
                $.extend({},
                    $.ui.slider.prototype.options, {
                        paddingMin: 0,
                        paddingMax: 0
                    }
                );

            $.ui.slider.prototype._refreshValue =
                function() {
                    var
                        oRange = this.options.range,
                        o = this.options,
                        self = this,
                        animate = (!this._animateOff) ? o.animate : false,
                        valPercent,
                        _set = {},
                        elementWidth,
                        elementHeight,
                        paddingMinPercent,
                        paddingMaxPercent,
                        paddedBarPercent,
                        lastValPercent,
                        value,
                        valueMin,
                        valueMax;

                    if (self.orientation === "horizontal") {
                        elementWidth = this.element.outerWidth();
                        paddingMinPercent = o.paddingMin * 100 / elementWidth;
                        paddedBarPercent = (elementWidth - (o.paddingMin + o.paddingMax)) * 100 / elementWidth;
                    } else {
                        elementHeight = this.element.outerHeight();
                        paddingMinPercent = o.paddingMin * 100 / elementHeight;
                        paddedBarPercent = (elementHeight - (o.paddingMin + o.paddingMax)) * 100 / elementHeight;
                    }

                    if (this.options.values && this.options.values.length) {
                        this.handles.each(function(i, j) {
                            valPercent =
                                ((self.values(i) - self._valueMin()) / (self._valueMax() - self._valueMin()) * 100) * paddedBarPercent / 100 + paddingMinPercent;
                            _set[self.orientation === "horizontal" ? "left" : "bottom"] = valPercent + "%";
                            $(this).stop(1, 1)[animate ? "animate" : "css"](_set, o.animate);
                            if (self.options.range === true) {
                                if (self.orientation === "horizontal") {
                                    if (i === 0) {
                                        self.range.stop(1, 1)[animate ? "animate" : "css"]({
                                            left: valPercent + "%"
                                        }, o.animate);
                                    }
                                    if (i === 1) {
                                        self.range[animate ? "animate" : "css"]({
                                            width: (valPercent - lastValPercent) + "%"
                                        }, {
                                            queue: false,
                                            duration: o.animate
                                        });
                                    }
                                } else {
                                    if (i === 0) {
                                        self.range.stop(1, 1)[animate ? "animate" : "css"]({
                                            bottom: (valPercent) + "%"
                                        }, o.animate);
                                    }
                                    if (i === 1) {
                                        self.range[animate ? "animate" : "css"]({
                                            height: (valPercent - lastValPercent) + "%"
                                        }, {
                                            queue: false,
                                            duration: o.animate
                                        });
                                    }
                                }
                            }
                            lastValPercent = valPercent;
                        });
                    } else {
                        value = this.value();
                        valueMin = this._valueMin();
                        valueMax = this._valueMax();
                        valPercent =
                            ((valueMax !== valueMin) ? (value - valueMin) / (valueMax - valueMin) * 100 : 0) * paddedBarPercent / 100 + paddingMinPercent;

                        _set[self.orientation === "horizontal" ? "left" : "bottom"] = valPercent + "%";

                        this.handle.stop(1, 1)[animate ? "animate" : "css"](_set, o.animate);

                        if (oRange === "min" && this.orientation === "horizontal") {
                            this.range.stop(1, 1)[animate ? "animate" : "css"]({
                                width: valPercent + "%"
                            }, o.animate);
                        }
                        if (oRange === "max" && this.orientation === "horizontal") {
                            this.range[animate ? "animate" : "css"]({
                                width: (100 - valPercent) + "%"
                            }, {
                                queue: false,
                                duration: o.animate
                            });
                        }
                        if (oRange === "min" && this.orientation === "vertical") {
                            this.range.stop(1, 1)[animate ? "animate" : "css"]({
                                height: valPercent + "%"
                            }, o.animate);
                        }
                        if (oRange === "max" && this.orientation === "vertical") {
                            this.range[animate ? "animate" : "css"]({
                                height: (100 - valPercent) + "%"
                            }, {
                                queue: false,
                                duration: o.animate
                            });
                        }
                    }
                };

            $.ui.slider.prototype._normValueFromMouse =
                function(position) {
                    var
                        o = this.options,
                        pixelTotal,
                        pixelMouse,
                        percentMouse,
                        valueTotal,
                        valueMouse;

                    if (this.orientation === "horizontal") {
                        pixelTotal = this.elementSize.width - (o.paddingMin + o.paddingMax);
                        pixelMouse = position.x - this.elementOffset.left - o.paddingMin - (this._clickOffset ? this._clickOffset.left : 0);
                    } else {
                        pixelTotal = this.elementSize.height - (o.paddingMin + o.paddingMax);
                        pixelMouse = position.y - this.elementOffset.top - o.paddingMin - (this._clickOffset ? this._clickOffset.top : 0);
                    }

                    percentMouse = (pixelMouse / pixelTotal);
                    if (percentMouse > 1) {
                        percentMouse = 1;
                    }
                    if (percentMouse < 0) {
                        percentMouse = 0;
                    }
                    if (this.orientation === "vertical") {
                        percentMouse = 1 - percentMouse;
                    }

                    valueTotal = this._valueMax() - this._valueMin();
                    valueMouse = this._valueMin() + percentMouse * valueTotal;

                    return this._trimAlignValue(valueMouse);
                };
        }
    )(jQuery);
    var planval = new Array('768 MB', '1024 MB', '2048 MB', '4096 MB', '8192 MB', '16384 MB'); //Hosting Plans Names. Displayed only to small screens
    var memoryval = new Array('768 MB', '1024 MB', '2048 MB', '4096 MB', '8192 MB', '16384 MB'); //Memory array per plan
    var diskspaceval = new Array('15 GB SSD', '20 GB SSD', '45 GB SSD', '90 GB SSD', '110 GB SSD', '110 GB SSD'); //Disk Space array per plan
    var bandwidthval = new Array('1.00 TB', '2.00 TB', '3.00 TB', '4.00 TB', '10.00 TB', '20.00 TB'); //Bandwidth array per plan
    var decimalval = new Array('.00', '.00', '.00', '.00', '.00', '.00'); //Decimal array per plan

    var priceval = new Array('40', '80', '150', '300', '450', '900'); //Price array per plan
    var urlval = new Array('21', '22', '23', '24', '25', '26'); //WHMCS pid array per plan

    var finalurl = 'https://www.idcbird.com/cart.php?a=add&pid='; //Update "domain.com" with your WHMCS installation URL

    var starting_point = 0; //Where the slider stops on first page load. Ideal to sign a plan as popular.

    $(document).ready(function() {

        $("#vps-slider").slider({
            range: 'min',
            animate: true,
            min: 1,
            max: 6, //Update this if you less or more plans
            paddingMin: 0,
            paddingMax: 0,
            slide: function(event, ui) {
                $('.vps-prices-container #disk_space_option span.how_much').html(diskspaceval[ui.value - 1]);
                $('.vps-prices-container #plan_option span.how_much').html(planval[ui.value - 1]);
                $('.vps-prices-container #memory_option span.how_much').html(memoryval[ui.value - 1]);
                $('.vps-prices-container #bandwidth_option span.how_much').html(bandwidthval[ui.value - 1]);
                $('.vps-prices-container #price_amount').html(priceval[ui.value - 1]);
                $('.vps-prices-container a.order-vps').attr('href', finalurl + urlval[ui.value - 1]);

                $('.vps-prices-container #decimal').html(decimalval[ui.value - 1]);

            },
            change: function(event, ui) {
                $('.vps-prices-container #disk_space_option span.how_much').html(diskspaceval[ui.value - 1]);
                $('.vps-prices-container #plan_option span.how_much').html(planval[ui.value - 1]);
                $('.vps-prices-container #memory_option span.how_much').html(memoryval[ui.value - 1]);
                $('.vps-prices-container #bandwidth_option span.how_much').html(bandwidthval[ui.value - 1]);
                $('.vps-prices-container #price_amount').html(priceval[ui.value - 1]);
                $('.vps-prices-container a.order-vps').attr('href', finalurl + urlval[ui.value - 1]);
                $('.vps-prices-container #decimal').html(decimalval[ui.value - 1]);
            }
        });


        $("#amount").val("$" + $("#vps-slider").slider("value"));
        $('#vps-slider').slider('value', starting_point);
        $('.vps-plan').click(function() {
            tt_amount = parseInt(this.id.slice(5)) + 1;
            $('#vps-slider').slider('how_much', tt_amount);
        });
    });