<<<<<<< HEAD
window.addEventListener("load", function() {
    //MODEL    
    let data = {
        checks: [],
        editingIndex: []
    };

    //VARIABLES
    const checkInput = document.getElementById("check-input");
    const clearChecksButton = document.getElementById("clear-check-history");
    const depositButton = document.getElementById("deposit-button");
    const slider = document.getElementById("percentage");

    //EVENTS
    document.addEventListener("click", selectIndividualCheck);
    checkInput.addEventListener("input", renderPercentage);
    depositButton.addEventListener("click", depositCheck);
    slider.addEventListener("input", renderPercentage);
    document.addEventListener("click", removeEntry);
    document.addEventListener("click", highlightSelectedRow);
    checkInput.addEventListener("keyup", function(e) {
        if (e.keyCode === 13) {
            depositButton.click();
    }});
    clearChecksButton.addEventListener("click", function() {
        data.checks = [];
        data.editingIndex = [];
        renderTableEntry();
    });
    renderTableEntry();
    renderPercentage();

    //FUNCTION DECLARATIONS
    function adjustCheckPercentage(e) {
        console.log(e);
        // grab percentage-saved in selected "Savings" box from table
        const checkBeingEdited = data.editingIndex[0];
        console.log(checkBeingEdited);
        if (e.target.className === "percentage-saved") {
        // attach slider to that box so that the adjustment applies to the check percentage
        const percentage = document.getElementById("percentage").value;
        const percentageReadout = document.getElementById("percentage-readout");
        const moneySaved = document.getElementById("money-saved");
        
        /* percentageReadout.innerHTML = percentage + "%";
         moneySaved.innerHTML = "$" + numberWithCommas((checkInput * percentage * .01).toFixed(2)); */

        // figure out way to deselect check and either save or ignore changes made.
        // if changes are saved, adjust entry in data.checks array and clear data.selectedIndex array.
        }
    }

    function depositCheck() {
        if (checkInput.value > 0) {
            const checkInput = document.getElementById("check-input").value;
            const percentage = document.getElementById("percentage").value;
            data.checks.push({
                checkAmount: Number(checkInput),
                percentage: Number(percentage),
            });
            renderTableEntry();
            renderTotal();
        } else if (checkInput.value <= 0) {
                alert("Please enter a positive value.");
        }
    }

    function highlightSelectedRow(e) {
        if (e.target.className === "percentage-saved" && e.target.previousSibling.parentNode.className !== "highlighted") {
            e.target.previousSibling.parentNode.className = "highlighted";
        } else if (e.target.className === "percentage-saved" && e.target.previousSibling.parentNode.className === "highlighted") {
            e.target.previousSibling.parentNode.className = "";
        }
    }

    function renderPercentage() {
        const checkInput = document.getElementById("check-input").value;
        const percentage = document.getElementById("percentage").value;
        const percentageReadout = document.getElementById("percentage-readout");
        const moneySaved = document.getElementById("money-saved");
        
        percentageReadout.innerHTML = percentage + "%";
        moneySaved.innerHTML = "$" + numberWithCommas((checkInput * percentage * .01).toFixed(2));
    }

    function selectIndividualCheck(e) {
        if (e.target.className === "percentage-saved") {
            //convert the selected check value to a number
            let selectedCheckValue = Number(e.target.innerText.replace(/\,/g,"").replace(/\$/g, ""));
            console.log(Number(selectedCheckValue.toFixed(2)));
            /* loop through the checks array within the data object and
            find the index that corresponds to the selected check and percentage value */
            for (let check of data.checks) {
                console.log(Number((check.checkAmount * check.percentage * .01).toFixed(2)));
                if (check.checkAmount * check.percentage * .01 === selectedCheckValue) {
                    data.editingIndex.push(selectedCheckValue);
                    console.log(data);
                    break;
                }
            }

            //move the value from checks array to the editing index array
            //

        }
    }

    function renderTotal() {
        const addUpSavings = data.checks.reduce(function(a, b) {
            return a + b.checkAmount * b.percentage * .01;
        }, 0);
        
        const savings = document.getElementById("savings-total");
        savings.innerHTML = "$" + numberWithCommas(addUpSavings.toFixed(2));
    }
    
    function renderTableEntry() {
        let output = "";
        for (let entry of data.checks) {
            const checkAmount = entry.checkAmount;
            const percentage = entry.percentage;
            
            output += `<tr class="entry"><td>$${numberWithCommas(checkAmount)}</td>
            <td>${percentage}%</td>
            <td class="percentage-saved">$${numberWithCommas((checkAmount * percentage * .01).toFixed(2))}</td>
            <td><button class="remove-check-button">X</button></td></tr>`;
        }
        
        let checksTable = document.getElementById("tableBody");
        checksTable.innerHTML = output;
    }

    function removeEntry(e) {
        let target = e.target;
        if (target.className === "remove-check-button") {
            target.parentNode.parentNode.remove();
            // Find value in Savings category of table, remove it from the data array and update the Savings Total section of the page.
            for (let entry of data.checks) {
                let rmValue = target.parentNode.previousSibling.previousSibling.innerText;
                rmValue = Number(rmValue.replace(/\,/g,"").replace(/\$/g, ""));
                if (rmValue === Number(entry.checkAmount * entry.percentage * .01)) {
                    let index = data.checks.indexOf(entry);
                    data.checks.splice(index, 1);
                    break;
                }
            }
        }
        renderTotal();
    }
});


