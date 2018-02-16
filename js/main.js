        // OnKeyUp, filter input
        let filterInput = document.getElementById('filterInput');
        filterInput.addEventListener('keyup', filterNames);

        // Show modal to add new names
        let modalButton = document.getElementById('modalButton');
        modalButton.addEventListener('click', addNameModal);

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
            let namesList = fetchNames();    
            
            // Only show names if there is names in storage
            if (namesList !== null) {
                namesList.sort();
                // Get the first letter of each name...
                let firstLetterList = firstLetterListFromNames(namesList);
                
                // ..and create the elements
                createLiFirstLetterList(firstLetterList);

                // Add names to each element
                appendNames(namesList); 
            }
        }

        // Fetches all tne names on localStorage
        function fetchNames(){
            var fetchNamesList = JSON.parse(localStorage.getItem('modalNames'));
            return fetchNamesList;
        }

        // Returns the first letter of each name (no repeat)
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

        // Create 'first letter' element on body
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

        // Append names to 'first letter' elements
        function appendNames(namesList){
            namesList.forEach(name => {
                var letter = name.substring(0, 1).toUpperCase();
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

        // Formats then add the name to localStorage
        function addNameModal(){
            // Get name from input and clean it
            let elementName = document.getElementById('modalName').value;
            let modalName = elementName.substring(0,1).toUpperCase() + elementName.substring(1).toLowerCase()
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

            // then re-load the body
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

