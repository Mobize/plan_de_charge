
window.onload = () => {    

    // TODO
    // si un congés precedent existe la date de debut de conges revient en arriere du jour precedent. on peut poser des conges anterieurs
    // mettre un loader au chargement de la page

    // historique des actions sur les congés (Voir si nom d'utilisateur dans les logs)
    // Observations texte par congés
    // Projets par utilisateur (Authentification)
    // Controle sur les champs de formulaire modal (required)
    // try catch si erreur et affichage des messages d'erreur
    // Traduire les textes sur l'admin
    // A voir: vue trimestriel ? 

    // BUG
    // changement d'année (vue 2 mois : decembre janvier) a corriger


    const toggleButton = document.getElementById("toggle");
    const toggleText = document.getElementById("dark-mode-toggle");
    let tableResponsive = document.getElementById('firstMonthTable');
    let tableResponsiveNextMonth = document.getElementById('secondMonthTable');
    const projectSelector = document.getElementById('project-selector');
    const selectedMonthContainer = document.getElementById('selectedMonth');
    const startVacationInput = document.getElementById('startVacation');
    const endVacationInput = document.getElementById('endVacation');
    const typeVacationInput = document.getElementById('vacationTypeSelect');
    const secondMonthNameButton = document.getElementById('secondMonthName');
    const buttonNext = document.getElementById('next');
    const buttonPrevious = document.getElementById('previous');
    const modalContent = document.getElementById("modal-content");
    const modalHeader = document.getElementById("modal-header");
    const modalConfirmContent = document.getElementById("modalConfirm-content");
    const toggle = document.getElementById("toggle");
    const logo = document.getElementById("logo");

    // toggle.addEventListener("change", () => {
    //     document.body.classList.toggle("dark-mode");
    // });

    // Vérifie si le mode sombre est activé dans le stockage local
    if (localStorage.getItem("darkMode") === "enabled") {
        logo.src = logo.dataset.logoDark;
        toggle.checked = true;
        document.body.classList.add("dark-mode");
        toggleText.innerText = "Mode sombre";
        toggleText.style.marginRight = "165px";
        tableResponsive.classList.add("dark-mode-container");
        tableResponsiveNextMonth.classList.add("dark-mode-container");
        document.querySelectorAll(".vacationTypeContainer").forEach(element => {
            element.classList.add("dark-mode-container");
        });
        projectSelector.classList.add("dark-mode-container");
        selectedMonthContainer.classList.add("dark-mode-container");
        secondMonthNameButton.classList.add("dark-mode-container");
        buttonNext.classList.add("dark-mode-container");
        buttonPrevious.classList.add("dark-mode-container");
        startVacationInput.classList.add("dark-mode-container");
        endVacationInput.classList.add("dark-mode-container");
        typeVacationInput.classList.add("dark-mode-container");
        modalConfirmContent.classList.add("dark-mode-modal-confirm");
        modalContent.classList.add("dark-mode-modal");
        modalHeader.classList.add("dark-mode-modal-header");
        
    } else {
        logo.src = logo.dataset.logoLight;
        toggleText.innerText = "Activer le mode mode sombre";
        toggleText.style.marginRight = "280px";
        tableResponsive.classList.remove("dark-mode-container");
        tableResponsiveNextMonth.classList.remove("dark-mode-container");
        document.querySelectorAll(".vacationTypeContainer").forEach(element => {
            element.classList.remove("dark-mode-container");
        });
        projectSelector.classList.remove("dark-mode-container");
        selectedMonthContainer.classList.remove("dark-mode-container");
        secondMonthNameButton.classList.remove("dark-mode-container");
        buttonNext.classList.remove("dark-mode-container");
        buttonPrevious.classList.remove("dark-mode-container");
        modalContent.classList.remove("dark-mode-modal");
        modalHeader.classList.remove("dark-mode-modal-header");
        startVacationInput.classList.remove("dark-mode-container");
        endVacationInput.classList.remove("dark-mode-container");
        typeVacationInput.classList.remove("dark-mode-container");
        modalConfirmContent.classList.remove("dark-mode-modal-confirm");
    }

    // Ajoute un event listener pour basculer entre les modes
    toggleButton.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
        
        // Sauvegarde la préférence de l'utilisateur
        if (document.body.classList.contains("dark-mode")) {
            logo.src = logo.dataset.logoDark;
            localStorage.setItem("darkMode", "enabled");
            toggleText.innerText = "Mode sombre";
            toggleText.style.marginRight = "165px";
            tableResponsive.classList.add("dark-mode-container");
            tableResponsiveNextMonth.classList.add("dark-mode-container");
            document.querySelectorAll(".vacationTypeContainer").forEach(element => {
                element.classList.add("dark-mode-container");
            });
            projectSelector.classList.add("dark-mode-container");
            selectedMonthContainer.classList.add("dark-mode-container");
            secondMonthNameButton.classList.add("dark-mode-container");
            buttonNext.classList.add("dark-mode-container");
            buttonPrevious.classList.add("dark-mode-container");
            modalContent.classList.add("dark-mode-modal");
            modalHeader.classList.add("dark-mode-modal-header");
            startVacationInput.classList.add("dark-mode-container");
            endVacationInput.classList.add("dark-mode-container");
            typeVacationInput.classList.add("dark-mode-container");
            modalConfirmContent.classList.add("dark-mode-modal-confirm");
            
        } else {
            logo.src = logo.dataset.logoLight;
            localStorage.setItem("darkMode", "disabled");
            toggleText.innerText = "Activer le mode mode sombre";
            toggleText.style.marginRight = "280px";
            tableResponsive.classList.remove("dark-mode-container");
            tableResponsiveNextMonth.classList.remove("dark-mode-container");
            document.querySelectorAll(".vacationTypeContainer").forEach(element => {
                element.classList.remove("dark-mode-container");
            });
            projectSelector.classList.remove("dark-mode-container");
            selectedMonthContainer.classList.remove("dark-mode-container");
            secondMonthNameButton.classList.remove("dark-mode-container");
            buttonNext.classList.remove("dark-mode-container");
            buttonPrevious.classList.remove("dark-mode-container");
            modalContent.classList.remove("dark-mode-modal");
            modalHeader.classList.remove("dark-mode-modal-header");
            startVacationInput.classList.remove("dark-mode-container");
            endVacationInput.classList.remove("dark-mode-container");
            typeVacationInput.classList.remove("dark-mode-container");
            modalConfirmContent.classList.remove("dark-mode-modal-confirm");
        }
    });


    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth();
    const monthName = ['Janvier', 'Février', 'Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre'];
    const UpMonth = 'upmonth';
    const DownMonth = 'downmonth';
    let selectedMonthSelect = document.getElementById('selectedMonth')
    let realMonth = month+1
    let selectedMonthValue = month
    let secondMonthName = document.getElementById("secondMonthName")

    if(realMonth < 10) {
        realMonth = "0"+ realMonth
    }

    let actualMonth = `${year}-${realMonth}`.toString()
    selectedMonthSelect.value= actualMonth

    // *************** Project selector ***************
    const select = document.querySelector(".projectSelector select");
    const projects = document.querySelector(".projectSelector");
    let projectsData = projects ? JSON.parse(projects.dataset.projects) : false
    let selectedProject = projects.dataset.selectedproject

    // *************** Modal ***************
    let startVacation = document.querySelector('#startVacation');
    let endVacation = document.querySelector('#endVacation');
    let submitButton = document.getElementById('submit_vacation')
    let employeeFullname = ""
    let dayStart = ""
    let employeeId = ""
    let employeesByProject = [];
    let updateVacations = false
    let vacationId = ""
    let selectedyear =""
    // Demi journées
    let halfDayContainer = document.getElementById('halfDayContainer')
    let isHalfDay = document.getElementById('isHalfDay')
    let halfDayCheckbox = document.getElementById('halfDayCheckbox')
    let halfMorning = document.getElementById('halfMorning')
    let halfAfternoon = document.getElementById('halfAfternoon')
    
    let vacationTypeSelect = document.getElementById('vacationTypeSelect')
    const deleteButton = document.getElementById('delete_vacation')
    const previousVacations = document.getElementById('previousVacations')
    const nextVacations = document.getElementById('nextVacations')
    const vacationSubmissionDate = document.getElementById('vacation-submission-date')
    const twoMonthButton = document.getElementById('switchViewButton')
    const firstMonthDisplay = document.getElementById('firstMonthDisplay')
    const secondMonthDisplay = document.getElementById('secondMonthDisplay')
    const switchViewButton = document.getElementById('switchViewButton')
    let tBody = document.querySelector("tbody");
    let tBody2Months = document.getElementById("2months");
    const weekContainer = document.getElementById('table_days')
    const weekContainer2 = document.getElementById('table_days2')
    let vacationCount = [];

    // Options d'affichage des jours de congés (En Français)
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      };

      
    function showSuccessNotification(text) {
        // Créer une notification
        let notification = document.createElement("div");
        notification.classList.add("notification");
        notification.innerHTML  =  `${text} <i class="fa-solid fa-check"></i>`;
    
        // Ajouter la notification au conteneur
        document.getElementById("notification-container").appendChild(notification);
    
        // Supprimer la notification après 3.5 secondes
        setTimeout(() => {
            notification.remove();
        }, 3500);
    }

    //Vider le cache
    const button = document.getElementById("clear-cache-btn");
    const loader = document.getElementById("loader");

    //Supprimer les selections sur les weekend
    const startDateInput = document.getElementById('startVacation');
    const endDateInput = document.getElementById('endVacation');
    // Désactiver les samedis et dimanches
    startDateInput.addEventListener('input', function() {
        let selectedDate = new Date(startDateInput.value);
        let dayOfWeek = selectedDate.getDay(); // 0 = Dimanche, 6 = Samedi

        // Si c'est un samedi (6) ou dimanche (0), on revient à la valeur précédente
        if (dayOfWeek === 6 || dayOfWeek === 0) {
            alert("Les week-ends ne sont pas autorisés !");
            startDateInput.value = ""; // Vide la valeur sélectionnée
        }
    });

    endDateInput.addEventListener('input', function() {
        let selectedDate = new Date(endDateInput.value);
        let dayOfWeek = selectedDate.getDay(); // 0 = Dimanche, 6 = Samedi

        // Si c'est un samedi (6) ou dimanche (0), on revient à la valeur précédente
        if (dayOfWeek === 6 || dayOfWeek === 0) {
            alert("Les week-ends ne sont pas autorisés !");
            endDateInput.value = ""; // Vide la valeur sélectionnée
        }
    });

    if (button) {
        button.addEventListener("click", function () {
            loader.style.display = "flex"; // Affiche le loader
            button.disabled = true; // Désactive le bouton temporairement

            fetch("/clear-cache", {
                method: "POST",
                headers: {
                    "X-Requested-With": "XMLHttpRequest"
                }
            })
            .then(response => response.json())
            .then(data => {
                alert(data.message);
            })
            .catch(error => {
                console.error("Erreur :", error);
                alert("Une erreur est survenue.");
            })
            .finally(() => {
                loader.style.display = "none"; // Masque le loader après la réponse
                button.disabled = false; // Réactive le bouton
            });
        });
    }

    // Récuperation des projets
    if(projectsData) {
        select.innerHTML = ""
        projectsData.forEach(project => {
            if(project.id == selectedProject) {
                select.innerHTML += `
                    <option selected
                        value="${project.id}">
                        ${project.name}
                    </option>
                `
            } else {
                select.innerHTML += `
                    <option 
                        value="${project.id}">
                        ${project.name}
                    </option>
                `
            }
        })
    }

    // Sélection du mois à afficher (Select)
    selectedMonth.addEventListener('change', (event) => {
        if(event.target.value !== "") {
            let selectedmonth = event.target.value.slice(5,7)
            selectedyear = event.target.value.slice(0,4)
            selectedMonthValue = parseInt(selectedmonth)-1
            year = selectedyear
            weekContainer2.innerHTML = ""
            weekContainer.innerHTML = ""
            tBody.innerHTML = ""
            tBody2Months.innerHTML = ""
            secondMonthName.innerText = ""
            calendrier(selectedyear, selectedMonthValue)
        } 

    })

    // Selection vue mensuelle ou bimensuelle
    twoMonthButton.addEventListener('click', (event) => {
        
        if(firstMonthDisplay.classList.contains('col-sm-7')) {
            firstMonthDisplay.classList.remove('col-sm-7')
            firstMonthDisplay.classList.add('col-sm-12')
            secondMonthDisplay.classList.add('d-none')
            switchViewButton.innerText = 'Vue bimensuelle'
        } else {
            firstMonthDisplay.classList.remove('col-sm-12')
            firstMonthDisplay.classList.add('col-sm-7')
            secondMonthDisplay.classList.remove('d-none')
            switchViewButton.innerText = 'Vue mensuelle'
        }
    })

    const handleChange = async(event) => {
        event.preventDefault()
        let projectId = event.target.value
        selectedProject = projectId
        if(projectId) {
            calendrier(year, selectedMonthValue)
        }
    }

    const getVacationsByEmployee = async (employeeId, daystart, vacationId = null) => {

        let data = {
            dayStart : daystart,
            vacationId: vacationId
        }

        const response = await fetch('/get/vacations/employee/'+employeeId, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
              },
            body: JSON.stringify({
                data,
              })
        })
        
        const result = await response.json()
        return result
    }

    // Affichage des div des jours en fonction du nombre de jours du mois + décalage du jour de départ
    const displayEmployees = async (year, month, monthLength, nextMonthLength) => {

        const response = await fetch('/update/project/'+selectedProject+'/'+year+'/'+month)
        const result = await response.json()
        employeesByProject = result.data;
        // console.log(firstMonthName)
        if(result.isSuccess) {
            tBody.innerHTML = `<tr class="semaine header">
            <th scope="row" style="text-align:center;"></th>
            <th scope="row" style="text-align:center;">Absences</th>
                           </tr>`;
            
            result.data.forEach((employee) => {
                tBody.innerHTML += `<tr class="semaine" 
                                    data-employeeId="${employee.id}" 
                                    data-employeeFullName="${employee.fullname}">
                                    <th scope="row" class="name-col"><span class="fa-icon"><i class="fa-solid fa-custom fa-circle-user fa-xl" style="color: #0006b847;"></i></span><span>${employee.fullname}</span></th>
                                    <th scope="row" class="employee_id" id="employee_id_${employee.id}" style="text-align:center"></th>
                                    </tr>`
            })

            tBody2Months.innerHTML = `<tr class="semaine2 header"></tr>`
            result.data.forEach((employee) => {
                tBody2Months.innerHTML += `<tr class="semaine2" data-employeeId="${employee.id}" 
                data-employeeFullName="${employee.fullname}"></tr>`
                                    
            })

            let collection = document.getElementsByClassName("semaine")
            let collectionMonth2 = document.getElementsByClassName("semaine2")

            for (var i = 0; i < collection.length; i++) {  
                for (let index = 0; index < monthLength; index++) {
                    collection[i].innerHTML += `<td class="day case_row_${i} text_center" data-idemployee="${collection[i].dataset.employeeid}"></td>`;            
                }
            }

            for (var i = 0; i < collectionMonth2.length; i++) {  
                for (let index = 0; index < nextMonthLength; index++) {
                    collectionMonth2[i].innerHTML += `<td class="day2 case2_row_${i} text_center" data-idemployee="${collectionMonth2[i].dataset.employeeid}"></td>`;
                }
            }
        }

        
    }

    // Affichage des noms de jours de la semaine calculé sur le nombre de jours du mois en cours
    function showNameOfDay(monthLength,monthActuel) {
        const days = ['Lun','Mar','Mer','Jeu','Ven','Sam','Dim']
        let dayValue = `${year}-${monthActuel+1}-01`
        let dayDate = new Date(dayValue)
        let dayStringFR = dayDate.toLocaleDateString('fr-ca', options)
        let dayName = dayStringFR.charAt(0).toUpperCase() + dayStringFR.slice(1);
        let dayCut = dayName.slice(0,3)
        let masquedDaysArray = []
        // console.log("showNameOfDay", monthLength,monthActuel )
        let daysContainer = document.getElementsByClassName('day');

        for (let index = 0; index < daysContainer.length; index++) {
            if(daysContainer[index].dataset.day == undefined) {// Masque les jours non numérotés
                daysContainer[index].style.display = 'none'
                if(daysContainer[index].classList.contains('case_row_0')) {
                    masquedDaysArray.push(daysContainer[index])
                }
            }
            if(daysContainer[index].dataset.stringday != undefined) {
                // Masque les jours de weekend
                if(daysContainer[index].dataset.stringday.includes('sam') || daysContainer[index].dataset.stringday.includes('dim')) {
                    daysContainer[index].style.display = 'none';
                } 
            }
        }
        
        let countDays = 0;
        let startIndex = days.findIndex(day => day === dayCut) // Jour de début du mois
        weekContainer.innerHTML = `<th class="headWeek" scope="col"></th><th class="headWeek"></th>`
        
        const nbOfWeeks = monthLength/days.length
        let dayNameContainer = document.getElementsByClassName('jour');
        
        for (let index1 = 0; index1 < Math.ceil(nbOfWeeks+1); index1++) {
            for (let index = 0; index < days.length; index++) {
                countDays++
                if(countDays <= monthLength+masquedDaysArray.length) {
                    if(index1 === 0) {
                        if(startIndex < days.length) {
                            weekContainer.innerHTML += `
                            <th scope="col" class="jour">${days[startIndex]}</th>
                            `
                        }
                        startIndex++
                    }else {
                        weekContainer.innerHTML += `
                            <th scope="col" class="jour">${days[index]}</th>
                            `
                    }
                }
            }
        }

        // Masque les noms de jours de weekend
        for (let index = 0; index < dayNameContainer.length; index++) {
            if(dayNameContainer[index].textContent === "Sam" || dayNameContainer[index].textContent === "Dim") {
                dayNameContainer[index].style.display = 'none'
            }
        }
    }

    // Affichage des noms de jours de la semaine calculé sur le nombre de jours du mois en cours
    function showNameOfDayTwoMonth(monthLength,monthActuel, actualYear) {
        const days = ['Lun','Mar','Mer','Jeu','Ven','Sam','Dim']
        let dayValue = `${actualYear}-${monthActuel}-01`
        let dayDate = new Date(dayValue)
        let dayStringFR = dayDate.toLocaleDateString('fr-ca', options)
        let dayName = dayStringFR.charAt(0).toUpperCase() + dayStringFR.slice(1);
        let dayCut = dayName.slice(0,3)
        let masquedDaysArray = []
        
        let daysContainer = document.getElementsByClassName('day2');

        for (let index = 0; index < daysContainer.length; index++) {
            if(daysContainer[index].dataset.day == undefined) {// Masque les jours non numérotés
                daysContainer[index].style.display = 'none'
                if(daysContainer[index].classList.contains('case2_row_0')) {
                    masquedDaysArray.push(daysContainer[index])
                }
            }
            if(daysContainer[index].dataset.stringday != undefined) {
                // Masque les jours de weekend
                if(daysContainer[index].dataset.stringday.includes('sam') || daysContainer[index].dataset.stringday.includes('dim')) {
                    daysContainer[index].style.display = 'none'
                } 
            }
        }
        
        let countDays = 0;
        let startIndex = days.findIndex(day => day === dayCut) // Jour de début du mois
        weekContainer2.innerHTML = ``
        
        const nbOfWeeks = monthLength/days.length
        let dayNameContainer = document.getElementsByClassName('jour2');
        
        for (let index1 = 0; index1 < Math.ceil(nbOfWeeks+1); index1++) {
            for (let index = 0; index < days.length; index++) {
                countDays++
                if(countDays <= monthLength+masquedDaysArray.length) {
                    if(index1 === 0) {
                        if(startIndex < days.length) {
                            weekContainer2.innerHTML += `
                            <th scope="col" class="jour2">${days[startIndex]}</th>
                            `
                        }
                        startIndex++
                    }else {
                        weekContainer2.innerHTML += `
                            <th scope="col" class="jour2">${days[index]}</th>
                            `
                    }
                }
            }
        }

        // Masque les noms de jours de weekend
        for (let index = 0; index < dayNameContainer.length; index++) {
            if(dayNameContainer[index].textContent === "Sam" || dayNameContainer[index].textContent === "Dim") {
                dayNameContainer[index].style.display = 'none'
            }
        }
    }

    function calendrierReducer(action) {
        weekContainer.innerHTML = ""
        weekContainer2.innerHTML = ""
        tBody.innerHTML = ""
        tBody2Months.innerHTML = ""
        secondMonthName.innerText = ""

        switch (action) {
            case UpMonth:
                if(selectedMonthValue < 11) selectedMonthValue++
                else {
                    year++
                    selectedMonthValue = 0;
                }
                break;
            case DownMonth:
                if(selectedMonthValue > 0) selectedMonthValue--
                else {
                    year--
                    selectedMonthValue = 11;
                }
                break;
            default:
                break;
        }
        
        let realMonthValue = selectedMonthValue+1
        if(realMonthValue < 10) {
            realMonth = "0"+ realMonthValue
        } else {
            realMonth = realMonthValue
        }
    
        let actualMonth = `${year}-${realMonth}`.toString()
        selectedMonthSelect.value= actualMonth
        calendrier(year, selectedMonthValue)
    }

    document.getElementById('previous').onclick = function() {
        calendrierReducer(DownMonth)
    }

    document.getElementById('next').onclick = function() {
        calendrierReducer(UpMonth)
    }

    const addVacations = async(event) => {

        event.preventDefault()
        employeeId = event.target.parentNode.dataset.employeeid
        employeeFullname = event.target.parentNode.dataset.employeefullname
        dayStart = event.target.dataset.day
        let submitVacation = document.getElementById('submit_vacation')
        submitVacation.classList.add('disabled')
        let modalTitle = document.getElementById('exampleModalLabel')
        vacationTypeSelect.value = "1"
        endVacation.max = ""
        startVacation.max = ""
        modalTitle.innerText = ""
        previousVacations.innerText = "Aucun"
        nextVacations.innerText = "Aucun"
        isHalfDay.classList.add('d-none')
        halfDayContainer.classList.add('d-none')
        halfDayCheckbox.checked = false
        halfMorning.checked = false
        halfAfternoon.checked = false
        vacationSubmissionDate.classList.add('d-none')
        
        // Défini la date selectionnable (date du jour au minimum)
        endVacation.value = ""
        startVacation.min = new Date().toLocaleDateString('fr-ca')
        endVacation.min = startVacation.min

        // Ajustement de la date de fin de congés minimale sélectionnable en fonction de la date de début seléctionnée
        let dateStartSelected = Date.parse(startVacation.value)
        let dateEndMin = Date.parse(endVacation.min)

        if(dateStartSelected > dateEndMin ) {
            endVacation.min = startVacation.value
        }
        
        startVacation.value = dayStart
        endVacation.min = dayStart

        let dateContainer = document.getElementById("date-container")
        deleteButton.classList.add('d-none')

        // Recherche des congés précédents et suivants par employé
        getVacationsByEmployee(employeeId,dayStart,event.target.dataset.vacationId).then((result) => {
            // Définition de la date disponible min et max en fonction des congés précédents et suivants
            let previousVacation = result.previousVacation.slice(0,10)
            let nextVacation = result.nextVacation.slice(0,10)

            // Ajustement de la date de début de congés disponible si congés précédents
            if(result.previousVacation != "") {
                let previousVacationDay = parseInt(result.previousVacation.slice(8,10))
                let previousMaxVacationDay = previousVacationDay+1

                if(previousMaxVacationDay < 10) {
                    previousMaxVacationDay = '0' + previousMaxVacationDay
                }

                let previousYearMonth = previousVacation.substring(0, 8)
                let previousVacationDate = previousYearMonth + previousMaxVacationDay
                startVacation.min = previousVacationDate

                let previousDate = new Date(previousVacation)
                previousVacations.innerText = previousDate.toLocaleDateString('fr-ca', options)
            }

            // Ajustement de la date de fin de congés disponible si congés suivants
            if(result.nextVacation != "") {
                let nextVacationDay = parseInt(result.nextVacation.slice(8,10))
                let nextMinVacationDay = nextVacationDay-1

                if(nextMinVacationDay < 10) {
                    nextMinVacationDay = '0' + nextMinVacationDay
                }
        
                let nextYearMonth = nextVacation.substring(0, 8)
                let nextVacationDate = nextYearMonth + nextMinVacationDay    
                
                startVacation.max = nextVacationDate
                endVacation.max = nextVacationDate

                let nextDate = new Date(nextVacation)
                nextVacations.innerText = nextDate.toLocaleDateString('fr-ca', options)
            }

            // Modification des congés existants
            if(event.target.dataset.vacationId) {
                submitButton.innerText = 'Modifier'
                startVacation.value = ""
                modalTitle.innerText = `Modification des congés pour : ${employeeFullname}`
                // modalTitle.style.color = '#3454ff'
                vacationTypeSelect.value = ""
                vacationSubmissionDate.classList.remove('d-none')

                deleteButton.classList.remove('d-none')
                let employeeStartVacationToString = result.vacationsStart.slice(0,10)
                let employeeEndVacationToString = result.vacationsEnd.slice(0,10)
                startVacation.value = employeeStartVacationToString
                endVacation.value = employeeEndVacationToString
                updateVacations = true
                vacationId = event.target.dataset.vacationId
                vacationTypeSelect.value = result.idVacationType
                endVacation.min = startVacation.value
                startVacation.max = endVacation.value
                vacationSubmissionDate.classList.remove('d-none')
                let submissionDateTextContainer = document.getElementById('submission-date-text')
                submissionDateTextContainer.innerText = ""
                let submissionDate = new Date(result.vacationDateSubmission)
                submissionDateTextContainer.innerText = submissionDate.toLocaleDateString('fr-ca', options)

                // Affichage et remplissage de la checkbox demi-journée 
                if(startVacation.value === endVacation.value) {
                    isHalfDay.classList.remove('d-none')
                    if(result.isHalfDay === true) {
                        halfDayCheckbox.checked = true
                        halfDayContainer.classList.remove('d-none')
                        if(result.isMorning === true) {
                            halfMorning.checked = true
                        }
                        if(result.isAfternoon === true) {
                            halfAfternoon.checked = true
                        }
                    }

                } else {
                    isHalfDay.classList.add('d-none')
                }
    
            } else { // ajout de congés
                submitButton.innerText = 'Valider'
                deleteButton.classList.add('d-none')
                updateVacations = false
                vacationId = ""
                modalTitle.innerText = `Ajout de congés pour : ${employeeFullname}`
                // modalTitle.style.color = 'black'                
            }
        })

        dateContainer.addEventListener("change", (event) => {
            endVacation.min = startVacation.value // Défini le jour de début min du calendrier de fin de vacances
            startVacation.max = endVacation.value // Défini le jour de début max du calendrier de début de vacances

            // Checkbox demi-journée
            if(startVacation.value === endVacation.value) {
                isHalfDay.classList.remove('d-none')
                if(halfDayCheckbox.checked) {
                    halfDayContainer.classList.remove('d-none')
                } else {
                    halfDayContainer.classList.add('d-none')
                    halfDayCheckbox.checked = false
                    halfMorning.checked = false
                    halfAfternoon.checked = false
                }

            } else {
                isHalfDay.classList.add('d-none')
                halfDayContainer.classList.add('d-none')
                halfDayCheckbox.checked = false
                halfMorning.checked = false
                halfAfternoon.checked = false
            }

            if(startVacation.value === "" || endVacation.value === "" || vacationTypeSelect.value === "") {
                submitVacation.classList.add('disabled')
            } else {
                if(halfDayCheckbox.checked === true && (halfMorning.checked === false && halfAfternoon.checked === false) ) {
                    submitVacation.classList.add('disabled')
                } else {
                    submitVacation.classList.remove('disabled')
                }
            }
        })
    }

    submitButton.addEventListener("click", async (event) => {
        event.preventDefault()
        
        let monthOfEndVacation = endVacation.value.slice(5,7)
        let monthOfStartVacation = startVacation.value.slice(5,7)
        let monthOfStartVacationToInt = parseInt(monthOfStartVacation)
        let monthOfEndVacationToInt = parseInt(monthOfEndVacation)
        let yearOfStartVacation = parseInt(startVacation.value.slice(0,4))
        let yearOfEndVacation = parseInt(endVacation.value.slice(0,4))
        let actualSelectedMonth = parseInt(selectedMonthSelect.value.slice(5,7))
        let actualSelectedYear = parseInt(selectedMonthSelect.value.slice(0,4))
        let day = new Date(year, month + 1, 0);
        let currentMonth = month+1
        let endVacationToDate = new Date(endVacation.value)
        let endVacationMonth = (endVacationToDate.getMonth()+1)
        let indexMonth = month+1

        let data = {
            "employeeId" : employeeId,
            "employeeFullname" : employeeFullname,
            "vacations" : {
                "vacationMonth" : monthOfStartVacationToInt,
                "startVacation" : startVacation.value,
                "idVacationType" : vacationTypeSelect.value,
                "isHalfDay" : halfDayCheckbox.checked,
                "halfMorning" : halfMorning.checked,
                "halfAfternoon" : halfAfternoon.checked,
                "vacationId" : vacationId,
                "endVacation" : endVacation.value,
            }
        }

        let url = ""

        if(updateVacations) {
            url = "/update/vacations"
        }else {
            url = "/add/vacations"
        }

        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
              },
            body: JSON.stringify({
                data,
              })
        })

        const result = await response.json()

        let modelElem = document.querySelector('#vacationModal');
        let modalInstance = bootstrap.Modal.getInstance(modelElem);

        if(result.isSuccess) {
            modalInstance.hide()
            tBody.innerHTML = ""
            tBody2Months.innerHTML = ""
            calendrier(actualSelectedYear,actualSelectedMonth-1)
            setTimeout(() => {
                if(updateVacations) {
                    showSuccessNotification('Congés modifiés');
                } else {
                    showSuccessNotification('Congés ajoutés');
                }
            }, 1000);
        }
        
    })

    let cancelDelete = document.getElementById('cancel-delete');
    cancelDelete.addEventListener("click", () => {
        document.getElementById("confirmModal").style.display = "none";
    })

    deleteButton.addEventListener("click", (event)=> {
        event.preventDefault()
        document.getElementById("confirmModal").style.display = "flex";
        document.getElementById("confirmModal").style.zIndex = 1061;
        let confirmDelete = document.getElementById('confirm-delete');

        // Supprimer tout ancien événement avant d'ajouter le nouveau
        confirmDelete.replaceWith(confirmDelete.cloneNode(true));
        confirmDelete = document.getElementById('confirm-delete')

        confirmDelete.addEventListener("click", async () => {
            document.getElementById("confirmModal").style.display = "none";

            const response = await fetch('/delete/vacations/'+vacationId, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
              },
            // body: JSON.stringify({
            //     data,
            //   })
            })

            let modelElem = document.querySelector('#vacationModal');
            let modalInstance = bootstrap.Modal.getInstance(modelElem);

            const result = await response.json()
            if(result.isSuccess) {
                modalInstance.hide()
                tBody.innerHTML = ""
                tBody2Months.innerHTML = ""
                calendrier(year,selectedMonthValue)
                setTimeout(() => {
                    showSuccessNotification('Congés supprimés');
                }, 1000);
            }
        })
    })

    const calendrier = async(year, month) => {        
        
        // Vue 1 mois        
        const monthNb = month + 12 * (year - 2020)
        let cld = [{dayStart:2, length:31, year:2020, month:'Janvier'}];
        let monthsSimuleLongueur = []

        for (let i = 0; i < monthNb; i++) {
            let yearSimule = 2020 + Math.floor((i)/12);
            monthsSimuleLongueur = [31, getFevrierLength(yearSimule),31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
            let monthSimuleIndex = (i + 1) - (yearSimule - 2020) * 12;
            
            cld[i + 1] = {
                dayStart: (cld[i].dayStart + monthsSimuleLongueur[monthSimuleIndex -1]) % 7,
                length: monthsSimuleLongueur[monthSimuleIndex],
                year: 2020 + Math.floor((i+1) / 12),
                month: monthName[monthSimuleIndex]
            }

            if(cld[i+1].month === undefined) {
                cld[i+1].month = 'Janvier'
                cld[i+1].length = 31
            }
        }

        currentMonthDayStart = cld[cld.length -1].dayStart
        currentMonthLength = cld[cld.length -1].length

        selectedMonthLength = currentMonthLength + currentMonthDayStart

        // Vue 2 mois
        const monthNb2 = (month+1) + 12 * (year - 2020)
        let cld2 = [{dayStart:2, length:31, year:2020, month:'Janvier'}];
        let monthsSimuleLongueur2 = []

        for (let i = 0; i < monthNb2; i++) {
            let yearSimule = 2020 + Math.floor((i)/12);
            monthsSimuleLongueur2 = [31, getFevrierLength(yearSimule),31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
            let monthSimuleIndex = (i + 1) - (yearSimule - 2020) * 12;
            
            cld2[i + 1] = {
                dayStart: (cld2[i].dayStart + monthsSimuleLongueur2[monthSimuleIndex -1]) % 7,
                length: monthsSimuleLongueur2[monthSimuleIndex],
                year: 2020 + Math.floor((i+1) / 12),
                month: monthName[monthSimuleIndex]
            }

            if(cld2[i+1].month === undefined) {
                cld2[i+1].month = 'Janvier'
                cld2[i+1].length = 31
            }
        }

        nextMonthDayStart = cld2[cld2.length -1].dayStart
        nextMonthLength = cld2[cld2.length -1].length

        nextMonthLengthValue = nextMonthLength + nextMonthDayStart

        let collectionWeek = document.getElementsByClassName("semaine")
        let collectionWeek2 = document.getElementsByClassName("semaine2")

        let monthToNumber = Number(month+1)

        if(monthToNumber < 10) {
            monthToNumber = "0"+ monthToNumber
        }

        const loader = document.getElementById("loader");
        const content = document.getElementById("content");
        const legend = document.getElementById("legend");
        const loaderContainer = document.getElementById("toggle-container");

        loader.style.display = "block";
        content.style.display = "none";
        legend.style.display = "none";
        loaderContainer.style.display = "none";
        
        await displayEmployees(year, monthToNumber, selectedMonthLength, nextMonthLengthValue)  

        loader.style.display = "none";
        content.style.display = "flex";
        legend.style.display = "block";
        loaderContainer.style.display = "flex";
        // document.getElementById("firstMonthName").innerText = cld[cld.length - 1].month

        let today = new Date().toLocaleDateString('fr-ca')
        let count = 0

        // let caseUniques = document.getElementsByClassName('day')

        // for (let i = 0; i < caseUniques.length; i++) {
        //     // Cases[i].innerHTML += '<div></div>';
        //     // Cases[i].innerText = ""
        //     console.log(caseUniques)
        // }
        // Vue sur 1 mois
        for (var index = 0; index < collectionWeek.length ; index++) {// Boucle sur chaque employé        
            
            Cases = document.getElementsByClassName('case_row_'+ index);
            gret = document.getElementsByClassName('day');

            for (let i = 0; i < gret.length; i++) {
                // gret[i].innerHTML = '<div></div>';
                // Cases[i].innerText = ""
            }

            for (let i = 0; i < cld[cld.length - 1].length; i++) {// Boucle sur les jours

                let dayToNumber = Number(i + 1)
                if(dayToNumber < 10) {
                    dayToNumber = "0"+ dayToNumber
                }

                // Cases[i].innerHTML += '<div></div>';
                // console.log(Cases[i])

                let dayValue = `${year}-${monthToNumber}-${dayToNumber}`

                let dayDate = new Date(dayValue)
                let dayStringFR = dayDate.toLocaleDateString('fr-ca', options)
                // let weekEndDay = ['samedi', 'dimanche']
                // let isWeekEnd = dayStringFR.includes('')

                let todayTimestamp = Date.parse(today)
                let dayTimestamp = Date.parse(dayValue)

                if(Cases[i + cld[cld.length -1].dayStart] !== undefined) {
                    

                    Cases[i + cld[cld.length -1].dayStart].setAttribute('data-day', dayValue )
                    Cases[i + cld[cld.length -1].dayStart].setAttribute('data-month', month+1 )
                    Cases[i + cld[cld.length -1].dayStart].setAttribute('data-stringDay', dayStringFR)

                    if(dayTimestamp === todayTimestamp) {// Aujourd'hui                        
                        if(index == 0) {
                            console.log('index')
                            Cases[i + cld[cld.length -1].dayStart].style.backgroundColor = "rgb(96 100 195)"
                            Cases[i + cld[cld.length -1].dayStart].style.color = "white"
                            Cases[i + cld[cld.length -1].dayStart].style.borderRadius = "25px"
                        }
                        

                        //.classList.add("dark-mode-container");
                    }

                    if(index === 0) {
                        Cases[i + cld[cld.length -1].dayStart].innerText = i + 1
                        if(dayStringFR.includes('samedi') || dayStringFR.includes('dimanche')) {
                            Cases[i + cld[cld.length -1].dayStart].style.backgroundColor = "#939499d1"
                        }

                    } else {
                        
                        if(dayStringFR.includes('samedi') || dayStringFR.includes('dimanche')) {
                            Cases[i + cld[cld.length -1].dayStart].setAttribute('data-weekend', true);
                        }

                        // console.log(Cases[i].children[0])
                        
                        Cases[i + cld[cld.length -1].dayStart].innerText = i + 1
                        Cases[i + cld[cld.length -1].dayStart].style.color = 'transparent'
                        // Cases[i + cld[cld.length -1].dayStart].style.backgroundColor = '#00000033'

                        if(Cases[i + cld[cld.length -1].dayStart] !== undefined) {
                            // Remplissage des congés
                            if(employeesByProject[index-1]?.['vacations']) {
                                for (let indexVacations = 0; indexVacations < employeesByProject[index-1]['vacations'].length; indexVacations++) {
                                    const employeeVacations = employeesByProject[index-1]['vacations'][indexVacations];
                                    const employeeIdInproject = employeesByProject[index-1].id
                                    const employeeIdInHtml = Cases[i + cld[cld.length -1].dayStart].dataset.idemployee
                                    
                                    let employeeStartVacationToString = employeeVacations.startVacationDate.slice(0,10)
                                    let employeeEndVacationToString = employeeVacations.endVacationDate.slice(0,10)
                                    let vacationId = employeeVacations.vacationId
                                    let vacationType = employeeVacations.vacationType
                                    let vacationColor = employeeVacations.vacationColor

                                    let employeeStartToTimestampInProject = Date.parse(employeeStartVacationToString)
                                    let employeeEndToTimestampInProject = Date.parse(employeeEndVacationToString)

                                    let employeeVacationsToTimestampInHtml = Date.parse(Cases[i + cld[cld.length -1].dayStart].dataset.day)

                                    if(employeeVacationsToTimestampInHtml <= employeeEndToTimestampInProject 
                                        && employeeVacationsToTimestampInHtml >= employeeStartToTimestampInProject) {

                                        // Ajout de classe sur les premiers jours de congés
                                        if(employeeStartVacationToString == Cases[i + cld[cld.length -1].dayStart].getAttribute('data-day')) {
                                            if(Cases[i + cld[cld.length -1].dayStart].getAttribute('data-weekend')) {
                                                console.log('week')
                                            }
                                            Cases[i + cld[cld.length -1].dayStart].classList.add('vacation-day-start')
                                        }

                                        // Ajout de classe sur les derniers jours de congés
                                        if(employeeEndVacationToString == Cases[i + cld[cld.length -1].dayStart].getAttribute('data-day')) {
                                            Cases[i + cld[cld.length -1].dayStart].classList.add('vacation-day-end')
                                        }

                                        // Cases[i].children[0].style.backgroundColor = vacationColor
                                        // console.log(Cases[i + cld[cld.length -1].dayStart])
                                        Cases[i + cld[cld.length -1].dayStart].style.backgroundColor=vacationColor
                                        Cases[i + cld[cld.length -1].dayStart].classList.add('vacation-shadow');
                                        
                                        Cases[i + cld[cld.length -1].dayStart].style.color="white"
                                        Cases[i + cld[cld.length -1].dayStart].innerText = i + 1
                                        Cases[i + cld[cld.length -1].dayStart].setAttribute('data-vacations', true )
                                        Cases[i + cld[cld.length -1].dayStart].setAttribute('data-vacation-id', vacationId)
                                        
                                        Cases[i + cld[cld.length -1].dayStart].setAttribute('title', vacationType)

                                        // demi-journées
                                        if(employeeVacations.isHalfDay === true) {
                                            Cases[i + cld[cld.length -1].dayStart].setAttribute('data-halfday', true )
                                            if(employeeVacations.halfMorning === true) {
                                                Cases[i + cld[cld.length -1].dayStart].classList.add('half-day-morning')
                                            } else {
                                                Cases[i + cld[cld.length -1].dayStart].classList.remove('half-day-morning')
                                            }
                                            if(employeeVacations.halfAfternoon === true) {
                                                Cases[i + cld[cld.length -1].dayStart].classList.add('half-day-afternoon')
                                            } else {
                                                Cases[i + cld[cld.length -1].dayStart].classList.remove('half-day-afternoon')
                                            }

                                        }
                                    }
                                }
                            }
                            
                            if(dayTimestamp < todayTimestamp) {// jour anterieurs à aujourd'hui
                                Cases[i + cld[cld.length -1].dayStart].classList.add('passed-days')
                                Cases[i + cld[cld.length -1].dayStart].style.opacity = 0.4

                            } else {// Jours suivants
                                if(dayStringFR.includes('samedi') || dayStringFR.includes('dimanche')) {
                                    Cases[i + cld[cld.length -1].dayStart].style.backgroundColor = "#939499d1"
                                    Cases[i + cld[cld.length -1].dayStart].style.color="black"
                                } else {
                                    Cases[i + cld[cld.length -1].dayStart].setAttribute('data-bs-target', "#vacationModal" )
                                    Cases[i + cld[cld.length -1].dayStart].setAttribute('data-bs-toggle', "modal" )
                                    Cases[i + cld[cld.length -1].dayStart].addEventListener("click", addVacations)
                                }
                            }
                        }
                    }

                    // Compteur de congés par employé
                    if(Cases[i + cld[cld.length -1].dayStart].getAttribute('data-vacations') 
                        && !Cases[i + cld[cld.length -1].dayStart].getAttribute('data-weekend'))
                    {
                        if(Cases[i + cld[cld.length -1].dayStart].getAttribute('data-halfday')) {
                            count += 0.5;
                        } else {
                            count ++;
                        }
                    } 

                    vacationCount[index] = [month+1, count]
                }
            }

            count = 0;
            
            let newArrayVacation = vacationCount.slice(1)

            // Affichage des jours d'absence
            if(newArrayVacation.length > 0 && newArrayVacation[index-1] !== undefined) {
                let nbJours = '<span class="vacationCount">' + newArrayVacation[index-1][1] + '</span>';
                let elements = document.getElementsByClassName('employee_id')
                elements[index-1].innerHTML = nbJours
            }
        }

        let monthToNumber2 = Number(month+2)
        let nextYear = Number(year)

        if(monthToNumber2 == 13) {
            monthToNumber2 = 1
            nextYear = nextYear+1
            year = nextYear
        }

        if(monthToNumber2 < 10) {
            monthToNumber2 = "0"+ monthToNumber2
        }

        // Vue sur 2 mois
        for (var index = 0; index < collectionWeek2.length ; index++) {// Boucle sur chaque employé        
            
            Cases = document.getElementsByClassName('day2 case2_row_'+ index);

            for (let i = 0; i < Cases.length; i++) {
                Cases[i].innerText = ""
            }

            for (let i = 0; i < cld2[cld2.length - 1].length; i++) {// Boucle sur les jours

                let dayToNumber = Number(i + 1)
                if(dayToNumber < 10) {
                    dayToNumber = "0"+ dayToNumber
                }

                let dayValue = `${year}-${monthToNumber2}-${dayToNumber}`

                let dayDate = new Date(dayValue)
                let dayStringFR = dayDate.toLocaleDateString('fr-ca', options)

                let todayTimestamp = Date.parse(today)
                let dayTimestamp = Date.parse(dayValue)

                if(Cases[i + cld2[cld2.length -1].dayStart] !== undefined) {
                    Cases[i + cld2[cld2.length -1].dayStart].setAttribute('data-day', dayValue )
                    Cases[i + cld2[cld2.length -1].dayStart].setAttribute('data-month', monthToNumber2 )
                    Cases[i + cld2[cld2.length -1].dayStart].setAttribute('data-stringDay', dayStringFR)

                    if(index === 0) {
                        Cases[i + cld2[cld2.length -1].dayStart].innerText = i + 1
                        if(dayStringFR.includes('samedi') || dayStringFR.includes('dimanche')) {
                            Cases[i + cld2[cld2.length -1].dayStart].style.backgroundColor = "#939499d1"
                        }
                        // if(dayTimestamp === todayTimestamp) {// Aujourd'hui
                        //     Cases[i + cld[cld.length -1].dayStart].style.backgroundColor = "#c9d3f9"
                        // }

                    } else {

                        Cases[i + cld2[cld2.length -1].dayStart].innerText = i + 1
                        Cases[i + cld2[cld2.length -1].dayStart].style.color = 'transparent'
                        // Cases[i + cld[cld.length -1].dayStart].style.backgroundColor = '#00000033'


                        if(Cases[i + cld2[cld2.length -1].dayStart] !== undefined) {
                            // Remplissage des congés
                            if(employeesByProject[index-1]?.['vacations']) {
                                for (let indexVacations = 0; indexVacations < employeesByProject[index-1]['vacations'].length; indexVacations++) {
                                    const employeeVacations = employeesByProject[index-1]['vacations'][indexVacations];
                                    const employeeIdInproject = employeesByProject[index-1].id
                                    const employeeIdInHtml = Cases[i + cld2[cld2.length -1].dayStart].dataset.idemployee
                                    
                                    let employeeStartVacationToString = employeeVacations.startVacationDate.slice(0,10)
                                    let employeeEndVacationToString = employeeVacations.endVacationDate.slice(0,10)
                                    let vacationId = employeeVacations.vacationId
                                    let vacationType = employeeVacations.vacationType
                                    let vacationColor = employeeVacations.vacationColor

                                    let employeeStartToTimestampInProject = Date.parse(employeeStartVacationToString)
                                    let employeeEndToTimestampInProject = Date.parse(employeeEndVacationToString)

                                    let employeeVacationsToTimestampInHtml = Date.parse(Cases[i + cld2[cld2.length -1].dayStart].dataset.day)

                                    if(employeeVacationsToTimestampInHtml <= employeeEndToTimestampInProject 
                                        && employeeVacationsToTimestampInHtml >= employeeStartToTimestampInProject) {

                                            // Ajout de classe sur les premiers jours de congés
                                        if(employeeStartVacationToString == Cases[i + cld2[cld2.length -1].dayStart].getAttribute('data-day')) {
                                            Cases[i + cld2[cld2.length -1].dayStart].classList.add('vacation-day-start')
                                        }

                                        // Ajout de classe sur les derniers jours de congés
                                        if(employeeEndVacationToString == Cases[i + cld2[cld2.length -1].dayStart].getAttribute('data-day')) {
                                            Cases[i + cld2[cld2.length -1].dayStart].classList.add('vacation-day-end')
                                        }
                                            Cases[i + cld2[cld2.length -1].dayStart].style.backgroundColor=vacationColor
                                            Cases[i + cld2[cld2.length -1].dayStart].classList.add('vacation-shadow');
                                            Cases[i + cld2[cld2.length -1].dayStart].style.color="white"
                                            Cases[i + cld2[cld2.length -1].dayStart].innerText = i + 1
                                            Cases[i + cld2[cld2.length -1].dayStart].setAttribute('data-vacations', true )
                                            Cases[i + cld2[cld2.length -1].dayStart].setAttribute('data-vacation-id', vacationId)
                                            Cases[i + cld2[cld2.length -1].dayStart].setAttribute('title', vacationType)

                                        // demi-journées
                                        if(employeeVacations.isHalfDay === true) {
                                            if(employeeVacations.halfMorning === true) {
                                                Cases[i + cld2[cld2.length -1].dayStart].classList.add('half-day-morning')
                                            } else {
                                                Cases[i + cld2[cld2.length -1].dayStart].classList.remove('half-day-morning')
                                            }
                                            if(employeeVacations.halfAfternoon === true) {
                                                Cases[i + cld2[cld2.length -1].dayStart].classList.add('half-day-afternoon')
                                            } else {
                                                Cases[i + cld2[cld2.length -1].dayStart].classList.remove('half-day-afternoon')
                                            }

                                        }
                                    }
                                }
                            }
                            
                            if(dayTimestamp < todayTimestamp) {// jour anterieurs à aujourd'hui
                                // Cases[i + cld[cld.length -1].dayStart].classList.add('passed-days')
                                Cases[i + cld2[cld2.length -1].dayStart].style.opacity = 0.4

                            } else {// Jours suivants
                                if(dayStringFR.includes('samedi') || dayStringFR.includes('dimanche')) {
                                    Cases[i + cld2[cld2.length -1].dayStart].style.backgroundColor = "#939499d1"
                                    Cases[i + cld2[cld2.length -1].dayStart].style.color="black"
                                } else {
                                    Cases[i + cld2[cld2.length -1].dayStart].setAttribute('data-bs-target', "#vacationModal" )
                                    Cases[i + cld2[cld2.length -1].dayStart].setAttribute('data-bs-toggle', "modal" )
                                    Cases[i + cld2[cld2.length -1].dayStart].addEventListener("click", addVacations)
                                }
                            }
                        }
                    }
                }
            }
        }
        showNameOfDay(currentMonthLength, month) 
        showNameOfDayTwoMonth(nextMonthLength, monthToNumber2, year) 
        // firstMonthName.innerText = cld[cld.length - 1].month
        secondMonthName.innerText = `${cld2[cld2.length - 1].month}  ${year}`
    }

    function getVacationsCount(nbJours) {
        let elements = document.getElementsByClassName('employee_id')
        // console.log(nbJours)

        for (let item of elements) {
            
            item.classList.add('id_'+item.parentElement.getAttribute("data-employeeid"))
            item.innerHTML = nbJours
            // document.getElementById('id_' + dataId).innerHTML = 
            //     vacationCount[dataId][1] > 1 ? nbJours + ' jours' : nbJours + ' jour';
        }
    }

    function getFevrierLength(year) {
        if (year % 4 === 0) {
            return 29;
        } else {
            return 28;
        }
    }
    
    calendrier(year, month)
    select?.addEventListener('change', handleChange)
}


