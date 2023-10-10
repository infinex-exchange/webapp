class FormValidator {
    constructor(form, onSubmit) {
        let th = this;
        
        this.form = form;
        this.fields = {};
        
        this.form.on('submit', function(event) {
            event.preventDefault();
            
            let foundError = false;
            let data = {};
            
            for(const key in th.fields) {
                if(th.fields[key].required && !th.fields[key].notEmpty) {
                    th.fields[key].requiredHintElem.show();
                    foundError = true;
                    continue;
                }
                
                if(! th.fields[key].valid) {
                    foundError = true;
                    continue;
                }
                
                if(th.fields[key].type == 'text') {
                    let val = th.fields[key].input.val();
                    if(val == '') val = null;
                    data[key] = val;
                }
                else if(this.fields[key].type == 'decimal')
                    data[key] = th.fields[key].input.get();
            }
            
            if(foundError || ! onSubmit(data))
                msgBox('Please fill the form correctly');
        });
    }
    
    text(key, input, required, validator, hintText = null, valTimeout = 0) {
        let th = this;
        
        this.fields[key] = {
            type: 'text',
            input: input,
            
            required: required,
            notEmpty: false,
            requiredHintElem: this.createReqHint(this.form, input, key, required),
            
            valid: true,
            invalidHintElem: this.createInvHint(this.form, input, key, hintText),
            typingTimeout: null
        };
        
        input.on('input', function() {
            let val = $(this).val();
            
            if(val == '') {
                th.setNotEmpty(key, false);
                th.setValid(key, true);
            }
            
            else {
                th.setNotEmpty(key, true);
                
                if(valTimeout == 0)
                    th.validate(key, val, validator);
                
                else {
                    clearTimeout(th.fields[key].typingTimeout);
                    th.fields[key].typingTimeout = setTimeout(
                        function() {
                            th.validate(key, val, validator);
                        },
                        valTimeout
                    );
                }
            }
        });
    }
    
    decimal(key, input, required) {
        let th = this;
        
        this.fields[key] = {
            type: 'decimal',
            input: input,
            
            required: required,
            notEmpty: false,
            requiredHintElem: this.createReqHint(this.form, input.input, key, required),
            
            valid: true
        }
        
        input.onChange(
            function(val) {
                th.setNotEmpty(key, val !== null);
            },
            false
        );
    }
    
    reset() {
        for(const key in this.fields) {
            if(this.fields[key].type == 'text')
                this.fields[key].input.val('');
            else if(this.fields[key].type == 'decimal')
                this.fields[key].input.reset();
            
            this.fields[key].notEmpty = false;
            if(this.fields[key].required)
                this.fields[key].requiredHintElem.hide();
            
            this.setValid(key, true);
        }
    }
    
    validate(key, value, validator) {
        let th = this;
        
        let promise = new Promise(function(resolve, reject) {
            resolve(validator(value));
        });
        
        promise.catch(function(error) {
            return false;
        }).then(function(valid) {
            th.setValid(key, valid);
        });
    }
    
    setNotEmpty(key, notEmpty) {
        this.fields[key].notEmpty = notEmpty;
        if(this.fields[key].required)
            this.fields[key].requiredHintElem.toggle(!notEmpty);
    }
    
    setValid(key, valid) {
        this.fields[key].valid = valid;
        this.fields[key].invalidHintElem.toggle(!valid);
    }
    
    createReqHint(form, input, key, required) {
        if(!required)
            return null;
        
        let after = input.closest('.input-group');
        if(! after.length) after = input;
        after.after(`
            <small class="hint-required form-text" style="display: none" data-for="${key}">
                This field cannot be empty
            </small>
        `);
        return form.find(`.hint-required[data-for="${key}"]`);
    }
    
    createInvHint(form, input, key, hintText) {
        if(!hintText)
            hintText = 'Invalid format';
        
        let after = input.closest('.input-group');
        if(! after.length) after = input;
        after.after(`
            <small class="hint-invalid form-text" style="display: none" data-for="${key}">
                ${hintText}
            </small>
        `);
        return form.find(`.hint-invalid[data-for="${key}"]`);
    }
}