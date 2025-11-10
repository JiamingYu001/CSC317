class Calculator {
    constructor() {
        this.previousOperandElement = document.querySelector('.previous-operand');
        this.currentOperandElement = document.querySelector('.current-operand');
        this.clear();
        this.setupEventListeners();
        this.activeButton = null;
        this.activeButtonTimeout = null;
    }

    clear() {
        this.currentOperand = '0';
        this.previousOperand = '';
        this.operation = undefined;
        this.resetScreen = false;
        
        // Update AC button to show "AC" when cleared
        const clearButton = document.querySelector('[data-action="clear"]');
        if (clearButton) {
            clearButton.textContent = 'AC';
        }
    }

    delete() {
        // If we're at "0" or only one character, reset to "0"
        if (this.currentOperand === '0' || this.currentOperand.length === 1) {
            this.currentOperand = '0';
        } else {
            // Remove the last character
            this.currentOperand = this.currentOperand.slice(0, -1);
        }
        
        // Update AC button to show "C" when there's something to clear
        this.updateClearButton();
    }

    appendNumber(number) {
        if (this.resetScreen) {
            this.currentOperand = '';
            this.resetScreen = false;
        }
        
        if (number === '.' && this.currentOperand.includes('.')) return;
        
        if (this.currentOperand === '0' && number !== '.') {
            this.currentOperand = number;
        } else {
            this.currentOperand += number;
        }
        
        // Update AC button to show "C" when there's input
        this.updateClearButton();
    }

    chooseOperation(operation) {
        if (this.currentOperand === '') return;
        
        if (this.previousOperand !== '') {
            this.compute();
        }
        
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.resetScreen = true;
        
        // Update AC button to show "C"
        this.updateClearButton();
    }

    compute() {
        let computation;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        
        if (isNaN(prev) || isNaN(current)) return;
        
        switch (this.operation) {
            case 'add':
                computation = prev + current;
                break;
            case 'subtract':
                computation = prev - current;
                break;
            case 'multiply':
                computation = prev * current;
                break;
            case 'divide':
                if (current === 0) {
                    alert("Cannot divide by zero!");
                    return;
                }
                computation = prev / current;
                break;
            default:
                return;
        }
        
        this.currentOperand = computation.toString();
        this.operation = undefined;
        this.previousOperand = '';
        this.resetScreen = true;
        
        // Update AC button to show "AC" after computation
        this.updateClearButton();
    }

    toggleSign() {
        if (this.currentOperand === '0') return;
        
        if (this.currentOperand.startsWith('-')) {
            this.currentOperand = this.currentOperand.substring(1);
        } else {
            this.currentOperand = '-' + this.currentOperand;
        }
        
        this.updateClearButton();
    }

    calculatePercentage() {
        if (this.currentOperand === '0') return;
        
        const current = parseFloat(this.currentOperand);
        this.currentOperand = (current / 100).toString();
        this.resetScreen = true;
        
        this.updateClearButton();
    }

    // Update clear button text based on state
    updateClearButton() {
        const clearButton = document.querySelector('[data-action="clear"]');
        if (clearButton) {
            if (this.currentOperand === '0' && this.previousOperand === '' && !this.operation) {
                clearButton.textContent = 'AC';
            } else {
                clearButton.textContent = 'C';
            }
        }
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split('.')[0]);
        const decimalDigits = stringNumber.split('.')[1];
        
        let integerDisplay;
        
        if (isNaN(integerDigits)) {
            integerDisplay = '';
        } else {
            integerDisplay = integerDigits.toLocaleString('en', {
                maximumFractionDigits: 0
            });
        }
        
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`;
        } else {
            return integerDisplay;
        }
    }

    updateDisplay() {
        this.currentOperandElement.textContent = this.getDisplayNumber(this.currentOperand);
        
        if (this.operation != null) {
            const operationSymbols = {
                'add': '+',
                'subtract': '-',
                'multiply': '×',
                'divide': '÷'
            };
            this.previousOperandElement.textContent = 
                `${this.getDisplayNumber(this.previousOperand)} ${operationSymbols[this.operation]}`;
        } else {
            this.previousOperandElement.textContent = '';
        }
    }

    // Method to handle button highlighting
    highlightButton(button) {
        // Clear any existing timeout
        if (this.activeButtonTimeout) {
            clearTimeout(this.activeButtonTimeout);
        }
        
        // Remove active class from previously active button
        if (this.activeButton) {
            this.activeButton.classList.remove('active');
        }
        
        // Add active class to clicked button
        button.classList.add('active');
        this.activeButton = button;
        
        // Remove active class after 200ms
        this.activeButtonTimeout = setTimeout(() => {
            button.classList.remove('active');
            this.activeButton = null;
        }, 200);
    }

    setupEventListeners() {
        // Button click events
        document.querySelectorAll('[data-number]').forEach(button => {
            button.addEventListener('click', () => {
                this.appendNumber(button.dataset.number);
                this.updateDisplay();
                this.highlightButton(button);
            });
        });

        document.querySelectorAll('[data-action]').forEach(button => {
            button.addEventListener('click', () => {
                const action = button.dataset.action;
                
                switch (action) {
                    case 'clear':
                        this.clear();
                        break;
                    case 'delete':
                        this.delete();
                        break;
                    case 'toggle-sign':
                        this.toggleSign();
                        break;
                    case 'percentage':
                        this.calculatePercentage();
                        break;
                    case 'decimal':
                        this.appendNumber('.');
                        break;
                    case 'equals':
                        this.compute();
                        break;
                    default:
                        this.chooseOperation(action);
                        break;
                }
                
                this.updateDisplay();
                this.highlightButton(button);
            });
        });

        // Keyboard support
        document.addEventListener('keydown', event => {
            let button = null;
            
            if (event.key >= '0' && event.key <= '9') {
                button = document.querySelector(`[data-number="${event.key}"]`);
                this.appendNumber(event.key);
                this.updateDisplay();
            } else if (event.key === '.') {
                button = document.querySelector('[data-action="decimal"]');
                this.appendNumber('.');
                this.updateDisplay();
            } else if (event.key === '+') {
                button = document.querySelector('[data-action="add"]');
                this.chooseOperation('add');
                this.updateDisplay();
            } else if (event.key === '-') {
                button = document.querySelector('[data-action="subtract"]');
                this.chooseOperation('subtract');
                this.updateDisplay();
            } else if (event.key === '*' || event.key === 'x') {
                button = document.querySelector('[data-action="multiply"]');
                this.chooseOperation('multiply');
                this.updateDisplay();
            } else if (event.key === '/') {
                button = document.querySelector('[data-action="divide"]');
                this.chooseOperation('divide');
                this.updateDisplay();
            } else if (event.key === 'Enter' || event.key === '=') {
                button = document.querySelector('[data-action="equals"]');
                this.compute();
                this.updateDisplay();
            } else if (event.key === 'Escape') {
                button = document.querySelector('[data-action="clear"]');
                this.clear();
                this.updateDisplay();
            } else if (event.key === '%') {
                button = document.querySelector('[data-action="percentage"]');
                this.calculatePercentage();
                this.updateDisplay();
            } else if (event.key === 'Backspace') {
                button = document.querySelector('[data-action="delete"]');
                this.delete();
                this.updateDisplay();
            }
            
            // Highlight the corresponding button for keyboard input
            if (button) {
                this.highlightButton(button);
            }
        });
    }
}

// Initialize the calculator when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const calculator = new Calculator();
});