function canviaIdioma() {
    var idiomaSeleccionat = document.querySelector(".seleccioidioma").value;
    var traduccions = {
        'en': {
            'firma': 'VICTOR PUCHE',
            'disclaimeridiom': 'Select your Language:',
            'sobremi': 'About me',
            'micv': 'My CV',
            'projectes': 'Projects',
            'principal': 'Student of Industrial and Automatic Electronic Engineering',
            'primerapart': 'Discover my portfolio',
            'segonapart': ' and more about me.',
            'interessatparla': 'Interested in talking to me?',
            'contact': 'CONTACT',
            'fetambvis': 'Made with Visual Studio and hosted online with GitHub:',
            'idiprog': 'HTML, CSS and JavaScript - 2024'
        },
        'ca': {
            'firma': 'VÍCTOR PUCHE',
            'disclaimeridiom': 'Selecciona el teu Idioma:',
            'sobremi': 'Sobre mi',
            'micv': 'El meu CV',
            'projectes': 'Projectes',
            'principal': 'Estudiant Enginyeria Electrònica Industrial i Automàtica',
            'primerapart': 'Descobreix el meu portafoli',
            'segonapart': ' i més sobre mi.',
            'interessatparla': 'Interessat en parlar amb mi?',
            'contact': 'CONTACTA',
            'fetambvis': 'Fet amb Visual Studio i hosted online amb GitHub:',
            'idiprog': 'HTML, CSS i JavaScript - 2024'
        },
        'es': {
            'firma': 'VÍCTOR PUCHE',
            'disclaimeridiom': 'Selecciona tu Idioma:',
            'sobremi': 'Sobre mí',
            'micv': 'Mi CV',
            'projectes': 'Proyectos',
            'principal': 'Estudiante de Ingeniería Electrónica Industrial y Automática',
            'primerapart': 'Descubre mi portafolio',
            'segonapart': ' y más sobre mí.',
            'interessatparla': '¿Interesado en hablar conmigo?',
            'contact': 'CONTACTA',
            'fetambvis': 'Hecho con Visual Studio y alojado en línea con GitHub:',
            'idiprog': 'HTML, CSS y JavaScript - 2024'
        },
        'de': {
            'firma': 'VÍCTOR PUCHE',
            'disclaimeridiom': 'Wählen Sie Ihre Sprache:',
            'sobremi': 'Über mich',
            'micv': 'Mein Lebenslauf',
            'projectes': 'Projekte',
            'principal': 'Student der Industrieelektronik und Automatisierungstechnik',
            'primerapart': 'Entdecken Sie mein Portfolio',
            'segonapart': ' und mehr über mich.',
            'interessatparla': 'Interessiert daran, mit mir zu sprechen?',
            'contact': 'KONTAKT',
            'fetambvis': 'Gemacht mit Visual Studio und online gehostet mit GitHub:',
            'idiprog': 'HTML, CSS und JavaScript - 2024'
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
        element.style.fontSize = "3.3em"; // Set font size to 3em for German
    } else {
        element.style.fontSize = "3.6em"; // Set font size to 3.6em for other languages
    }
}