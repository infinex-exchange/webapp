class PercentageAmount {
    constructor(input, slider, prec = null, minAmount = null, maxAmount = null) {
        let th = this;
        
        this.input = input;
        this.slider = slider;
        
        this.slider.attr('min', '0')
                   .attr('max', '100')
                   .attr('step', '1');
        
        this.reset(prec, minAmount, maxAmount);
        
        // Input -> slider
        this.input.onChange(
            function(val) {
                if(th.maxAmount === null)
                    return;
            
                let perc = '0';
            
                if(val) {
                    let amount = new BigNumber(val);
                    perc = amount
                        .minus(th.minAmount)
                        .dividedBy(th.maxAmount.minus(th.minAmount))
                        .multipliedBy(100)
                        .toFixed(0);
                }
            
                th.slider.val(perc).trigger('_input');
            },
            false
        );
    
        // Slider -> input
        this.slider.on('input', function() {
            if(th.maxAmount === null)
                return;
            
            let amount = th.minAmount.plus(
                th.maxAmount
                .minus(th.minAmount)
                .multipliedBy( $(this).val() )
                .dividedBy(100)
            )
            .dp(th.prec)
            .toString();
            
            th.input.set(amount, true);
        });
    
        // Drop amount to available balance
        this.input.onChange(
            function(val) {
                if(th.maxAmount === null)
                    return;
                
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
    
    reset(prec, minAmount, maxAmount) {
        this.prec = prec;
        this.minAmount = new BigNumber(
            minAmount === null ? 0 : minAmount
        );
        this.maxAmount = maxAmount === null ? null : new BigNumber(maxAmount);
        
        this.input.reset();
        
        this.slider.val('0');
    }
    
    setRange(minAmount, maxAmount) {
        if(this.minAmount !== null)
            this.minAmount = new BigNumber(minAmount);
        if(this.maxAmount !== null)
            this.maxAmount = new BigNumber(maxAmount);
        this.input.set(this.input.get(), true);
    }
}