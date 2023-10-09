class PercentageAmount {
    constructor(input, slider, rescalePerc = false) {
        let th = this;
        
        this.input = input;
        this.slider = slider;
        this.rescalePerc = rescalePerc;
        
        this.prec = null;
        this.minAmount = new BigNumber(0);
        this.maxAmount = null;
        
        this.slider.attr('min', '0')
                   .attr('max', '100')
                   .attr('step', '1');
        
        this.reset();
        
        // Input -> slider
        this.input.onChange(
            function(val) {
                if(th.prec === null || th.maxAmount == null)
                    return;
                    
                let perc = '0';
                
                if(val && th.maxAmount.gt(th.minAmount)) {
                    let amount = new BigNumber(val);
                    perc = amount;
                    if(th.rescalePerc)
                        perc = perc.minus(th.minAmount)
                                   .dividedBy(th.maxAmount.minus(th.minAmount));
                    else
                        perc = perc.dividedBy(th.maxAmount);
                    perc = perc.multipliedBy(100).toFixed(0);
                }
            
                th.slider.val(perc).trigger('_input');
            },
            false
        );
    
        // Slider -> input
        this.slider.on('input', function() {
            if(th.prec === null || th.maxAmount == null)
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
            
            th.input.set(amount, true);
        });
    
        // Drop amount to available balance
        this.input.onChange(
            function(val) {
                if(th.prec === null || th.maxAmount === null || val === null)
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
        this.input.onUpdateVisible(function() {
            th.input.input.removeClass('text-red');
        });
    }
    
    set(perc) {
        this.slider.val(perc).trigger('input');
    }
    
    reset() {
        this.input.reset();
        this.slider.val('0').trigger('_input');
    }
    
    setPrec(prec) {
        this.prec = prec;
        this.reset();
    }
    
    setRange(minAmount, maxAmount = null) {
        if(minAmount !== null)
            this.minAmount = new BigNumber(minAmount);
        if(maxAmount !== null)
            this.maxAmount = new BigNumber(maxAmount);
        this.input.set(this.input.get(), true);
    }
}