function canviaIdioma() {
    var idiomaSeleccionat = document.querySelector(".seleccioidioma").value;
    var traduccions = {
        'en': {
            'firma': 'VÍCTOR PUCHE',
            'disclaimeridiom': 'Select your Language:',
            'cvtitle': 'Spanish Version of CV',
            'englishtitle': 'English Version of CV',
            'sobremi': 'About me',
            'micv': 'My CV',
            'projectes': 'Projects'
            // Add more translations as needed
        },
        'ca': {
            'firma': 'VÍCTOR PUCHE',
            'disclaimeridiom': 'Selecciona el teu Idioma:',
            'cvtitle': 'Versió Castellana del CV',
            'englishtitle': 'Versió Anglesa del CV',
            'sobremi': 'Sobre mi',
            'micv': 'El meu CV',
            'projectes': 'Projectes'
            // Add more translations as needed
        },
        'es': {
            'firma': 'VÍCTOR PUCHE',
            'disclaimeridiom': 'Selecciona tu Idioma:',
            'cvtitle': 'Versión en Español del CV',
            'englishtitle': 'Versión en Inglés del CV',
            'sobremi': 'Sobre mí',
            'micv': 'Mi CV',
            'projectes': 'Proyectos'
            // Add more translations as needed
        },
        'de': {
            'firma': 'VÍCTOR PUCHE',
            'disclaimeridiom': 'Wählen Sie Ihre Sprache:',
            'cvtitle': 'Spanisch Version des Lebenslaufs',
            'englishtitle': 'Englisch Version des Lebenslaufs',
            'sobremi': 'Über mich',
            'micv': 'Mein Lebenslauf',
            'projectes': 'Projekte'
            // Add more translations as needed
        }
    };

    var keys = Object.keys(traduccions[idiomaSeleccionat]);
    for (var i = 0; i < keys.length; i++) {
        var id = keys[i];
        var text = traduccions[idiomaSeleccionat][id];
        document.getElementById(id).textContent = text;
    }

    // Change font size for the 'principal' element
    var element = document.getElementById("principal");
    if (idiomaSeleccionat === 'de') {
        element.style.fontSize = "3.3em"; // Set font size to 3.3em for German
    } else {
        element.style.fontSize = "3.6em"; // Set font size to 3.6em for other languages
    }
}