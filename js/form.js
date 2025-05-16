// gestisce qualsiasi tipo di form contentente fields
const form = {

    fields: [],

    // prende dei fields
    load_fields_by_name(name) {
        this.fields = Array.from(document.querySelectorAll(`input[name="${name}"]`));
    },

    // reset dei fields
    clear_fields() {
        this.fields.forEach(field => { field.value = ''; });
    },

    // controllo se la form e' compilata
    is_form_filled() {
        for (const field of this.fields)
            if (field.value === '') return false;
        return true;
    }

};


// errori da mostrare nei diversi scenari
const form_errors = {

    EMPTY_FIELDS: 'Compila tutti i campi per favore!',
    USERNAME_NOT_FOUND: 'Nessun Username uguale trovato!',
    PASSWORD_NOT_MATCH: 'Le Password non corrispondono!'

};