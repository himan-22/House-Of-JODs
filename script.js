// Interactive "Guess Who?" Game (Example)
document.addEventListener('DOMContentLoaded', function() {
    // Future feature: Load dynamic content here
    console.log("PG Chronicles loaded!");
});

document.addEventListener('DOMContentLoaded', function() {
    // Sample timeline data
    const timelineData = [
        {
            year: "2023",
            title: "The Great PG Food War",
            description: "When someone hid the last slice of pizza...",
            image: "images/food-war.jpg"
        },
        {
            year: "2022",
            title: "Midnight Study Sessions",
            description: "And then we all failed anyway.",
            image: "images/study.jpg"
        },
        {
            year: "2021",
            title: "Freshers' Welcome Party",
            description: "The night no one remembered.",
            image: "images/party.jpg"
        },
        {
            year: "2020",
            title: "First Day at PG",
            description: "When we all pretended to be responsible adults.",
            image: "images/first-day.jpg"
        }
    ];

    const timeline = document.querySelector('.timeline');
    const loadMoreBtn = document.getElementById('loadMore');
    let visibleItems = 2;
    let allItemsLoaded = false;

    // Function to create timeline item
    function createTimelineItem(item, index) {
        const timelineItem = document.createElement('div');
        timelineItem.className = `timeline-item ${index % 2 === 0 ? 'left' : 'right'}`;
        
        timelineItem.innerHTML = `
            <div class="timeline-year">${item.year}</div>
            <div class="timeline-content">
                <h3>${item.title}</h3>
                <p>${item.description}</p>
                ${item.image ? `<img src="${item.image}" alt="${item.title}" loading="lazy">` : ''}
            </div>
        `;
        
        return timelineItem;
    }

    // Function to render timeline items
    function renderTimelineItems() {
        const fragment = document.createDocumentFragment();
        
        for (let i = 0; i < Math.min(visibleItems, timelineData.length); i++) {
            const timelineItem = createTimelineItem(timelineData[i], i);
            fragment.appendChild(timelineItem);
        }
        
        timeline.innerHTML = '';
        timeline.appendChild(fragment);
        
        // Animate items
        setTimeout(() => {
            const items = document.querySelectorAll('.timeline-item');
            items.forEach((item, idx) => {
                setTimeout(() => {
                    item.classList.add('visible');
                }, idx * 200);
            });
        }, 100);
        
        // Hide load more button if all items are visible
        if (visibleItems >= timelineData.length) {
            loadMoreBtn.style.display = 'none';
            allItemsLoaded = true;
        }
    }

    // Load more button click handler
    loadMoreBtn.addEventListener('click', () => {
        if (!allItemsLoaded) {
            visibleItems += 2;
            renderTimelineItems();
        }
    });

    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    // Initial render
    renderTimelineItems();

    // Observe all timeline items
    document.querySelectorAll('.timeline-item').forEach(item => {
        observer.observe(item);
    });
});
    