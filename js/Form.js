class Form {
    constructor(form, onSubmit) {
        let th = this;
        
        this.form = form;
        this.fields = {};
        
        this.form.on('submit', function(event) {
            event.preventDefault();
            
            let foundError = false;
            let data = {};
            
            for(key in this.fields) {
                if(this.fields[key].required && !this.fields[key].notEmpty) {
                    this.fields[key].requiredHintElem.show();
                    foundError = true;
                    continue;
                }
                
                if(! this.fields[key].valid) {
                    foundError = true;
                    continue;
                }
                
                if(this.fields[key].type == 'text')
                    data[key] = this.fields[key].input.val();
                else if(this.fields[key].type == 'decimal')
                    data[key] = this.fields[key].input.get();
            }
            
            if(foundError) {
                msgBox('Please fill the form correctly');
                return;
            }
            
            onSubmit(data);
        });
    }
    
    text(key, required, validator, hintText = null, valTimeout = 0) {
        let th = this;
        
        let input = this.form.find(`input[name="${key}"]`);
        
        let requiredHintElem = null;
        if(required) {
            input.after(`
                <small class="hint-required form-text" style="display: none" data-for="${key}">
                    This field cannot be empty
                </small>
            `);
            let requiredHintElem = this.form.find(`.hint-required[data-for="${key}"]`);
        }
        
        if(!hintText)
            hintText = 'Invalid format';
        input.after(`
            <small class="hint-invalid form-text" style="display: none" data-for="${key}">
                ${hintText}
            </small>
        `);
        let invalidHintElem = this.form.find(`.hint-invalid[data-for="${key}"]`);
        
        this.fields[key] = {
            type: 'text',
            input: input,
            
            required: required,
            notEmpty: false,
            requiredHintElem: requiredHintElem,
            
            valid: true,
            invalidHintElem: invalidHintElem,
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
            requiredHintElem: requiredHintElem,
            
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
        for(key in this.fields) {
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
        th.fields[key].notEmpty = notEmpty;
        if(th.fields[key].required)
            th.fields[key].requiredHintElem.toggle(!notEmpty);
    }
    
    setValid(key, valid) {
        th.fields[key].valid = valid;
        th.fields[key].invalidHintElem.toggle(!valid);
    }
}