// Create functions to calculate check percentage and add commas to numbers
const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

function convertPercentage(n, percentageValue) {
    return percentageValue * .01 * n;
}
=======
window.addEventListener("load", function() {
  // Create storage for user's data
  let data = {
    checks: [],
    editingIndex: []
  };
  // If there is data in localStorage, then load it
  if (JSON.parse(window.localStorage.getItem("checkingAccount")).length > 0) {
    const storage = JSON.parse(window.localStorage.getItem("checkingAccount"));
    data.checks = storage;
    renderTableEntry();
  }

  const checkInput = document.getElementById("check-input");
  const clearChecksButton = document.getElementById("clear-check-history");
  const depositButton = document.getElementById("deposit-button");
  const slider = document.getElementById("percentage");

  document.addEventListener("click", selectIndividualCheck);
  checkInput.addEventListener("input", renderPercentage);
  depositButton.addEventListener("click", depositCheck);
  slider.addEventListener("input", renderPercentage);
  document.addEventListener("click", removeEntry);
  document.addEventListener("click", highlightSelectedRow);
  checkInput.addEventListener("keyup", function(e) {
    if (e.keyCode === 13) {
      depositButton.click();
    }
  });
  clearChecksButton.addEventListener("click", function() {
    data.checks = [];
    data.editingIndex = [];
    updateLocalStorage();
    renderTableEntry();
  });
  renderPercentage();
  renderTableEntry();
  renderTotal();

  //FUNCTION DECLARATIONS
  function adjustCheckPercentage(e) {
    console.log(e);
    // grab percentage-saved in selected "Savings" box from table
    const checkBeingEdited = data.editingIndex[0];
    console.log(checkBeingEdited);
    if (e.target.className === "percentage-saved") {
      // attach slider to that box so that the adjustment applies to the check percentage
      const percentage = document.getElementById("percentage").value;
      const percentageReadout = document.getElementById("percentage-readout");
      const moneySaved = document.getElementById("money-saved");

      /* percentageReadout.innerHTML = percentage + "%";
         moneySaved.innerHTML = "$" + numberWithCommas((checkInput * percentage * .01).toFixed(2)); */

      // figure out way to deselect check and either save or ignore changes made.
      // if changes are saved, adjust entry in data.checks array and clear data.selectedIndex array.
    }
  }

  function depositCheck() {
    if (checkInput.value > 0) {
      const checkInput = document.getElementById("check-input").value;
      const percentage = document.getElementById("percentage").value;
      data.checks.push({
        checkAmount: Number(checkInput),
        percentage: Number(percentage)
      });
      updateLocalStorage();
      renderTableEntry();
      renderTotal();
    } else if (checkInput.value <= 0) {
      alert("Please enter a positive value.");
    }
  }

  function highlightSelectedRow(e) {
    if (
      e.target.className === "percentage-saved" &&
      e.target.previousSibling.parentNode.className !== "highlighted"
    ) {
      e.target.previousSibling.parentNode.className = "highlighted";
    } else if (
      e.target.className === "percentage-saved" &&
      e.target.previousSibling.parentNode.className === "highlighted"
    ) {
      e.target.previousSibling.parentNode.className = "";
    }
  }

  function renderPercentage() {
    const checkInput = document.getElementById("check-input").value;
    const percentage = document.getElementById("percentage").value;
    const percentageReadout = document.getElementById("percentage-readout");
    const moneySaved = document.getElementById("money-saved");

    percentageReadout.innerHTML = percentage + "%";
    moneySaved.innerHTML =
      "$" + numberWithCommas((checkInput * percentage * 0.01).toFixed(2));
  }

  function selectIndividualCheck(e) {
    if (e.target.className === "percentage-saved") {
      //convert the selected check value to a number
      let selectedCheckValue = Number(
        e.target.innerText.replace(/\,/g, "").replace(/\$/g, "")
      );
      console.log(Number(selectedCheckValue.toFixed(2)));
      /* loop through the checks array within the data object and
            find the index that corresponds to the selected check and percentage value */
      for (let check of data.checks) {
        console.log(
          Number((check.checkAmount * check.percentage * 0.01).toFixed(2))
        );
        if (
          check.checkAmount * check.percentage * 0.01 ===
          selectedCheckValue
        ) {
          //move the value from checks array to the editing index array
          //
          data.editingIndex.push(selectedCheckValue);
          break;
        }
      }
    }
  }

  function renderTotal() {
    updateDataFromStorage();
    const addUpSavings = data.checks.reduce(function(a, b) {
      return a + b.checkAmount * b.percentage * 0.01;
    }, 0);
    const savings = document.getElementById("savings-total");
    savings.innerHTML = "$" + numberWithCommas(addUpSavings.toFixed(2));
  }

  function renderTableEntry() {
    let output = "";
    console.log(JSON.parse(window.localStorage.getItem("checkingAccount")));
    for (let entry of JSON.parse(
      window.localStorage.getItem("checkingAccount")
    )) {
      const checkAmount = entry.checkAmount;
      const percentage = entry.percentage;
      output += `<tr class="entry">
                    <td>$${numberWithCommas(checkAmount)}</td>
                    <td>${percentage}%</td>
                    <td class="percentage-saved">$${numberWithCommas(
                      (checkAmount * percentage * 0.01).toFixed(2)
                    )}</td>
                    <td><button class="remove-check-button">X</button></td>
                </tr>`;
    }
    let checksTable = document.getElementById("tableBody");
    checksTable.innerHTML = output;
  }

  // UPDATE LOCALSTORAGE AFTER CHECK IS REMOVED AND THEN WHEN ACCOUNT IS CLEARED
  function removeEntry(e) {
    let target = e.target;
    if (target.className === "remove-check-button") {
      target.parentNode.parentNode.remove();
      // Find value in Savings category of table, remove it from the data array and update the Savings Total section of the page.
      for (let entry of data.checks) {
        let rmValue =
          target.parentNode.previousSibling.previousSibling.innerText;
        rmValue = Number(rmValue.replace(/\,/g, "").replace(/\$/g, ""));
        if (rmValue === Number(entry.checkAmount * entry.percentage * 0.01)) {
          let index = data.checks.indexOf(entry);
          data.checks.splice(index, 1);
          //update local storage
          updateLocalStorage();
          console.log(window.localStorage);
          break;
        }
      }
    }
    renderTotal();
  }

  function updateDataFromStorage() {
    return (data.checks = JSON.parse(
      window.localStorage.getItem("checkingAccount")
    ));
  }

  function updateLocalStorage() {
    window.localStorage.setItem("checkingAccount", JSON.stringify(data.checks));
  }
});

// Create functions to calculate check percentage and add commas to numbers
const numberWithCommas = x => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

function convertPercentage(n, percentageValue) {
  return percentageValue * 0.01 * n;
}
>>>>>>> individualCheckChanges
