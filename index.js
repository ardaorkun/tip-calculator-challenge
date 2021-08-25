window.addEventListener('DOMContentLoaded', (event) => {

    const billInput = document.querySelector("#iBill");
    const buttons = document.querySelectorAll('.tipButtons');
    const customTip = document.querySelector('.customTip');
    const numInput = document.querySelector("#iNumberOfPeople");
    const tipAmount = document.querySelector("#billTipAmount");
    const tipTotal = document.querySelector("#billTotalPerPerson");
    const resetButton = document.querySelector("#resetButton");
    const inputForm = document.querySelectorAll("input");

    //Tip Buttons
    for (let button of buttons) {
        button.addEventListener("click", function (e) {
            e.preventDefault();
            resetActiveTipButton();
            if (button.classList.contains("customTip")) {
                button.classList.add("customTipActive")
                updateTipAmount();
            } else {
                button.classList.add("active")
                button.classList.remove("customTipActive")
            }
            activeResetButton();
            updateTipAmount();
        });
    }

    //Reset Active Tip Button
    function resetActiveTipButton() {
        document.querySelectorAll(".active").forEach((button) => {
            button.classList.remove("active");
        });
        customTip.value = "";
    }

    //Input Listener
    for (let form of inputForm) {
        form.addEventListener("input", function () {
            activeResetButton();
        });
    }

    //Activate Reset Button
    let activeResetButton = function () {
        resetButton.style.opacity = "1";
        resetButton.disabled = false;
    }

    //Reset Button Listener
    resetButton.addEventListener("click", function () {
        resetButton.disabled = true;
        resetButton.style.opacity = "0.3";
        billInput.value = '';
        numInput.value = '';
        tipAmount.innerText = "$0.00";
        tipTotal.innerText = "$0.00"
        resetActiveButton();
        customTip.value = "";
    });

    //Update
    function updateTipAmount() {
        let billVal = parseInt(billInput.value);
        let tipVal = 0;
        let numVal = parseInt(numInput.value);

        if (customTip.value === "") {
            for (let button of buttons) {
                if (button.classList.contains("active")) {
                    tipVal = parseInt(button.innerText.slice(0, -1));
                }
            }
        } else {
            tipVal = parseInt(customTip.value);
        }

        if (billVal && numVal) {
            const finalTip = ((billVal * (tipVal / 100)) / numVal);
            const finalTotal = ((billVal / numVal) + finalTip);
            tipAmount.innerText = `$${Math.round(finalTip*100) / 100}`;
            tipTotal.innerText = `$${Math.round(finalTotal*100) / 100}`;
        }
    }

    //Event Listeners
    numInput.addEventListener("mouseout", updateTipAmount);
    billInput.addEventListener("mouseout", updateTipAmount);
});