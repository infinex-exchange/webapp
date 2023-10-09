class PercentageAmount {
    constructor(input, slider, prec = null, minAmount = null, maxAmount = null, rescalePerc = false) {
        let th = this;
        
        this.input = input;
        this.slider = slider;
        this.rescalePerc = rescalePerc;
        
        this.slider.attr('min', '0')
                   .attr('max', '100')
                   .attr('step', '1');
        
        this.reset(prec, minAmount, maxAmount);
        
        // Input -> slider
        this.input.onChange(
            function(val) {
                th.updateSlider(val);
            },
            false
        );
    
        // Slider -> input
        this.slider.on('input', function() {
            if(th.maxAmount === null)
                return;
            
            let amount;
            if(th.rescalePerc)
                amount = th.minAmount.plus(
                    th.maxAmount
                    .minus(th.minAmount)
                    .multipliedBy( $(this).val() )
                    .dividedBy(100)
                );
            else
                amount = th.maxAmount
                    .multipliedBy( $(this).val() )
                    .dividedBy(100);
            
            amount = amount.dp(th.prec).toString();
            
            th.input.set(amount, false);
        });
        this.slider.on('change', function() {
            th.input.set(th.input.get(), true);
        });
    
        // Drop amount to available balance
        this.input.onChange(
            function(val) {
                if(th.maxAmount === null)
                    return;
                
                if(th.minAmount.gt(th.maxAmount)) {
                    th.input.set(null, false);
                    th.input.input.addClass('text-red');
                    return;
                }
                
                let bnVal = new BigNumber(val);
                if(bnVal.gt(th.maxAmount)) {
                    th.input.set(
                        th.maxAmount
                          .dp(th.prec, BigNumber.ROUND_DOWN)
                          .toString(),
                        false
                    );
                    
                    th.input.input.addClass('text-red');
                }
                else if(bnVal.lt(th.minAmount)) {
                    th.input.set(
                        th.minAmount
                          .dp(th.prec, BigNumber.ROUND_UP)
                          .toString(),
                        false
                    );
                    
                    th.input.input.addClass('text-red');
                }
                else
                    th.input.input.removeClass('text-red');
            },
            true
        );
        this.input.onUpdateVisible(function(val) {
            th.input.input.removeClass('text-red');
            th.updateSlider(val);
        });
    }
    
    reset(prec, minAmount, maxAmount) {
        this.prec = prec;
        this.minAmount = new BigNumber(
            minAmount === null ? 0 : minAmount
        );
        this.maxAmount = maxAmount === null ? null : new BigNumber(maxAmount);
        
        this.input.reset();
        
        this.slider.val('0').trigger('_input');
    }
    
    setRange(minAmount, maxAmount) {
        if(this.minAmount !== null)
            this.minAmount = new BigNumber(minAmount);
        if(this.maxAmount !== null)
            this.maxAmount = new BigNumber(maxAmount);
        this.input.set(this.input.get(), true);
    }
    
    updateSlider(val) {
        if(this.maxAmount === null)
            return;
        
        let perc = '0';
        
        if(val && this.maxAmount.gt(this.minAmount)) {
            let amount = new BigNumber(val);
            perc = amount;
            if(this.rescalePerc)
                perc = perc.minus(this.minAmount)
                           .dividedBy(this.maxAmount.minus(this.minAmount));
            else
                perc = perc.dividedBy(this.maxAmount);
            perc = perc.multipliedBy(100).toFixed(0);
        }
    
        this.slider.val(perc).trigger('_input');
    }
}