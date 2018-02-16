        // Get input element
        let filterInput = document.getElementById('filterInput');
        // Add listener
        filterInput.addEventListener('keyup', filterNames);

        function filterNames(){
            // Get value of the input
            let filterValue = filterInput.value.toUpperCase();
            
            // Get names ul
            let ul = document.getElementById('names');
            // Get li's from ul
            let li = ul.querySelectorAll('li.collection-item');
            
            // Loop through collection-items li's
            for (let i = 0; i < li.length;i++) {
                let a = li[i].getElementsByTagName('a')[0];
                // Check if matches
                if(a.innerHTML.toUpperCase().indexOf(filterValue) > -1) {
                    li[i].style.display = '';
                }
                else {
                    li[i].style.display = 'none';
                }
            }

        }

        function populateList(){
            // Clear the main body
            document.getElementById('names').innerHTML = '';

            // Get names and first letter of each name
            let namesList = ['David', 'Anna', 'Diana'].sort();
            let firstLetterList = firstLetterListFromNames(namesList);
            
            createLiFirstLetterList(firstLetterList);
            appendNames(namesList);

            namesList.forEach(name => {
      
            });

        }

        function firstLetterListFromNames(namesList){
            var firstLetterList = []
            
            // Add each first letter to the array unless is already there
            namesList.forEach(name => {
                var letter = name.substring(0, 1);
                
                if (!firstLetterList.find(x => x === letter)) {
                    firstLetterList.push(letter);
                };
            });
            
            return firstLetterList;
        }

        function createLiFirstLetterList(firstLetterList){
            firstLetterList.forEach(letter => {
                let names = document.getElementById("names");
                let liElem = document.createElement('li');
                let h5Elem = document.createElement('h5');
                let text = document.createTextNode(letter);
                liElem.classList.add('collection-header');
                liElem.setAttribute('id', letter);
                h5Elem.appendChild(text);
                liElem.appendChild(h5Elem);
                names.appendChild(liElem);
            });
        }

        function appendNames(namesList){
            namesList.forEach(name => {
                var letter = name.substring(0, 1);
                let names = document.getElementById(letter);
                let liElem = document.createElement('li');
                let h5Elem = document.createElement('a');
                let text = document.createTextNode(name);
                liElem.classList.add('collection-item');
                h5Elem.appendChild(text);
                liElem.appendChild(h5Elem);
                names.appendChild(liElem);
            });

        }

        let modalButton = document.getElementById('modalButton');
        modalButton.addEventListener('click', addNameModal);
        function addNameModal(){
            // Get name from input and clean it
            let modalName = document.getElementById('modalName').value;
            document.getElementById('modalName').innerHTML = '';

            // If it's the first name to add
            if(localStorage.getItem('modalNames') === null) {
                var modalNames = [];
                modalNames.push(modalName);
                localStorage.setItem('modalNames', JSON.stringify(modalNames));
            }
            // If it's not the first name to add
            else {
                let modalNames = JSON.parse(localStorage.getItem('modalNames'));
                modalNames.push(modalName);
                localStorage.setItem('modalNames', JSON.stringify(modalNames));
            }

            populateList();
        }

        /* MODAL CODE */
        $('.modal').modal({
            dismissible: true, // Modal can be dismissed by clicking outside of the modal
            opacity: .5, // Opacity of modal background
            inDuration: 300, // Transition in duration
            outDuration: 200, // Transition out duration
            startingTop: '4%', // Starting top style attribute
            endingTop: '10%', // Ending top style attribute
          }
        );

