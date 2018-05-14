window.addEventListener('load', function() {
//MODEL    
    let data = [];

//GLOBAL VARIABLES
    const checkInput = document.getElementById('check-input');
    const clearChecksButton = document.getElementById('clear-check-history');
    const depositButton = document.getElementById('deposit-button');
    const slider = document.getElementById('percentage');

//EVENTS
    checkInput.addEventListener('input', renderPercentage);
    depositButton.addEventListener('click', depositCheck);
    slider.addEventListener('input', renderPercentage);
    document.addEventListener('click', removeEntry);
    
    checkInput.addEventListener('keyup', function(e) {
        if (e.keyCode === 13) {
            depositButton.click();
        }
    });
    clearChecksButton.addEventListener('click', function() {
        data = [];
        renderTableEntry();
    });

//FUNCTION DECLARATIONS
    function depositCheck() {
        if (checkInput.value > 0) {
        const checkInput = document.getElementById('check-input').value;
        const percentage = document.getElementById('percentage').value;
        const savingsAmount = (checkInput * percentage * .01).toFixed(2);

        data.push(
                    {
                        checkAmount: Number(checkInput), 
                        percentage: Number(percentage),
                        savingsAmount: Number(savingsAmount)
                    }
                );
        renderTableEntry();
        renderTotal();
            } else if (checkInput.value <= 0) {
                alert('Please enter a positive value.');
            }
    }

    function renderPercentage() {
        const checkInput = document.getElementById('check-input').value;
        const percentage = document.getElementById('percentage').value;
        const percentageReadout = document.getElementById('percentage-readout');
        const moneySaved = document.getElementById('money-saved');
        const dollarAmount = '$' + (checkInput * percentage * .01).toFixed(2);
        
        percentageReadout.innerHTML = percentage + '%';
        moneySaved.innerHTML = numberWithCommas(dollarAmount);
    }

    function renderTotal() {
        const addUpSavings = data.reduce(function(a, b) {
            return a + b.checkAmount * b.percentage * .01;
        }, 0);
        
        const savings = document.getElementById('savings-total');
        savings.innerHTML = '$' + numberWithCommas(addUpSavings.toFixed(2));
    }
    
    function renderTableEntry() {
        let output = '';
        for (let entry of data) {
            const checkAmount = entry.checkAmount;
            const percentage = entry.percentage;
            const amountSaved = convertPercentage(checkAmount, percentage).toFixed(2);
            
            output += `<tr class="entry"><td>$${numberWithCommas(checkAmount)}</td>
            <td>${percentage}%</td>
            <td class="savings-class">$${numberWithCommas(amountSaved)}</td>
            <td><button class="remove-check-button">X</button></td></tr>`;
        }
        
        let checksTable = document.getElementById('tableBody');
        checksTable.innerHTML = output;
    }

    function removeEntry(e) {
        let target = e.target;
        if (target.className === 'remove-check-button') {
            target.parentNode.parentNode.remove();
            // Find value in Savings category of table, remove it from the data array and update the Savings Total section of the page.
            for (let entry of data) {
                let rmValue = target.parentNode.previousSibling.previousSibling.innerText;
                rmValue = rmValue.replace(/\,/g,'').replace(/\$/g, '');
                
                if (rmValue == entry.savingsAmount) {
                    let index = data.indexOf(rmValue);
                    data.splice(index, 1);
                    break;
                }
            }
        }
        renderTotal();
    };
    
});


// Create functions to calculate check percentage and add commas to numbers
const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

function convertPercentage(n, percentageValue) {
    return percentageValue * .01 * n;
}