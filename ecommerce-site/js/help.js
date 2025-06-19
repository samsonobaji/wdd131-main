// Help Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize FAQ toggles
    initializeFAQs();
    
    // Initialize search functionality
    initializeSearch();
});

// FAQ Toggle Functionality
function initializeFAQs() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        const toggleBtn = item.querySelector('.toggle-btn');
        
        question.addEventListener('click', () => {
            // Close all other FAQs
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    const otherAnswer = otherItem.querySelector('.faq-answer');
                    const otherToggleBtn = otherItem.querySelector('.toggle-btn');
                    otherAnswer.classList.remove('active');
                    otherToggleBtn.classList.remove('active');
                }
            });
            
            // Toggle current FAQ
            answer.classList.toggle('active');
            toggleBtn.classList.toggle('active');
            
            // Update icon
            const icon = toggleBtn.querySelector('i');
            if (answer.classList.contains('active')) {
                icon.classList.remove('fa-plus');
                icon.classList.add('fa-minus');
            } else {
                icon.classList.remove('fa-minus');
                icon.classList.add('fa-plus');
            }
        });
    });
}

// Search Functionality
function initializeSearch() {
    const searchForm = document.querySelector('.search-form');
    const searchInput = searchForm.querySelector('input');
    
    searchForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const searchTerm = searchInput.value.trim().toLowerCase();
        if (searchTerm === '') return;
        
        // Search through FAQ items
        const faqItems = document.querySelectorAll('.faq-item');
        let foundResults = false;
        
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question h4').textContent.toLowerCase();
            const answer = item.querySelector('.faq-answer p').textContent.toLowerCase();
            
            if (question.includes(searchTerm) || answer.includes(searchTerm)) {
                item.style.display = 'block';
                foundResults = true;
                
                // Highlight matching text
                highlightText(item, searchTerm);
            } else {
                item.style.display = 'none';
            }
        });
        
        // Show/hide "no results" message
        const noResultsMsg = document.querySelector('.no-results');
        if (!foundResults) {
            if (!noResultsMsg) {
                const message = document.createElement('div');
                message.className = 'no-results';
                message.textContent = 'No results found. Please try different keywords.';
                searchForm.parentNode.appendChild(message);
            }
        } else if (noResultsMsg) {
            noResultsMsg.remove();
        }
    });
}

// Text Highlighting Function
function highlightText(element, searchTerm) {
    const question = element.querySelector('.faq-question h4');
    const answer = element.querySelector('.faq-answer p');
    
    // Remove existing highlights
    question.innerHTML = question.textContent;
    answer.innerHTML = answer.textContent;
    
    // Highlight matching text
    const highlightQuestion = (text) => {
        const regex = new RegExp(`(${searchTerm})`, 'gi');
        return text.replace(regex, '<mark>$1</mark>');
    };
    
    question.innerHTML = highlightQuestion(question.textContent);
    answer.innerHTML = highlightQuestion(answer.textContent);
}

// Smooth Scroll for Category Links
document.querySelectorAll('.category-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add CSS for highlighted text
const style = document.createElement('style');
style.textContent = `
    mark {
        background-color: rgba(76, 175, 80, 0.2);
        padding: 2px;
        border-radius: 2px;
    }
    
    .no-results {
        text-align: center;
        color: var(--text-light);
        margin-top: 1rem;
        padding: 1rem;
        background: var(--light-bg);
        border-radius: 8px;
    }
`;
document.head.appendChild(style); 